'use client';

import { useAuth } from './auth-context';
import { getIdToken } from './config';

export function useFirebaseAuth() {
  const { user, loading, error } = useAuth();

  async function getToken(): Promise<string | null> {
    return getIdToken();
  }

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isLoading: loading,
    getToken,
  };
}
