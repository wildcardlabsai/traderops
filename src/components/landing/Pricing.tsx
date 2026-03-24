import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const features = [
  "Unlimited stock",
  "Unlimited deals",
  "Full trade network access",
  "Stock broadcasting",
  "Wanted board & matching",
  "Deal pipeline & tracking",
  "No setup fees",
  "Cancel anytime",
];

const faqs = [
  { q: "What happens after the trial?", a: "After your 14-day free trial, you'll be charged £50/month. No hidden fees, no surprises. Cancel anytime before the trial ends." },
  { q: "Can I cancel anytime?", a: "Absolutely. No contract, no lock-in. Cancel from your account settings and your subscription ends at the next billing date." },
  { q: "Is my data safe?", a: "Yes. Industry-standard encryption with data stored securely in the UK. We never share your stock or deal information." },
  { q: "How many users can I have?", a: "Your subscription covers your entire dealership. Add as many team members as you need at no extra cost." },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 relative bg-muted/30">
      <div className="container relative px-4">
        <div className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
          <p className="text-primary font-display font-semibold text-sm tracking-[0.15em] uppercase mb-3">Pricing</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            Simple pricing. <span className="text-gradient">No nonsense.</span>
          </h2>
        </div>

        <div className="max-w-md mx-auto mb-20">
          <div className="relative rounded-2xl border-2 border-primary/20 bg-background p-8 md:p-10 shadow-lg shadow-primary/5">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full gradient-primary text-primary-foreground text-xs font-display font-semibold tracking-wide">
              14-day free trial
            </div>
            <div className="text-center mb-8 pt-4">
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display text-6xl font-extrabold text-foreground">£50</span>
                <span className="text-muted-foreground font-body text-lg">/month</span>
              </div>
              <p className="text-muted-foreground font-body mt-2">per dealership · everything included</p>
            </div>
            <div className="space-y-3.5 mb-8">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="font-body text-foreground text-sm">{f}</span>
                </div>
              ))}
            </div>
            <Link to="/signup">
              <Button className="w-full h-13 gradient-primary text-primary-foreground font-display font-semibold text-base hover:opacity-90 transition-opacity rounded-xl">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <p className="text-center font-body text-xs text-muted-foreground mt-4">No credit card required</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-foreground text-center mb-8">Frequently asked questions</h3>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl bg-background border border-border px-6">
                <AccordionTrigger className="font-display font-semibold text-foreground text-sm hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground text-sm pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
