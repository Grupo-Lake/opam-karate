"use client";

import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "@/lib/firebase/hooks";
import { Button } from "@/components/ui/button";
import { AlertCircle, LogOut } from "lucide-react";

export default function AccessDeniedPage() {
  const router = useRouter();
  const { signOut } = useFirebaseAuth();

  async function handleSignOut() {
    await signOut();
    router.push('/backoffice/sign-in');
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Acesso Negado
        </h1>

        <p className="text-gray-600 mb-8">
          Seu email não está autorizado para acessar o backoffice.
          <br />
          <br />
          Entre em contato com o administrador do sistema para solicitar acesso.
        </p>

        <Button variant="outline" className="w-full" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Fazer Logout
        </Button>
      </div>
    </div>
  );
}
