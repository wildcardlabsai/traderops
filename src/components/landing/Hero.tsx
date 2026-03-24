import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero background image */}
      <img
        src={heroBg}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover opacity-15"
      />

      {/* Light overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/95" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Subtle glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-accent/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container relative z-10 text-center pt-24 pb-24 px-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8 opacity-0 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-sm font-body text-primary">500+ dealers already trading</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl mx-auto mb-6 opacity-0 animate-fade-in-delay-1 text-foreground">
          Built for Dealers Who{" "}
          <span className="text-primary">Trade</span>, Not Retail
        </h1>

        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-delay-2">
          Manage stock, source vehicles, and close deals faster with a platform designed for the trade.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-delay-3">
          <Link to="/signup">
            <Button size="lg" className="gradient-primary text-primary-foreground font-display font-semibold text-base px-8 h-12 hover:opacity-90 transition-opacity glow-box">
              Start Free Trial
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-border text-foreground font-display font-medium text-base px-8 h-12 hover:bg-secondary">
            <Play className="w-4 h-4 mr-2" />
            Watch Demo
          </Button>
        </div>

        {/* Trust bar */}
        <div className="mt-16 opacity-0 animate-fade-in-delay-3 flex flex-wrap items-center justify-center gap-6 text-muted-foreground font-body text-xs">
          <span>✓ 14-day free trial</span>
          <span className="hidden sm:inline">•</span>
          <span>✓ No credit card required</span>
          <span className="hidden sm:inline">•</span>
          <span>✓ Cancel anytime</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-delay-3">
        <ChevronDown className="w-5 h-5 text-muted-foreground animate-float" />
      </div>
    </section>
  );
};

export default Hero;
