//importing libraries, icon and components
import { usePasswords } from "@/context/PasswordContext";
import { AppLayout } from "@/components/AppLayout";
import { PasswordCard } from "@/components/PasswordCard";
import { Button } from "@/components/radix-ui comp/button";
import { Input } from "@/components/radix-ui comp/input";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { getGeolocation } from "../api&utils/api";

export default function DashboardPage() {
  const { filteredPasswords, deletePassword, searchTerm, setSearchTerm } = usePasswords();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const [location, setLocation] = useState<{ city: string; country_name: string; ip: string } | null>(null);
//setting geolocation using api
  useEffect(() => {
    getGeolocation().then(setLocation);
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Password Vault</h1>
            <p className="text-muted-foreground">Manage your secure passwords</p>
          </div>
{/*search function*/}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {isSearchOpen ? (
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search passwords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full"
                  autoFocus
                  onBlur={() => {
                    if (!searchTerm) {
                      setIsSearchOpen(false);
                    }
                  }}
                />
              </div>
            ) : (
              <Button variant="outline" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-4 w-4" />
              </Button>
            )}
            {/*add password button*/}
            <Button onClick={() => navigate("/dashboard/add")}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Password
            </Button>
          </div>
        </div>
        {/*displaying location and IP using the APIr*/}
         <div className="text-sm text-muted-foreground space-y-1 mt-2">
              {location && (
                <p>
                  📍 Logged in from <strong>{location.city}</strong>, {location.country_name} – <code>{location.ip}</code>
                </p>
              )}
              
            </div>
        {filteredPasswords.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPasswords.map((password) => (
              <PasswordCard
                key={password.id}
                password={password}
                onDelete={deletePassword}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 p-4 rounded-full bg-muted">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No passwords found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm
                ? "No passwords match your search criteria."
                : "You haven't added any passwords yet."}
            </p>
            <Button onClick={() => navigate("/dashboard/add")}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Password
            </Button>
          </div>
        )}
      </div>
      
    </AppLayout>
  );
}
