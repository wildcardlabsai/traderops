import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/app");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground text-sm">
              TO
            </div>
            <span className="font-display text-2xl font-bold text-foreground">TraderOps</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-foreground">Welcome back</h1>
          <p className="font-body text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 rounded-2xl bg-card border border-border/50 p-8">
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
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="font-body text-sm text-foreground">Password</Label>
              <Link to="/forgot-password" className="font-body text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border-border/50 font-body"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full h-11 gradient-primary text-primary-foreground font-display font-semibold hover:opacity-90 transition-opacity"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center font-body text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline font-medium">
            Start free trial
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
