import { Sparkles, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  current: number;
  total: number;
}

const UploadProgress = ({ current, total }: UploadProgressProps) => {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex items-center justify-center gap-2 text-primary mb-2">
          <Sparkles className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold font-fraunces">ImmoPics.ai</span>
        </div>

        <div className="bg-card rounded-2xl border p-8 shadow-sm space-y-6">
          <Loader2 className="h-10 w-10 animate-spin text-accent mx-auto" />
          <div>
            <h2 className="text-lg font-semibold font-fraunces text-foreground">
              Bild {current} von {total} wird bearbeitet…
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Pixi arbeitet…</p>
          </div>
          <Progress value={pct} className="h-2 rounded-full" />
          <p className="text-xs text-muted-foreground">{pct}%</p>
        </div>

        <p className="text-xs text-muted-foreground">
          ImmoPics.ai · NPS Media GmbH · DSGVO-konform
        </p>
      </div>
    </div>
  );
};

export default UploadProgress;
