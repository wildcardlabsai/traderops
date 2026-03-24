import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${scrolled ? "border-border bg-background/80 backdrop-blur-xl shadow-sm" : "border-transparent bg-transparent"}`}>
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17v2m14-2v2" />
              <circle cx="7.5" cy="14.5" r="1.5" />
              <circle cx="16.5" cy="14.5" r="1.5" />
            </svg>
          </div>
          <span className="font-display text-2xl uppercase tracking-wider text-foreground">TraderOps</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-body text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors uppercase tracking-wider text-xs font-medium">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors uppercase tracking-wider text-xs font-medium">Pricing</a>
          <a href="#contact" className="hover:text-foreground transition-colors uppercase tracking-wider text-xs font-medium">Contact</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-display text-base uppercase tracking-wider">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="gradient-primary text-primary-foreground font-display text-base uppercase tracking-wider hover:opacity-90 transition-opacity rounded-lg px-5">
              Start Free Trial
            </Button>
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground p-2">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container px-4 py-6 space-y-4">
            <a href="#features" onClick={() => setOpen(false)} className="block font-display text-xl uppercase tracking-wider text-foreground py-2">Features</a>
            <a href="#pricing" onClick={() => setOpen(false)} className="block font-display text-xl uppercase tracking-wider text-foreground py-2">Pricing</a>
            <a href="#contact" onClick={() => setOpen(false)} className="block font-display text-xl uppercase tracking-wider text-foreground py-2">Contact</a>
            <div className="pt-4 border-t border-border space-y-3">
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full border-border text-foreground font-display text-lg uppercase tracking-wider">Log In</Button>
              </Link>
              <Link to="/signup" onClick={() => setOpen(false)}>
                <Button className="w-full gradient-primary text-primary-foreground font-display text-lg uppercase tracking-wider">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
