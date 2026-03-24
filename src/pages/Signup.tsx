import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { company_name: companyName },
      },
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your email to confirm your account");
      navigate("/login");
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
          <h1 className="font-display text-3xl font-bold text-foreground">Start your free trial</h1>
          <p className="font-body text-muted-foreground mt-2">14 days free. No card required.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5 rounded-2xl bg-card border border-border/50 p-8">
          <div className="space-y-2">
            <Label htmlFor="company" className="font-body text-sm text-foreground">Dealership Name</Label>
            <Input
              id="company"
              placeholder="e.g. ABC Motors"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-background border-border/50 font-body"
              required
            />
          </div>
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
            <Label htmlFor="password" className="font-body text-sm text-foreground">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border-border/50 font-body"
              minLength={6}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full h-11 gradient-primary text-primary-foreground font-display font-semibold hover:opacity-90 transition-opacity"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
          <p className="text-center font-body text-xs text-muted-foreground">
            By signing up, you agree to our Terms of Service
          </p>
        </form>

        <p className="text-center font-body text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
