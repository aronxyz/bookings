// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AuthResponse } from '../api/auth';

type AuthContextType = {
  token: AuthResponse | null;
  setToken: (token: AuthResponse | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<AuthResponse | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
