"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useApiClient } from "@/lib/api/client-hook";
import type { Charge, ChargeStatus } from "@/lib/api/payments-types";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Loader2 } from "lucide-react";
import { FinanceiroNav } from "@/components/backoffice/financeiro/FinanceiroNav";

export default function CobrancasPage() {
  const api = useApiClient();
  const apiRef = useRef(api);
  const router = useRouter();
  const [charges, setCharges] = useState<Charge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ChargeStatus | "">("");

  useEffect(() => {
    apiRef.current = api;
  }, [api]);

  const loadCharges = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiRef.current.charges.list({
        page,
        limit: 20,
        status: statusFilter || undefined,
      });
      setCharges(result.data);
      setTotal(result.total);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar cobranças"
      );
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    loadCharges();
  }, [loadCharges]);

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cents / 100);
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR");
  };

  const getStatusBadge = (status: ChargeStatus) => {
    const variants: Record<
      ChargeStatus,
      { variant: "default" | "secondary" | "destructive" | "outline"; label: string }
    > = {
      pending: { variant: "secondary", label: "Pendente" },
      paid: { variant: "default", label: "Paga" },
      overdue: { variant: "destructive", label: "Vencida" },
      cancelled: { variant: "outline", label: "Cancelada" },
      exempt: { variant: "outline", label: "Isenta" },
    };

    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredCharges = charges.filter((charge) => {
    if (!searchTerm) return true;
    return charge.studentId.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <FinanceiroNav />
      
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Cobranças
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gerenciar cobranças dos alunos ({total} total)
          </p>
        </div>
        <Button
          className="gap-2"
          onClick={() => router.push("/backoffice/financeiro/cobrancas/nova")}
        >
          <Plus className="h-4 w-4" />
          Nova Cobrança
        </Button>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por aluno..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ChargeStatus | "")}
          className="rounded-md border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
        >
          <option value="">Todos os status</option>
          <option value="pending">Pendente</option>
          <option value="paid">Paga</option>
          <option value="overdue">Vencida</option>
          <option value="cancelled">Cancelada</option>
          <option value="exempt">Isenta</option>
        </select>
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
        <>
          <div className="rounded-lg border bg-white dark:bg-gray-800">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mês/Ano</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Valor Original</TableHead>
                  <TableHead>Desconto</TableHead>
                  <TableHead>Valor Líquido</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCharges.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-gray-500"
                    >
                      Nenhuma cobrança encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCharges.map((charge) => (
                    <TableRow key={charge.id}>
                      <TableCell className="font-medium">
                        {charge.referenceMonth.toString().padStart(2, "0")}/
                        {charge.referenceYear}
                      </TableCell>
                      <TableCell>{formatDate(charge.dueDate)}</TableCell>
                      <TableCell>
                        {formatCurrency(charge.amountInCents)}
                      </TableCell>
                      <TableCell>
                        {charge.discountInCents > 0 ? (
                          <span className="text-green-600">
                            -{formatCurrency(charge.discountInCents)}
                          </span>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(charge.netAmountInCents)}
                      </TableCell>
                      <TableCell>{getStatusBadge(charge.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            router.push(
                              `/backoffice/financeiro/cobrancas/${charge.id}`
                            )
                          }
                        >
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {total > 20 && (
            <div className="mt-4 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Anterior
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Página {page} de {Math.ceil(total / 20)}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= Math.ceil(total / 20)}
              >
                Próxima
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
