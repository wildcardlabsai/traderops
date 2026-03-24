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

interface WantedFormProps {
  post: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

const WantedForm = ({ post, open, onOpenChange, onSaved }: WantedFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    vehicle_description: "",
    budget: "",
    notes: "",
    status: "Active",
  });

  useEffect(() => {
    if (post) {
      setForm({
        vehicle_description: post.vehicle_description,
        budget: post.budget || "",
        notes: post.notes || "",
        status: post.status,
      });
    } else {
      setForm({ vehicle_description: "", budget: "", notes: "", status: "Active" });
    }
  }, [post, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const payload = { ...form, user_id: user.id };

    const { error } = post
      ? await supabase.from("wanted_posts").update(payload).eq("id", post.id)
      : await supabase.from("wanted_posts").insert(payload);

    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(post ? "Post updated" : "Wanted post created");
      onOpenChange(false);
      onSaved();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">{post ? "Edit Wanted Post" : "Post Wanted"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="font-body text-xs text-muted-foreground">Vehicle Description *</Label>
            <Input required value={form.vehicle_description} onChange={e => setForm({ ...form, vehicle_description: e.target.value })} className="bg-secondary/50 border-border/50 font-body" placeholder="e.g. Ford Transit Custom 2020+" />
          </div>
          <div>
            <Label className="font-body text-xs text-muted-foreground">Budget</Label>
            <Input value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} className="bg-secondary/50 border-border/50 font-body" placeholder="e.g. Up to £18k" />
          </div>
          <div>
            <Label className="font-body text-xs text-muted-foreground">Notes</Label>
            <Textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="bg-secondary/50 border-border/50 font-body" placeholder="Low mileage preferred, any colour..." rows={3} />
          </div>
          {post && (
            <div>
              <Label className="font-body text-xs text-muted-foreground">Status</Label>
              <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                <SelectTrigger className="bg-secondary/50 border-border/50 font-body"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Matched">Matched</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground font-display font-medium">
            {loading ? "Saving..." : post ? "Update Post" : "Post Wanted"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WantedForm;
