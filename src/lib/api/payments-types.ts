// Types baseados nos schemas do backend (payments module)

export type ChargeStatus = 'pending' | 'paid' | 'overdue' | 'cancelled' | 'exempt';

export type PaymentMethod = 'pix' | 'credit_card' | 'debit_card';

export type PayerType = 'student' | 'guardian';

// ─── Charge Types ─────────────────────────────────────────────────────────────

export interface Charge {
  id: string;
  studentId: string;
  referenceMonth: number;
  referenceYear: number;
  dueDate: Date;
  amountInCents: number;
  discountInCents: number;
  discountReason: string | null;
  netAmountInCents: number;
  status: ChargeStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedCharges {
  data: Charge[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateChargeDto {
  studentId: string;
  referenceMonth: number;
  referenceYear: number;
  notes?: string | null;
}

export interface UpdateChargeStatusDto {
  status: 'overdue' | 'cancelled' | 'exempt';
}

export interface ApplyDiscountDto {
  discountInCents: number;
  reason: string;
}

export interface ListChargesQuery {
  studentId?: string;
  status?: ChargeStatus;
  referenceMonth?: number;
  referenceYear?: number;
  page?: number;
  limit?: number;
}

// ─── Payment Types ────────────────────────────────────────────────────────────

export interface Payment {
  id: string;
  chargeId: string;
  paymentMethod: PaymentMethod;
  amountPaidInCents: number;
  paidAt: Date;
  payerId: string;
  payerType: PayerType;
  externalReference: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterPaymentDto {
  paymentMethod: PaymentMethod;
  paidAt: string; // ISO 8601 datetime
  payerId: string;
  payerType: PayerType;
  externalReference?: string | null;
  notes?: string | null;
}

export interface ListPaymentsQuery {
  studentId?: string;
  referenceMonth?: number;
  referenceYear?: number;
}

// ─── Payment Stats ────────────────────────────────────────────────────────────

export interface RevenueByPlan {
  planId: string;
  totalInCents: number;
  count: number;
}

export interface PaymentStats {
  referenceMonth: number;
  referenceYear: number;
  totalChargedInCents: number;
  totalCollectedInCents: number;
  totalDiscountInCents: number;
  totalPendingInCents: number;
  totalOverdueInCents: number;
  totalExemptInCents: number;
  collectionRatePercent: number;
  chargesByStatus: {
    pending: number;
    paid: number;
    overdue: number;
    cancelled: number;
    exempt: number;
  };
  revenueByPlan: RevenueByPlan[];
}

export interface StatsQuery {
  referenceMonth: number;
  referenceYear: number;
}
