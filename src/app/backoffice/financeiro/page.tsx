"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useApiClient } from "@/lib/api/client-hook";
import { useFirebaseAuth } from "@/lib/firebase/hooks";
import type { PaymentStats } from "@/lib/api/payments-types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp, TrendingDown, DollarSign, AlertCircle, FileSpreadsheet, FileText, Download } from "lucide-react";
import { FinanceiroNav } from "@/components/backoffice/financeiro/FinanceiroNav";
import { OverdueChargesAlert, UpcomingChargesNotification } from "@/components/backoffice/financeiro/OverdueChargesAlert";
import { PaymentEvolutionChart } from "@/components/backoffice/financeiro/PaymentEvolutionChart";
import { exportFinancialSummaryPDF } from "@/lib/export/reports";
import { toast } from "sonner";

export default function FinanceiroPage() {
  const api = useApiClient();
  const apiRef = useRef(api);
  const { isAuthenticated, loading: authLoading } = useFirebaseAuth();
  const [stats, setStats] = useState<PaymentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mês/ano atual por padrão
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  useEffect(() => {
    apiRef.current = api;
  }, [api]);

  const loadStats = useCallback(async () => {
    if (!isAuthenticated || authLoading) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await apiRef.current.payments.stats({
        referenceMonth: selectedMonth,
        referenceYear: selectedYear,
      });
      setStats(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar estatísticas"
      );
    } finally {
      setLoading(false);
    }
  }, [selectedMonth, selectedYear, isAuthenticated, authLoading]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cents / 100);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const handleExportPDF = () => {
    if (!stats) return;
    try {
      toast.loading("Gerando relatório PDF...", { id: "export-pdf" });
      exportFinancialSummaryPDF(stats, selectedMonth, selectedYear);
      toast.success("Relatório PDF gerado com sucesso!", { id: "export-pdf" });
    } catch (err) {
      toast.error("Erro ao gerar relatório PDF", { id: "export-pdf" });
    }
  };

  // Mock data para o gráfico de evolução (últimos 6 meses)
  const evolutionData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(selectedYear, selectedMonth - 1 - (5 - i), 1);
    return {
      month: date.toLocaleDateString("pt-BR", { month: "short", year: "2-digit" }),
      revenueInCents: Math.random() * 50000 + 30000,
      paymentsCount: Math.floor(Math.random() * 30 + 10),
      chargesCount: Math.floor(Math.random() * 40 + 15),
    };
  });

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return (
    <div>
      <FinanceiroNav />
      
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Financeiro
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Resumo de cobranças e pagamentos
          </p>
        </div>

        <div className="flex gap-3">
          {/* Seletor de Mês/Ano */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
          >
            {months.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
          >
            {[2024, 2025, 2026].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Botão de Exportação */}
          <Button
            onClick={handleExportPDF}
            disabled={!stats || loading}
            variant="outline"
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Alertas e Notificações */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <OverdueChargesAlert />
        <UpcomingChargesNotification />
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
      ) : stats ? (
        <>
          {/* Resumo Financeiro */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Cobrado
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(stats.totalChargedInCents)}
                  </p>
                </div>
                <DollarSign className="h-10 w-10 text-blue-500" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Recebido
                  </p>
                  <p className="mt-2 text-2xl font-bold text-green-600">
                    {formatCurrency(stats.totalCollectedInCents)}
                  </p>
                </div>
                <TrendingUp className="h-10 w-10 text-green-500" />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Taxa: {formatPercent(stats.collectionRatePercent)}
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Pendente
                  </p>
                  <p className="mt-2 text-2xl font-bold text-yellow-600">
                    {formatCurrency(stats.totalPendingInCents)}
                  </p>
                </div>
                <AlertCircle className="h-10 w-10 text-yellow-500" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Vencido
                  </p>
                  <p className="mt-2 text-2xl font-bold text-red-600">
                    {formatCurrency(stats.totalOverdueInCents)}
                  </p>
                </div>
                <TrendingDown className="h-10 w-10 text-red-500" />
              </div>
            </Card>
          </div>

          {/* Gráfico de Evolução */}
          <div className="mb-6">
            <PaymentEvolutionChart data={evolutionData} type="area" />
          </div>

          {/* Cobranças por Status */}
          <Card className="mb-6 p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Cobranças por Status
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Pendentes
                </p>
                <p className="mt-1 text-xl font-bold text-yellow-600">
                  {stats.chargesByStatus.pending}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pagas</p>
                <p className="mt-1 text-xl font-bold text-green-600">
                  {stats.chargesByStatus.paid}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Vencidas
                </p>
                <p className="mt-1 text-xl font-bold text-red-600">
                  {stats.chargesByStatus.overdue}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Canceladas
                </p>
                <p className="mt-1 text-xl font-bold text-gray-600">
                  {stats.chargesByStatus.cancelled}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Isentas
                </p>
                <p className="mt-1 text-xl font-bold text-gray-600">
                  {stats.chargesByStatus.exempt}
                </p>
              </div>
            </div>
          </Card>

          {/* Receita por Plano */}
          {stats.revenueByPlan.length > 0 && (
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Receita por Plano
              </h3>
              <div className="space-y-3">
                {stats.revenueByPlan.map((plan) => (
                  <div
                    key={plan.planId}
                    className="flex items-center justify-between rounded-lg border p-3 dark:border-gray-700"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Plano {plan.planId}
                      </p>
                      <p className="text-sm text-gray-500">
                        {plan.count} {plan.count === 1 ? 'aluno' : 'alunos'}
                      </p>
                    </div>
                    <Badge variant="default" className="text-lg">
                      {formatCurrency(plan.totalInCents)}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      ) : (
        <div className="flex h-64 items-center justify-center text-gray-500">
          Nenhuma estatística disponível para o período selecionado
        </div>
      )}
    </div>
  );
}
