'use client';

import { useAuth } from './auth-context';
import { getIdToken, signOut as firebaseSignOut } from './config';

export function useFirebaseAuth() {
  const { user, loading, error } = useAuth();

  async function getToken(): Promise<string | null> {
    return getIdToken();
  }

  async function signOut(): Promise<void> {
    return firebaseSignOut();
  }

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isLoading: loading,
    getToken,
    signOut,
  };
}
