import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground text-sm">
            TO
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            TraderOps
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-body text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/app">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Log In
            </Button>
          </Link>
          <Link to="/app">
            <Button size="sm" className="gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
