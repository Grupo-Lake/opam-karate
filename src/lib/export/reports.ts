import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Charge, Payment, PaymentStats } from "@/lib/api/payments-types";

// ========== EXCEL EXPORT ==========

export function exportChargesExcel(charges: Charge[], filename: string = "cobrancas") {
  const data = charges.map((charge) => ({
    ID: charge.id,
    "Aluno ID": charge.studentId,
    "Mês/Ano": `${String(charge.referenceMonth).padStart(2, "0")}/${charge.referenceYear}`,
    "Valor Original (R$)": (charge.amountInCents / 100).toFixed(2),
    "Desconto (R$)": (charge.discountInCents / 100).toFixed(2),
    "Valor Líquido (R$)": (charge.netAmountInCents / 100).toFixed(2),
    Status: translateStatus(charge.status),
    Vencimento: new Date(charge.dueDate).toLocaleDateString("pt-BR"),
    "Criado em": new Date(charge.createdAt).toLocaleDateString("pt-BR"),
    Observações: charge.notes || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Cobranças");

  // Auto-width columns
  const maxWidth = 50;
  const colWidths = Object.keys(data[0] || {}).map((key) => ({
    wch: Math.min(
      maxWidth,
      Math.max(
        key.length,
        ...data.map((row) => String(row[key as keyof typeof row]).length)
      )
    ),
  }));
  worksheet["!cols"] = colWidths;

  XLSX.writeFile(workbook, `${filename}_${getDateString()}.xlsx`);
}

export function exportPaymentsExcel(payments: Payment[], filename: string = "pagamentos") {
  const data = payments.map((payment) => ({
    ID: payment.id,
    "Cobrança ID": payment.chargeId,
    "Valor Pago (R$)": (payment.amountPaidInCents / 100).toFixed(2),
    "Método de Pagamento": translatePaymentMethod(payment.paymentMethod),
    "Pago em": new Date(payment.paidAt).toLocaleDateString("pt-BR"),
    "Tipo de Pagador": payment.payerType === "student" ? "Aluno" : "Responsável",
    "Pagador ID": payment.payerId,
    "Registrado em": new Date(payment.createdAt).toLocaleDateString("pt-BR"),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pagamentos");

  // Auto-width columns
  const maxWidth = 50;
  const colWidths = Object.keys(data[0] || {}).map((key) => ({
    wch: Math.min(
      maxWidth,
      Math.max(
        key.length,
        ...data.map((row) => String(row[key as keyof typeof row]).length)
      )
    ),
  }));
  worksheet["!cols"] = colWidths;

  XLSX.writeFile(workbook, `${filename}_${getDateString()}.xlsx`);
}

// ========== PDF EXPORT ==========

export function exportChargesPDF(charges: Charge[], filename: string = "cobrancas") {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.text("Relatório de Cobranças", 14, 22);
  doc.setFontSize(11);
  doc.text(`Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, 14, 30);

  // Table
  autoTable(doc, {
    startY: 35,
    head: [
      [
        "Mês/Ano",
        "Valor Original",
        "Desconto",
        "Valor Líquido",
        "Status",
        "Vencimento",
      ],
    ],
    body: charges.map((charge) => [
      `${String(charge.referenceMonth).padStart(2, "0")}/${charge.referenceYear}`,
      `R$ ${(charge.amountInCents / 100).toFixed(2)}`,
      `R$ ${(charge.discountInCents / 100).toFixed(2)}`,
      `R$ ${(charge.netAmountInCents / 100).toFixed(2)}`,
      translateStatus(charge.status),
      new Date(charge.dueDate).toLocaleDateString("pt-BR"),
    ]),
    theme: "grid",
    headStyles: { fillColor: [59, 130, 246] },
    styles: { fontSize: 9 },
  });

  doc.save(`${filename}_${getDateString()}.pdf`);
}

export function exportPaymentsPDF(payments: Payment[], filename: string = "pagamentos") {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.text("Relatório de Pagamentos", 14, 22);
  doc.setFontSize(11);
  doc.text(`Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, 14, 30);

  // Table
  autoTable(doc, {
    startY: 35,
    head: [
      [
        "Cobrança ID",
        "Valor Pago",
        "Método",
        "Pago em",
        "Tipo Pagador",
      ],
    ],
    body: payments.map((payment) => [
      payment.chargeId.substring(0, 8) + "...",
      `R$ ${(payment.amountPaidInCents / 100).toFixed(2)}`,
      translatePaymentMethod(payment.paymentMethod),
      new Date(payment.paidAt).toLocaleDateString("pt-BR"),
      payment.payerType === "student" ? "Aluno" : "Responsável",
    ]),
    theme: "grid",
    headStyles: { fillColor: [59, 130, 246] },
    styles: { fontSize: 9 },
  });

  doc.save(`${filename}_${getDateString()}.pdf`);
}

export function exportFinancialSummaryPDF(stats: PaymentStats, month: number, year: number) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.text("Relatório Financeiro", 14, 22);
  doc.setFontSize(12);
  doc.text(`Período: ${String(month).padStart(2, "0")}/${year}`, 14, 30);
  doc.text(`Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, 14, 37);

  // Summary boxes
  let y = 50;
  
  doc.setFontSize(14);
  doc.text("Resumo Geral", 14, y);
  y += 10;

  const totalCharges = Object.values(stats.chargesByStatus).reduce((sum, count) => sum + count, 0);
  const totalPayments = stats.chargesByStatus.paid;

  doc.setFontSize(11);
  doc.text(`Total de Cobranças: ${totalCharges}`, 14, y);
  y += 7;
  doc.text(`Total de Pagamentos: ${totalPayments}`, 14, y);
  y += 7;
  doc.text(`Receita Total: R$ ${(stats.totalCollectedInCents / 100).toFixed(2)}`, 14, y);
  y += 7;
  doc.text(`Pendente: R$ ${(stats.totalPendingInCents / 100).toFixed(2)}`, 14, y);
  y += 7;
  doc.text(`Vencido: R$ ${(stats.totalOverdueInCents / 100).toFixed(2)}`, 14, y);
  y += 7;
  doc.text(`Taxa de Cobrança: ${stats.collectionRatePercent.toFixed(1)}%`, 14, y);
  y += 15;

  // Revenue by plan
  if (stats.revenueByPlan && stats.revenueByPlan.length > 0) {
    doc.setFontSize(14);
    doc.text("Receita por Plano", 14, y);
    y += 5;

    autoTable(doc, {
      startY: y,
      head: [["Plano ID", "Receita"]],
      body: stats.revenueByPlan.map((item) => [
        item.planId,
        `R$ ${(item.totalInCents / 100).toFixed(2)}`,
      ]),
      theme: "grid",
      headStyles: { fillColor: [59, 130, 246] },
    });
  }

  doc.save(`relatorio_financeiro_${month}_${year}_${getDateString()}.pdf`);
}

// ========== HELPER FUNCTIONS ==========

function translateStatus(status: string): string {
  const statusMap: Record<string, string> = {
    pending: "Pendente",
    paid: "Pago",
    overdue: "Vencido",
    cancelled: "Cancelado",
    exempt: "Isento",
  };
  return statusMap[status] || status;
}

function translatePaymentMethod(method: string): string {
  const methodMap: Record<string, string> = {
    pix: "PIX",
    credit_card: "Cartão de Crédito",
    debit_card: "Cartão de Débito",
  };
  return methodMap[method] || method;
}

function getDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}
