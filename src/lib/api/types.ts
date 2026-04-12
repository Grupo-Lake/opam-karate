// Types baseados nos schemas do backend
export interface Address {
  id: string;
  street: string;
  number: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Guardian {
  id: string;
  fullName: string;
  birthDate: Date;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  fullName: string;
  birthDate: Date;
  termsAccepted: boolean;
  subscriptionPlanId: string;
  createdAt: Date;
  updatedAt: Date;
  address: Address;
  guardian: Guardian | null;
}

export interface StudentListItem {
  id: string;
  fullName: string;
  birthDate: Date;
  termsAccepted: boolean;
  subscriptionPlanId: string;
  guardianId: string | null;
  addressId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedStudents {
  data: StudentListItem[];
  total: number;
  page: number;
  limit: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string | null;
  weeklyFrequency: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  prices: PlanPrice[];
}

export interface PlanPrice {
  id: string;
  subscriptionPlanId: string;
  amount: number;
  billingPeriod: 'MONTHLY' | 'QUARTERLY' | 'SEMIANNUAL' | 'ANNUAL';
  currency: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateStudentDto {
  fullName: string;
  birthDate: string;
  termsAccepted: true;
  subscriptionPlanId: string;
  guardian?: {
    fullName: string;
    birthDate: string;
    phone: string;
  } | null;
  address: {
    street: string;
    number: string;
    zipCode: string;
  };
}

export interface UpdateStudentDto {
  fullName?: string;
  birthDate?: string;
  termsAccepted?: true;
  subscriptionPlanId?: string;
  guardian?: Partial<{
    fullName: string;
    birthDate: string;
    phone: string;
  }> | null;
  address?: Partial<{
    street: string;
    number: string;
    zipCode: string;
  }>;
}
