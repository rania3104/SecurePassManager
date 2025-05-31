//importing necessary libraries and components
import { useAuth } from "@/context/AuthContext";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/radix-ui comp/sidebar";
import { PasswordSidebar } from "@/components/PasswordSidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <PasswordSidebar />
        <div className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="md:hidden flex justify-end mb-4">
              <SidebarTrigger />
            </div>
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
