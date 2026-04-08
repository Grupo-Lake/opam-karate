import type {
  Student,
  StudentListItem,
  PaginatedStudents,
  SubscriptionPlan,
  CreateStudentDto,
  UpdateStudentDto,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3334";

// Helper para tratar erros
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "An error occurred",
    }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
}

// ─── Students ────────────────────────────────────────────────────────────────

export const studentsApi = {
  list: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedStudents> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());

    const response = await fetch(
      `${API_URL}/students?${searchParams.toString()}`,
    );
    return handleResponse<PaginatedStudents>(response);
  },

  get: async (id: string): Promise<Student> => {
    const response = await fetch(`${API_URL}/students/${id}`);
    return handleResponse<Student>(response);
  },

  create: async (data: CreateStudentDto): Promise<Student> => {
    const response = await fetch(`${API_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Student>(response);
  },

  update: async (id: string, data: UpdateStudentDto): Promise<Student> => {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Student>(response);
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Failed to delete student",
      }));
      throw new Error(error.message);
    }
  },
};

// ─── Subscription Plans ──────────────────────────────────────────────────────

export const subscriptionPlansApi = {
  list: async (): Promise<SubscriptionPlan[]> => {
    const response = await fetch(`${API_URL}/subscription-plans`);
    return handleResponse<SubscriptionPlan[]>(response);
  },

  get: async (id: string): Promise<SubscriptionPlan> => {
    const response = await fetch(`${API_URL}/subscription-plans/${id}`);
    return handleResponse<SubscriptionPlan>(response);
  },
};

// ─── Guardians (via Students) ────────────────────────────────────────────────

export const guardiansApi = {
  /**
   * Lista todos os responsáveis únicos extraídos dos alunos
   */
  list: async (): Promise<
    Array<Student["guardian"] & { studentId: string }>
  > => {
    const students = await studentsApi.list({ limit: 100 });
    const guardians = students.data
      .filter((s) => s.guardianId)
      .map((s) => ({
        studentId: s.id,
        guardianId: s.guardianId!,
      }));

    // Buscar detalhes completos dos alunos para obter dados dos guardians
    const uniqueGuardians = new Map();
    for (const item of guardians) {
      if (!uniqueGuardians.has(item.guardianId)) {
        const student = await studentsApi.get(item.studentId);
        if (student.guardian) {
          uniqueGuardians.set(item.guardianId, {
            ...student.guardian,
            studentId: item.studentId,
          });
        }
      }
    }

    return Array.from(uniqueGuardians.values());
  },
};
