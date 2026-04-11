"use client";

import { SignUp } from "@clerk/nextjs";
import { useState } from "react";

export default function SignUpPage() {
  const [error] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Criar Conta Administrativa
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Registre-se para acessar o painel administrativo
          </p>
          <p className="mt-4 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
            ⚠️ Apenas emails autorizados podem criar contas administrativas
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-200">
            <strong>Erro:</strong> {error}
          </div>
        )}

        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl",
            },
          }}
          fallbackRedirectUrl="/backoffice"
          signInUrl="/backoffice/sign-in"
        />

        <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
          <strong>📋 Como obter acesso:</strong>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Entre em contato com o administrador</li>
            <li>Solicite a inclusão do seu email na whitelist</li>
            <li>Após aprovação, você poderá criar sua conta</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
