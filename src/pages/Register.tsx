//importing icons and components
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/radix-ui comp/button";
import { Input } from "@/components/radix-ui comp/input";
import { Label } from "@/components/radix-ui comp/label";
import { Eye, EyeOff } from "lucide-react";
import { MobileNav } from "@/components/MobNav";
import { toast } from "@/components/radix-ui comp/sonner";
import { PasswordStrengthIndicator } from "@/components/PasswordStrengthIndicator";
import { generateRandomPassword } from "@/api&utils/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
//if missing field show error
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await register(name, email, password);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error("Registration failed");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MobileNav />

      <div className="flex flex-col md:flex-row flex-1">
        <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10">
          <div className="w-full max-w-md">
            {/* Back to Home Button */}
            <Button variant="ghost" className="mb-4" asChild>
              <Link to="/">← Back to Home</Link>
            </Button>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Create your account</h2>
              <p className="text-muted-foreground">Start securing your passwords today</p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
                {/*Password generator button*/}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={async () => {
                    const generated = await generateRandomPassword();
                    setPassword(generated);
                  }}
                >
                  Generate Strong Password
                </Button>
              </div>
{/*password strength indicator import*/}
              <PasswordStrengthIndicator password={password} />

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account? or Signing up with Google?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Click Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
