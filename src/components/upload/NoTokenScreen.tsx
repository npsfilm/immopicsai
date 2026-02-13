import { Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NoTokenScreen = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 animate-fade-in">
    <div className="max-w-md w-full text-center space-y-6">
      <div className="flex items-center justify-center gap-2 text-primary mb-2">
        <Sparkles className="h-6 w-6 text-accent" />
        <span className="text-xl font-bold font-fraunces">ImmoPics.ai</span>
      </div>

      <div className="bg-card rounded-2xl border p-8 shadow-sm space-y-4">
        <div className="text-4xl">🔒</div>
        <h1 className="text-xl font-semibold font-fraunces text-foreground">
          Kein Zugangslink
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Bitte nutze den persönlichen Upload-Link, den du über WhatsApp erhalten hast.
        </p>
      </div>

      <Button
        asChild
        className="w-full rounded-2xl h-12 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 hover:-translate-y-px transition-all"
      >
        <a href="https://wa.me/4915734019999" target="_blank" rel="noopener noreferrer">
          <MessageCircle className="h-5 w-5 mr-2" />
          Link über WhatsApp anfordern
        </a>
      </Button>

      <p className="text-xs text-muted-foreground">
        ImmoPics.ai · NPS Media GmbH · DSGVO-konform
      </p>
    </div>
  </div>
);

export default NoTokenScreen;
