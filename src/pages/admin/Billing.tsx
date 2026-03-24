import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

const AdminBilling = () => {
  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ["admin-billing"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  const planBreakdown = profiles.reduce((acc: Record<string, number>, p: any) => {
    const plan = p.plan_status || "trial";
    acc[plan] = (acc[plan] || 0) + 1;
    return acc;
  }, {});

  const trialExpiring = profiles.filter((p: any) => {
    if (p.plan_status !== "trial" || !p.plan_expires_at) return false;
    const daysLeft = Math.ceil((new Date(p.plan_expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 3 && daysLeft >= 0;
  });

  const planColor = (plan: string) => {
    switch (plan) {
      case "active": return "bg-success/10 text-success";
      case "trial": return "bg-accent/10 text-accent";
      case "expired": return "bg-destructive/10 text-destructive";
      case "suspended": return "bg-muted text-muted-foreground";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">Billing</h1>
        <p className="font-body text-muted-foreground mt-1">Subscription and plan overview</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(planBreakdown).map(([plan, count]) => (
          <div key={plan} className="p-5 rounded-xl bg-card border border-border text-center">
            <div className="font-display text-4xl text-foreground">{count as number}</div>
            <div className="font-body text-sm text-muted-foreground capitalize">{plan}</div>
          </div>
        ))}
      </div>

      {trialExpiring.length > 0 && (
        <div className="rounded-xl bg-accent/5 border border-accent/20 p-5">
          <h2 className="font-display text-2xl uppercase tracking-wide text-foreground mb-3">Trials Expiring Soon</h2>
          <div className="space-y-2">
            {trialExpiring.map((p: any) => {
              const daysLeft = Math.ceil((new Date(p.plan_expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              return (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                  <span className="font-body text-sm text-foreground">{p.company_name || "Unnamed"}</span>
                  <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">{daysLeft}d left</Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-display text-2xl uppercase tracking-wide text-foreground">All Dealers</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-body text-xs text-muted-foreground uppercase tracking-wider">Dealership</th>
              <th className="text-left p-4 font-body text-xs text-muted-foreground uppercase tracking-wider">Plan</th>
              <th className="text-left p-4 font-body text-xs text-muted-foreground uppercase tracking-wider hidden md:table-cell">Expires</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={3} className="p-8 text-center font-body text-muted-foreground">Loading...</td></tr>
            ) : (
              profiles.map((p: any) => (
                <tr key={p.id} className="border-b border-border/50 last:border-0">
                  <td className="p-4 font-body text-sm text-foreground">{p.company_name || "Unnamed"}</td>
                  <td className="p-4">
                    <Badge variant="secondary" className={`${planColor(p.plan_status || "trial")} text-xs`}>{p.plan_status || "trial"}</Badge>
                  </td>
                  <td className="p-4 font-body text-sm text-muted-foreground hidden md:table-cell">
                    {p.plan_expires_at ? new Date(p.plan_expires_at).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBilling;
