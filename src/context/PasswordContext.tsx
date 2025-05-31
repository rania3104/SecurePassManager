//for type of password
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/radix-ui comp/sonner";

export interface Password {
  id: string;
  name: string;
  username: string;
  password: string;
  url?: string;
  category: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type Category = "all" | "social" | "work" | "finance" | "personal" | "other";

interface PasswordContextType {
  passwords: Password[];
  filteredPasswords: Password[];
  selectedCategory: Category;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: Category) => void;
  addPassword: (password: Omit<Password, "id" | "created_at" | "updated_at">) => Promise<void>;
  updatePassword: (id: string, data: Partial<Password>) => Promise<void>;
  deletePassword: (id: string) => Promise<void>;
  getPasswordById: (id: string) => Password | undefined;
  isLoading: boolean;
}

const PasswordContext = createContext<PasswordContextType | undefined>(undefined);

export function PasswordProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPasswords, setFilteredPasswords] = useState<Password[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  //loads passwords from Supabase
  useEffect(() => {
    if (user) {
      loadPasswords();
    } else {
      setPasswords([]);
    }
  }, [user]);

  //filters passwords based on category and search term
  useEffect(() => {
    let filtered = [...passwords];
    
    //category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    //search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          p.username.toLowerCase().includes(term) ||
          (p.url && p.url.toLowerCase().includes(term)) ||
          (p.notes && p.notes.toLowerCase().includes(term))
      );
    }
    
    setFilteredPasswords(filtered);
  }, [passwords, selectedCategory, searchTerm]);

  const loadPasswords = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_passwords')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading passwords:', error);
        toast.error('Failed to load passwords');
        return;
      }

      setPasswords(data || []);
    } catch (error) {
      console.error('Error loading passwords:', error);
      toast.error('Failed to load passwords');
    } finally {
      setIsLoading(false);
    }
  };

  const addPassword = async (passwordData: Omit<Password, "id" | "created_at" | "updated_at">) => {
    if (!user) {
      toast.error('You must be logged in to add passwords');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_passwords')
        .insert([
          {
            ...passwordData,
            user_id: user.id,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error adding password:', error);
        toast.error('Failed to save password');
        throw error;
      }

      setPasswords(prev => [data, ...prev]);
      toast.success("Password saved successfully");
    } catch (error) {
      console.error('Error adding password:', error);
      throw error;
    }
  };

  const updatePassword = async (id: string, data: Partial<Password>) => {
    if (!user) {
      toast.error('You must be logged in to update passwords');
      return;
    }

    try {
      const { error } = await supabase
        .from('user_passwords')
        .update(data)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating password:', error);
        toast.error('Failed to update password');
        throw error;
      }

      setPasswords(prev =>
        prev.map(p =>
          p.id === id ? { ...p, ...data } : p
        )
      );
      toast.success("Password updated successfully");
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  };

  const deletePassword = async (id: string) => {
    if (!user) {
      toast.error('You must be logged in to delete passwords');
      return;
    }

    try {
      const { error } = await supabase
        .from('user_passwords')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting password:', error);
        toast.error('Failed to delete password');
        throw error;
      }

      setPasswords(prev => prev.filter(p => p.id !== id));
      toast.success("Password deleted successfully");
    } catch (error) {
      console.error('Error deleting password:', error);
      throw error;
    }
  };

  const getPasswordById = (id: string) => {
    return passwords.find(p => p.id === id);
  };

  return (
    <PasswordContext.Provider
      value={{
        passwords,
        filteredPasswords,
        selectedCategory,
        searchTerm,
        setSearchTerm,
        setSelectedCategory,
        addPassword,
        updatePassword,
        deletePassword,
        getPasswordById,
        isLoading,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
}

export function usePasswords() {
  const context = useContext(PasswordContext);
  if (context === undefined) {
    throw new Error("usePasswords must be used within a PasswordProvider");
  }
  return context;
}
