import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, UserCheck, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";

export default async function BackofficePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/backoffice/sign-in");
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Painel Administrativo
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Gerencie alunos, responsáveis e planos de assinatura
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Card: Alunos */}
        <Link href="/backoffice/alunos">
          <Card className="overflow-hidden transition-shadow hover:shadow-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                      Alunos
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      Gerenciar cadastros
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Card>
        </Link>

        {/* Card: Responsáveis */}
        <Link href="/backoffice/responsaveis">
          <Card className="overflow-hidden transition-shadow hover:shadow-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserCheck className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                      Responsáveis
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      Ver cadastros
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Card>
        </Link>

        {/* Card: Planos */}
        <Link href="/backoffice/planos">
          <Card className="overflow-hidden transition-shadow hover:shadow-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                      Planos
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      Assinaturas
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
