"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

/**
 * Página para forçar logout do Clerk
 * Usada quando detecta estado inconsistente (autenticado sem email)
 */
export default function ForceSignOutPage() {
  const { signOut } = useClerk();
  const [status, setStatus] = useState<'logging-out' | 'redirecting' | 'error'>('logging-out');

  useEffect(() => {
    const performSignOut = async () => {
      console.log("[ForceSignOut] Logging out user due to inconsistent state");
      
      try {
        // Tenta fazer logout via Clerk
        await signOut({ redirectUrl: '/backoffice/sign-in' });
        setStatus('redirecting');
      } catch (error) {
        console.error("[ForceSignOut] Error during logout:", error);
        setStatus('error');
        
        // Fallback: força recarregamento após limpar cookies manualmente
        setTimeout(() => {
          // Limpa todos os cookies do Clerk manualmente
          document.cookie.split(";").forEach((c) => {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
          });
          
          // Força reload completo da página
          window.location.href = '/backoffice/sign-in';
        }, 1000);
      }
    };

    performSignOut();
  }, [signOut]);

  if (status === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-orange-600" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
            Limpando sessão...
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Forçando limpeza manual de cookies
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
          {status === 'logging-out' ? 'Saindo da conta...' : 'Redirecionando...'}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Por favor, aguarde
        </p>
      </div>
    </div>
  );
}
