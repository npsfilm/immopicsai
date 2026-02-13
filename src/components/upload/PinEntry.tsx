import { useState, useCallback } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";

interface UserData {
  Vorname: string;
  credits: number;
  plan: string;
  phone_number: string;
}

interface PinEntryProps {
  token: string;
  onSuccess: (user: UserData) => void;
}

const PinEntry = ({ token, onSuccess }: PinEntryProps) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [shaking, setShaking] = useState(false);

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil;

  const handleVerify = useCallback(async () => {
    if (pin.length !== 6 || loading || isLocked) return;

    setLoading(true);
    setError("");

    try {
      const { data, error: dbError } = await supabase
        .from("upload_access")
        .select("Vorname, credits, plan, phone_number")
        .eq("upload_token", token)
        .eq("upload_pin", pin)
        .maybeSingle();

      if (dbError || !data) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setShaking(true);
        setTimeout(() => setShaking(false), 500);

        if (newAttempts >= 3) {
          setLockedUntil(Date.now() + 5 * 60 * 1000);
          setError("Zu viele Versuche. Bitte warte 5 Minuten oder fordere einen neuen Link über WhatsApp an.");
          setTimeout(() => {
            setLockedUntil(null);
            setAttempts(0);
          }, 5 * 60 * 1000);
        } else {
          setError("PIN oder Link ungültig. Bitte prüfe deine WhatsApp-Nachricht.");
        }
        setPin("");
      } else {
        onSuccess(data as UserData);
      }
    } catch {
      setError("Verbindungsfehler. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  }, [pin, loading, isLocked, token, attempts, onSuccess]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex items-center justify-center gap-2 text-primary mb-2">
          <Sparkles className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold font-grotesk">ImmoPics.ai</span>
        </div>

        <div className="bg-card rounded-2xl border p-8 shadow-sm space-y-6">
          <div>
            <h1 className="text-xl font-semibold font-grotesk text-foreground">
              Willkommen bei ImmoPics.ai
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Bitte gib deine 6-stellige PIN ein, die du per WhatsApp erhalten hast.
            </p>
          </div>

          <div className={`flex justify-center ${shaking ? "animate-shake" : ""}`}>
            <InputOTP
              maxLength={6}
              value={pin}
              onChange={setPin}
              disabled={isLocked || loading}
            >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={0} className="h-14 w-14 text-2xl rounded-xl border border-border" />
                <InputOTPSlot index={1} className="h-14 w-14 text-2xl rounded-xl border border-border" />
                <InputOTPSlot index={2} className="h-14 w-14 text-2xl rounded-xl border border-border" />
                <InputOTPSlot index={3} className="h-14 w-14 text-2xl rounded-xl border border-border" />
                <InputOTPSlot index={4} className="h-14 w-14 text-2xl rounded-xl border border-border" />
                <InputOTPSlot index={5} className="h-14 w-14 text-2xl rounded-xl border border-border" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive font-medium">
              {error}
            </p>
          )}

            <Button
              onClick={handleVerify}
              disabled={pin.length !== 6 || loading || isLocked}
            className="w-full rounded-2xl h-12 text-base font-semibold hover:-translate-y-px transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Prüfe…
              </>
            ) : (
              "Zugang bestätigen"
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          ImmoPics.ai · NPS Media GmbH · DSGVO-konform
        </p>
      </div>
    </div>
  );
};

export default PinEntry;
