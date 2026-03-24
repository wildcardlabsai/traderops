import { Quote } from "lucide-react";

const testimonials = [
  { name: "James H.", role: "Independent Trader, Birmingham", text: "Finally something that gets how we actually work. No fluff, no retail nonsense." },
  { name: "Sarah M.", role: "Fleet Buyer, Manchester", text: "The wanted board alone has saved me hours every week. Proper useful." },
  { name: "Dave K.", role: "Trade Dealer, Leeds", text: "Switched from spreadsheets. Can't believe I waited this long." },
];

const SocialProof = () => {
  return (
    <section className="py-24 relative">
      <div className="container relative">
        <div className="text-center mb-16">
          <p className="text-primary font-display font-semibold text-sm tracking-widest uppercase mb-4">Social Proof</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Built by dealers, <span className="text-primary">for dealers</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 rounded-xl bg-card border border-border/50">
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="font-body text-foreground mb-6 leading-relaxed">"{t.text}"</p>
              <div>
                <div className="font-display font-semibold text-foreground text-sm">{t.name}</div>
                <div className="font-body text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
