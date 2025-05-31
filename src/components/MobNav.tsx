//nav bar for mobile view
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Menu } from "lucide-react";
import { Button } from "@/components/radix-ui comp/button";
import { ThemeMode } from "./AppMode";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/radix-ui comp/sheet";

interface MobileNavProps {
  isAuthenticated?: boolean;
}

export function MobileNav({ isAuthenticated = false }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between md:hidden px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Secure Pass</span>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeMode />
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
        </div>
      </div>
      <SheetContent side="right">
        <nav className="flex flex-col space-y-4 mt-8">
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => navigateTo("/")}
          >
            Home
          </Button>
          {!isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => navigateTo("/login")}
              >
                Login
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => navigateTo("/register")}
              >
                Register
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => navigateTo("/dashboard")}
            >
              Dashboard
            </Button>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
