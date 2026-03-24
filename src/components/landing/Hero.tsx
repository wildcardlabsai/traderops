import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      {/* Glow effect - hidden on mobile to prevent overflow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[200px] md:h-[400px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="container relative z-10 text-center pt-24 pb-16 px-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8 opacity-0 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-sm font-body text-primary">Built for the motor trade</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl mx-auto mb-6 opacity-0 animate-fade-in-delay-1">
          Built for Dealers Who{" "}
          <span className="text-primary glow-text">Trade</span>, Not Retail
        </h1>

        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-delay-2">
          Manage stock, source vehicles, and close deals faster with a platform designed for the trade.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-delay-3">
          <Link to="/app">
            <Button size="lg" className="gradient-primary text-primary-foreground font-display font-semibold text-base px-8 h-12 hover:opacity-90 transition-opacity glow-box">
              Start Free Trial
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-border/60 text-foreground font-display font-medium text-base px-8 h-12 hover:bg-secondary">
            <Play className="w-4 h-4 mr-2" />
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
