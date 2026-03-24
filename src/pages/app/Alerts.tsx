import { AlertTriangle, Clock, CheckCircle2, Bell } from "lucide-react";

const alerts = [
  { id: 1, type: "urgent", title: "Vauxhall Corsa 1.2 – 31 days in stock", desc: "Consider reducing price or broadcasting to network", time: "2 hours ago" },
  { id: 2, type: "urgent", title: "Mercedes Sprinter 314 – 45 days in stock", desc: "Longest sitting vehicle. Price drop recommended.", time: "2 hours ago" },
  { id: 3, type: "info", title: "New match on Wanted: Ford Transit Custom", desc: "3 new vehicles match your wanted post", time: "4 hours ago" },
  { id: 4, type: "info", title: "Offer received on VW Transporter", desc: "NW Fleet Sales offered £23,200", time: "6 hours ago" },
  { id: 5, type: "success", title: "Deal completed: Toyota Hilux Invincible", desc: "Invoice #1042 sent to Farm Fleet Co", time: "1 day ago" },
  { id: 6, type: "info", title: "New dealer joined network", desc: "Scottish Trade Hub (Glasgow) is now on TraderOps", time: "2 days ago" },
];

const iconMap = {
  urgent: AlertTriangle,
  info: Bell,
  success: CheckCircle2,
};

const colorMap = {
  urgent: "text-accent bg-accent/10",
  info: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
};

const Alerts = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Alerts</h1>
        <p className="font-body text-sm text-muted-foreground">Notifications and action items</p>
      </div>

      <div className="space-y-3">
        {alerts.map((a) => {
          const Icon = iconMap[a.type as keyof typeof iconMap];
          const colors = colorMap[a.type as keyof typeof colorMap];
          return (
            <div key={a.id} className="rounded-xl bg-card border border-border/50 p-5 hover:border-primary/20 transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${colors}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-foreground text-sm mb-0.5">{a.title}</h3>
                  <p className="font-body text-sm text-muted-foreground">{a.desc}</p>
                </div>
                <span className="font-body text-xs text-muted-foreground flex-shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {a.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;
