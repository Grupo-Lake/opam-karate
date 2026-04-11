"use client";

import { useAuth } from "@clerk/nextjs";
import type {
  Student,
  PaginatedStudents,
  SubscriptionPlan,
  CreateStudentDto,
  UpdateStudentDto,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3334";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "An error occurred",
    }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
}

/**
 * Hook para usar a API em Client Components
 * Injeta automaticamente o token de autenticação do Clerk
 */
export function useApiClient() {
  const { getToken } = useAuth();

  const getAuthHeaders = async (): Promise<HeadersInit> => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    try {
      const token = await getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to get auth token:", error);
    }

    return headers;
  };

  return {
    students: {
      list: async (params?: {
        page?: number;
        limit?: number;
      }): Promise<PaginatedStudents> => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.set("page", params.page.toString());
        if (params?.limit) searchParams.set("limit", params.limit.toString());

        const headers = await getAuthHeaders();
        const response = await fetch(
          `${API_URL}/students?${searchParams.toString()}`,
          { headers }
        );
        return handleResponse<PaginatedStudents>(response);
      },

      get: async (id: string): Promise<Student> => {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/students/${id}`, { headers });
        return handleResponse<Student>(response);
      },

      create: async (data: CreateStudentDto): Promise<Student> => {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/students`, {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        });
        return handleResponse<Student>(response);
      },

      update: async (id: string, data: UpdateStudentDto): Promise<Student> => {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/students/${id}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify(data),
        });
        return handleResponse<Student>(response);
      },

      delete: async (id: string): Promise<void> => {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/students/${id}`, {
          method: "DELETE",
          headers,
        });
        if (!response.ok) {
          const error = await response.json().catch(() => ({
            message: "Failed to delete student",
          }));
          throw new Error(error.message);
        }
      },
    },

    subscriptionPlans: {
      list: async (): Promise<SubscriptionPlan[]> => {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/subscription-plans`, { headers });
        return handleResponse<SubscriptionPlan[]>(response);
      },

      get: async (id: string): Promise<SubscriptionPlan> => {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/subscription-plans/${id}`, { headers });
        return handleResponse<SubscriptionPlan>(response);
      },
    },
  };
}
