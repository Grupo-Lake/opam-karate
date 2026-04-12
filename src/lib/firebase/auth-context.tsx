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
      (user) => {
        setUser(user);
        setLoading(false);
        // O cookie de sessão é gerenciado exclusivamente pelo fluxo de login (sign-in)
        // e pelo sign-out. Não manipulamos cookies aqui para evitar race conditions
        // onde o Firebase ancora o estado como null durante a inicialização e
        // apagaria um cookie válido recém-criado.
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
