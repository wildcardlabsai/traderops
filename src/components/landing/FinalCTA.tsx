import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section id="contact" className="py-20 md:py-32 relative bg-foreground text-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[200px] md:h-[400px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="container relative text-center px-4">
        <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Ready to trade smarter?
        </h2>
        <p className="font-body text-lg text-background/60 mb-12 max-w-xl mx-auto leading-relaxed">
          Join dealers across the UK already using TraderOps to move stock faster and close more deals.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup">
            <Button size="lg" className="gradient-primary text-primary-foreground font-display font-semibold text-base px-8 h-13 hover:opacity-90 rounded-xl glow-box">
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <a href="mailto:hello@traderops.co.uk">
            <Button size="lg" variant="outline" className="border-background/20 text-background font-display font-medium text-base px-8 h-13 hover:bg-background/10 rounded-xl">
              Request Demo
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
