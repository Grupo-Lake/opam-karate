"use client";

import { useFirebaseAuth } from "@/lib/firebase/hooks";
import { useCallback, useMemo } from "react";
import type {
  Student,
  PaginatedStudents,
  SubscriptionPlan,
  CreateStudentDto,
  UpdateStudentDto,
} from "./types";
import type {
  Charge,
  PaginatedCharges,
  CreateChargeDto,
  UpdateChargeStatusDto,
  ApplyDiscountDto,
  ListChargesQuery,
  Payment,
  RegisterPaymentDto,
  ListPaymentsQuery,
  PaymentStats,
  StatsQuery,
} from "./payments-types";

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
      console.error(
        "❌ Error Data (stringified):",
        JSON.stringify(errorData, null, 2),
      );

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
 * Injeta automaticamente o token de autenticação do Firebase
 */
export function useApiClient() {
  const { getToken } = useFirebaseAuth();

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
  return useMemo(
    () => ({
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
            { headers },
          );
          return handleResponse<PaginatedStudents>(response);
        },

        get: async (id: string): Promise<Student> => {
          const headers = await getAuthHeaders();
          const response = await fetch(`${API_URL}/students/${id}`, {
            headers,
          });
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
              Authorization: (headers as Record<string, string>)[
                "Authorization"
              ]
                ? "Bearer [TOKEN]"
                : "Missing",
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

        update: async (
          id: string,
          data: UpdateStudentDto,
        ): Promise<Student> => {
          const headers = await getAuthHeaders();
          const url = `${API_URL}/students/${id}`;

          console.log("🔄 PATCH Request:", {
            url,
            method: "PATCH",
            headers: {
              ...headers,
              Authorization: (headers as Record<string, string>)[
                "Authorization"
              ]
                ? "Bearer [TOKEN]"
                : "Missing",
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
          const response = await fetch(`${API_URL}/subscription-plans`, {
            headers,
          });
          return handleResponse<SubscriptionPlan[]>(response);
        },

        get: async (id: string): Promise<SubscriptionPlan> => {
          const headers = await getAuthHeaders();
          const response = await fetch(`${API_URL}/subscription-plans/${id}`, {
            headers,
          });
          return handleResponse<SubscriptionPlan>(response);
        },
      },

      guardians: {
        list: async (): Promise<
          Array<NonNullable<Student["guardian"]> & { studentId: string }>
        > => {
          console.log("📋 Iniciando listagem de guardians...");

          try {
            const headers = await getAuthHeaders();

            // Buscar todos os alunos (limit máximo é 100 no backend)
            console.log("🔍 Buscando alunos com guardians...");
            const studentsUrl = `${API_URL}/students?limit=100`;
            console.log("📡 URL:", studentsUrl);

            const studentsResponse = await fetch(studentsUrl, { headers });

            if (!studentsResponse.ok) {
              console.error("❌ Erro ao buscar alunos:", {
                status: studentsResponse.status,
                statusText: studentsResponse.statusText,
              });

              const errorData = await studentsResponse.json().catch(() => null);
              console.error("❌ Detalhes do erro:", errorData);

              throw new Error(
                errorData?.message ||
                  `Erro ao buscar alunos: ${studentsResponse.statusText} (${studentsResponse.status})`,
              );
            }

            const studentsData =
              await handleResponse<PaginatedStudents>(studentsResponse);
            console.log(
              `✅ ${studentsData.data.length} alunos encontrados (total: ${studentsData.total})`,
            );

            // Buscar detalhes completos dos alunos que têm guardian
            const studentsWithGuardians = studentsData.data.filter(
              (s) => s.guardianId,
            );
            console.log(
              `👨‍👩‍👧 ${studentsWithGuardians.length} alunos têm guardians`,
            );

            if (studentsWithGuardians.length === 0) {
              console.log("⚠️ Nenhum aluno com guardian cadastrado");
              return [];
            }

            const uniqueGuardians = new Map<
              string,
              NonNullable<Student["guardian"]> & { studentId: string }
            >();

            // Buscar detalhes de cada aluno para pegar os dados do guardian
            console.log(
              `🔄 Buscando detalhes de ${studentsWithGuardians.length} alunos...`,
            );

            for (const student of studentsWithGuardians) {
              try {
                console.log(`  📖 Buscando aluno ${student.id}...`);

                const studentResponse = await fetch(
                  `${API_URL}/students/${student.id}`,
                  { headers },
                );

                if (!studentResponse.ok) {
                  console.error(`  ❌ Erro ao buscar aluno ${student.id}:`, {
                    status: studentResponse.status,
                    statusText: studentResponse.statusText,
                  });
                  continue;
                }

                const fullStudent =
                  await handleResponse<Student>(studentResponse);

                if (
                  fullStudent.guardian &&
                  !uniqueGuardians.has(fullStudent.guardian.id)
                ) {
                  console.log(
                    `  ✅ Guardian encontrado: ${fullStudent.guardian.fullName}`,
                  );
                  uniqueGuardians.set(fullStudent.guardian.id, {
                    ...fullStudent.guardian,
                    studentId: fullStudent.id,
                  });
                }
              } catch (error) {
                console.error(
                  `  ❌ Erro ao processar aluno ${student.id}:`,
                  error,
                );
              }
            }

            const guardiansList = Array.from(uniqueGuardians.values());
            console.log(
              `✅ Total de guardians únicos encontrados: ${guardiansList.length}`,
            );

            return guardiansList;
          } catch (error) {
            console.error("❌ Erro fatal ao listar guardians:", error);
            throw error;
          }
        },
      },

      charges: {
        list: async (query?: ListChargesQuery): Promise<PaginatedCharges> => {
          const searchParams = new URLSearchParams();
          if (query?.studentId) searchParams.set("studentId", query.studentId);
          if (query?.status) searchParams.set("status", query.status);
          if (query?.referenceMonth) searchParams.set("referenceMonth", query.referenceMonth.toString());
          if (query?.referenceYear) searchParams.set("referenceYear", query.referenceYear.toString());
          if (query?.page) searchParams.set("page", query.page.toString());
          if (query?.limit) searchParams.set("limit", query.limit.toString());

          const headers = await getAuthHeaders();
          const response = await fetch(
            `${API_URL}/charges?${searchParams.toString()}`,
            { headers },
          );
          return handleResponse<PaginatedCharges>(response);
        },

        get: async (id: string): Promise<Charge> => {
          const headers = await getAuthHeaders();
          const response = await fetch(`${API_URL}/charges/${id}`, {
            headers,
          });
          return handleResponse<Charge>(response);
        },

        create: async (data: CreateChargeDto): Promise<Charge> => {
          const headers = await getAuthHeaders();
          const response = await fetch(`${API_URL}/charges`, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
          });
          return handleResponse<Charge>(response);
        },

        updateStatus: async (
          id: string,
          data: UpdateChargeStatusDto,
        ): Promise<Charge> => {
          const headers = await getAuthHeaders();
          const response = await fetch(`${API_URL}/charges/${id}/status`, {
            method: "PATCH",
            headers,
            body: JSON.stringify(data),
          });
          return handleResponse<Charge>(response);
        },

        applyDiscount: async (
          id: string,
          data: ApplyDiscountDto,
        ): Promise<Charge> => {
          const headers = await getAuthHeaders();
          const response = await fetch(`${API_URL}/charges/${id}/discount`, {
            method: "PATCH",
            headers,
            body: JSON.stringify(data),
          });
          return handleResponse<Charge>(response);
        },

        registerPayment: async (
          id: string,
          data: RegisterPaymentDto,
        ): Promise<Payment> => {
          const headers = await getAuthHeaders();
          const response = await fetch(`${API_URL}/charges/${id}/payment`, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
          });
          return handleResponse<Payment>(response);
        },
      },

      payments: {
        list: async (query?: ListPaymentsQuery): Promise<Payment[]> => {
          const searchParams = new URLSearchParams();
          if (query?.studentId) searchParams.set("studentId", query.studentId);
          if (query?.referenceMonth) searchParams.set("referenceMonth", query.referenceMonth.toString());
          if (query?.referenceYear) searchParams.set("referenceYear", query.referenceYear.toString());

          const headers = await getAuthHeaders();
          const response = await fetch(
            `${API_URL}/payments?${searchParams.toString()}`,
            { headers },
          );
          return handleResponse<Payment[]>(response);
        },

        stats: async (query: StatsQuery): Promise<PaymentStats> => {
          const searchParams = new URLSearchParams();
          searchParams.set("referenceMonth", query.referenceMonth.toString());
          searchParams.set("referenceYear", query.referenceYear.toString());

          const headers = await getAuthHeaders();
          const response = await fetch(
            `${API_URL}/payments/stats?${searchParams.toString()}`,
            { headers },
          );
          return handleResponse<PaymentStats>(response);
        },
      },
    }),
    [getAuthHeaders],
  ); // Atualiza quando getAuthHeaders mudar (que muda quando getToken mudar)
}
