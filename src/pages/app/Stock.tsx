import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, AlertTriangle, Megaphone, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";
import VehicleForm from "@/components/app/VehicleForm";

type Vehicle = Tables<"vehicles">;

const Stock = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);

  const fetchVehicles = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load stock");
    } else {
      setVehicles(data || []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchVehicles(); }, [fetchVehicles]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this vehicle?")) return;
    const { error } = await supabase.from("vehicles").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Vehicle deleted"); fetchVehicles(); }
  };

  const filtered = vehicles.filter(v =>
    `${v.make} ${v.model} ${v.registration || ""}`.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (n: number | null) => n ? `£${n.toLocaleString("en-GB")}` : "—";
  const margin = (v: Vehicle) => {
    if (v.cost_price && v.asking_price) return v.asking_price - v.cost_price;
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Stock</h1>
          <p className="font-body text-sm text-muted-foreground">
            {loading ? "Loading..." : `${vehicles.length} vehicles in stock`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="gradient-primary text-primary-foreground font-display font-medium"
            onClick={() => { setEditVehicle(null); setFormOpen(true); }}
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Vehicle
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search stock..."
            className="pl-9 bg-card border-border/50 font-body"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Vehicle", "Reg", "Year", "Mileage", "Fuel", "Cost", "Asking", "Margin", "Status", ""].map(h => (
                  <th key={h} className="text-left p-4 font-body text-xs text-muted-foreground font-medium first:pl-5 last:pr-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={10} className="p-8 text-center font-body text-muted-foreground">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={10} className="p-8 text-center font-body text-muted-foreground">
                  {vehicles.length === 0 ? "No vehicles yet. Add your first vehicle to get started." : "No vehicles match your search."}
                </td></tr>
              ) : filtered.map((v) => (
                <tr key={v.id} className="border-b border-border/30 last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 pl-5">
                    <div className="flex items-center gap-2">
                      {v.urgent && <AlertTriangle className="w-3.5 h-3.5 text-accent flex-shrink-0" />}
                      <span className="font-body text-sm font-medium text-foreground">{v.make} {v.model}</span>
                    </div>
                  </td>
                  <td className="p-4 font-body text-sm text-muted-foreground">{v.registration || "—"}</td>
                  <td className="p-4 font-body text-sm text-muted-foreground">{v.year}</td>
                  <td className="p-4 font-body text-sm text-muted-foreground">{v.mileage?.toLocaleString() || "—"}</td>
                  <td className="p-4 font-body text-sm text-muted-foreground">{v.fuel_type}</td>
                  <td className="p-4 font-body text-sm text-muted-foreground">{formatPrice(v.cost_price)}</td>
                  <td className="p-4 font-display text-sm font-medium text-foreground">{formatPrice(v.asking_price)}</td>
                  <td className="p-4 font-display text-sm font-medium text-success">
                    {margin(v) !== null ? formatPrice(margin(v)) : "—"}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-body font-medium ${
                      v.status === "Available" ? "bg-success/10 text-success" :
                      v.status === "Reserved" ? "bg-primary/10 text-primary" :
                      v.status === "Sold" ? "bg-muted text-muted-foreground" :
                      "bg-accent/10 text-accent"
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="p-4 pr-5">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => { setEditVehicle(v); setFormOpen(true); }}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(v.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <VehicleForm
        vehicle={editVehicle}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSaved={fetchVehicles}
      />
    </div>
  );
};

export default Stock;
