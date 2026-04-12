"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useApiClient } from "@/lib/api/client-hook";
import type { SubscriptionPlan } from "@/lib/api/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Check, X } from "lucide-react";

export default function PlanosPage() {
  const api = useApiClient();
  const apiRef = useRef(api);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiRef.current = api;
  }, [api]);

  const loadPlans = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiRef.current.subscriptionPlans.list();
      setPlans(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar planos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const getBillingPeriodLabel = (
    period: "MONTHLY" | "QUARTERLY" | "SEMIANNUAL" | "ANNUAL"
  ) => {
    const labels = {
      MONTHLY: "Mensal",
      QUARTERLY: "Trimestral",
      SEMIANNUAL: "Semestral",
      ANNUAL: "Anual",
    };
    return labels[period];
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Planos de Assinatura
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Visualizar planos disponíveis ({plans.length} total)
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-200">
          <strong>Erro:</strong> {error}
        </div>
      )}

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              Nenhum plano cadastrado
            </div>
          ) : (
            plans.map((plan) => {
              return (
                <Card
                  key={plan.id}
                  className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
                >
                  <div className="flex-1 p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {plan.name}
                        </h3>
                        <Badge
                          variant={plan.isActive ? "default" : "destructive"}
                          className="mt-2"
                        >
                          {plan.isActive ? (
                            <>
                              <Check className="mr-1 h-3 w-3" />
                              Ativo
                            </>
                          ) : (
                            <>
                              <X className="mr-1 h-3 w-3" />
                              Inativo
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>

                    {plan.description && (
                      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        {plan.description}
                      </p>
                    )}

                    {plan.weeklyFrequency && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Frequência semanal
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {plan.weeklyFrequency} {plan.weeklyFrequency === 1 ? 'treino' : 'treinos'}/semana
                        </p>
                      </div>
                    )}

                    <div className="space-y-2 border-t pt-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Opções de Pagamento:
                      </p>
                      {plan.prices.map((price) => (
                        <div key={price.id} className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            {getBillingPeriodLabel(price.billingPeriod)}:
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {formatPrice(price.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t bg-gray-50 px-6 py-3 dark:bg-gray-900">
                    <Button variant="ghost" size="sm" className="w-full">
                      Ver detalhes
                    </Button>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
