import { Quote } from "lucide-react";

const testimonials = [
  { name: "James H.", initials: "JH", role: "Independent Trader, Birmingham", text: "Finally something that gets how we actually work. No fluff, no retail nonsense." },
  { name: "Sarah M.", initials: "SM", role: "Fleet Buyer, Manchester", text: "The wanted board alone has saved me hours every week. Proper useful." },
  { name: "Dave K.", initials: "DK", role: "Trade Dealer, Leeds", text: "Switched from spreadsheets. Can't believe I waited this long." },
];

const SocialProof = () => {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container relative px-4">
        <div className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
          <p className="text-primary font-body font-semibold text-xs tracking-[0.2em] uppercase mb-4">Testimonials</p>
          <h2 className="font-display text-4xl md:text-6xl uppercase leading-[0.95] tracking-tight">
            Built By Dealers,{" "}
            <span className="text-gradient">For Dealers</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="p-7 rounded-2xl bg-card border border-border hover:border-primary/20 card-lift">
              <Quote className="w-8 h-8 text-primary/20 mb-5" />
              <p className="font-body text-foreground mb-6 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-base text-primary">{t.initials}</span>
                </div>
                <div>
                  <div className="font-body font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="font-body text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
