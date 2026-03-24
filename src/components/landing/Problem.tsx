import { X } from "lucide-react";

const problems = [
  "Too focused on retail customers",
  "No way to manage trade deals properly",
  "Stock sourcing is messy and manual",
  "Everything happens on WhatsApp",
];

const Problem = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Most systems aren't built for how trade dealers{" "}
            <span className="text-accent">actually work</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border/50 hover:border-destructive/30 transition-colors"
            >
              <div className="mt-0.5 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <X className="w-3.5 h-3.5 text-destructive" />
              </div>
              <span className="font-body text-foreground">{problem}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
