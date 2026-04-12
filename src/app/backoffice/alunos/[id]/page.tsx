"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApiClient } from "@/lib/api/client-hook";
import type { Student, SubscriptionPlan } from "@/lib/api/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Pencil, Trash2, Calendar, MapPin, Phone, User, CreditCard } from "lucide-react";
import { StudentFormSheet } from "@/components/backoffice/alunos/StudentFormSheet";
import { DeleteStudentDialog } from "@/components/backoffice/alunos/DeleteStudentDialog";

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const api = useApiClient();
  const studentId = params.id as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const loadStudent = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.students.get(studentId);
      setStudent(result);
      
      // Buscar detalhes do plano
      try {
        const planResult = await api.subscriptionPlans.get(result.subscriptionPlanId);
        setPlan(planResult);
      } catch (planError) {
        console.error("Erro ao carregar plano:", planError);
        // Não bloqueia a página se falhar ao carregar o plano
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar aluno");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getUTCFullYear() - birth.getUTCFullYear();
    const monthDiff = today.getUTCMonth() - birth.getUTCMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getUTCDate() < birth.getUTCDate())) {
      age--;
    }
    return age;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const getBillingPeriodLabel = (period: "MONTHLY" | "QUARTERLY" | "YEARLY") => {
    const labels = {
      MONTHLY: "Mensal",
      QUARTERLY: "Trimestral",
      YEARLY: "Anual",
    };
    return labels[period] || "Não especificado";
  };

  const handleDeleteSuccess = () => {
    router.push("/backoffice/alunos");
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center gap-4">
        <p className="text-red-600 dark:text-red-400">
          {error || "Aluno não encontrado"}
        </p>
        <Button variant="outline" onClick={() => router.push("/backoffice/alunos")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Alunos
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/backoffice/alunos")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Alunos
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {student.fullName}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {calculateAge(student.birthDate)} anos · {formatDate(student.birthDate)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditOpen(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Informações Gerais */}
        <Card className="p-6">
          <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
            <User className="mr-2 h-5 w-5" />
            Informações Gerais
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Nome Completo</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {student.fullName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Data de Nascimento</p>
              <p className="flex items-center font-medium text-gray-900 dark:text-white">
                <Calendar className="mr-2 h-4 w-4" />
                {formatDate(student.birthDate)} ({calculateAge(student.birthDate)} anos)
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <div className="mt-1">
                {student.termsAccepted ? (
                  <Badge>Ativo</Badge>
                ) : (
                  <Badge variant="destructive">Pendente</Badge>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Data de Cadastro</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatDate(student.createdAt)}
              </p>
            </div>
            {student.updatedAt !== student.createdAt && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Última Atualização
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatDate(student.updatedAt)}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Endereço */}
        <Card className="p-6">
          <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
            <MapPin className="mr-2 h-5 w-5" />
            Endereço
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Logradouro</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {student.address.street}, {student.address.number}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">CEP</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {student.address.zipCode}
              </p>
            </div>
          </div>
        </Card>

        {/* Responsável */}
        {student.guardian ? (
          <Card className="p-6">
            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <User className="mr-2 h-5 w-5" />
              Responsável
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Nome Completo</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {student.guardian.fullName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Data de Nascimento</p>
                <p className="flex items-center font-medium text-gray-900 dark:text-white">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(student.guardian.birthDate)} (
                  {calculateAge(student.guardian.birthDate)} anos)
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Telefone</p>
                <p className="flex items-center font-medium text-gray-900 dark:text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  {student.guardian.phone}
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-6">
            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <User className="mr-2 h-5 w-5" />
              Responsável
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Nenhum responsável cadastrado
            </p>
          </Card>
        )}

        {/* Plano */}
        <Card className="p-6">
          <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
            <CreditCard className="mr-2 h-5 w-5" />
            Plano de Assinatura
          </h3>
          {plan ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Nome do Plano</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {plan.name}
                </p>
              </div>
              {plan.description && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Descrição</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {plan.description}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Período de Cobrança</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {getBillingPeriodLabel(plan.billingPeriod)}
                </p>
              </div>
              {plan.prices.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Valor Atual</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(plan.prices[0].amount)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    por {(getBillingPeriodLabel(plan.billingPeriod) || "período").toLowerCase()}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Status do Plano</p>
                <div className="mt-1">
                  {plan.isActive ? (
                    <Badge variant="default">Ativo</Badge>
                  ) : (
                    <Badge variant="secondary">Inativo</Badge>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">ID do Plano</p>
                <p className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                  {student?.subscriptionPlanId}
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Carregando detalhes do plano...
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Modals */}
      <StudentFormSheet
        mode="edit"
        studentId={studentId}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSuccess={() => {
          loadStudent();
          setEditOpen(false);
        }}
      />

      <DeleteStudentDialog
        student={
          student
            ? {
                id: student.id,
                fullName: student.fullName,
                birthDate: student.birthDate,
                termsAccepted: student.termsAccepted,
                subscriptionPlanId: student.subscriptionPlanId,
                guardianId: student.guardian?.id || null,
                addressId: student.address.id,
                createdAt: student.createdAt,
                updatedAt: student.updatedAt,
              }
            : null
        }
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
}
