import { Zap, Search, FolderKanban, Brain } from "lucide-react";

const benefits = [
  { icon: Zap, title: "Move stock faster", desc: "Broadcast to your network in seconds. No more chasing buyers one by one." },
  { icon: Search, title: "Source vehicles easier", desc: "Wanted board + marketplace in one place. Find the right stock without the legwork." },
  { icon: FolderKanban, title: "Keep deals organised", desc: "Pipeline view so nothing slips through. Every deal tracked from enquiry to invoice." },
  { icon: Brain, title: "Work smarter, not harder", desc: "Less WhatsApp. More structure. Same hustle. Everything in one platform." },
];

const Benefits = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container relative px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-display font-semibold text-sm tracking-widest uppercase mb-4">Why TraderOps</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Built to help you <span className="text-primary">win more deals</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="text-center p-6 rounded-xl border border-border/30 hover:border-primary/20 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <b.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
