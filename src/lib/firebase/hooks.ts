
'use client';

import { useCallback } from 'react';
import { useAuth } from './auth-context';
import { getIdToken, signOut as firebaseSignOut } from './config';

export function useFirebaseAuth() {
  const { user, loading, error } = useAuth();

  const getToken = useCallback(async (): Promise<string | null> => {
    return getIdToken();
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    return firebaseSignOut();
  }, []);

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
