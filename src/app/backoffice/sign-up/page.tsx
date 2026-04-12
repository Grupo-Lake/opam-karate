'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    // Com Firebase/Google Sign-In, não há página de sign-up separada
    // Redireciona para sign-in onde o usuário pode fazer login com Google
    router.replace('/backoffice/sign-in');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecionando...</p>
      </div>
    </div>
  );
}
