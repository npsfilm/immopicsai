import { useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import NoTokenScreen from "@/components/upload/NoTokenScreen";
import PinEntry from "@/components/upload/PinEntry";
import UploadArea, { type FileWithPreview } from "@/components/upload/UploadArea";
import UploadProgress from "@/components/upload/UploadProgress";
import SuccessScreen from "@/components/upload/SuccessScreen";
import ErrorScreen from "@/components/upload/ErrorScreen";

const PLAN_CONFIG: Record<string, { res: string; max: number }> = {
  free: { res: "1K", max: 1 },
  starter: { res: "2K", max: 5 },
  pro: { res: "4K", max: 5 },
  team: { res: "4K", max: 20 },
};

interface UserData {
  Vorname: string;
  credits: number;
  plan: string;
  phone_number: string;
}

type Step = "no-token" | "pin" | "upload" | "uploading" | "success" | "error";

const readFileAsBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const Upload = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [user, setUser] = useState<UserData | null>(null);
  const [step, setStep] = useState<Step>(token ? "pin" : "no-token");
  const [uploadState, setUploadState] = useState({ current: 0, total: 0 });
  const [lastUpload, setLastUpload] = useState({ count: 0, res: "" });

  // Store files + instruction for retry
  const [pendingUpload, setPendingUpload] = useState<{
    files: FileWithPreview[];
    globalInstruction: string;
    mode: "global" | "per-image";
  } | null>(null);

  const handlePinSuccess = useCallback((userData: UserData) => {
    setUser(userData);
    setStep("upload");
  }, []);

  const doUpload = useCallback(
    async (files: FileWithPreview[], globalInstruction: string, mode: "global" | "per-image") => {
      if (!user || !token) return;
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      if (!webhookUrl) {
        console.error("VITE_N8N_WEBHOOK_URL not set");
        setStep("error");
        return;
      }

      setPendingUpload({ files, globalInstruction, mode });
      setUploadState({ current: 0, total: files.length });
      setStep("uploading");

      const config = PLAN_CONFIG[user.plan] || PLAN_CONFIG.free;

      for (let i = 0; i < files.length; i++) {
        setUploadState({ current: i + 1, total: files.length });
        try {
          const base64 = await readFileAsBase64(files[i].file);
          const prompt = mode === "global" ? globalInstruction : files[i].instruction;

          const res = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token,
              phone_number: user.phone_number,
              image_base64: base64,
              image_name: files[i].file.name,
              prompt,
              plan: user.plan,
              mime_type: files[i].file.type,
            }),
          });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          setUser(prev => prev ? { ...prev, credits: prev.credits - 1 } : prev);
        } catch (err) {
          console.error("Upload failed:", err);
          setStep("error");
          return;
        }
      }

      setLastUpload({ count: files.length, res: config.res });
      setStep("success");
    },
    [user, token]
  );

  const handleRetry = useCallback(() => {
    if (pendingUpload) {
      doUpload(pendingUpload.files, pendingUpload.globalInstruction, pendingUpload.mode);
    }
  }, [pendingUpload, doUpload]);

  if (step === "no-token") return <NoTokenScreen />;
  if (step === "pin") return <PinEntry token={token!} onSuccess={handlePinSuccess} />;
  if (step === "uploading") return <UploadProgress current={uploadState.current} total={uploadState.total} />;
  if (step === "success")
    return (
      <SuccessScreen
        count={lastUpload.count}
        resolution={lastUpload.res}
        onUploadMore={() => setStep("upload")}
      />
    );
  if (step === "error") return <ErrorScreen onRetry={handleRetry} />;

  // step === "upload"
  return user ? (
    <UploadArea
      user={{ Vorname: user.Vorname, credits: user.credits, plan: user.plan }}
      onSubmit={doUpload}
      loading={false}
    />
  ) : null;
};

export default Upload;
