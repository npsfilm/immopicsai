import { Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorScreenProps {
  onRetry: () => void;
  message?: string;
}

const ErrorScreen = ({ onRetry, message }: ErrorScreenProps) => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 animate-fade-in">
    <div className="max-w-md w-full text-center space-y-6">
      <div className="flex items-center justify-center gap-2 text-primary mb-2">
        <Sparkles className="h-6 w-6 text-accent" />
        <span className="text-xl font-bold font-fraunces">ImmoPics.ai</span>
      </div>

      <div className="bg-card rounded-2xl border p-8 shadow-sm space-y-4">
        <div className="text-5xl">❌</div>
        <h1 className="text-xl font-semibold font-fraunces text-foreground">Upload fehlgeschlagen</h1>
        <p className="text-sm text-muted-foreground" role="alert">
          {message || "Bitte versuche es nochmal."}
        </p>
      </div>

      <Button
        onClick={onRetry}
        className="w-full rounded-2xl h-12 text-base font-semibold hover:-translate-y-px transition-all"
      >
        <RefreshCw className="h-5 w-5 mr-2" />
        Erneut versuchen
      </Button>

      <p className="text-xs text-muted-foreground">
        ImmoPics.ai · NPS Media GmbH · DSGVO-konform
      </p>
    </div>
  </div>
);

export default ErrorScreen;
