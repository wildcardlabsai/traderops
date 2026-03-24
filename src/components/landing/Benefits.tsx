import { Zap, Search, FolderKanban, Brain } from "lucide-react";

const benefits = [
  { icon: Zap, title: "Move stock faster", desc: "Broadcast to your network in seconds." },
  { icon: Search, title: "Source vehicles easier", desc: "Wanted board + marketplace in one place." },
  { icon: FolderKanban, title: "Keep deals organised", desc: "Pipeline view so nothing slips through." },
  { icon: Brain, title: "Work smarter, not harder", desc: "Less WhatsApp. More structure. Same hustle." },
];

const Benefits = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="text-center p-6">
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
