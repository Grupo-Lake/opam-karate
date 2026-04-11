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
import { studentsApi, subscriptionPlansApi } from "@/lib/api/client"
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
  const [form, setForm] = useState<FormData>(emptyForm)
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchingStudent, setFetchingStudent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showGuardian, setShowGuardian] = useState(false)

  const isMinor = form.birthDate !== "" && calculateAge(form.birthDate) < 18

  useEffect(() => {
    if (!open) return
    subscriptionPlansApi.list().then(setPlans).catch(console.error)
  }, [open])

  useEffect(() => {
    if (!open) return

    if (mode === "edit" && studentId) {
      setFetchingStudent(true)
      setError(null)
      studentsApi
        .get(studentId)
        .then((student) => {
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
        .catch((err) =>
          setError(err instanceof Error ? err.message : "Erro ao carregar aluno")
        )
        .finally(() => setFetchingStudent(false))
    } else {
      setForm(emptyForm)
      setShowGuardian(false)
      setError(null)
    }
  }, [open, mode, studentId])

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
              birthDate: form.guardian.birthDate,
              phone: form.guardian.phone,
            }
          : null

      if (mode === "create") {
        await studentsApi.create({
          fullName: form.fullName,
          birthDate: form.birthDate,
          termsAccepted: true,
          subscriptionPlanId: form.subscriptionPlanId,
          address: form.address,
          guardian: guardianData,
        })
      } else {
        await studentsApi.update(studentId!, {
          fullName: form.fullName,
          birthDate: form.birthDate,
          subscriptionPlanId: form.subscriptionPlanId,
          address: form.address,
          guardian: guardianData,
        })
      }

      onSuccess()
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar aluno")
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
                <Label htmlFor="subscriptionPlan">Plano</Label>
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
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
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
