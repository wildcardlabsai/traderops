import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";

type Deal = Tables<"deals">;

interface DealFormProps {
  deal?: Deal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

const DealForm = ({ deal, open, onOpenChange, onSaved }: DealFormProps) => {
  const { user } = useAuth();
  const isEdit = !!deal;

  const [form, setForm] = useState({
    vehicle_name: deal?.vehicle_name || "",
    party_name: deal?.party_name || "",
    value: deal?.value?.toString() || "",
    stage: deal?.stage || "Enquiry",
    notes: deal?.notes || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const data = {
      user_id: user.id,
      vehicle_name: form.vehicle_name,
      party_name: form.party_name,
      value: form.value ? parseFloat(form.value) : null,
      stage: form.stage,
      notes: form.notes || null,
    };

    const { error } = isEdit
      ? await supabase.from("deals").update(data).eq("id", deal.id)
      : await supabase.from("deals").insert(data);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(isEdit ? "Deal updated" : "Deal created");
      onOpenChange(false);
      onSaved();
    }
    setLoading(false);
  };

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            {isEdit ? "Edit Deal" : "Create Deal"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="font-body text-xs text-muted-foreground">Vehicle *</Label>
            <Input value={form.vehicle_name} onChange={e => set("vehicle_name", e.target.value)} placeholder="e.g. 2021 Ford Transit Custom" className="bg-background border-border/50 font-body" required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Party *</Label>
              <Input value={form.party_name} onChange={e => set("party_name", e.target.value)} placeholder="e.g. ABC Motors" className="bg-background border-border/50 font-body" required />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Value (£)</Label>
              <Input type="number" step="0.01" value={form.value} onChange={e => set("value", e.target.value)} placeholder="e.g. 18500" className="bg-background border-border/50 font-body" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="font-body text-xs text-muted-foreground">Stage</Label>
            <Select value={form.stage} onValueChange={v => set("stage", v)}>
              <SelectTrigger className="bg-background border-border/50 font-body"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Enquiry", "Negotiating", "Agreed", "Invoiced", "Completed", "Lost"].map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="font-body text-xs text-muted-foreground">Notes</Label>
            <Textarea value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Deal notes..." className="bg-background border-border/50 font-body resize-none" rows={2} />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 border-border/50" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="flex-1 gradient-primary text-primary-foreground font-display font-medium" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update Deal" : "Create Deal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DealForm;
