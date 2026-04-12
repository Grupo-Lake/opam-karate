"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApiClient } from "@/lib/api/client-hook"
import type { SubscriptionPlan } from "@/lib/api/types"

interface StudentFormSheetProps {
  mode: "create" | "edit"
  studentId?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

interface FormData {
  fullName: string
  birthDate: string
  subscriptionPlanId: string
  address: {
    street: string
    number: string
    zipCode: string
  }
  guardian: {
    fullName: string
    birthDate: string
    phone: string
  } | null
}

const emptyForm: FormData = {
  fullName: "",
  birthDate: "",
  subscriptionPlanId: "",
  address: { street: "", number: "", zipCode: "" },
  guardian: null,
}

function calculateAge(birthDate: string): number {
  if (!birthDate) return 0
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

export function StudentFormSheet({
  mode,
  studentId,
  open,
  onOpenChange,
  onSuccess,
}: StudentFormSheetProps) {
  const api = useApiClient()
  const [form, setForm] = useState<FormData>(emptyForm)
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchingStudent, setFetchingStudent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showGuardian, setShowGuardian] = useState(false)

  const isMinor = form.birthDate !== "" && calculateAge(form.birthDate) < 18

  useEffect(() => {
    if (!open) return
    
    console.log("📋 Carregando planos de assinatura...")
    api.subscriptionPlans.list()
      .then((loadedPlans) => {
        console.log("✅ Planos carregados:", loadedPlans)
        setPlans(loadedPlans)
      })
      .catch((err) => {
        console.error("❌ Erro ao carregar planos:", err)
      })
  }, [open, api.subscriptionPlans])

  useEffect(() => {
    if (!open) return

    if (mode === "edit" && studentId) {
      console.log(`📖 Carregando dados do aluno ${studentId} para edição...`)
      setFetchingStudent(true)
      setError(null)
      api.students
        .get(studentId)
        .then((student) => {
          console.log("✅ Aluno carregado:", student)
          setForm({
            fullName: student.fullName,
            birthDate: new Date(student.birthDate).toISOString().split("T")[0],
            subscriptionPlanId: student.subscriptionPlanId,
            address: {
              street: student.address.street,
              number: student.address.number,
              zipCode: student.address.zipCode,
            },
            guardian: student.guardian
              ? {
                  fullName: student.guardian.fullName,
                  birthDate: new Date(student.guardian.birthDate)
                    .toISOString()
                    .split("T")[0],
                  phone: student.guardian.phone,
                }
              : null,
          })
          setShowGuardian(!!student.guardian)
        })
        .catch((err) => {
          console.error("❌ Erro ao carregar aluno:", err)
          const errorMessage = err instanceof Error 
            ? err.message 
            : "Erro desconhecido ao carregar aluno"
          setError(errorMessage)
        })
        .finally(() => setFetchingStudent(false))
    } else {
      console.log("📝 Modo criação - inicializando formulário vazio")
      setForm(emptyForm)
      setShowGuardian(false)
      setError(null)
    }
  }, [open, mode, studentId, api.students])

  useEffect(() => {
    if (isMinor) setShowGuardian(true)
  }, [isMinor])

  const updateAddress = (field: keyof FormData["address"], value: string) => {
    setForm((f) => ({ ...f, address: { ...f.address, [field]: value } }))
  }

  const updateGuardian = (
    field: keyof NonNullable<FormData["guardian"]>,
    value: string
  ) => {
    setForm((f) => ({
      ...f,
      guardian: {
        fullName: f.guardian?.fullName ?? "",
        birthDate: f.guardian?.birthDate ?? "",
        phone: f.guardian?.phone ?? "",
        [field]: value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const guardianData =
        showGuardian && form.guardian?.fullName
          ? {
              fullName: form.guardian.fullName,
              birthDate: new Date(form.guardian.birthDate).toISOString(),
              phone: form.guardian.phone,
            }
          : null

      const payload = {
        fullName: form.fullName,
        birthDate: new Date(form.birthDate).toISOString(),
        termsAccepted: true as const,
        subscriptionPlanId: form.subscriptionPlanId,
        address: form.address,
        guardian: guardianData,
      }

      console.log(`📝 ${mode === "create" ? "Criando" : "Atualizando"} aluno com dados:`, payload)

      if (mode === "create") {
        const result = await api.students.create(payload)
        console.log("✅ Aluno criado com sucesso:", result)
      } else {
        const updatePayload = {
          fullName: form.fullName,
          birthDate: new Date(form.birthDate).toISOString(),
          subscriptionPlanId: form.subscriptionPlanId,
          address: form.address,
          guardian: guardianData,
        }
        console.log(`📝 Atualizando aluno com dados:`, updatePayload)
        const result = await api.students.update(studentId!, updatePayload)
        console.log("✅ Aluno atualizado com sucesso:", result)
      }

      onSuccess()
      onOpenChange(false)
    } catch (err) {
      console.error("❌ Erro ao salvar aluno:", err)
      const errorMessage = err instanceof Error 
        ? err.message 
        : "Erro desconhecido ao salvar aluno"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-lg">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle>
            {mode === "create" ? "Novo Aluno" : "Editar Aluno"}
          </SheetTitle>
          <SheetDescription>
            {mode === "create"
              ? "Preencha os dados para cadastrar um novo aluno."
              : "Altere os dados do aluno."}
          </SheetDescription>
        </SheetHeader>

        {fetchingStudent ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-6 pb-6">
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">
                {error}
              </div>
            )}

            {/* Dados do Aluno */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Dados do Aluno
              </h3>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fullName">Nome completo</Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, fullName: e.target.value }))
                  }
                  placeholder="Nome do aluno"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="birthDate">Data de nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={form.birthDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, birthDate: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="subscriptionPlan">Plano e Período de Cobrança</Label>
                <select
                  id="subscriptionPlan"
                  value={form.subscriptionPlanId}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subscriptionPlanId: e.target.value }))
                  }
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Selecione um plano</option>
                  {plans.flatMap((plan) =>
                    plan.prices.map((price) => {
                      const getBillingLabel = (period: "MONTHLY" | "QUARTERLY" | "SEMIANNUAL" | "ANNUAL") => {
                        const labels = {
                          MONTHLY: "Mensal",
                          QUARTERLY: "Trimestral",
                          SEMIANNUAL: "Semestral",
                          ANNUAL: "Anual",
                        };
                        return labels[period];
                      };
                      
                      const formatPrice = (priceValue: number) => {
                        return new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(priceValue);
                      };
                      
                      // Usar combinação de planId:priceId para valor único
                      const optionValue = `${plan.id}:${price.id}`;
                      
                      return (
                        <option key={optionValue} value={plan.id} data-price-id={price.id}>
                          {plan.name} - {getBillingLabel(price.billingPeriod)} ({formatPrice(price.amount)})
                        </option>
                      );
                    })
                  )}
                </select>
                
                {/* Detalhes do plano selecionado */}
                {form.subscriptionPlanId && plans.find(p => p.id === form.subscriptionPlanId) && (
                  <div className="mt-2 rounded-md bg-gray-50 p-3 dark:bg-gray-900">
                    {(() => {
                      const selectedPlan = plans.find(p => p.id === form.subscriptionPlanId);
                      if (!selectedPlan) return null;
                      
                      return (
                        <div className="space-y-2 text-sm">
                          {selectedPlan.description && (
                            <div>
                              <p className="text-gray-600 dark:text-gray-400">
                                {selectedPlan.description}
                              </p>
                            </div>
                          )}
                          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              💡 Selecione o período de cobrança desejado acima
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>

            {/* Endereço */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Endereço
              </h3>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="street">Rua</Label>
                <Input
                  id="street"
                  value={form.address.street}
                  onChange={(e) => updateAddress("street", e.target.value)}
                  placeholder="Nome da rua"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    value={form.address.number}
                    onChange={(e) => updateAddress("number", e.target.value)}
                    placeholder="123"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={form.address.zipCode}
                    onChange={(e) => updateAddress("zipCode", e.target.value)}
                    placeholder="00000-000"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Responsável */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Responsável
                  {isMinor && (
                    <span className="ml-2 text-xs font-normal text-amber-600">
                      Obrigatório para menores de 18 anos
                    </span>
                  )}
                </h3>
                {!isMinor && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowGuardian((v) => {
                        if (v) setForm((f) => ({ ...f, guardian: null }))
                        return !v
                      })
                    }}
                    className="text-xs text-primary underline-offset-4 hover:underline"
                  >
                    {showGuardian ? "Remover" : "Adicionar"}
                  </button>
                )}
              </div>

              {showGuardian && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="guardianName">Nome do responsável</Label>
                    <Input
                      id="guardianName"
                      value={form.guardian?.fullName ?? ""}
                      onChange={(e) => updateGuardian("fullName", e.target.value)}
                      placeholder="Nome completo"
                      required={isMinor}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="guardianBirthDate">
                      Data de nascimento do responsável
                    </Label>
                    <Input
                      id="guardianBirthDate"
                      type="date"
                      value={form.guardian?.birthDate ?? ""}
                      onChange={(e) => updateGuardian("birthDate", e.target.value)}
                      required={isMinor}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="guardianPhone">Telefone</Label>
                    <Input
                      id="guardianPhone"
                      value={form.guardian?.phone ?? ""}
                      onChange={(e) => updateGuardian("phone", e.target.value)}
                      placeholder="(11) 99999-9999"
                      required={isMinor}
                    />
                  </div>
                </>
              )}
            </div>

            <SheetFooter className="px-0 pb-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="animate-spin" />}
                {mode === "create" ? "Cadastrar" : "Salvar alterações"}
              </Button>
            </SheetFooter>
          </form>
        )}
      </SheetContent>
    </Sheet>
  )
}
