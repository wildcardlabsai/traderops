import { Truck, ArrowRight, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import MovementForm from "@/components/app/MovementForm";
import { format } from "date-fns";

const Movements = () => {
  const { user } = useAuth();
  const [movements, setMovements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editMovement, setEditMovement] = useState<any | null>(null);

  const fetchMovements = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("movements")
      .select("*")
      .order("scheduled_date", { ascending: false });
    if (error) toast.error("Failed to load movements");
    else setMovements(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchMovements(); }, [fetchMovements]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this movement?")) return;
    const { error } = await supabase.from("movements").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Movement deleted"); fetchMovements(); }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("movements").update({ status: newStatus }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success(`Status updated to ${newStatus}`); fetchMovements(); }
  };

  const statusOrder = ["Scheduled", "Collected", "In Transit", "Delivered"];
  const nextStatus = (current: string) => {
    const idx = statusOrder.indexOf(current);
    return idx < statusOrder.length - 1 ? statusOrder[idx + 1] : null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Movements</h1>
          <p className="font-body text-sm text-muted-foreground">
            {loading ? "Loading..." : `${movements.length} vehicle movements`}
          </p>
        </div>
        <Button
          size="sm"
          className="gradient-primary text-primary-foreground font-display font-medium shadow-lg shadow-primary/20"
          onClick={() => { setEditMovement(null); setFormOpen(true); }}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Movement
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 font-body text-muted-foreground">Loading...</div>
      ) : movements.length === 0 ? (
        <div className="text-center py-12">
          <Truck className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
          <p className="font-body text-sm text-muted-foreground">No movements yet</p>
          <p className="font-body text-xs text-muted-foreground/60 mt-1">Track vehicle collections and deliveries</p>
        </div>
      ) : (
        <div className="space-y-3">
          {movements.map((m) => {
            const next = nextStatus(m.status);
            return (
              <div key={m.id} className="rounded-xl bg-card border border-border/40 p-5 hover:border-primary/20 card-lift">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Truck className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground text-sm">{m.vehicle_name}</h3>
                      <p className="font-body text-xs text-muted-foreground">
                        {m.scheduled_date ? format(new Date(m.scheduled_date), "dd MMM yyyy") : "No date"} · {m.driver || "No driver"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-body font-medium ${
                      m.status === "Delivered" ? "bg-success/10 text-success" :
                      m.status === "In Transit" ? "bg-primary/10 text-primary" :
                      m.status === "Collected" ? "bg-accent/10 text-accent" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {m.status}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => { setEditMovement(m); setFormOpen(true); }}>
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(m.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                  <span className="flex-1 truncate">{m.from_location}</span>
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="flex-1 truncate text-right">{m.to_location}</span>
                </div>
                {next && (
                  <div className="mt-3 pt-3 border-t border-border/30">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border/50 text-xs font-body text-muted-foreground hover:text-foreground"
                      onClick={() => handleStatusChange(m.id, next)}
                    >
                      Mark as {next}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <MovementForm movement={editMovement} open={formOpen} onOpenChange={setFormOpen} onSaved={fetchMovements} />
    </div>
  );
};

export default Movements;
