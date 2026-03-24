import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="font-body text-sm text-muted-foreground">Manage your account</p>
      </div>

      <div className="rounded-xl bg-card border border-border/50 p-6 space-y-4">
        <h2 className="font-display font-semibold text-foreground">Account</h2>
        <div className="space-y-3 font-body text-sm">
          <div className="flex items-center justify-between py-2 border-b border-border/30">
            <span className="text-muted-foreground">Email</span>
            <span className="text-foreground">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border/30">
            <span className="text-muted-foreground">Dealership</span>
            <span className="text-foreground">{user?.user_metadata?.company_name || "—"}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">Plan</span>
            <span className="text-primary font-medium">Free Trial</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border/50 p-6 space-y-4">
        <h2 className="font-display font-semibold text-foreground">Actions</h2>
        <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Settings;
