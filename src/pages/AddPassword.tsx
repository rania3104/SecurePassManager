//importing necessary libraries and components
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePasswords } from "@/context/PasswordContext";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/radix-ui comp/button";
import { Input } from "@/components/radix-ui comp/input";
import { Label } from "@/components/radix-ui comp/label";
import { Textarea } from "@/components/radix-ui comp/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/radix-ui comp/select";
import { ArrowLeft, Eye, EyeOff, Wand2 } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/radix-ui comp/dialog";
import { toast } from "@/components/radix-ui comp/sonner";
import { PasswordGenerator } from "@/components/PasswordGenerator";

export default function AddPasswordPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState<string>("personal");
  const [notes, setNotes] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const { addPassword } = usePasswords();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !username || !password || !category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    addPassword({
      name,
      username,
      password,
      url,
      category,
      notes,
    });
    
    navigate("/dashboard");
  };

  const handlePasswordSelect = (generatedPassword: string) => {
    setPassword(generatedPassword);
    setIsGeneratorOpen(false);
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Add New Password</h1>
          <p className="text-muted-foreground">
            Store a new password in your secure vault
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name*</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username / Email*</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=""
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="password">Password*</Label>
              <div className="flex">
                <div className="relative flex-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pr-20"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </div>
                {/*password generator*/}
                <Dialog open={isGeneratorOpen} onOpenChange={setIsGeneratorOpen}>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="ml-2"
                      title="Generate Password"
                    >
                      <Wand2 className="h-4 w-4" />
                      <span className="sr-only">Generate Password</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Generate a Strong Password</DialogTitle>
                    </DialogHeader>
                    <PasswordGenerator onSelect={handlePasswordSelect} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            {/*selecting categories*/}
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Select 
                value={category} 
                onValueChange={setCategory} 
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">Website URL (optional)</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder=""
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional information here"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit">Save Password</Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
