import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";

type Vehicle = Tables<"vehicles">;

interface VehicleFormProps {
  vehicle?: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

const VehicleForm = ({ vehicle, open, onOpenChange, onSaved }: VehicleFormProps) => {
  const { user } = useAuth();
  const isEdit = !!vehicle;

  const [form, setForm] = useState({
    make: vehicle?.make || "",
    model: vehicle?.model || "",
    year: vehicle?.year?.toString() || new Date().getFullYear().toString(),
    registration: vehicle?.registration || "",
    mileage: vehicle?.mileage?.toString() || "",
    fuel_type: vehicle?.fuel_type || "Diesel",
    transmission: vehicle?.transmission || "Manual",
    colour: vehicle?.colour || "",
    cost_price: vehicle?.cost_price?.toString() || "",
    asking_price: vehicle?.asking_price?.toString() || "",
    status: vehicle?.status || "Available",
    urgent: vehicle?.urgent || false,
    notes: vehicle?.notes || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const data = {
      user_id: user.id,
      make: form.make,
      model: form.model,
      year: parseInt(form.year),
      registration: form.registration || null,
      mileage: form.mileage ? parseInt(form.mileage) : null,
      fuel_type: form.fuel_type,
      transmission: form.transmission,
      colour: form.colour || null,
      cost_price: form.cost_price ? parseFloat(form.cost_price) : null,
      asking_price: form.asking_price ? parseFloat(form.asking_price) : null,
      status: form.status,
      urgent: form.urgent,
      notes: form.notes || null,
    };

    const { error } = isEdit
      ? await supabase.from("vehicles").update(data).eq("id", vehicle.id)
      : await supabase.from("vehicles").insert(data);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(isEdit ? "Vehicle updated" : "Vehicle added");
      onOpenChange(false);
      onSaved();
    }
    setLoading(false);
  };

  const set = (key: string, value: string | boolean) => setForm(f => ({ ...f, [key]: value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            {isEdit ? "Edit Vehicle" : "Add Vehicle"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Make *</Label>
              <Input value={form.make} onChange={e => set("make", e.target.value)} placeholder="e.g. Ford" className="bg-background border-border/50 font-body" required />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Model *</Label>
              <Input value={form.model} onChange={e => set("model", e.target.value)} placeholder="e.g. Transit Custom" className="bg-background border-border/50 font-body" required />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Year *</Label>
              <Input type="number" value={form.year} onChange={e => set("year", e.target.value)} className="bg-background border-border/50 font-body" required />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Registration</Label>
              <Input value={form.registration} onChange={e => set("registration", e.target.value)} placeholder="AB12 CDE" className="bg-background border-border/50 font-body" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Mileage</Label>
              <Input type="number" value={form.mileage} onChange={e => set("mileage", e.target.value)} placeholder="e.g. 34200" className="bg-background border-border/50 font-body" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Fuel Type</Label>
              <Select value={form.fuel_type} onValueChange={v => set("fuel_type", v)}>
                <SelectTrigger className="bg-background border-border/50 font-body"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Diesel", "Petrol", "Hybrid", "Electric"].map(f => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Transmission</Label>
              <Select value={form.transmission} onValueChange={v => set("transmission", v)}>
                <SelectTrigger className="bg-background border-border/50 font-body"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Manual", "Automatic"].map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Colour</Label>
              <Input value={form.colour} onChange={e => set("colour", e.target.value)} placeholder="e.g. White" className="bg-background border-border/50 font-body" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Cost Price (£)</Label>
              <Input type="number" step="0.01" value={form.cost_price} onChange={e => set("cost_price", e.target.value)} placeholder="e.g. 16500" className="bg-background border-border/50 font-body" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Asking Price (£)</Label>
              <Input type="number" step="0.01" value={form.asking_price} onChange={e => set("asking_price", e.target.value)} placeholder="e.g. 18500" className="bg-background border-border/50 font-body" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Status</Label>
              <Select value={form.status} onValueChange={v => set("status", v)}>
                <SelectTrigger className="bg-background border-border/50 font-body"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Available", "Reserved", "Sold", "In Transit"].map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Urgent</Label>
              <div className="flex items-center gap-2 h-9">
                <Switch checked={form.urgent} onCheckedChange={v => set("urgent", v)} />
                <span className="font-body text-sm text-muted-foreground">{form.urgent ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="font-body text-xs text-muted-foreground">Notes</Label>
            <Textarea value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Any additional notes..." className="bg-background border-border/50 font-body resize-none" rows={2} />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 border-border/50" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="flex-1 gradient-primary text-primary-foreground font-display font-medium" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update Vehicle" : "Add Vehicle"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleForm;
