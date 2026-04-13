"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Charge, Payment } from "@/lib/api/payments-types";
import { Printer } from "lucide-react";

interface ReceiptDialogProps {
  charge: Charge;
  payment: Payment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName?: string;
}

export function ReceiptDialog({
  charge,
  payment,
  open,
  onOpenChange,
  studentName = "Aluno",
}: ReceiptDialogProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cents / 100);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const translatePaymentMethod = (method: string) => {
    const methods: Record<string, string> = {
      pix: "PIX",
      credit_card: "Cartão de Crédito",
      debit_card: "Cartão de Débito",
    };
    return methods[method] || method;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Recibo de Pagamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-end print:hidden">
            <Button onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" />
              Imprimir Recibo
            </Button>
          </div>

          <div ref={receiptRef} className="receipt-content rounded-lg border p-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900">OPAM KARATE</h1>
              <p className="text-sm text-gray-600">Recibo de Pagamento</p>
            </div>

            <div className="mb-8 border-b pb-4">
              <p className="text-sm text-gray-600">
                <strong>Recibo Nº:</strong> {payment?.id.substring(0, 8).toUpperCase() || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Data de Emissão:</strong> {formatDate(new Date())}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Hora:</strong> {formatTime(new Date())}
              </p>
            </div>

            {/* Student Info */}
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Dados do Aluno
              </h2>
              <p className="text-gray-700">
                <strong>Nome:</strong> {studentName}
              </p>
              <p className="text-gray-700">
                <strong>ID:</strong> {charge.studentId}
              </p>
            </div>

            {/* Payment Details */}
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Detalhes do Pagamento
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Referência:</span>
                  <span className="font-medium">
                    {String(charge.referenceMonth).padStart(2, "0")}/
                    {charge.referenceYear}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor Original:</span>
                  <span className="font-medium">
                    {formatCurrency(charge.amountInCents)}
                  </span>
                </div>
                {charge.discountInCents > 0 && (
                  <>
                    <div className="flex justify-between text-green-600">
                      <span>Desconto:</span>
                      <span className="font-medium">
                        -{formatCurrency(charge.discountInCents)}
                      </span>
                    </div>
                    {charge.discountReason && (
                      <div className="text-sm text-gray-500">
                        <span>Motivo: {charge.discountReason}</span>
                      </div>
                    )}
                  </>
                )}
                <div className="flex justify-between border-t pt-2 text-lg font-bold">
                  <span>Valor Pago:</span>
                  <span>{formatCurrency(charge.netAmountInCents)}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            {payment && (
              <div className="mb-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Informações do Pagamento
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Método de Pagamento:</span>
                    <span className="font-medium">
                      {translatePaymentMethod(payment.paymentMethod)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data do Pagamento:</span>
                    <span className="font-medium">
                      {formatDate(new Date(payment.paidAt))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor Pago:</span>
                    <span className="font-medium">
                      {formatCurrency(payment.amountPaidInCents)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 border-t pt-4 text-center text-xs text-gray-500">
              <p>Este documento é um comprovante de pagamento.</p>
              <p className="mt-1">
                OPAM KARATE - Todos os direitos reservados
              </p>
              <p className="mt-2">
                Emitido em {formatDate(new Date())} às {formatTime(new Date())}
              </p>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .receipt-content,
            .receipt-content * {
              visibility: visible;
            }
            .receipt-content {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              border: none;
            }
            .print\\:hidden {
              display: none !important;
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
