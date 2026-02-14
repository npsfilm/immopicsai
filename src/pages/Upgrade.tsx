import { useState, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Pricing from "@/components/Pricing";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

const Upgrade = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [yearly, setYearly] = useState(false);

  const handleSelectPlan = useCallback((planId: string, isYearly: boolean) => {
    setSelectedPlan(planId);
    setYearly(isYearly);
    setTimeout(() => {
      document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, []);

  return (
    <main>
      <Navigation />
      <div className="pt-24">
        <div className="container mx-auto px-4 text-center mb-8">
          <h1 className="text-3xl font-bold font-grotesk text-primary">Plan upgraden</h1>
          <p className="text-muted-foreground mt-2">
            Wähle den passenden Plan für dich oder dein Team.
          </p>
        </div>
        <Pricing onSelectPlan={handleSelectPlan} />
        {selectedPlan && (
          <RegistrationForm
            selectedPlan={selectedPlan}
            yearly={yearly}
            onChangePlan={() => {
              setSelectedPlan(null);
              document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        )}
      </div>
      <Footer />
    </main>
  );
};

export default Upgrade;
