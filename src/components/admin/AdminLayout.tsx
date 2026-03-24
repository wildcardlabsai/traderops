import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  BarChart3,
  Megaphone,
  LifeBuoy,
  CreditCard,
  Settings,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, path: "/admin" },
  { label: "Dealers", icon: Users, path: "/admin/dealers" },
  { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { label: "Announcements", icon: Megaphone, path: "/admin/announcements" },
  { label: "Support Tickets", icon: LifeBuoy, path: "/admin/support" },
  { label: "Billing", icon: CreditCard, path: "/admin/billing" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17v2m14-2v2" />
                <circle cx="7.5" cy="14.5" r="1.5" />
                <circle cx="16.5" cy="14.5" r="1.5" />
              </svg>
            </div>
            <div>
              <span className="font-display text-xl uppercase tracking-wider text-foreground block leading-tight">TraderOps</span>
              <span className="font-body text-[10px] text-primary uppercase tracking-widest">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-2">
          <Link to="/app">
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground font-body text-sm gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to App
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive font-body text-sm gap-2" onClick={signOut}>
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
          <div className="px-3 py-2 rounded-lg bg-secondary/40 border border-border/30">
            <div className="font-body text-xs text-foreground font-medium truncate">{user?.email}</div>
            <div className="font-body text-[10px] text-muted-foreground">Administrator</div>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
