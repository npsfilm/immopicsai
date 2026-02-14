import { useState, useCallback } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import BeforeAfterShowcase from "@/components/BeforeAfterShowcase";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import TargetAudiences from "@/components/TargetAudiences";
import QualityGuarantee from "@/components/QualityGuarantee";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import RegistrationForm from "@/components/RegistrationForm";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [yearly, setYearly] = useState(false);

  const handleSelectPlan = useCallback((planId: string, isYearly: boolean) => {
    setSelectedPlan(planId);
    setYearly(isYearly);
    // Scroll to registration form after state update
    setTimeout(() => {
      document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, []);

  return (
    <main>
      <Navigation />
      <HeroSection />
      <TrustBar />
      <BeforeAfterShowcase />
      <HowItWorks />
      <Testimonials />
      <Features />
      <TargetAudiences />
      <Pricing onSelectPlan={handleSelectPlan} />
      <QualityGuarantee />
      <FAQ />
      <RegistrationForm
        selectedPlan={selectedPlan}
        yearly={yearly}
        onChangePlan={() => {
          setSelectedPlan("free");
          document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
