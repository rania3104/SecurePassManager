//each individual password card
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/radix-ui comp/card";
import { Password } from "@/context/PasswordContext";
import { cn } from "@/api&utils/utils";
import { Button } from "@/components/radix-ui comp/button";
import { Edit, Copy, ExternalLink, Trash, Eye, EyeOff, ShieldAlert, ShieldCheck } from "lucide-react";
import { toast } from "@/components/radix-ui comp/sonner";
import { useNavigate } from "react-router-dom";
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
import { checkPasswordPwned, getFaviconFromName } from "@/api&utils/api"; 
interface PasswordCardProps {
  password: Password;
  onDelete: (id: string) => void;
  className?: string;
}

export function PasswordCard({ password, onDelete, className }: PasswordCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBreached, setIsBreached] = useState<boolean | null>(null); // breach state
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    async function checkBreach() {
      try {
        const breached = await checkPasswordPwned(password.password);
        if (!cancelled) setIsBreached(breached);
      } catch (err) {
        console.error("Breach check failed", err);
        if (!cancelled) setIsBreached(null);
      }
    }

    checkBreach();
    return () => {
      cancelled = true;
    };
  }, [password.password]);
//clipboard function to copy password
  const handleCopyPassword = async () => {
    await navigator.clipboard.writeText(password.password);
    setCopied(true);
    toast.success("Password copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };
//editing password function
  const handleEdit = () => {
    navigate(`/dashboard/edit/${password.id}`);
  };
//delete confirmation function
  const handleDeleteConfirm = () => {
    onDelete(password.id);
    setShowDeleteDialog(false);
  };
//colors for each category
  const getCategoryColor = () => {
    switch (password.category) {
      case "social":
        return "bg-blue-500";
      case "work":
        return "bg-purple-500";
      case "finance":
        return "bg-green-500";
      case "personal":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <div className={cn("w-2 h-2 rounded-full", getCategoryColor())} />
              <CardTitle className="flex items-center space-x-2">

              <span>{password.name}</span>
              
            </CardTitle>

            </div>
            
            <div className="flex space-x-1">

              <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowPassword(!showPassword)}
              >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleCopyPassword}
              >
              <Copy className="h-4 w-4" />
              </Button>
              <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleEdit}
              >
              <Edit className="h-4 w-4" />
              </Button>
              <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              onClick={() => setShowDeleteDialog(true)}
              >
              <Trash className="h-4 w-4" />
              </Button>
                            <img
              src={getFaviconFromName(password.name)}
              alt="favicon"
              className="h-8 w-8 rounded"
              onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <span className="text-muted-foreground">Username:</span>
              <span className="col-span-2 font-medium">{password.username}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm">
              <span className="text-muted-foreground">Password:</span>
              <span className="col-span-2 font-mono font-medium">
                {showPassword ? password.password : "••••••••"}
              </span>
            </div>

            {/* Breach status */}
            <div className="grid grid-cols-3 gap-2 text-sm">
              <span className="text-muted-foreground">Breach Check:</span>
              <span className="col-span-2 flex items-center space-x-1">
                {isBreached === null ? (
                  <span className="text-gray-400">Checking...</span>
                ) : isBreached ? (
                  <>
                    <ShieldAlert className="text-red-600 w-4 h-4" />
                    <span className="text-red-600 font-semibold">Breached</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="text-green-600 w-4 h-4" />
                    <span className="text-green-600 font-semibold">Safe</span>
                  </>
                )}
              </span>
            </div>

            {password.url && (
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="text-muted-foreground">URL:</span>
                <a
                  href={password.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 text-primary flex items-center hover:underline"
                >
                  {password.url}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            )}

            {password.notes && (
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="text-muted-foreground">Notes:</span>
                <span className="col-span-2">{password.notes}</span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2 text-sm pt-2 border-t">
              <span className="text-muted-foreground">Updated:</span>
              <span className="col-span-2 text-xs text-muted-foreground">
                {formatDate(password.updated_at)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the password entry for "{password.name}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
