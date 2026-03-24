import { useEffect, useState, useCallback } from "react";
import { Package, GitBranch, TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";
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
    { label: "Live Stock", value: liveStock.toString(), icon: Package, accent: false },
    { label: "Active Deals", value: activeDeals.toString(), icon: GitBranch, accent: false },
    { label: "Pipeline Value", value: `£${totalRevenue.toLocaleString("en-GB")}`, icon: TrendingUp, accent: false },
    { label: "Urgent Stock", value: urgentStock.toString(), icon: AlertTriangle, accent: urgentStock > 0 },
  ];

  const recentDeals = deals.slice(0, 5);
  const formatPrice = (n: number | null) => n ? `£${n.toLocaleString("en-GB")}` : "—";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="font-body text-sm text-muted-foreground">Overview of your trade operations</p>
        </div>
        <div className="flex gap-2">
          <Link to="/app/stock">
            <Button size="sm" variant="outline" className="border-border/50 text-muted-foreground font-body">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Vehicle
            </Button>
          </Link>
          <Link to="/app/deals">
            <Button size="sm" className="gradient-primary text-primary-foreground font-display font-medium">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> New Deal
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="p-5 rounded-xl bg-card border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.accent ? "bg-accent/10" : "bg-primary/10"}`}>
                <s.icon className={`w-4 h-4 ${s.accent ? "text-accent" : "text-primary"}`} />
              </div>
            </div>
            <div className="font-display text-2xl font-bold text-foreground">{loading ? "—" : s.value}</div>
            <div className="font-body text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
        <div className="p-5 border-b border-border/50 flex items-center justify-between">
          <h2 className="font-display font-semibold text-foreground">Recent Deals</h2>
          <Link to="/app/deals" className="font-body text-xs text-primary hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 font-body text-xs text-muted-foreground font-medium">Vehicle</th>
                <th className="text-left p-4 font-body text-xs text-muted-foreground font-medium">Party</th>
                <th className="text-left p-4 font-body text-xs text-muted-foreground font-medium">Stage</th>
                <th className="text-right p-4 font-body text-xs text-muted-foreground font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center font-body text-muted-foreground">Loading...</td></tr>
              ) : recentDeals.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center font-body text-muted-foreground">No deals yet</td></tr>
              ) : recentDeals.map((d) => (
                <tr key={d.id} className="border-b border-border/30 last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 font-body text-sm text-foreground">{d.vehicle_name}</td>
                  <td className="p-4 font-body text-sm text-muted-foreground">{d.party_name}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-body font-medium ${
                      d.stage === "Agreed" ? "bg-success/10 text-success" :
                      d.stage === "Invoiced" ? "bg-primary/10 text-primary" :
                      d.stage === "Negotiating" ? "bg-accent/10 text-accent" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {d.stage}
                    </span>
                  </td>
                  <td className="p-4 font-display text-sm font-semibold text-foreground text-right">{formatPrice(d.value)}</td>
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
