import { Package, Users, GitBranch, Search, Truck } from "lucide-react";

const features = [
  { icon: Package, title: "Stock Management", desc: "Track every vehicle with pricing, margins, and status in one place." },
  { icon: Users, title: "Dealer Network", desc: "Connect directly with trusted buyers and suppliers." },
  { icon: GitBranch, title: "Deal Pipeline", desc: "Follow every deal from enquiry to completion." },
  { icon: Search, title: "Wanted Matching", desc: "Post what you need. Get matched instantly." },
  { icon: Truck, title: "Movement Tracking", desc: "Full lifecycle from purchase to delivery." },
];

const Solution = () => {
  return (
    <section id="features" className="py-20 md:py-32 relative">
      <div className="container relative px-4">
        <div className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
          <p className="text-primary font-display font-semibold text-sm tracking-[0.15em] uppercase mb-3">The solution</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            One platform. <span className="text-gradient">Everything you need.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group p-7 rounded-2xl bg-card border border-border hover:border-primary/30 card-lift ${
                i >= 3 ? "sm:col-span-1 lg:col-span-1" : ""
              } ${i === 3 ? "lg:translate-x-[50%]" : ""} ${i === 4 ? "lg:translate-x-[50%]" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg mb-2">{f.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;
