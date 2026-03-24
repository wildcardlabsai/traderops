import { Zap, Search, FolderKanban, Brain } from "lucide-react";

const benefits = [
  { icon: Zap, title: "Move stock faster", desc: "Broadcast to your network in seconds. No more chasing buyers one by one.", color: "bg-accent/10 text-accent" },
  { icon: Search, title: "Source vehicles easier", desc: "Wanted board + marketplace in one place. Find the right stock without the legwork.", color: "bg-primary/10 text-primary" },
  { icon: FolderKanban, title: "Keep deals organised", desc: "Pipeline view so nothing slips through. Every deal tracked from enquiry to invoice.", color: "bg-success/10 text-success" },
  { icon: Brain, title: "Work smarter", desc: "Less WhatsApp. More structure. Same hustle. Everything in one platform.", color: "bg-primary/10 text-primary" },
];

const Benefits = () => {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container relative px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            {/* Left: heading */}
            <div className="lg:col-span-2 lg:sticky lg:top-32">
              <p className="text-primary font-display font-semibold text-sm tracking-[0.15em] uppercase mb-3">Why TraderOps</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4">
                Built to help you <span className="text-gradient">win more deals</span>
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                Stop juggling spreadsheets, WhatsApp, and auction sites. Everything in one place.
              </p>
            </div>

            {/* Right: benefits grid */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
              {benefits.map((b, i) => (
                <div key={i} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/20 card-lift">
                  <div className={`w-12 h-12 rounded-xl ${b.color} flex items-center justify-center mb-5`}>
                    <b.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
