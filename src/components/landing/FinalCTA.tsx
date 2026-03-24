import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[500px] h-[150px] md:h-[300px] bg-primary/10 rounded-full blur-[100px]" />
      <div className="container relative text-center px-4">
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
          Ready to trade <span className="text-primary glow-text">smarter</span>?
        </h2>
        <p className="font-body text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Join dealers across the UK already using TraderOps to move stock faster and close more deals.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup">
            <Button size="lg" className="gradient-primary text-primary-foreground font-display font-semibold text-base px-8 h-12 hover:opacity-90 glow-box">
              Start Free Trial
            </Button>
          </Link>
          <a href="mailto:hello@traderops.co.uk">
            <Button size="lg" variant="outline" className="border-border/60 text-foreground font-display font-medium text-base px-8 h-12 hover:bg-secondary">
              Request Demo
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
