import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app/AppSidebar";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const AppLayout = () => {
  const { user } = useAuth();
  const initials = user?.user_metadata?.company_name
    ? user.user_metadata.company_name.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || "TO";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border/40 px-4 bg-card/30 backdrop-blur-md sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="hidden sm:block h-5 w-px bg-border/50" />
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/40 border border-border/30 text-muted-foreground text-xs font-body cursor-pointer hover:bg-secondary/60 transition-colors">
                <Search className="w-3.5 h-3.5" />
                <span>Search...</span>
                <kbd className="ml-4 px-1.5 py-0.5 rounded bg-background/60 border border-border/50 text-[10px] font-mono text-muted-foreground/60">⌘K</kbd>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative h-9 w-9">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent ring-2 ring-card" />
              </Button>
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-display font-bold text-primary-foreground shadow-md shadow-primary/20">
                {initials}
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
