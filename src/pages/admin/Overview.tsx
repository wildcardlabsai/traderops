import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, Package, GitBranch, LifeBuoy, TrendingUp, AlertTriangle } from "lucide-react";

const AdminOverview = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke("admin-api", {
        body: null,
        method: "GET",
      });
      // Use URL params approach
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-api?action=analytics`,
        {
          headers: {
            authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        }
      );
      return res.json();
    },
  });

  const stats = [
    { label: "Total Dealers", value: analytics?.totalDealers ?? "—", icon: Users, color: "text-primary bg-primary/10" },
    { label: "Total Vehicles", value: analytics?.totalVehicles ?? "—", icon: Package, color: "text-accent bg-accent/10" },
    { label: "Total Deals", value: analytics?.totalDeals ?? "—", icon: GitBranch, color: "text-success bg-success/10" },
    { label: "Open Tickets", value: analytics?.openTickets ?? "—", icon: LifeBuoy, color: "text-destructive bg-destructive/10" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">Admin Overview</h1>
        <p className="font-body text-muted-foreground mt-1">Platform stats at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-5 rounded-xl bg-card border border-border">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="font-display text-3xl text-foreground">{isLoading ? "..." : stat.value}</div>
            <div className="font-body text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {analytics?.recentDealers && analytics.recentDealers.length > 0 && (
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-display text-2xl uppercase tracking-wide text-foreground">Recent Signups</h2>
          </div>
          <div className="divide-y divide-border">
            {analytics.recentDealers.map((dealer: any) => (
              <div key={dealer.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-body text-sm text-foreground font-medium">{dealer.company_name || "Unnamed"}</div>
                  <div className="font-body text-xs text-muted-foreground">{dealer.location || "No location"}</div>
                </div>
                <div className="font-body text-xs text-muted-foreground">
                  {new Date(dealer.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOverview;
