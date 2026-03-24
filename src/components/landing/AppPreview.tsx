import { Package, GitBranch, TrendingUp, AlertTriangle, ArrowUpRight, Plus, LayoutDashboard, ShoppingBag, Search, Users, Truck, FileText, Bell, Settings } from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Stock", icon: Package, active: false },
  { label: "Deals", icon: GitBranch, active: false },
  { label: "Contacts", icon: Users, active: false },
];

const tradeItems = [
  { label: "Marketplace", icon: ShoppingBag },
  { label: "Wanted", icon: Search },
];

const manageItems = [
  { label: "Movements", icon: Truck },
  { label: "Documents", icon: FileText },
  { label: "Alerts", icon: Bell },
];

const stats = [
  { label: "Live Stock", value: "47", icon: Package, accent: false },
  { label: "Active Deals", value: "12", icon: GitBranch, accent: false },
  { label: "Pipeline Value", value: "£34,200", icon: TrendingUp, accent: false },
  { label: "Urgent Stock", value: "3", icon: AlertTriangle, accent: true },
];

const recentDeals = [
  { vehicle: "Ford Transit Custom", party: "Phoenix Motors", stage: "Agreed", stageClass: "bg-success/10 text-success", value: "£18,500" },
  { vehicle: "VW Golf GTI", party: "Greenfield Autos", stage: "Negotiating", stageClass: "bg-accent/10 text-accent", value: "£14,200" },
  { vehicle: "BMW 3 Series", party: "Apex Car Group", stage: "Invoiced", stageClass: "bg-primary/10 text-primary", value: "£22,750" },
  { vehicle: "Audi A4 Avant", party: "Summit Trade Sales", stage: "Enquiry", stageClass: "bg-muted text-muted-foreground", value: "£16,800" },
  { vehicle: "Mercedes Sprinter", party: "Hartwell Motors", stage: "Agreed", stageClass: "bg-success/10 text-success", value: "£28,400" },
];

