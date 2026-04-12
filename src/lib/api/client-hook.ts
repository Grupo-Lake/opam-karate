"use client";

import { useAuth } from "@clerk/nextjs";
import { useCallback, useMemo } from "react";
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
    let errorMessage = `HTTP ${response.status}`;
    
    try {
      const errorData = await response.json();
      console.error("❌ API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      });
      console.error("❌ Error Data (stringified):", JSON.stringify(errorData, null, 2));
      
      // NestJS retorna erros em formato específico
      // Tentar extrair mensagem de erro de diferentes formatos
      if (errorData.message) {
        if (Array.isArray(errorData.message)) {
          // Mensagens de validação do class-validator (array)
          errorMessage = errorData.message.join("; ");
        } else if (typeof errorData.message === "string") {
          // Mensagem simples
          errorMessage = errorData.message;
        }
      } else if (errorData.error) {
        errorMessage = errorData.error;
      } else if (typeof errorData === "string") {
        errorMessage = errorData;
      }
      
      // Se tiver detalhes de validação extras, adicionar
      if (errorData.errors && Array.isArray(errorData.errors)) {
        errorMessage += " | Detalhes: " + errorData.errors.join("; ");
      }
      
      // Se ainda estiver genérico, adicionar o status text
      if (errorMessage === `HTTP ${response.status}` && response.statusText) {
        errorMessage = `${response.statusText} (${response.status})`;
      }
      
      console.error("❌ Mensagem de erro extraída:", errorMessage);
    } catch (parseError) {
      console.error("❌ Failed to parse error response:", parseError);
      errorMessage = `${response.statusText || "Request failed"} (${response.status})`;
    }
    
    throw new Error(errorMessage);
  }
  return response.json();
}

/**
 * Hook para usar a API em Client Components
 * Injeta automaticamente o token de autenticação do Clerk
 */
export function useApiClient() {
  const { getToken } = useAuth();

  // Memoiza a função de obter headers para evitar recriações
  const getAuthHeaders = useCallback(async (): Promise<HeadersInit> => {
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
  }, [getToken]);

  // Memoriza o retorno para evitar recriações e loops
  return useMemo(() => ({
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
        const url = `${API_URL}/students`;
        
        console.log("🚀 POST Request:", {
          url,
          method: "POST",
          headers: {
            ...headers,
            Authorization: (headers as Record<string, string>)["Authorization"] ? "Bearer [TOKEN]" : "Missing",
          },
          body: data,
        });
        
        const response = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        });
        
        return handleResponse<Student>(response);
      },

      update: async (id: string, data: UpdateStudentDto): Promise<Student> => {
        const headers = await getAuthHeaders();
        const url = `${API_URL}/students/${id}`;
        
        console.log("🔄 PATCH Request:", {
          url,
          method: "PATCH",
          headers: {
            ...headers,
            Authorization: (headers as Record<string, string>)["Authorization"] ? "Bearer [TOKEN]" : "Missing",
          },
          body: data,
        });
        
        const response = await fetch(url, {
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
  }), [getAuthHeaders]); // Atualiza quando getAuthHeaders mudar (que muda quando getToken mudar)
}
