import { Package, GitBranch, TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  { label: "Live Stock", value: "47", change: "+3", up: true, icon: Package },
  { label: "Active Deals", value: "12", change: "+2", up: true, icon: GitBranch },
  { label: "Revenue (MTD)", value: "£84,200", change: "+12%", up: true, icon: TrendingUp },
  { label: "Urgent Stock", value: "5", change: "Action needed", up: false, icon: AlertTriangle },
];

const recentDeals = [
  { vehicle: "2021 Ford Transit Custom", buyer: "ABC Motors", status: "Agreed", value: "£18,500" },
  { vehicle: "2022 VW Golf 1.5 TSI", buyer: "Quick Cars Ltd", status: "Negotiating", value: "£14,200" },
  { vehicle: "2020 BMW X3 xDrive20d", buyer: "Premier Autos", status: "Invoiced", value: "£22,800" },
  { vehicle: "2023 Vauxhall Corsa 1.2", buyer: "City Motors", status: "Agreed", value: "£11,400" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="font-body text-sm text-muted-foreground">Overview of your trade operations</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="p-5 rounded-xl bg-card border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <s.icon className="w-4 h-4 text-primary" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-body ${s.up ? "text-success" : "text-accent"}`}>
                {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.change}
              </div>
            </div>
            <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
            <div className="font-body text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="font-display font-semibold text-foreground">Recent Deals</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 font-body text-xs text-muted-foreground font-medium">Vehicle</th>
                <th className="text-left p-4 font-body text-xs text-muted-foreground font-medium">Buyer</th>
                <th className="text-left p-4 font-body text-xs text-muted-foreground font-medium">Status</th>
                <th className="text-right p-4 font-body text-xs text-muted-foreground font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {recentDeals.map((d, i) => (
                <tr key={i} className="border-b border-border/30 last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 font-body text-sm text-foreground">{d.vehicle}</td>
                  <td className="p-4 font-body text-sm text-muted-foreground">{d.buyer}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-body font-medium ${
                      d.status === "Agreed" ? "bg-success/10 text-success" :
                      d.status === "Invoiced" ? "bg-primary/10 text-primary" :
                      "bg-accent/10 text-accent"
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="p-4 font-display text-sm font-semibold text-foreground text-right">{d.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
