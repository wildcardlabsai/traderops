import { X } from "lucide-react";

const problems = [
  {
    title: "Too focused on retail",
    desc: "Built for showrooms, not the trade. You're forced into workflows that don't match how you buy and sell.",
  },
  {
    title: "Deals get lost",
    desc: "Scattered across spreadsheets and texts. No pipeline, no visibility, no follow-up trail.",
  },
  {
    title: "Sourcing is manual",
    desc: "Trawling auction sites, WhatsApp groups, and calling around just to find the right vehicle.",
  },
  {
    title: "WhatsApp chaos",
    desc: "Offers, negotiations, vehicle details — all scattered across chat threads with no record.",
  },
];

const Problem = () => {
  return (
    <section className="py-20 md:py-32 relative bg-muted/40">
      <div className="container relative px-4">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="text-destructive font-body font-semibold text-xs tracking-[0.2em] uppercase mb-4">The Problem</p>
          <h2 className="font-display text-4xl md:text-6xl uppercase leading-[0.95] tracking-tight">
            Most Dealer Tools Aren't Built For How You{" "}
            <span className="text-destructive">Actually Work</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 md:p-6 rounded-xl bg-background border border-border hover:border-destructive/30 card-lift"
            >
              <div className="mt-0.5 w-8 h-8 rounded-lg bg-destructive/8 flex items-center justify-center flex-shrink-0">
                <X className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-foreground mb-1.5">{problem.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{problem.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
