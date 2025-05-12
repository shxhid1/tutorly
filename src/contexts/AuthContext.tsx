
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { getCurrentUser, signInWithGoogle, logOut } from '../lib/auth';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const signIn = async () => {
    try {
      setLoading(true);
      const user = await signInWithGoogle();
      setCurrentUser(user);
      toast({
        title: "Welcome!",
        description: `Signed in as ${user?.displayName || user?.email}`,
      });
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await logOut();
      setCurrentUser(null);
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "Could not sign out. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
