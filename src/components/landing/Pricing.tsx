import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const features = [
  "Unlimited stock",
  "Unlimited deals",
  "Full trade network access",
  "No setup fees",
  "Cancel anytime",
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container relative">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Simple pricing. <span className="text-primary">No nonsense.</span>
          </h2>
        </div>
        <div className="max-w-md mx-auto">
          <div className="relative rounded-2xl border border-primary/30 bg-card p-8 glow-border">
            {/* Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-display font-semibold">
              Everything included
            </div>
            <div className="text-center mb-8 pt-4">
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display text-6xl font-bold text-foreground">£50</span>
                <span className="text-muted-foreground font-body">/month</span>
              </div>
              <p className="text-muted-foreground font-body mt-2">per dealership</p>
            </div>
            <div className="space-y-4 mb-8">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="font-body text-foreground">{f}</span>
                </div>
              ))}
            </div>
            <Link to="/app">
              <Button className="w-full h-12 gradient-primary text-primary-foreground font-display font-semibold text-base hover:opacity-90 transition-opacity">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
