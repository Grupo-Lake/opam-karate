"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

/**
 * Página para forçar logout do Clerk
 * Usada quando detecta estado inconsistente (autenticado sem email)
 */
export default function ForceSignOutPage() {
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    const performSignOut = async () => {
      console.log("[ForceSignOut] Logging out user due to inconsistent state");
      
      try {
        await signOut();
        console.log("[ForceSignOut] Logout successful, redirecting to sign-in");
        router.push("/backoffice/sign-in");
      } catch (error) {
        console.error("[ForceSignOut] Error during logout:", error);
        // Redireciona mesmo se houver erro
        router.push("/backoffice/sign-in");
      }
    };

    performSignOut();
  }, [signOut, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
          Limpando sessão...
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Você será redirecionado em instantes
        </p>
      </div>
    </div>
  );
}
