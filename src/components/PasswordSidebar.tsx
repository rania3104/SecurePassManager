//dashboard nav bar
import { useAuth } from "@/context/AuthContext";
import { usePasswords, Category } from "@/context/PasswordContext";
import { 
  Shield, 
  LogOut, 
  Settings, 
  Search, 
  LayoutGrid, 
  PlusCircle,
  Briefcase,
  CreditCard,
  Users,
  FileText
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/radix-ui comp/sidebar";
import { cn } from "@/api&utils/utils";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/radix-ui comp/input";
import { Button } from "@/components/radix-ui comp/button";

export function PasswordSidebar() {
  const { user, logout } = useAuth();
  const { selectedCategory, setSelectedCategory, searchTerm, setSearchTerm } = usePasswords();
  const navigate = useNavigate();
//categories for passwords
  const categories: { id: Category; label: string; icon: React.ElementType }[] = [
    { id: "all", label: "All Passwords", icon: LayoutGrid },
    { id: "social", label: "Social", icon: Users },
    { id: "work", label: "Work", icon: Briefcase },
    { id: "finance", label: "Finance", icon: CreditCard },
    { id: "personal", label: "Personal", icon: FileText },
    { id: "other", label: "Other", icon: FileText }
  ];

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Secure Pass</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search passwords..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <Button
          className="mx-4 my-2 w-[calc(100%-2rem)]"
          onClick={() => navigate("/dashboard/add")}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Password
        </Button>
        
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton 
                    className={cn(
                      selectedCategory === category.id && "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    <span>{category.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate("/dashboard/settings")}>
              <Settings className="h-4 w-4 mr-2" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <div className="flex items-center justify-between px-2 py-2">
          <div className="text-sm text-muted-foreground">
            
            <span>
            Welcome,{" "}
            {user?.user_metadata?.full_name || user?.user_metadata?.name || "User"}{"!"}
          </span>

          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
