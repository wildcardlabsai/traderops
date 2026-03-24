import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

const AdminAnnouncements = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", priority: "normal" });

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["admin-announcements"],
    queryFn: async () => {
      const { data } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  const createAnnouncement = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("announcements").insert({
        title: form.title,
        content: form.content,
        priority: form.priority,
        created_by: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Announcement created");
      queryClient.invalidateQueries({ queryKey: ["admin-announcements"] });
      setDialogOpen(false);
      setForm({ title: "", content: "", priority: "normal" });
    },
    onError: (err: any) => toast.error(err.message),
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { error } = await supabase
        .from("announcements")
        .update({ is_active: isActive })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-announcements"] }),
  });

  const deleteAnnouncement = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("announcements").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Announcement deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-announcements"] });
    },
  });

  const priorityColor = (p: string) => {
    switch (p) {
      case "high": return "bg-destructive/10 text-destructive";
      case "normal": return "bg-primary/10 text-primary";
      case "low": return "bg-muted text-muted-foreground";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">Announcements</h1>
          <p className="font-body text-muted-foreground mt-1">Broadcast messages to all dealers</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground font-display uppercase tracking-wider gap-2">
              <Plus className="w-4 h-4" /> New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl uppercase tracking-wide text-foreground">Create Announcement</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); createAnnouncement.mutate(); }} className="space-y-4">
              <div className="space-y-2">
                <Label className="font-body text-sm">Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-background border-border/50 font-body" required />
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm">Content</Label>
                <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="bg-background border-border/50 font-body min-h-[100px]" required />
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm">Priority</Label>
                <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                  <SelectTrigger className="bg-background border-border/50 font-body"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground font-display uppercase tracking-wider" disabled={createAnnouncement.isPending}>
                {createAnnouncement.isPending ? "Publishing..." : "Publish Announcement"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-8 font-body text-muted-foreground">Loading...</div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-8 font-body text-muted-foreground">No announcements yet</div>
        ) : (
          announcements.map((a: any) => (
            <div key={a.id} className="p-5 rounded-xl bg-card border border-border flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display text-xl uppercase tracking-wide text-foreground">{a.title}</h3>
                  <Badge variant="secondary" className={`${priorityColor(a.priority)} text-xs`}>{a.priority}</Badge>
                  {!a.is_active && <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">Draft</Badge>}
                </div>
                <p className="font-body text-sm text-muted-foreground">{a.content}</p>
                <p className="font-body text-xs text-muted-foreground/60 mt-2">{new Date(a.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Switch checked={a.is_active} onCheckedChange={(checked) => toggleActive.mutate({ id: a.id, isActive: checked })} />
                <Button variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => deleteAnnouncement.mutate(a.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminAnnouncements;
