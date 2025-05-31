//importing necessary libraries and components
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/radix-ui comp/button";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/radix-ui comp/tabs";
import { Label } from "@/components/radix-ui comp/label";
import { RadioGroup, RadioGroupItem } from "@/components/radix-ui comp/radio-group";
import { toast } from "@/components/radix-ui comp/sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/radix-ui comp/alert-dialog";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();

  //alert for logout confirmation
  const handleLogoutConfirm = () => {
    logout();
    toast.info("You have been logged out");
    navigate("/");
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
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and application preferences
          </p>
        </div>
        {/*setting light or dark mode*/}
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-2 mb-6">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Theme</h2>
              <RadioGroup 
                value={theme} 
                onValueChange={(value) => setTheme(value as "light" | "dark")}
                className="grid gap-4 grid-cols-2"
              >
                <div>
                  <RadioGroupItem 
                    value="light" 
                    id="theme-light" 
                    className="sr-only" 
                  />
                  <Label
                    htmlFor="theme-light"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                  >
                    <Sun className="mb-3 h-6 w-6" />
                    Light
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem 
                    value="dark" 
                    id="theme-dark" 
                    className="sr-only" 
                  />
                  <Label
                    htmlFor="theme-dark"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                  >
                    <Moon className="mb-3 h-6 w-6" />
                    Dark
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Account Information</h2>
              <div className="grid gap-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{user?.email}</span>
                </div>
              </div>
            </div>
                        
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Actions</h2>
              <div className="grid gap-4">
                <Button
                  variant="destructive"
                  onClick={() => setShowLogoutDialog(true)}
                >
                  Logout
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogoutConfirm}>
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
