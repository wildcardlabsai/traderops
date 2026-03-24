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

      {/* Light overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/[0.07] rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-[10%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-accent/[0.05] rounded-full blur-[80px]" />

      <div className="container relative z-10 text-center pt-28 pb-20 px-5">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/[0.06] mb-10 opacity-0 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-sm font-body font-medium text-primary">500+ dealers already trading</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight max-w-4xl mx-auto mb-8 opacity-0 animate-fade-in-delay-1 text-foreground leading-[1.05]">
          Built for Dealers{" "}
          <br className="hidden sm:block" />
          Who <span className="text-gradient">Trade</span>
        </h1>

        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-in-delay-2">
          Manage stock, source vehicles, and close deals faster — all in one platform built for the trade.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-delay-3">
          <Link to="/signup">
            <Button size="lg" className="gradient-primary text-primary-foreground font-display font-semibold text-base px-8 h-13 hover:opacity-90 transition-opacity glow-box rounded-xl">
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-border text-foreground font-display font-medium text-base px-8 h-13 hover:bg-secondary rounded-xl">
            Watch Demo
          </Button>
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
