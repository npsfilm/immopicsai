import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from "react";
import { Sparkles, X, Loader2, Camera, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface UserData {
  Vorname: string;
  credits: number;
  plan: string;
}

interface FileWithPreview {
  file: File;
  preview: string;
  instruction: string;
}

const PLAN_CONFIG: Record<string, { res: string; max: number }> = {
  free: { res: "1K", max: 1 },
  starter: { res: "2K", max: 5 },
  pro: { res: "4K", max: 5 },
  team: { res: "4K", max: 20 },
};

const ACCEPTED = "image/jpeg,image/png,image/webp,image/heic";

interface UploadAreaProps {
  user: UserData;
  onSubmit: (files: FileWithPreview[], globalInstruction: string, instructionMode: "global" | "per-image") => void;
  loading: boolean;
}

const UploadArea = ({ user, onSubmit, loading }: UploadAreaProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [instructionMode, setInstructionMode] = useState<"global" | "per-image">("global");
  const [globalInstruction, setGlobalInstruction] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const config = PLAN_CONFIG[user.plan] || PLAN_CONFIG.free;
  const maxReached = files.length >= config.max;
  const hasInstruction = instructionMode === "global"
    ? globalInstruction.trim().length > 0
    : files.every((f) => f.instruction.trim().length > 0);
  const hasEnoughCredits = user.credits >= files.length;
  const canSubmit = files.length > 0 && hasInstruction && hasEnoughCredits && !loading;

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const arr = Array.from(newFiles).filter((f) =>
        ["image/jpeg", "image/png", "image/webp", "image/heic"].includes(f.type)
      );
      setFiles((prev) => {
        const remaining = config.max - prev.length;
        const toAdd = arr.slice(0, remaining).map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          instruction: "",
        }));
        return [...prev, ...toAdd];
      });
    },
    [config.max]
  );

  const removeFile = (index: number) => {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const removeAll = () => {
    files.forEach((f) => URL.revokeObjectURL(f.preview));
    setFiles([]);
  };

  const updateInstruction = (index: number, value: string) => {
    setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, instruction: value } : f)));
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="max-w-[800px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="font-bold font-fraunces">ImmoPics.ai</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground font-medium">{user.Vorname}</span>
            <Badge className="uppercase text-[10px] tracking-wider">{user.plan}</Badge>
          </div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-4 py-6 space-y-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Credits", value: user.credits },
            { label: "Auflösung", value: config.res },
            { label: "Max. Bilder", value: config.max },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl border p-3 text-center">
              <p className="text-lg font-bold font-fraunces text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => !maxReached && inputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
            maxReached
              ? "border-muted bg-muted/50 cursor-not-allowed opacity-60"
              : dragOver
              ? "border-accent bg-accent/5 scale-[1.01]"
              : "border-border hover:border-accent/50"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED}
            multiple
            onChange={onFileChange}
            className="hidden"
            disabled={maxReached}
          />
          <div className="text-4xl mb-2">{dragOver ? "📥" : "📸"}</div>
          {maxReached ? (
            <p className="text-sm text-muted-foreground font-medium">
              Maximum erreicht ({config.max} Bilder)
            </p>
          ) : (
            <>
              <p className="text-sm font-medium text-foreground">Bilder hierher ziehen</p>
              <p className="text-xs text-muted-foreground mt-1">oder klicken zum Auswählen</p>
              <p className="text-xs text-muted-foreground mt-2">
                Max. {config.max} Bilder · JPG, PNG, WEBP, HEIC
              </p>
            </>
          )}
        </div>

        {/* File Grid */}
        {files.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                {files.length} {files.length === 1 ? "Bild" : "Bilder"} ausgewählt
              </p>
              <Button variant="ghost" size="sm" onClick={removeAll} className="text-xs text-muted-foreground">
                Alle entfernen
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {files.map((f, i) => (
                <div key={i} className="space-y-2">
                  <div className="relative rounded-2xl overflow-hidden border bg-muted">
                    <AspectRatio ratio={4 / 3}>
                      <img src={f.preview} alt={f.file.name} className="w-full h-full object-cover" />
                    </AspectRatio>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(i);
                      }}
                      className="absolute top-1.5 right-1.5 bg-background/80 backdrop-blur rounded-full p-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="text-[10px] text-white truncate">{f.file.name}</p>
                      <p className="text-[10px] text-white/70">{formatSize(f.file.size)}</p>
                    </div>
                  </div>
                  {instructionMode === "per-image" && (
                    <Textarea
                      value={f.instruction}
                      onChange={(e) => updateInstruction(i, e.target.value)}
                      placeholder="Anweisung für dieses Bild…"
                      className="text-xs min-h-[60px] rounded-xl resize-none"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instruction Mode Toggle */}
        {files.length > 0 && (
          <div className="space-y-3">
            <div className="flex bg-muted rounded-2xl p-1">
              {(["global", "per-image"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setInstructionMode(mode)}
                  className={`flex-1 text-sm py-2 rounded-xl font-medium transition-all ${
                    instructionMode === mode
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {mode === "global" ? "Eine Anweisung für alle" : "Pro Bild eine Anweisung"}
                </button>
              ))}
            </div>

            {instructionMode === "global" && (
              <Textarea
                value={globalInstruction}
                onChange={(e) => setGlobalInstruction(e.target.value)}
                placeholder='z.B. "Mach alle Räume leer" oder "Blauer Himmel und grüner Rasen"'
                className="rounded-2xl min-h-[100px] resize-none"
              />
            )}
          </div>
        )}

        {/* Submit */}
        {files.length > 0 && (
          <div className="space-y-2">
            {!hasEnoughCredits && (
              <p role="alert" className="text-sm text-destructive text-center font-medium">
                Nicht genug Credits ({user.credits} übrig)
              </p>
            )}
            <Button
              onClick={() => onSubmit(files, globalInstruction, instructionMode)}
              disabled={!canSubmit}
              className="w-full rounded-2xl h-12 text-base font-semibold hover:-translate-y-px transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Pixi arbeitet…
                </>
              ) : !hasEnoughCredits ? (
                `Nicht genug Credits (${user.credits} übrig)`
              ) : (
                `${files.length} ${files.length === 1 ? "Bild" : "Bilder"} in ${config.res} bearbeiten ✨`
              )}
            </Button>
          </div>
        )}
      </main>

      <footer className="text-center py-6 text-xs text-muted-foreground">
        ImmoPics.ai · NPS Media GmbH · DSGVO-konform
      </footer>
    </div>
  );
};

export default UploadArea;
export type { FileWithPreview, UserData };
