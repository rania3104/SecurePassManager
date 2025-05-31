//password generator in the addpassword page
import { useState } from "react";
import { DEFAULT_PASSWORD_OPTIONS, generatePassword, PasswordOptions } from "@/api&utils/password-utils";
import { Button } from "@/components/radix-ui comp/button";
import { Input } from "@/components/radix-ui comp/input";
import { Slider } from "@/components/radix-ui comp/slider";
import { Switch } from "@/components/radix-ui comp/switch";
import { Label } from "@/components/radix-ui comp/label";
import { RefreshCw, Copy, Check } from "lucide-react";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";
import { toast } from "@/components/radix-ui comp/sonner";

interface PasswordGeneratorProps {
  onSelect?: (password: string) => void;
}

export function PasswordGenerator({ onSelect }: PasswordGeneratorProps) {
  const [options, setOptions] = useState<PasswordOptions>({ ...DEFAULT_PASSWORD_OPTIONS });
  const [password, setPassword] = useState(() => generatePassword(DEFAULT_PASSWORD_OPTIONS));
  const [copied, setCopied] = useState(false);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setCopied(false);
  };

  const handleCopyPassword = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    toast.success("Password copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectPassword = () => {
    if (onSelect) {
      onSelect(password);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="font-mono text-base"
        />
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleGeneratePassword}
          title="Generate new password"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleCopyPassword}
          title={copied ? "Copied!" : "Copy to clipboard"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <PasswordStrengthIndicator password={password} />
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Password Length: {options.length}</Label>
          </div>
          <Slider
            value={[options.length]}
            min={8}
            max={32}
            step={1}
            onValueChange={(value) => setOptions({ ...options, length: value[0] })}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="uppercase">Include Uppercase</Label>
            <Switch
              id="uppercase"
              checked={options.includeUppercase}
              onCheckedChange={(checked) => setOptions({ ...options, includeUppercase: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="lowercase">Include Lowercase</Label>
            <Switch
              id="lowercase"
              checked={options.includeLowercase}
              onCheckedChange={(checked) => setOptions({ ...options, includeLowercase: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="numbers">Include Numbers</Label>
            <Switch
              id="numbers"
              checked={options.includeNumbers}
              onCheckedChange={(checked) => setOptions({ ...options, includeNumbers: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="symbols">Include Symbols</Label>
            <Switch
              id="symbols"
              checked={options.includeSymbols}
              onCheckedChange={(checked) => setOptions({ ...options, includeSymbols: checked })}
            />
          </div>
        </div>
      </div>
      
      {onSelect && (
        <Button 
          className="w-full" 
          onClick={handleSelectPassword}
        >
          Use This Password
        </Button>
      )}
    </div>
  );
}
