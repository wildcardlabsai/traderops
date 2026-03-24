import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

const passwordRules = [
  { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
  { label: "One uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
  { label: "One lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
  { label: "One number", test: (pw: string) => /\d/.test(pw) },
  { label: "One special character (!@#$%&*)", test: (pw: string) => /[!@#$%&*]/.test(pw) },
];

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const allRulesPass = passwordRules.every((r) => r.test(password));
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allRulesPass) {
      toast.error("Password does not meet security requirements");
      return;
    }
    if (!passwordsMatch) {
      toast.error("Passwords do not match");
      return;
    }

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
            <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17v2m14-2v2" />
                <circle cx="7.5" cy="14.5" r="1.5" />
                <circle cx="16.5" cy="14.5" r="1.5" />
              </svg>
            </div>
            <span className="font-display text-2xl uppercase tracking-wider text-foreground">TraderOps</span>
          </Link>
          <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">Start Your Free Trial</h1>
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
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border-border/50 font-body"
              required
            />
            {password.length > 0 && (
              <div className="space-y-1.5 mt-2">
                {passwordRules.map((rule, i) => {
                  const passes = rule.test(password);
                  return (
                    <div key={i} className="flex items-center gap-2 text-xs font-body">
                      {passes ? (
                        <Check className="w-3.5 h-3.5 text-success" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-destructive" />
                      )}
                      <span className={passes ? "text-success" : "text-muted-foreground"}>{rule.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm" className="font-body text-sm text-foreground">Confirm Password</Label>
            <Input
              id="confirm"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-background border-border/50 font-body"
              required
            />
            {confirmPassword.length > 0 && (
              <div className="flex items-center gap-2 text-xs font-body mt-1">
                {passwordsMatch ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-success" />
                    <span className="text-success">Passwords match</span>
                  </>
                ) : (
                  <>
                    <X className="w-3.5 h-3.5 text-destructive" />
                    <span className="text-destructive">Passwords do not match</span>
                  </>
                )}
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full h-12 gradient-primary text-primary-foreground font-display text-lg uppercase tracking-wider hover:opacity-90 transition-opacity"
            disabled={loading || !allRulesPass || !passwordsMatch}
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
