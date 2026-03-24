import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface MovementFormProps {
  movement: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

const MovementForm = ({ movement, open, onOpenChange, onSaved }: MovementFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    vehicle_name: "",
    from_location: "",
    to_location: "",
    status: "Scheduled",
    scheduled_date: "",
    driver: "",
    notes: "",
  });

  useEffect(() => {
    if (movement) {
      setForm({
        vehicle_name: movement.vehicle_name,
        from_location: movement.from_location,
        to_location: movement.to_location,
        status: movement.status,
        scheduled_date: movement.scheduled_date || "",
        driver: movement.driver || "",
        notes: movement.notes || "",
      });
    } else {
      setForm({ vehicle_name: "", from_location: "", to_location: "", status: "Scheduled", scheduled_date: "", driver: "", notes: "" });
    }
  }, [movement, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const payload = {
      ...form,
      user_id: user.id,
      scheduled_date: form.scheduled_date || null,
    };

    const { error } = movement
      ? await supabase.from("movements").update(payload).eq("id", movement.id)
      : await supabase.from("movements").insert(payload);

    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(movement ? "Movement updated" : "Movement created");
      onOpenChange(false);
      onSaved();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">{movement ? "Edit Movement" : "Add Movement"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="font-body text-xs text-muted-foreground">Vehicle *</Label>
            <Input required value={form.vehicle_name} onChange={e => setForm({ ...form, vehicle_name: e.target.value })} className="bg-secondary/50 border-border/50 font-body" placeholder="e.g. 2021 Ford Transit Custom" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="font-body text-xs text-muted-foreground">From *</Label>
              <Input required value={form.from_location} onChange={e => setForm({ ...form, from_location: e.target.value })} className="bg-secondary/50 border-border/50 font-body" placeholder="Pickup location" />
            </div>
            <div>
              <Label className="font-body text-xs text-muted-foreground">To *</Label>
              <Input required value={form.to_location} onChange={e => setForm({ ...form, to_location: e.target.value })} className="bg-secondary/50 border-border/50 font-body" placeholder="Drop-off location" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="font-body text-xs text-muted-foreground">Date</Label>
              <Input type="date" value={form.scheduled_date} onChange={e => setForm({ ...form, scheduled_date: e.target.value })} className="bg-secondary/50 border-border/50 font-body" />
            </div>
            <div>
              <Label className="font-body text-xs text-muted-foreground">Driver</Label>
              <Input value={form.driver} onChange={e => setForm({ ...form, driver: e.target.value })} className="bg-secondary/50 border-border/50 font-body" placeholder="Driver name" />
            </div>
          </div>
          <div>
            <Label className="font-body text-xs text-muted-foreground">Status</Label>
            <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
              <SelectTrigger className="bg-secondary/50 border-border/50 font-body"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Collected">Collected</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="font-body text-xs text-muted-foreground">Notes</Label>
            <Textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="bg-secondary/50 border-border/50 font-body" rows={2} />
          </div>
          <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground font-display font-medium">
            {loading ? "Saving..." : movement ? "Update Movement" : "Add Movement"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MovementForm;