const AppPreview = () => {
  return (
    <div className="w-full max-w-[1100px] mx-auto">
      {/* Browser chrome */}
      <div className="rounded-xl md:rounded-2xl border border-border/60 bg-card shadow-2xl shadow-foreground/[0.06] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/60 border-b border-border/40">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 rounded-md bg-background/80 border border-border/30 text-[10px] font-body text-muted-foreground/70">
              traderops.app/dashboard
            </div>
          </div>
          <div className="w-[52px]" />
        </div>

        {/* App content */}
        <div className="flex min-h-[340px] md:min-h-[420px]">
          {/* Sidebar */}
          <div className="hidden md:flex flex-col w-[180px] bg-[hsl(var(--sidebar-background))] border-r border-border/40 py-3 px-2 flex-shrink-0">
            {/* Logo */}
            <div className="flex items-center gap-2 px-2 mb-4">
              <div className="h-6 w-6 rounded-md gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground text-[8px] shadow-md shadow-primary/20">
                TO
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-foreground text-[10px] leading-tight">TraderOps</span>
                <span className="font-body text-[7px] text-muted-foreground/60 leading-tight">Trade Platform</span>
              </div>
            </div>

            {/* Nav groups */}
            <div className="space-y-3">
              <NavGroup label="Overview" items={sidebarItems} />
              <NavGroup label="Trade Network" items={tradeItems} />
              <NavGroup label="Manage" items={manageItems} />
            </div>

            {/* Footer */}
            <div className="mt-auto pt-3 border-t border-border/30 px-1">
              <div className="flex items-center gap-1.5 px-2 py-1 text-muted-foreground">
                <Settings className="w-3 h-3" />
                <span className="text-[9px] font-body">Settings</span>
              </div>
              <div className="mt-2 p-2 rounded-md bg-secondary/40 border border-border/20">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center text-[6px] font-display font-bold text-primary-foreground">
                    PM
                  </div>
                  <div>
                    <div className="font-display text-[8px] font-semibold text-foreground">Phoenix Motors</div>
                    <div className="font-body text-[7px] text-muted-foreground">john@phoenix.co.uk</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 md:p-5 bg-background overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-sm md:text-base font-bold text-foreground">Good morning 👋</h2>
                <p className="font-body text-[9px] md:text-[10px] text-muted-foreground mt-0.5">Here's what's happening with your stock today.</p>
              </div>
              <div className="hidden sm:flex gap-1.5">
                <div className="flex items-center gap-1 px-2 py-1 rounded-md border border-border/50 text-muted-foreground text-[9px] font-body">
                  <Plus className="w-2.5 h-2.5" /> Add Vehicle
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-md gradient-primary text-primary-foreground text-[9px] font-display font-medium shadow-md shadow-primary/20">
                  <Plus className="w-2.5 h-2.5" /> New Deal
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
              {stats.map((s, i) => (
                <div key={i} className={`p-2.5 md:p-3 rounded-lg border ${
                  s.accent ? "bg-accent/5 border-accent/20" : "bg-card border-border/40"
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-md flex items-center justify-center ${
                      s.accent ? "bg-accent/10" : "bg-primary/10"
                    }`}>
                      <s.icon className={`w-2.5 h-2.5 md:w-3 md:h-3 ${s.accent ? "text-accent" : "text-primary"}`} />
                    </div>
                    <ArrowUpRight className="w-2.5 h-2.5 text-muted-foreground/30" />
                  </div>
                  <div className="font-display text-sm md:text-base font-bold text-foreground">{s.value}</div>
                  <div className="font-body text-[8px] md:text-[9px] text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Deals table */}
            <div className="rounded-lg bg-card border border-border/40 overflow-hidden">
              <div className="p-2.5 md:p-3 border-b border-border/40 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold text-foreground text-[11px] md:text-xs">Recent Deals</h3>
                  <p className="font-body text-[8px] text-muted-foreground">Your latest pipeline activity</p>
                </div>
                <span className="font-body text-[8px] text-primary flex items-center gap-0.5">View all <ArrowUpRight className="w-2 h-2" /></span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left p-2 md:p-2.5 font-body text-[8px] md:text-[9px] text-muted-foreground/70 font-medium uppercase tracking-wider">Vehicle</th>
                    <th className="text-left p-2 md:p-2.5 font-body text-[8px] md:text-[9px] text-muted-foreground/70 font-medium uppercase tracking-wider hidden sm:table-cell">Party</th>
                    <th className="text-left p-2 md:p-2.5 font-body text-[8px] md:text-[9px] text-muted-foreground/70 font-medium uppercase tracking-wider">Stage</th>
                    <th className="text-right p-2 md:p-2.5 font-body text-[8px] md:text-[9px] text-muted-foreground/70 font-medium uppercase tracking-wider">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDeals.map((d, i) => (
                    <tr key={i} className="border-b border-border/20 last:border-0">
                      <td className="p-2 md:p-2.5 font-body text-[10px] md:text-[11px] text-foreground font-medium">{d.vehicle}</td>
                      <td className="p-2 md:p-2.5 font-body text-[10px] md:text-[11px] text-muted-foreground hidden sm:table-cell">{d.party}</td>
                      <td className="p-2 md:p-2.5">
                        <span className={`inline-flex px-1.5 py-0.5 rounded-full text-[8px] md:text-[9px] font-body font-medium ${d.stageClass}`}>
                          {d.stage}
                        </span>
                      </td>
                      <td className="p-2 md:p-2.5 font-display text-[10px] md:text-[11px] font-semibold text-foreground text-right">{d.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavGroup = ({ label, items }: { label: string; items: { label: string; icon: any; active?: boolean }[] }) => (
  <div>
    <div className="font-body text-[7px] uppercase tracking-[0.15em] text-muted-foreground/50 px-2 mb-1">{label}</div>
    {items.map((item) => (
      <div
        key={item.label}
        className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[9px] font-body mb-0.5 ${
          item.active
            ? "bg-primary/10 text-primary font-medium border border-primary/20"
            : "text-muted-foreground"
        }`}
      >
        <item.icon className={`w-3 h-3 ${item.active ? "text-primary" : "text-muted-foreground"}`} />
        <span>{item.label}</span>
      </div>
    ))}
  </div>
);

export default AppPreview;
