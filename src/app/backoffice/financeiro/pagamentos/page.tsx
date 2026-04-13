"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useApiClient } from "@/lib/api/client-hook";
import { useFirebaseAuth } from "@/lib/firebase/hooks";
import type { Payment, PaymentMethod } from "@/lib/api/payments-types";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Loader2, CreditCard, FileSpreadsheet, FileText } from "lucide-react";
import { FinanceiroNav } from "@/components/backoffice/financeiro/FinanceiroNav";
import { Button } from "@/components/ui/button";
import { exportPaymentsExcel, exportPaymentsPDF } from "@/lib/export/reports";
import { toast } from "sonner";

export default function PagamentosPage() {
  const api = useApiClient();
  const apiRef = useRef(api);
  const { isAuthenticated, loading: authLoading } = useFirebaseAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    apiRef.current = api;
  }, [api]);

  const loadPayments = useCallback(async () => {
    if (!isAuthenticated || authLoading) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await apiRef.current.payments.list();
      setPayments(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar pagamentos"
      );
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cents / 100);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPaymentMethodLabel = (method: PaymentMethod) => {
    const labels: Record<PaymentMethod, string> = {
      pix: "PIX",
      credit_card: "Cartão de Crédito",
      debit_card: "Cartão de Débito",
    };
    return labels[method];
  };

  const getPayerTypeLabel = (type: "student" | "guardian") => {
    return type === "student" ? "Aluno" : "Responsável";
  };

  const filteredPayments = payments.filter((payment) => {
    if (!searchTerm) return true;
    return (
      payment.payerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.chargeId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleExportExcel = () => {
    try {
      toast.loading("Gerando arquivo Excel...", { id: "export-excel" });
      exportPaymentsExcel(filteredPayments, "pagamentos");
      toast.success("Arquivo Excel gerado com sucesso!", { id: "export-excel" });
    } catch (err) {
      toast.error("Erro ao gerar arquivo Excel", { id: "export-excel" });
    }
  };

  const handleExportPDF = () => {
    try {
      toast.loading("Gerando relatório PDF...", { id: "export-pdf" });
      exportPaymentsPDF(filteredPayments, "pagamentos");
      toast.success("Relatório PDF gerado com sucesso!", { id: "export-pdf" });
    } catch (err) {
      toast.error("Erro ao gerar relatório PDF", { id: "export-pdf" });
    }
  };

  return (
    <div>
      <FinanceiroNav />
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Pagamentos
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Histórico de pagamentos recebidos ({payments.length} total)
        </p>
      </div>

      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por ID do pagador ou cobrança..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Botões de Exportação */}
        <div className="flex gap-2">
          <Button
            onClick={handleExportExcel}
            disabled={loading || filteredPayments.length === 0}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Exportar Excel
          </Button>
          <Button
            onClick={handleExportPDF}
            disabled={loading || filteredPayments.length === 0}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
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
        <div className="rounded-lg border bg-white dark:bg-gray-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Pagador</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Observações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    Nenhum pagamento encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {formatDate(payment.paidAt)}
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {formatCurrency(payment.amountPaidInCents)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gray-400" />
                        {getPaymentMethodLabel(payment.paymentMethod)}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {payment.payerId}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {getPayerTypeLabel(payment.payerType)}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm text-gray-500">
                      {payment.notes || "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
