import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const categories = ["Alle", "Virtual Staging", "Himmel", "Objekte entfernen", "Gesamtoptimierung"];

const items = [
  { title: "Wohnzimmer Staging", category: "Virtual Staging", emoji: "🛋️" },
  { title: "Schlafzimmer Staging", category: "Virtual Staging", emoji: "🛏️" },
  { title: "Büro Staging", category: "Virtual Staging", emoji: "💼" },
  { title: "Sonniger Himmel", category: "Himmel", emoji: "☀️" },
  { title: "Blauer Himmel", category: "Himmel", emoji: "🌤️" },
  { title: "Abendstimmung", category: "Himmel", emoji: "🌅" },
  { title: "Auto entfernt", category: "Objekte entfernen", emoji: "🚗" },
  { title: "Mülltonne entfernt", category: "Objekte entfernen", emoji: "🗑️" },
  { title: "Kabel entfernt", category: "Objekte entfernen", emoji: "🔌" },
  { title: "Komplettoptimierung Haus", category: "Gesamtoptimierung", emoji: "🏡" },
  { title: "Komplettoptimierung Wohnung", category: "Gesamtoptimierung", emoji: "🏢" },
  { title: "Komplettoptimierung Garten", category: "Gesamtoptimierung", emoji: "🌳" },
];

const Portfolio = () => {
  const [active, setActive] = useState("Alle");
  const filtered = active === "Alle" ? items : items.filter((i) => i.category === active);

  return (
    <main>
      <Navigation />

      <section className="pt-28 pb-12">
        <div className="container mx-auto text-center">
          <h1 className="font-grotesk text-4xl sm:text-5xl font-bold text-primary mb-4">
            Unsere Ergebnisse
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Überzeugen Sie sich selbst – echte Vorher/Nachher-Beispiele unserer KI-Bildbearbeitung.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <div
                key={`${item.title}-${i}`}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-cream h-48 flex items-center justify-center text-5xl">
                  {item.emoji}
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-accent">{item.category}</span>
                  <h3 className="font-grotesk text-lg font-semibold text-primary mt-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">Vorher → Nachher Beispiel</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button
              onClick={() => {
                window.location.href = "/#register";
              }}
              className="bg-accent text-accent-foreground px-10 py-4 rounded-xl text-lg font-semibold hover:brightness-110 transition-all shadow-lg shadow-accent/25"
            >
              Jetzt kostenlos testen
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Portfolio;
