import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import Pricing from "@/components/landing/Pricing";
import Benefits from "@/components/landing/Benefits";
import SocialProof from "@/components/landing/SocialProof";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <FeatureShowcase />
      <Benefits />
      <Pricing />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
