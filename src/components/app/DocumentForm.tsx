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

interface DocumentFormProps {
  document: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

const DocumentForm = ({ document, open, onOpenChange, onSaved }: DocumentFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    doc_type: "Invoice",
    vehicle_name: "",
    party_name: "",
    amount: "",
    doc_date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  useEffect(() => {
    if (document) {
      setForm({
        name: document.name,
        doc_type: document.doc_type,
        vehicle_name: document.vehicle_name || "",
        party_name: document.party_name || "",
        amount: document.amount?.toString() || "",
        doc_date: document.doc_date || new Date().toISOString().split("T")[0],
        notes: document.notes || "",
      });
    } else {
      setForm({ name: "", doc_type: "Invoice", vehicle_name: "", party_name: "", amount: "", doc_date: new Date().toISOString().split("T")[0], notes: "" });
    }
  }, [document, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const payload = {
      ...form,
      user_id: user.id,
      amount: form.amount ? parseFloat(form.amount) : null,
    };

    const { error } = document
      ? await supabase.from("documents").update(payload).eq("id", document.id)
      : await supabase.from("documents").insert(payload);

    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(document ? "Document updated" : "Document created");
      onOpenChange(false);
      onSaved();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">{document ? "Edit Document" : "Create Document"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="font-body text-xs text-muted-foreground">Document Name *</Label>
            <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="bg-secondary/50 border-border/50 font-body" placeholder="e.g. Trade Invoice #1042" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="font-body text-xs text-muted-foreground">Type</Label>
              <Select value={form.doc_type} onValueChange={v => setForm({ ...form, doc_type: v })}>
                <SelectTrigger className="bg-secondary/50 border-border/50 font-body"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Invoice">Invoice</SelectItem>
                  <SelectItem value="Receipt">Receipt</SelectItem>
                  <SelectItem value="Agreement">Agreement</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-body text-xs text-muted-foreground">Date</Label>
              <Input type="date" value={form.doc_date} onChange={e => setForm({ ...form, doc_date: e.target.value })} className="bg-secondary/50 border-border/50 font-body" />
            </div>
          </div>
          <div>
            <Label className="font-body text-xs text-muted-foreground">Vehicle</Label>
            <Input value={form.vehicle_name} onChange={e => setForm({ ...form, vehicle_name: e.target.value })} className="bg-secondary/50 border-border/50 font-body" placeholder="e.g. 2021 Ford Transit Custom" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="font-body text-xs text-muted-foreground">Party</Label>
              <Input value={form.party_name} onChange={e => setForm({ ...form, party_name: e.target.value })} className="bg-secondary/50 border-border/50 font-body" placeholder="Company name" />
            </div>
            <div>
              <Label className="font-body text-xs text-muted-foreground">Amount (£)</Label>
              <Input type="number" step="0.01" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} className="bg-secondary/50 border-border/50 font-body" placeholder="0.00" />
            </div>
          </div>
          <div>
            <Label className="font-body text-xs text-muted-foreground">Notes</Label>
            <Textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="bg-secondary/50 border-border/50 font-body" rows={2} />
          </div>
          <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground font-display font-medium">
            {loading ? "Saving..." : document ? "Update Document" : "Create Document"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentForm;
