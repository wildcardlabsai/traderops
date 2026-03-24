import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Orange gradient background */}
      <div className="absolute inset-0 gradient-primary opacity-90" />
      <div className="absolute inset-0 bg-dot-pattern opacity-10" />

      <div className="container relative text-center px-4">
        <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white">
          Ready to trade smarter?
        </h2>
        <p className="font-body text-lg text-white/70 mb-12 max-w-xl mx-auto leading-relaxed">
          Join dealers across the UK already using TraderOps to move stock faster and close more deals.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup">
            <Button size="lg" className="bg-white text-foreground font-display font-semibold text-base px-8 h-13 hover:bg-white/90 rounded-xl shadow-lg">
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <a href="mailto:hello@traderops.co.uk">
            <Button size="lg" variant="outline" className="border-white/30 text-white font-display font-medium text-base px-8 h-13 hover:bg-white/10 rounded-xl">
              Request Demo
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
