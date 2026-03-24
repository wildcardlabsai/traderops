import { Package, Users, GitBranch, Search, Truck } from "lucide-react";

const features = [
  { icon: Package, title: "Trade Stock Management", desc: "Track every vehicle with pricing, margins, and status in one place." },
  { icon: Users, title: "Private Dealer Network", desc: "Connect directly with trusted buyers and suppliers." },
  { icon: GitBranch, title: "Deal Tracking Pipeline", desc: "Follow every deal from enquiry to completion." },
  { icon: Search, title: "Wanted Stock Matching", desc: "Post what you need. Get matched instantly." },
  { icon: Truck, title: "Vehicle Movement Tracking", desc: "Full lifecycle from purchase to delivery." },
];

const Solution = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container relative">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            TraderOps <span className="text-primary glow-text">fixes that</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/40 card-lift hover:glow-border ${i === 4 ? "col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1" : ""}`}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider mt-24 mx-auto max-w-2xl" />
    </section>
  );
};

export default Solution;
