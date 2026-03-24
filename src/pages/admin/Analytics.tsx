import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, Package, GitBranch, TrendingUp } from "lucide-react";

const AdminAnalytics = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["admin-analytics-detail"],
    queryFn: async () => {
      const session = (await supabase.auth.getSession()).data.session;
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-api?action=analytics`,
        {
          headers: {
            authorization: `Bearer ${session?.access_token}`,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        }
      );
      return res.json();
    },
  });

  // Fetch plan breakdown
  const { data: profiles = [] } = useQuery({
    queryKey: ["admin-profiles-breakdown"],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("plan_status");
      return data || [];
    },
  });

  const planBreakdown = profiles.reduce((acc: Record<string, number>, p: any) => {
    const plan = p.plan_status || "trial";
    acc[plan] = (acc[plan] || 0) + 1;
    return acc;
  }, {});

  const stats = [
    { label: "Total Dealers", value: analytics?.totalDealers ?? 0, icon: Users },
    { label: "Total Vehicles", value: analytics?.totalVehicles ?? 0, icon: Package },
    { label: "Total Deals", value: analytics?.totalDeals ?? 0, icon: GitBranch },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">Analytics</h1>
        <p className="font-body text-muted-foreground mt-1">Platform performance overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-5 rounded-xl bg-card border border-border">
            <stat.icon className="w-5 h-5 text-primary mb-3" />
            <div className="font-display text-4xl text-foreground">{isLoading ? "..." : stat.value}</div>
            <div className="font-body text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-card border border-border p-6">
        <h2 className="font-display text-2xl uppercase tracking-wide text-foreground mb-4">Plan Breakdown</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(planBreakdown).map(([plan, count]) => (
            <div key={plan} className="p-4 rounded-lg bg-secondary/40 border border-border/30 text-center">
              <div className="font-display text-3xl text-foreground">{count as number}</div>
              <div className="font-body text-sm text-muted-foreground capitalize">{plan}</div>
            </div>
          ))}
          {Object.keys(planBreakdown).length === 0 && (
            <div className="col-span-4 font-body text-sm text-muted-foreground text-center py-4">No data yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
