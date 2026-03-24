import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-14 md:py-16">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground text-xs">
                TO
              </div>
              <span className="font-display font-bold text-foreground text-lg">TraderOps</span>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              The platform built for trade-only car dealers. Move stock faster, source smarter.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-5">Product</h4>
            <ul className="space-y-3 font-body text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><Link to="/signup" className="hover:text-foreground transition-colors">Free Trial</Link></li>
              <li><Link to="/login" className="hover:text-foreground transition-colors">Log In</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-5">Company</h4>
            <ul className="space-y-3 font-body text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="mailto:hello@traderops.co.uk" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-5">Legal</h4>
            <ul className="space-y-3 font-body text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-body text-xs text-muted-foreground">
            © 2026 TraderOps. All rights reserved.
          </div>
          <div className="font-body text-xs text-muted-foreground">
            hello@traderops.co.uk
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
