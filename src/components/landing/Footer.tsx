import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground text-xs">
              TO
            </div>
            <span className="font-display font-bold text-foreground">TraderOps</span>
          </div>
          <div className="flex items-center gap-6 font-body text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="mailto:hello@traderops.co.uk" className="hover:text-foreground transition-colors">Contact</a>
            <Link to="/app" className="hover:text-foreground transition-colors">Log In</Link>
          </div>
          <div className="font-body text-xs text-muted-foreground">
            © 2026 TraderOps. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
