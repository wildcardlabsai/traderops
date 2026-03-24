import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";
import DealForm from "@/components/app/DealForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Deal = Tables<"deals">;

const stageConfig = [
  { name: "Enquiry", color: "bg-muted-foreground" },
  { name: "Negotiating", color: "bg-accent" },
  { name: "Agreed", color: "bg-primary" },
  { name: "Invoiced", color: "bg-success" },
];

const Deals = () => {
  const { user } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editDeal, setEditDeal] = useState<Deal | null>(null);

  const fetchDeals = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load deals");
    else setDeals(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchDeals(); }, [fetchDeals]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this deal?")) return;
    const { error } = await supabase.from("deals").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deal deleted"); fetchDeals(); }
  };

  const handleStageChange = async (dealId: string, newStage: string) => {
    const { error } = await supabase.from("deals").update({ stage: newStage }).eq("id", dealId);
    if (error) toast.error(error.message);
    else fetchDeals();
  };

  const formatPrice = (n: number | null) => n ? `£${n.toLocaleString("en-GB")}` : "—";

  const stageTotal = (stageName: string) => {
    return deals
      .filter(d => d.stage === stageName)
      .reduce((sum, d) => sum + (d.value || 0), 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Deal Pipeline</h1>
          <p className="font-body text-sm text-muted-foreground">
            {loading ? "Loading..." : `${deals.length} active deals`}
          </p>
        </div>
        <Button
          size="sm"
          className="gradient-primary text-primary-foreground font-display font-medium"
          onClick={() => { setEditDeal(null); setFormOpen(true); }}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" /> New Deal
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 font-body text-muted-foreground">Loading...</div>
      ) : deals.length === 0 ? (
        <div className="text-center py-12 font-body text-muted-foreground">
          No deals yet. Create your first deal to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stageConfig.map((stage) => {
            const stageDeals = deals.filter(d => d.stage === stage.name);
            return (
              <div key={stage.name} className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                    <span className="font-display text-sm font-semibold text-foreground">{stage.name}</span>
                    <span className="font-body text-xs text-muted-foreground">({stageDeals.length})</span>
                  </div>
                  <span className="font-display text-xs font-medium text-muted-foreground">
                    {formatPrice(stageTotal(stage.name))}
                  </span>
                </div>
                <div className="space-y-2">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} className="p-4 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-all">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-body text-sm font-medium text-foreground flex-1">{deal.vehicle_name}</h4>
                        <div className="flex items-center gap-0.5 ml-2">
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={() => { setEditDeal(deal); setFormOpen(true); }}>
                            <Pencil className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(deal.id)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="font-body text-xs text-muted-foreground mb-2">{deal.party_name}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm font-bold text-foreground">{formatPrice(deal.value)}</span>
                        <Select value={deal.stage} onValueChange={v => handleStageChange(deal.id, v)}>
                          <SelectTrigger className="h-6 w-auto text-xs bg-transparent border-none font-body text-primary p-0 gap-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {["Enquiry", "Negotiating", "Agreed", "Invoiced", "Completed", "Lost"].map(s => (
                              <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <DealForm
        deal={editDeal}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSaved={fetchDeals}
      />
    </div>
  );
};

export default Deals;
