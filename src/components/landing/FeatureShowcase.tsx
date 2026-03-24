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
    miniUI: (
      <div className="mt-6 space-y-2">
        {[
          { name: "Ford Transit", margin: "£2,000", days: "12d", w: "65%" },
          { name: "VW Golf", margin: "£1,700", days: "8d", w: "45%" },
          { name: "BMW X3", margin: "£3,000", days: "5d", w: "82%" },
        ].map((row) => (
          <div key={row.name} className="flex items-center gap-3 text-xs font-body">
            <span className="text-muted-foreground w-20 truncate">{row.name}</span>
            <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full bg-primary/60" style={{ width: row.w }} />
            </div>
            <span className="text-foreground font-medium w-14 text-right">{row.margin}</span>
            <span className="text-muted-foreground w-8 text-right">{row.days}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: GitBranch,
    title: "Deal Pipeline",
    desc: "Track every negotiation from first contact to handshake.",
    stats: [
      { label: "Active Deals", value: "12" },
      { label: "This Week", value: "£34k" },
    ],
    miniUI: (
      <div className="mt-6 flex gap-1.5">
        {[
          { label: "Enquiry", count: 1, color: "bg-muted-foreground" },
          { label: "Negotiating", count: 2, color: "bg-accent" },
          { label: "Agreed", count: 3, color: "bg-primary" },
          { label: "Invoiced", count: 1, color: "bg-success" },
        ].map((stage) => (
          <div key={stage.label} className="flex-1 text-center">
            <div className={`h-1.5 rounded-full ${stage.color} mb-1.5`} />
            <span className="text-[10px] font-body text-muted-foreground">{stage.label}</span>
            <div className="font-display text-xs font-bold text-foreground">{stage.count}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    desc: "Browse and list vehicles exclusively for the trade.",
    stats: [
      { label: "Listed", value: "230+" },
      { label: "Avg Response", value: "< 2hrs" },
    ],
    miniUI: (
      <div className="mt-6 space-y-2">
        {["Ford Ranger Wildtrak", "VW Transporter T6.1", "Audi A3 Sportback"].map((v) => (
          <div key={v} className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-secondary/50 text-xs font-body">
            <span className="text-foreground">{v}</span>
            <span className="text-primary font-medium">View</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Megaphone,
    title: "Wanted Board",
    desc: "Post what you're after. Let the network find it for you.",
    stats: [
      { label: "Active Posts", value: "85" },
      { label: "Match Rate", value: "73%" },
    ],
    miniUI: (
      <div className="mt-6 space-y-2">
        {[
          { v: "Transit Custom 2020+", matches: 3 },
          { v: "Golf Mk8 1.5 TSI", matches: 1 },
        ].map((p) => (
          <div key={p.v} className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-secondary/50 text-xs font-body">
            <span className="text-foreground">{p.v}</span>
            <span className="text-success font-medium">{p.matches} matches</span>
          </div>
        ))}
      </div>
    ),
  },
];

const FeatureShowcase = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container relative px-4">
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
              className={`group p-8 rounded-2xl border border-border/50 hover:border-primary/30 card-lift ${i % 2 === 1 ? "bg-card" : "bg-gradient-to-br from-card to-secondary/30"}`}
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
              {item.miniUI}
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider mt-24 mx-auto max-w-2xl" />
    </section>
  );
};

export default FeatureShowcase;
