import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const AdminSettings = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">Admin Settings</h1>
        <p className="font-body text-muted-foreground mt-1">Your admin profile</p>
      </div>

      <div className="rounded-xl bg-card border border-border p-6 space-y-4">
        <h2 className="font-display text-2xl uppercase tracking-wide text-foreground">Account</h2>
        <div className="space-y-3 font-body text-sm">
          <div className="flex items-center justify-between py-2 border-b border-border/30">
            <span className="text-muted-foreground">Email</span>
            <span className="text-foreground">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border/30">
            <span className="text-muted-foreground">Role</span>
            <span className="text-primary font-medium">Administrator</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">Member since</span>
            <span className="text-foreground">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border p-6 space-y-4">
        <h2 className="font-display text-2xl uppercase tracking-wide text-foreground">Actions</h2>
        <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10 font-display uppercase tracking-wider" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
