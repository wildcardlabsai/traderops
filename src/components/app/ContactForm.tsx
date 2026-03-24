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

type Contact = Tables<"contacts">;

interface ContactFormProps {
  contact?: Contact | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

const ContactForm = ({ contact, open, onOpenChange, onSaved }: ContactFormProps) => {
  const { user } = useAuth();
  const isEdit = !!contact;

  const [form, setForm] = useState({
    company_name: contact?.company_name || "",
    contact_name: contact?.contact_name || "",
    type: contact?.type || "Buyer",
    phone: contact?.phone || "",
    email: contact?.email || "",
    location: contact?.location || "",
    notes: contact?.notes || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const data = {
      user_id: user.id,
      company_name: form.company_name,
      contact_name: form.contact_name || null,
      type: form.type,
      phone: form.phone || null,
      email: form.email || null,
      location: form.location || null,
      notes: form.notes || null,
    };

    const { error } = isEdit
      ? await supabase.from("contacts").update(data).eq("id", contact.id)
      : await supabase.from("contacts").insert(data);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(isEdit ? "Contact updated" : "Contact added");
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
            {isEdit ? "Edit Contact" : "Add Contact"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="font-body text-xs text-muted-foreground">Company Name *</Label>
            <Input value={form.company_name} onChange={e => set("company_name", e.target.value)} placeholder="e.g. ABC Motors" className="bg-background border-border/50 font-body" required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Contact Person</Label>
              <Input value={form.contact_name} onChange={e => set("contact_name", e.target.value)} placeholder="e.g. Mike Johnson" className="bg-background border-border/50 font-body" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Type</Label>
              <Select value={form.type} onValueChange={v => set("type", v)}>
                <SelectTrigger className="bg-background border-border/50 font-body"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Buyer", "Supplier", "Buyer & Supplier"].map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Phone</Label>
              <Input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="07700 900123" className="bg-background border-border/50 font-body" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-xs text-muted-foreground">Email</Label>
              <Input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="mike@abc.co.uk" className="bg-background border-border/50 font-body" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="font-body text-xs text-muted-foreground">Location</Label>
            <Input value={form.location} onChange={e => set("location", e.target.value)} placeholder="e.g. Birmingham" className="bg-background border-border/50 font-body" />
          </div>

          <div className="space-y-1.5">
            <Label className="font-body text-xs text-muted-foreground">Notes</Label>
            <Textarea value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Any notes..." className="bg-background border-border/50 font-body resize-none" rows={2} />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 border-border/50" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="flex-1 gradient-primary text-primary-foreground font-display font-medium" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update Contact" : "Add Contact"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
