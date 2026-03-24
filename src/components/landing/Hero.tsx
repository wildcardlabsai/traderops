import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import AppPreview from "./AppPreview";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero background image */}
      <img
        src={heroBg}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />

      {/* Dark overlay with warm orange glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[600px] bg-primary/[0.08] rounded-full blur-[150px]" />

      <div className="container relative z-10 text-center pt-28 pb-20 px-5">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-primary/30 mb-12 opacity-0 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-xs font-body font-semibold text-primary uppercase tracking-[0.2em]">New: AI-Powered Wanted Matching</span>
        </div>

        {/* Heading — Bebas Neue uppercase */}
        <h1 className="font-display text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] uppercase leading-[0.9] tracking-tight max-w-5xl mx-auto mb-8 opacity-0 animate-fade-in-delay-1 text-foreground">
          Built For{" "}
          <br />
          Dealers{" "}
          <br className="sm:hidden" />
          Who <span className="text-gradient">Trade</span>
        </h1>

        {/* Subtitle */}
        <p className="font-body text-base md:text-lg text-muted-foreground max-w-lg mx-auto mb-12 leading-relaxed opacity-0 animate-fade-in-delay-2">
          Manage stock, source vehicles, and close deals faster with the UK's premium automotive trade platform.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-delay-3 max-w-md mx-auto sm:max-w-none">
          <Link to="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gradient-primary text-primary-foreground font-display text-xl uppercase tracking-wider px-10 h-14 hover:opacity-90 transition-opacity glow-box rounded-xl">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-border text-foreground font-display text-xl uppercase tracking-wider px-10 h-14 hover:bg-secondary rounded-xl">
              Watch Demo
            </Button>
          </Link>
        </div>

        {/* Trust bar */}
        <div className="mt-14 opacity-0 animate-fade-in-delay-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-muted-foreground font-body text-sm">
          <span className="flex items-center gap-1.5"><span className="text-success">✓</span> 14-day free trial</span>
          <span className="flex items-center gap-1.5"><span className="text-success">✓</span> No credit card</span>
          <span className="flex items-center gap-1.5"><span className="text-success">✓</span> Cancel anytime</span>
        </div>

        {/* App preview */}
        <div className="mt-16 md:mt-20 opacity-0 animate-fade-in-delay-3" style={{ perspective: "1200px" }}>
          <div className="transform md:rotate-x-1 transition-transform duration-500 hover:rotate-x-0">
            <AppPreview />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-delay-3">
        <ChevronDown className="w-5 h-5 text-muted-foreground/50 animate-float" />
      </div>
    </section>
  );
};

export default Hero;
