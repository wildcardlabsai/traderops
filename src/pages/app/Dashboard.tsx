import { useEffect, useState, useCallback } from "react";
import { Package, GitBranch, TrendingUp, AlertTriangle, Plus, ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tables } from "@/integrations/supabase/types";

type Vehicle = Tables<"vehicles">;
type Deal = Tables<"deals">;

const Dashboard = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) return;
    const [vRes, dRes] = await Promise.all([
      supabase.from("vehicles").select("*"),
      supabase.from("deals").select("*").order("updated_at", { ascending: false }),
    ]);
    setVehicles(vRes.data || []);
    setDeals(dRes.data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const liveStock = vehicles.filter(v => v.status === "Available" || v.status === "Reserved").length;
  const activeDeals = deals.filter(d => !["Completed", "Lost"].includes(d.stage)).length;
  const urgentStock = vehicles.filter(v => v.urgent).length;
  const totalRevenue = deals
    .filter(d => ["Agreed", "Invoiced", "Completed"].includes(d.stage))
    .reduce((sum, d) => sum + (d.value || 0), 0);

  const stats = [
    { label: "Live Stock", value: liveStock.toString(), icon: Package, accent: false, link: "/app/stock" },
    { label: "Active Deals", value: activeDeals.toString(), icon: GitBranch, accent: false, link: "/app/deals" },
    { label: "Pipeline Value", value: `£${totalRevenue.toLocaleString("en-GB")}`, icon: TrendingUp, accent: false, link: "/app/deals" },
    { label: "Urgent Stock", value: urgentStock.toString(), icon: AlertTriangle, accent: urgentStock > 0, link: "/app/stock" },
  ];

  const recentDeals = deals.slice(0, 5);
  const formatPrice = (n: number | null) => n ? `£${n.toLocaleString("en-GB")}` : "—";

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{greeting()} 👋</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">Here's what's happening with your stock today.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/app/stock">
            <Button size="sm" variant="outline" className="border-border/50 text-muted-foreground font-body hover:bg-secondary/60">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Vehicle
            </Button>
          </Link>
          <Link to="/app/deals">
            <Button size="sm" className="gradient-primary text-primary-foreground font-display font-medium shadow-lg shadow-primary/20">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> New Deal
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((s, i) => (
          <Link key={i} to={s.link} className="group">
            <div className={`p-4 md:p-5 rounded-xl border card-lift ${
              s.accent
                ? "bg-accent/5 border-accent/20"
                : "bg-card border-border/40 hover:border-primary/20"
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  s.accent ? "bg-accent/10" : "bg-primary/10"
                }`}>
                  <s.icon className={`w-4 h-4 ${s.accent ? "text-accent" : "text-primary"}`} />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
              </div>
              <div className="font-display text-xl md:text-2xl font-bold text-foreground">{loading ? "—" : s.value}</div>
              <div className="font-body text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Deals */}
      <div className="rounded-xl bg-card border border-border/40 overflow-hidden">
        <div className="p-4 md:p-5 border-b border-border/40 flex items-center justify-between">
          <div>
            <h2 className="font-display font-semibold text-foreground">Recent Deals</h2>
            <p className="font-body text-xs text-muted-foreground mt-0.5">Your latest pipeline activity</p>
          </div>
          <Link to="/app/deals" className="font-body text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
            View all <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-3 md:p-4 font-body text-[11px] text-muted-foreground/70 font-medium uppercase tracking-wider">Vehicle</th>
                <th className="text-left p-3 md:p-4 font-body text-[11px] text-muted-foreground/70 font-medium uppercase tracking-wider">Party</th>
                <th className="text-left p-3 md:p-4 font-body text-[11px] text-muted-foreground/70 font-medium uppercase tracking-wider">Stage</th>
                <th className="text-right p-3 md:p-4 font-body text-[11px] text-muted-foreground/70 font-medium uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center font-body text-muted-foreground">Loading...</td></tr>
              ) : recentDeals.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-10 text-center">
                    <GitBranch className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="font-body text-sm text-muted-foreground">No deals yet</p>
                    <p className="font-body text-xs text-muted-foreground/60 mt-1">Create your first deal to see it here</p>
                  </td>
                </tr>
              ) : recentDeals.map((d) => (
                <tr key={d.id} className="border-b border-border/20 last:border-0 hover:bg-secondary/20 transition-colors">
                  <td className="p-3 md:p-4 font-body text-sm text-foreground font-medium">{d.vehicle_name}</td>
                  <td className="p-3 md:p-4 font-body text-sm text-muted-foreground">{d.party_name}</td>
                  <td className="p-3 md:p-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-body font-medium ${
                      d.stage === "Agreed" ? "bg-success/10 text-success" :
                      d.stage === "Invoiced" ? "bg-primary/10 text-primary" :
                      d.stage === "Completed" ? "bg-primary/5 text-primary/60" :
                      d.stage === "Negotiating" ? "bg-accent/10 text-accent" :
                      d.stage === "Lost" ? "bg-destructive/10 text-destructive" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {d.stage}
                    </span>
                  </td>
                  <td className="p-3 md:p-4 font-display text-sm font-semibold text-foreground text-right">{formatPrice(d.value)}</td>
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
