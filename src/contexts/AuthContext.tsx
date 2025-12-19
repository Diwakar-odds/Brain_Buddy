import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  user: any | null;
  session: any | null;
  loading: boolean;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with MongoDB-based auth/session logic
    setSession(null);
    setUser(null);
    setLoading(false);
  }, []);

  // TODO: Add MongoDB-based auth state change logic if needed

  const signUp = async (email: string, password: string, username: string) => {
    // TODO: Implement sign up logic with MongoDB
    // Example: create user document in MongoDB
    setUser({ email, username });
    setSession({ email });
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    // TODO: Implement sign in logic with MongoDB
    setUser({ email });
    setSession({ email });
    setLoading(false);
  };

  const signOut = async () => {
    // TODO: Implement sign out logic with MongoDB
    setUser(null);
    setSession(null);
    setLoading(false);
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
