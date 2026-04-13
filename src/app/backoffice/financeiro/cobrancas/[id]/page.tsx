"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApiClient } from "@/lib/api/client-hook";
import type { Charge, ChargeStatus } from "@/lib/api/payments-types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "sonner";
import {
  ArrowLeft,
  Loader2,
  DollarSign,
  Calendar,
} from "lucide-react";

export default function ChargeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const api = useApiClient();
  const apiRef = useRef(api);
  const chargeId = params.id as string;

  const [charge, setCharge] = useState<Charge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Estados para ações
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showDiscountForm, setShowDiscountForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit_card" | "debit_card">("pix");
  const [payerId, setPayerId] = useState("");
  const [payerType, setPayerType] = useState<"student" | "guardian">("student");
  const [discountAmount, setDiscountAmount] = useState("");
  const [discountReason, setDiscountReason] = useState("");

  // Estados para confirmações
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    action: () => Promise<void>;
    variant?: "default" | "destructive";
  }>({
    open: false,
    title: "",
    description: "",
    action: async () => {},
  });

  useEffect(() => {
    apiRef.current = api;
  }, [api]);

  const loadCharge = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiRef.current.charges.get(chargeId);
      setCharge(result);
      if (result.studentId) {
        setPayerId(result.studentId);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar cobrança"
      );
    } finally {
      setLoading(false);
    }
  }, [chargeId]);

  useEffect(() => {
    loadCharge();
  }, [loadCharge]);

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cents / 100);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR");
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

  const handleRegisterPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!charge) return;

    try {
      setActionLoading(true);
      setError(null);

      toast.loading("Registrando pagamento...", { id: "register-payment" });

      await apiRef.current.charges.registerPayment(chargeId, {
        paymentMethod,
        paidAt: new Date().toISOString(),
        payerId,
        payerType,
      });

      toast.success("Pagamento registrado com sucesso!", { id: "register-payment" });
      setShowPaymentForm(false);
      loadCharge();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao registrar pagamento";
      toast.error(errorMessage, { id: "register-payment" });
      setError(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  const handleApplyDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!charge) return;

    try {
      setActionLoading(true);
      setError(null);

      toast.loading("Aplicando desconto...", { id: "apply-discount" });

      const discountInCents = parseFloat(discountAmount) * 100;
      await apiRef.current.charges.applyDiscount(chargeId, {
        discountInCents,
        reason: discountReason,
      });

      toast.success("Desconto aplicado com sucesso!", { id: "apply-discount" });
      setShowDiscountForm(false);
      setDiscountAmount("");
      setDiscountReason("");
      loadCharge();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao aplicar desconto";
      toast.error(errorMessage, { id: "apply-discount" });
      setError(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateStatus = (status: "overdue" | "cancelled" | "exempt") => {
    const statusLabels = {
      overdue: "vencida",
      cancelled: "cancelada",
      exempt: "isenta",
    };

    const statusMessages = {
      overdue: {
        title: "Marcar como Vencida",
        description: "Tem certeza que deseja marcar esta cobrança como vencida?",
      },
      cancelled: {
        title: "Cancelar Cobrança",
        description: "Tem certeza que deseja cancelar esta cobrança? Esta ação não pode ser desfeita.",
        variant: "destructive" as const,
      },
      exempt: {
        title: "Isentar Cobrança",
        description: "Tem certeza que deseja isentar esta cobrança?",
      },
    };

    const config = statusMessages[status];

    setConfirmDialog({
      open: true,
      title: config.title,
      description: config.description,
      variant: config.variant,
      action: async () => {
        try {
          setActionLoading(true);
          toast.loading(`Atualizando status...`, { id: "update-status" });

          await apiRef.current.charges.updateStatus(chargeId, { status });

          toast.success(`Cobrança marcada como ${statusLabels[status]}!`, { id: "update-status" });
          setConfirmDialog({ ...confirmDialog, open: false });
          loadCharge();
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar status";
          toast.error(errorMessage, { id: "update-status" });
          setError(errorMessage);
        } finally {
          setActionLoading(false);
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error && !charge) {
    return (
      <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center gap-4">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <Button
          variant="outline"
          onClick={() => router.push("/backoffice/financeiro/cobrancas")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Cobranças
        </Button>
      </div>
    );
  }

  if (!charge) return null;

  return (
    <div>
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/backoffice/financeiro/cobrancas")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Cobranças
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Cobrança {charge.referenceMonth.toString().padStart(2, "0")}/
              {charge.referenceYear}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Vencimento: {formatDate(charge.dueDate)}
            </p>
          </div>
          {getStatusBadge(charge.status)}
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-200">
          <strong>Erro:</strong> {error}
        </div>
      )}

      {/* Informações da Cobrança */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
            <DollarSign className="mr-2 h-5 w-5" />
            Valores
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Valor Original
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(charge.amountInCents)}
              </p>
            </div>
            {charge.discountInCents > 0 && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Desconto
                </p>
                <p className="text-lg font-semibold text-green-600">
                  -{formatCurrency(charge.discountInCents)}
                </p>
                {charge.discountReason && (
                  <p className="text-sm text-gray-500">{charge.discountReason}</p>
                )}
              </div>
            )}
            <div className="border-t pt-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Valor Líquido
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(charge.netAmountInCents)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
            <Calendar className="h-5 w-5 mr-2" />
            Informações
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Aluno ID</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {charge.studentId}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Período de Referência
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {charge.referenceMonth.toString().padStart(2, "0")}/
                {charge.referenceYear}
              </p>
            </div>
            {charge.notes && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Observações
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {charge.notes}
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Ações */}
      {charge.status === "pending" && (
        <Card className="mb-6 p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Ações
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setShowPaymentForm(!showPaymentForm)}>
              Registrar Pagamento
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowDiscountForm(!showDiscountForm)}
            >
              Aplicar Desconto
            </Button>
            <Button
              variant="outline"
              onClick={() => handleUpdateStatus("overdue")}
              disabled={actionLoading}
            >
              Marcar como Vencida
            </Button>
            <Button
              variant="outline"
              onClick={() => handleUpdateStatus("cancelled")}
              disabled={actionLoading}
            >
              Cancelar
            </Button>
            <Button
              variant="outline"
              onClick={() => handleUpdateStatus("exempt")}
              disabled={actionLoading}
            >
              Isentar
            </Button>
          </div>

          {/* Formulário de Pagamento */}
          {showPaymentForm && (
            <form onSubmit={handleRegisterPayment} className="mt-6 space-y-4 border-t pt-6">
              <h4 className="font-semibold">Registrar Pagamento</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="paymentMethod">Método de Pagamento</Label>
                  <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                    required
                  >
                    <option value="pix">PIX</option>
                    <option value="credit_card">Cartão de Crédito</option>
                    <option value="debit_card">Cartão de Débito</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="payerType">Tipo de Pagador</Label>
                  <select
                    id="payerType"
                    value={payerType}
                    onChange={(e) => setPayerType(e.target.value as any)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                    required
                  >
                    <option value="student">Aluno</option>
                    <option value="guardian">Responsável</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="payerId">ID do Pagador</Label>
                  <Input
                    id="payerId"
                    value={payerId}
                    onChange={(e) => setPayerId(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={actionLoading}>
                  {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirmar Pagamento"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPaymentForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}

          {/* Formulário de Desconto */}
          {showDiscountForm && (
            <form onSubmit={handleApplyDiscount} className="mt-6 space-y-4 border-t pt-6">
              <h4 className="font-semibold">Aplicar Desconto</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="discountAmount">Valor do Desconto (R$)</Label>
                  <Input
                    id="discountAmount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="discountReason">Motivo</Label>
                  <Input
                    id="discountReason"
                    value={discountReason}
                    onChange={(e) => setDiscountReason(e.target.value)}
                    maxLength={255}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={actionLoading}>
                  {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Aplicar Desconto"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDiscountForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </Card>
      )}

      {/* Dialog de Confirmação */}
      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        onConfirm={confirmDialog.action}
        title={confirmDialog.title}
        description={confirmDialog.description}
        variant={confirmDialog.variant}
        loading={actionLoading}
      />
    </div>
  );
}
