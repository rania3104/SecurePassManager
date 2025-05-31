//importing icons and components
import { Shield, Lock, Key, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/radix-ui comp/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { MobileNav } from "@/components/MobNav";
import { ThemeMode } from "@/components/AppMode";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <MobileNav isAuthenticated={!!user} />
      {/*app branding and navigation bar*/}
      <header className="hidden md:flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Secure Pass</span>
        </div>
        <div className="flex items-center space-x-4">

          <div className="flex items-center space-x-2">
            <ThemeMode />
            {user ? (
              <Button onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button onClick={() => navigate("/register")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/*hero section */}
      <section className="py-16 px-6 md:py-24 md:px-10 flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Secure your passwords. <br />
          <span className="gradient-text">Protect your digital life.</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl">
          Store, generate, and manage your passwords securely in one place. Never forget a password again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="px-8" onClick={() => navigate("/register")}>
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="px-8" onClick={() => navigate("/login")}>
            Sign In
          </Button>
        </div>
      </section>

      {/*features section */}
      <section id="features" className="py-16 px-6 md:px-10 bg-accent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Everything you need to stay secure
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={Lock}
              title="Secure Storage"
              description="All your passwords are encrypted before being stored."
            />
            <FeatureCard 
              icon={Key}
              title="Password Generator"
              description="Create strong, unique passwords with our built-in password generator."
            />
            <FeatureCard 
              icon={Search}
              title="Easy Access"
              description="Quick search and filtering to find exactly what you need, when you need it."
            />
            <FeatureCard 
              icon={RefreshCw}
              title="Auto Sync"
              description="Your vault is automatically synced across your devices for easy access."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It Works
          </h2>
          <div className="flex flex-col space-y-12">
            <Step 
              number={1}
              title="Create an account"
              description="Sign up to create your secure password vault."
            />
            <Step 
              number={2}
              title="Add your passwords"
              description="Create password entries for all your accounts."
            />
            <Step 
              number={3}
              title="Access anywhere"
              description="Securely access your passwords whenever you need them on any device."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">Secure Pass</span>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; Secure Pass 2025.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center glass p-6">
      <div className="bg-primary/10 p-3 rounded-full mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: number, title: string, description: string }) {
  return (
    <div className="flex">
      <div className="mr-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
