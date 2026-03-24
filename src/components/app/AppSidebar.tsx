import {
  LayoutDashboard, Package, ShoppingBag, Search, GitBranch,
  Users, Truck, FileText, Bell, LogOut, Settings, ChevronRight
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard },
  { title: "Stock", url: "/app/stock", icon: Package },
  { title: "Deals", url: "/app/deals", icon: GitBranch },
  { title: "Contacts", url: "/app/contacts", icon: Users },
];

const tradeItems = [
  { title: "Marketplace", url: "/app/marketplace", icon: ShoppingBag },
  { title: "Wanted", url: "/app/wanted", icon: Search },
];

const manageItems = [
  { title: "Movements", url: "/app/movements", icon: Truck },
  { title: "Documents", url: "/app/documents", icon: FileText },
  { title: "Alerts", url: "/app/alerts", icon: Bell },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const { signOut, user } = useAuth();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const initials = user?.user_metadata?.company_name
    ? user.user_metadata.company_name.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || "TO";

  const companyName = user?.user_metadata?.company_name || user?.email?.split("@")[0] || "TraderOps";

  const renderGroup = (label: string, items: typeof mainItems) => (
    <SidebarGroup>
      {!collapsed && (
        <SidebarGroupLabel className="font-body text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 px-3 mb-1">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = item.url === "/app"
              ? location.pathname === "/app"
              : location.pathname.startsWith(item.url);
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.url}
                    end={item.url === "/app"}
                    className={`group/link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-body transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 text-primary font-medium border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}
                    activeClassName=""
                  >
                    <item.icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover/link:text-foreground"}`} />
                    {!collapsed && <span>{item.title}</span>}
                    {!collapsed && isActive && <ChevronRight className="w-3 h-3 ml-auto text-primary/50" />}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-border/40">
      {/* Logo header */}
      <div className="h-14 flex items-center px-4 border-b border-border/40">
        <Link to="/app" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground text-xs flex-shrink-0 shadow-lg shadow-primary/20">
            TO
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-display font-bold text-foreground text-sm leading-tight">TraderOps</span>
              <span className="font-body text-[10px] text-muted-foreground/60 leading-tight">Trade Platform</span>
            </div>
          )}
        </Link>
      </div>

      <SidebarContent className="py-3 px-1.5">
        {renderGroup("Overview", mainItems)}
        {renderGroup("Trade Network", tradeItems)}
        {renderGroup("Manage", manageItems)}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-2 space-y-1">
        <Link
          to="/app/settings"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors text-sm font-body"
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors text-sm font-body"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>

        {/* User card */}
        {!collapsed && (
          <div className="mt-2 mx-1 p-3 rounded-lg bg-secondary/40 border border-border/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-[10px] font-display font-bold text-primary-foreground flex-shrink-0 shadow-md shadow-primary/20">
                {initials}
              </div>
              <div className="min-w-0">
                <div className="font-display text-xs font-semibold text-foreground truncate">{companyName}</div>
                <div className="font-body text-[10px] text-muted-foreground truncate">{user?.email}</div>
              </div>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
