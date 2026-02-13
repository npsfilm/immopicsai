const steps = ["Bild empfangen", "KI-Analyse", "Automatische Bearbeitung", "Qualitätskontrolle", "Ergebnis senden"];

const QualityGuarantee = () => (
  <section className="py-20">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-primary mb-6">
            Qualität, auf die Sie sich verlassen können
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Unsere KI wurde mit tausenden professionellen Immobilienfotos trainiert. 
            Jedes Ergebnis wird automatisch auf Qualität geprüft, bevor es an Sie zurückgesendet wird.
          </p>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Bei Bedarf optimiert unser Team die Ergebnisse manuell nach – ohne Aufpreis.
          </p>

          <div className="bg-accent/10 border border-accent/20 rounded-xl p-5">
            <p className="font-semibold text-primary flex items-center gap-2">
              <span className="text-accent text-lg">✓</span>
              Unbegrenzte Korrekturen – kostenlos
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Nicht zufrieden? Wir bearbeiten Ihr Bild erneut, bis es perfekt ist.
            </p>
          </div>
        </div>

        {/* Flow diagram */}
        <div className="flex flex-col items-center gap-0">
          {steps.map((step, i) => (
            <div key={step} className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-medium w-56 text-center">
                {step}
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 h-6 bg-primary/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default QualityGuarantee;
