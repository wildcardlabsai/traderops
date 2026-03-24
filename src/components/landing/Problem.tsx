import { X } from "lucide-react";

const problems = [
  {
    title: "Too focused on retail customers",
    desc: "Built for showrooms, not the trade. You're forced into workflows that don't match how you actually buy and sell.",
  },
  {
    title: "No way to manage trade deals properly",
    desc: "Deals get lost in spreadsheets and texts. No pipeline, no visibility, no follow-up trail.",
  },
  {
    title: "Stock sourcing is messy and manual",
    desc: "You're trawling auction sites, WhatsApp groups, and calling around to find the right vehicle.",
  },
  {
    title: "Everything happens on WhatsApp",
    desc: "Offers, negotiations, vehicle details — scattered across chat threads with no record.",
  },
];

const Problem = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container relative px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Most systems aren't built for how trade dealers{" "}
            <span className="text-accent">actually work</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-6 rounded-xl bg-card border border-border/50 hover:border-destructive/40 card-lift"
            >
              <div className="mt-0.5 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <X className="w-3.5 h-3.5 text-destructive" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{problem.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{problem.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider mt-24 mx-auto max-w-2xl" />
    </section>
  );
};

export default Problem;
