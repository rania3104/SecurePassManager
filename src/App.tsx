//importing necessary libraries and components
import { Toaster } from "@/components/radix-ui comp/toaster";
import { Toaster as Sonner } from "@/components/radix-ui comp/sonner";
import { TooltipProvider } from "@/components/radix-ui comp/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { PasswordProvider } from "@/context/PasswordContext";

import LandingPage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/UserDashboard";
import AddPasswordPage from "./pages/AddPassword";
import EditPasswordPage from "./pages/EditPassword";
import SettingsPage from "./pages/Settings";

const queryClient = new QueryClient();
//setting app routes
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <PasswordProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/add" element={<AddPasswordPage />} />
                <Route path="/dashboard/edit/:id" element={<EditPasswordPage />} />
                <Route path="/dashboard/settings" element={<SettingsPage />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </PasswordProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
