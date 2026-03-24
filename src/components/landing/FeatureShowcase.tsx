import { BarChart3, GitBranch, ShoppingBag, Megaphone } from "lucide-react";

const showcases = [
  {
    icon: BarChart3,
    title: "Stock Dashboard",
    desc: "Real-time view of your entire inventory with margins, age, and status.",
    stats: [
      { label: "Live Vehicles", value: "47" },
      { label: "Avg Margin", value: "£1,850" },
    ],
  },
  {
    icon: GitBranch,
    title: "Deal Pipeline",
    desc: "Track every negotiation from first contact to handshake.",
    stats: [
      { label: "Active Deals", value: "12" },
      { label: "This Week", value: "£34k" },
    ],
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    desc: "Browse and list vehicles exclusively for the trade.",
    stats: [
      { label: "Listed", value: "230+" },
      { label: "Avg Response", value: "< 2hrs" },
    ],
  },
  {
    icon: Megaphone,
    title: "Wanted Board",
    desc: "Post what you're after. Let the network find it for you.",
    stats: [
      { label: "Active Posts", value: "85" },
      { label: "Match Rate", value: "73%" },
    ],
  },
];

const FeatureShowcase = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container relative">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Everything you need,{" "}
            <span className="text-primary">nothing you don't</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {showcases.map((item, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex gap-4">
                  {item.stats.map((s, j) => (
                    <div key={j} className="text-right">
                      <div className="font-display text-xl font-bold text-foreground">{s.value}</div>
                      <div className="text-xs text-muted-foreground font-body">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="font-body text-muted-foreground">{item.desc}</p>
              {/* Fake UI preview bar */}
              <div className="mt-6 flex gap-2">
                {[...Array(5)].map((_, k) => (
                  <div key={k} className="h-8 rounded-md bg-secondary flex-1" style={{ opacity: 1 - k * 0.15 }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
