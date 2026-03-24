import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground text-sm">
              TO
            </div>
            <span className="font-display text-2xl font-bold text-foreground">TraderOps</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-foreground">Reset password</h1>
          <p className="font-body text-muted-foreground mt-2">
            {sent ? "Check your email for a reset link" : "Enter your email to receive a reset link"}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleReset} className="space-y-5 rounded-2xl bg-card border border-border/50 p-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-body text-sm text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@dealership.co.uk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border/50 font-body"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 gradient-primary text-primary-foreground font-display font-semibold hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        ) : (
          <div className="rounded-2xl bg-card border border-border/50 p-8 text-center">
            <p className="font-body text-foreground mb-4">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>
        )}

        <Link to="/login" className="flex items-center justify-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
