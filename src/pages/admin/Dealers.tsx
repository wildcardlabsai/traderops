import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Search, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AdminDealers = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newDealer, setNewDealer] = useState({ email: "", companyName: "", location: "", phone: "", planStatus: "trial" });
  const [createdPassword, setCreatedPassword] = useState<string | null>(null);

  const { data: dealers = [], isLoading } = useQuery({
    queryKey: ["admin-dealers"],
    queryFn: async () => {
      const session = (await supabase.auth.getSession()).data.session;
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-api?action=dealers`,
        {
          headers: {
            authorization: `Bearer ${session?.access_token}`,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        }
      );
      return res.json();
    },
  });

  const createDealer = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("admin-create-dealer", {
        body: newDealer,
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      setCreatedPassword(data.temporaryPassword);
      toast.success("Dealer account created successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-dealers"] });
      setNewDealer({ email: "", companyName: "", location: "", phone: "", planStatus: "trial" });
    },
    onError: (err: any) => toast.error(err.message),
  });

  const updatePlan = useMutation({
    mutationFn: async ({ userId, planStatus }: { userId: string; planStatus: string }) => {
      const session = (await supabase.auth.getSession()).data.session;
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-api?action=update-plan`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${session?.access_token}`,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            planStatus,
            planExpiresAt: planStatus === "trial" ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() : null,
          }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      toast.success("Plan updated");
      queryClient.invalidateQueries({ queryKey: ["admin-dealers"] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  const filtered = dealers.filter?.((d: any) =>
    (d.company_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (d.email || "").toLowerCase().includes(search.toLowerCase())
  ) || [];

  const planColor = (plan: string) => {
    switch (plan) {
      case "active": return "bg-success/10 text-success";
      case "trial": return "bg-accent/10 text-accent";
      case "expired": return "bg-destructive/10 text-destructive";
      case "suspended": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">Dealers</h1>
          <p className="font-body text-muted-foreground mt-1">{filtered.length} registered dealers</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setCreatedPassword(null); }}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground font-display uppercase tracking-wider gap-2">
              <Plus className="w-4 h-4" /> Add Dealer
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl uppercase tracking-wide text-foreground">
                {createdPassword ? "Account Created" : "Add New Dealer"}
              </DialogTitle>
            </DialogHeader>

            {createdPassword ? (
              <div className="space-y-4">
                <p className="font-body text-sm text-muted-foreground">
                  The dealer account has been created. Share these credentials with the dealer:
                </p>
                <div className="p-4 rounded-lg bg-secondary border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-muted-foreground">Email:</span>
                    <span className="font-body text-sm text-foreground font-medium">{newDealer.email || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-muted-foreground">Password:</span>
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-sm text-primary bg-primary/10 px-2 py-1 rounded">{createdPassword}</code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => {
                          navigator.clipboard.writeText(createdPassword);
                          toast.success("Password copied");
                        }}
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="font-body text-xs text-muted-foreground">
                  ⚠️ This password will not be shown again. Make sure to save it or share it with the dealer now.
                </p>
                <Button className="w-full" onClick={() => { setDialogOpen(false); setCreatedPassword(null); }}>
                  Done
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createDealer.mutate();
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label className="font-body text-sm">Email *</Label>
                  <Input
                    type="email"
                    value={newDealer.email}
                    onChange={(e) => setNewDealer({ ...newDealer, email: e.target.value })}
                    className="bg-background border-border/50 font-body"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm">Dealership Name *</Label>
                  <Input
                    value={newDealer.companyName}
                    onChange={(e) => setNewDealer({ ...newDealer, companyName: e.target.value })}
                    className="bg-background border-border/50 font-body"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Location</Label>
                    <Input
                      value={newDealer.location}
                      onChange={(e) => setNewDealer({ ...newDealer, location: e.target.value })}
                      className="bg-background border-border/50 font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Phone</Label>
                    <Input
                      value={newDealer.phone}
                      onChange={(e) => setNewDealer({ ...newDealer, phone: e.target.value })}
                      className="bg-background border-border/50 font-body"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm">Plan</Label>
                  <Select value={newDealer.planStatus} onValueChange={(v) => setNewDealer({ ...newDealer, planStatus: v })}>
                    <SelectTrigger className="bg-background border-border/50 font-body">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trial">Trial (14 days)</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="font-body text-xs text-muted-foreground">
                  A random secure password will be generated. You'll see it after creation to share with the dealer.
                </p>
                <Button
                  type="submit"
                  className="w-full gradient-primary text-primary-foreground font-display uppercase tracking-wider"
                  disabled={createDealer.isPending}
                >
                  {createDealer.isPending ? "Creating..." : "Create Dealer Account"}
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-card border-border/50 font-body"
        />
      </div>

      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-body text-xs text-muted-foreground uppercase tracking-wider">Dealership</th>
              <th className="text-left p-4 font-body text-xs text-muted-foreground uppercase tracking-wider hidden md:table-cell">Email</th>
              <th className="text-left p-4 font-body text-xs text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Location</th>
              <th className="text-left p-4 font-body text-xs text-muted-foreground uppercase tracking-wider">Plan</th>
              <th className="text-left p-4 font-body text-xs text-muted-foreground uppercase tracking-wider hidden md:table-cell">Joined</th>
              <th className="text-right p-4 font-body text-xs text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6} className="p-8 text-center font-body text-muted-foreground">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center font-body text-muted-foreground">No dealers found</td></tr>
            ) : (
              filtered.map((dealer: any) => (
                <tr key={dealer.id} className="border-b border-border/50 last:border-0">
                  <td className="p-4">
                    <div className="font-body text-sm text-foreground font-medium">{dealer.company_name || "Unnamed"}</div>
                    <div className="font-body text-xs text-muted-foreground md:hidden">{dealer.email}</div>
                  </td>
                  <td className="p-4 font-body text-sm text-muted-foreground hidden md:table-cell">{dealer.email}</td>
                  <td className="p-4 font-body text-sm text-muted-foreground hidden lg:table-cell">{dealer.location || "—"}</td>
                  <td className="p-4">
                    <Badge variant="secondary" className={`${planColor(dealer.plan_status)} font-body text-xs`}>
                      {dealer.plan_status || "trial"}
                    </Badge>
                  </td>
                  <td className="p-4 font-body text-sm text-muted-foreground hidden md:table-cell">
                    {new Date(dealer.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <Select
                      value={dealer.plan_status || "trial"}
                      onValueChange={(v) => updatePlan.mutate({ userId: dealer.user_id, planStatus: v })}
                    >
                      <SelectTrigger className="w-28 h-8 text-xs font-body bg-background border-border/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trial">Trial</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDealers;
