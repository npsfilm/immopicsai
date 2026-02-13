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

const Index = () => (
  <main>
    <Navigation />
    <HeroSection />
    <TrustBar />
    <BeforeAfterShowcase />
    <HowItWorks />
    <Testimonials />
    <Features />
    <TargetAudiences />
    <Pricing />
    <QualityGuarantee />
    <FAQ />
    <RegistrationForm />
    <FinalCTA />
    <Footer />
  </main>
);

export default Index;
