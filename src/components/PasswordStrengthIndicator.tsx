//password strength indicator component for register page
import { calculatePasswordStrength, PasswordStrength } from "@/api&utils/password-utils";
import { cn } from "@/api&utils/utils";
import { useEffect, useState } from "react";

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

export function PasswordStrengthIndicator({ 
  password, 
  className 
}: PasswordStrengthIndicatorProps) {
  const [strength, setStrength] = useState<PasswordStrength>("weak");
  
  useEffect(() => {
    setStrength(calculatePasswordStrength(password));
  }, [password]);
  
  const getStrengthWidth = () => {
    switch (strength) {
      case "weak": return "w-1/3";
      case "medium": return "w-2/3";
      case "strong": return "w-full";
      default: return "w-1/3";
    }
  };
  
  const getStrengthColor = () => {
    switch (strength) {
      case "weak": return "bg-security-weak";
      case "medium": return "bg-security-medium";
      case "strong": return "bg-security-strong";
      default: return "bg-security-weak";
    }
  };
  
  const getStrengthText = () => {
    switch (strength) {
      case "weak": return "Weak";
      case "medium": return "Medium";
      case "strong": return "Strong";
      default: return "Weak";
    }
  };

  if (!password) {
    return null;
  }

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between text-xs">
        <span>Password Strength</span>
        <span 
          className={cn(
            "font-medium",
            strength === "weak" && "text-security-weak",
            strength === "medium" && "text-security-medium",
            strength === "strong" && "text-security-strong",
          )}
        >
          {getStrengthText()}
        </span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div 
          className={cn(
            "security-indicator h-full",
            getStrengthWidth(),
            getStrengthColor()
          )}
        />
      </div>
    </div>
  );
}


