'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithGoogle } from '@/lib/firebase/config';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334';

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkWhitelist(email: string, token: string): Promise<boolean> {
    try {
      console.log('🌐 Making whitelist API call to:', `${API_URL}/admin-whitelist/check`);
      const response = await fetch(`${API_URL}/admin-whitelist/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      console.log('📊 Whitelist API response status:', response.status);
      const responseData = await response.text();
      console.log('📄 Response data:', responseData);
      
      return response.ok;
    } catch (error) {
      console.error('❌ Whitelist check failed:', error);
      return false;
    }
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    setError(null);

    try {
      console.log('🔐 Starting Google Sign-In...');
      const user = await signInWithGoogle();
      console.log('✅ Firebase authentication successful:', user.email);
      
      if (!user.email) {
        throw new Error('Email não encontrado');
      }

      // Verificar whitelist
      console.log('📋 Checking whitelist for:', user.email);
      const token = await user.getIdToken();
      console.log('🎫 Token obtained, length:', token.length);
      
      const isWhitelisted = await checkWhitelist(user.email, token);
      console.log('📡 Whitelist check result:', isWhitelisted);

      if (!isWhitelisted) {
        console.log('🚫 User not in whitelist, redirecting to access-denied');
        router.push('/backoffice/access-denied');
        return;
      }

      console.log('✅ User is whitelisted!');
      console.log('🍪 Cookie should be set with token');
      
      // Aguardar um pouco para garantir que o cookie foi salvo
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('🚀 Redirecting to /backoffice');
      // Usar window.location para forçar navegação completa
      window.location.href = '/backoffice';
    } catch (err) {
      console.error('❌ Sign in error:', err);
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Backoffice OPAM</h1>
          <p className="text-gray-600">Faça login para continuar</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <Button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>Entrando...</>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar com Google
            </>
          )}
        </Button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Apenas administradores autorizados podem acessar
        </p>
      </Card>
    </div>
  );
}
