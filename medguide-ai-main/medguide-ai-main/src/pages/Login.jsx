import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Pill, Brain, Mail, Lock, Chrome } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(isSignup ? "Account created successfully!" : "Logged in successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-background flex items-center justify-center px-6">
      <Card className="w-full max-w-md p-8 card-shadow-lg animate-slide-up">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <div className="flex items-center">
              <Pill className="h-8 w-8 text-primary" />
              <Brain className="h-5 w-5 text-secondary -ml-2 -mb-2" />
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isSignup
              ? "Sign up to start managing your medicines"
              : "Sign in to continue to MedGuideAI"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {!isSignup && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <Button type="submit" className="w-full" size="lg">
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            toast.success("Logged in with Google!");
            navigate("/dashboard");
          }}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Google Sign-In
        </Button>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-sm text-muted-foreground"
          >
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <span className="text-primary font-medium hover:underline">
              {isSignup ? "Login" : "Sign up"}
            </span>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
