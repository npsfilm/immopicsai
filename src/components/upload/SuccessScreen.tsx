import { Sparkles, MessageCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessScreenProps {
  count: number;
  resolution: string;
  onUploadMore: () => void;
}

const SuccessScreen = ({ count, resolution, onUploadMore }: SuccessScreenProps) => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 animate-fade-in">
    <div className="max-w-md w-full text-center space-y-6">
      <div className="flex items-center justify-center gap-2 text-primary mb-2">
        <Sparkles className="h-6 w-6 text-accent" />
        <span className="text-xl font-bold font-fraunces">ImmoPics.ai</span>
      </div>

      <div className="bg-card rounded-2xl border p-8 shadow-sm space-y-4">
        <div className="text-5xl">✅</div>
        <h1 className="text-xl font-semibold font-fraunces text-foreground">Upload erfolgreich!</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {count} {count === 1 ? "Bild wird" : "Bilder werden"} jetzt in {resolution} bearbeitet.
        </p>
        <p className="text-sm text-muted-foreground">
          Du bekommst die Ergebnisse direkt per WhatsApp zugeschickt.
        </p>
      </div>

      <div className="space-y-3">
        <Button
          onClick={onUploadMore}
          className="w-full rounded-2xl h-12 text-base font-semibold hover:-translate-y-px transition-all"
        >
          <Camera className="h-5 w-5 mr-2" />
          Weitere Bilder hochladen
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full rounded-2xl h-12 text-base font-semibold hover:-translate-y-px transition-all"
        >
          <a href="https://wa.me/4915734019999" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5 mr-2" />
            Zu WhatsApp
          </a>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        ImmoPics.ai · NPS Media GmbH · DSGVO-konform
      </p>
    </div>
  </div>
);

export default SuccessScreen;
