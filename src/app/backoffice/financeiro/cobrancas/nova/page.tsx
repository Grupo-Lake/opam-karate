"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useApiClient } from "@/lib/api/client-hook";
import type { StudentListItem } from "@/lib/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function NovaCobrancaPage() {
  const router = useRouter();
  const api = useApiClient();
  const apiRef = useRef(api);

  const [students, setStudents] = useState<StudentListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    studentId: "",
    referenceMonth: new Date().getMonth() + 1,
    referenceYear: new Date().getFullYear(),
    notes: "",
  });

  useEffect(() => {
    apiRef.current = api;
  }, [api]);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const result = await apiRef.current.students.list({ limit: 100 });
        setStudents(result.data);
      } catch (err) {
        console.error("Erro ao carregar alunos:", err);
      }
    };
    loadStudents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiRef.current.charges.create({
        studentId: formData.studentId,
        referenceMonth: formData.referenceMonth,
        referenceYear: formData.referenceYear,
        notes: formData.notes || null,
      });

      alert("Cobrança criada com sucesso!");
      router.push("/backoffice/financeiro/cobrancas");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar cobrança");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => router.push("/backoffice/financeiro/cobrancas")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <Card className="max-w-2xl p-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Nova Cobrança
        </h2>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-200">
            <strong>Erro:</strong> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="studentId">Aluno *</Label>
            <select
              id="studentId"
              value={formData.studentId}
              onChange={(e) =>
                setFormData({ ...formData, studentId: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
              required
            >
              <option value="">Selecione um aluno</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.fullName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="referenceMonth">Mês de Referência *</Label>
              <select
                id="referenceMonth"
                value={formData.referenceMonth}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    referenceMonth: parseInt(e.target.value),
                  })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                required
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {month.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="referenceYear">Ano de Referência *</Label>
              <Input
                id="referenceYear"
                type="number"
                min="2020"
                max="2100"
                value={formData.referenceYear}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    referenceYear: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              maxLength={500}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Criar Cobrança
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/backoffice/financeiro/cobrancas")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
