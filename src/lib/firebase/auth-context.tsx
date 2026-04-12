'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { type User } from 'firebase/auth';
import { auth, onAuthStateChanged } from '@/lib/firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setUser(user);
        setLoading(false);
        
        // Salvar token em cookie quando o usuário estiver autenticado
        if (user) {
          try {
            const idToken = await user.getIdToken();
            document.cookie = `__session=${idToken}; path=/; max-age=3600; SameSite=Lax`;
          } catch (err) {
            console.error('Failed to save token to cookie:', err);
          }
        } else {
          // Limpar cookie quando não houver usuário
          document.cookie = '__session=; path=/; max-age=0';
        }
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
