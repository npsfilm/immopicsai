import Navigation from "@/components/Navigation";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Upgrade = () => (
  <main>
    <Navigation />
    <div className="pt-24">
      <div className="container mx-auto px-4 text-center mb-8">
        <h1 className="text-3xl font-bold font-fraunces text-primary">Plan upgraden</h1>
        <p className="text-muted-foreground mt-2">
          Wähle den passenden Plan für dich oder dein Team.
        </p>
      </div>
      <Pricing />
    </div>
    <Footer />
  </main>
);

export default Upgrade;
