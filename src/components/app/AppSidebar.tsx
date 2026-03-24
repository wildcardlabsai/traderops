import {
  LayoutDashboard, Package, ShoppingBag, Search, GitBranch,
  Users, Truck, FileText, Bell, LogOut
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard },
  { title: "Stock", url: "/app/stock", icon: Package },
  { title: "Marketplace", url: "/app/marketplace", icon: ShoppingBag },
  { title: "Wanted", url: "/app/wanted", icon: Search },
  { title: "Deals", url: "/app/deals", icon: GitBranch },
  { title: "Contacts", url: "/app/contacts", icon: Users },
  { title: "Movements", url: "/app/movements", icon: Truck },
  { title: "Documents", url: "/app/documents", icon: FileText },
  { title: "Alerts", url: "/app/alerts", icon: Bell },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <div className="h-14 flex items-center px-4 border-b border-border/50">
        <Link to="/app" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground text-xs flex-shrink-0">
            TO
          </div>
          {!collapsed && <span className="font-display font-bold text-foreground text-sm">TraderOps</span>}
        </Link>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/app"}
                      className="text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                      {!collapsed && <span className="font-body text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50 p-2">
        <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="font-body text-sm">Back to Site</span>}
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
