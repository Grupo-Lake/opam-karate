"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SubscriptionPlan } from "@/lib/api/types";

interface FormData {
  // Aluno
  fullName: string;
  birthDate: string;
  subscriptionPlanId: string;
  // Endereço
  address: { street: string; number: string; zipCode: string };
  // Responsável / contato
  guardian: { fullName: string; birthDate: string; phone: string } | null;
  // Cláusulas
  clauseObject: boolean;
  clauseHealth: boolean;
  clauseOthers: boolean;
  clausePayment: boolean;
}

const emptyForm: FormData = {
  fullName: "",
  birthDate: "",
  subscriptionPlanId: "",
  address: { street: "", number: "", zipCode: "" },
  guardian: null,
  clauseObject: false,
  clauseHealth: false,
  clauseOthers: false,
  clausePayment: false,
};

function calculateAge(birthDate: string): number {
  if (!birthDate) return 99;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

const billingLabels: Record<string, string> = {
  MONTHLY: "Mensal",
  QUARTERLY: "Trimestral",
  SEMIANNUAL: "Semestral",
  ANNUAL: "Anual",
};

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

function ClauseCard({
  title,
  children,
  checkId,
  checkLabel,
  checked,
  onChange,
}: {
  title: string;
  children: React.ReactNode;
  checkId: string;
  checkLabel: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 flex flex-col gap-4">
      <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
        {title}
      </h3>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
      <label
        htmlFor={checkId}
        className="flex items-start gap-3 cursor-pointer group"
      >
        <input
          id={checkId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-red-600 cursor-pointer"
        />
        <span className="text-sm font-medium text-gray-800 group-hover:text-red-700 transition-colors">
          {checkLabel} <span className="text-red-600">*</span>
        </span>
      </label>
    </div>
  );
}

export default function RegistrationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState<FormData>(emptyForm);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isMinor = calculateAge(form.birthDate) < 18;

  useEffect(() => {
    fetch("/api/plans")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPlans(data);
      })
      .catch(() => {});
  }, []);

  // Auto-show guardian section for minors
  useEffect(() => {
    if (isMinor && !form.guardian) {
      setForm((f) => ({
        ...f,
        guardian: { fullName: "", birthDate: "", phone: "" },
      }));
    }
  }, [isMinor, form.guardian]);

  const updateAddress = (field: keyof FormData["address"], value: string) => {
    setForm((f) => ({ ...f, address: { ...f.address, [field]: value } }));
  };

  const updateGuardian = (
    field: keyof NonNullable<FormData["guardian"]>,
    value: string,
  ) => {
    setForm((f) => ({
      ...f,
      guardian: {
        fullName: f.guardian?.fullName ?? "",
        birthDate: f.guardian?.birthDate ?? "",
        phone: f.guardian?.phone ?? "",
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const guardianData =
        form.guardian?.fullName && form.guardian?.birthDate && form.guardian?.phone
          ? {
              fullName: form.guardian.fullName,
              birthDate: new Date(form.guardian.birthDate).toISOString(),
              phone: form.guardian.phone,
            }
          : null;

      const payload = {
        fullName: form.fullName,
        birthDate: new Date(form.birthDate).toISOString(),
        termsAccepted: true,
        subscriptionPlanId: form.subscriptionPlanId,
        address: form.address,
        guardian: guardianData,
      };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Erro ao realizar cadastro");
      }

      setSuccess(true);
      setForm(emptyForm);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao realizar cadastro",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} id="matricula" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contrato de Matrícula
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Karatê Equipe OPAM · Academia Cross Fênix · Sensei Bruno
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-2xl mx-auto"
        >
          {success ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="text-2xl font-bold text-gray-900">
                Matrícula enviada!
              </h3>
              <p className="text-gray-600 max-w-sm">
                Recebemos seu cadastro. O sensei Bruno entrará em contato pelo
                WhatsApp para confirmar os próximos passos.
              </p>
              <Button
                variant="outline"
                onClick={() => setSuccess(false)}
                className="mt-2"
              >
                Fazer outro cadastro
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
                  {error}
                </div>
              )}

              {/* ── Cláusula 1 – Do Objeto ── */}
              <ClauseCard
                title="Cláusula – Do Objeto"
                checkId="clause-object"
                checkLabel="Li e estou de acordo"
                checked={form.clauseObject}
                onChange={(v) => setForm((f) => ({ ...f, clauseObject: v }))}
              >
                <p>
                  O presente instrumento tem por objeto a prestação de serviços
                  de aulas de karatê, realizadas na{" "}
                  <strong>Academia Cross Fênix</strong>, sob orientação do{" "}
                  <strong>professor Bruno</strong>, com auxílio de instrutores
                  auxiliares graduados (faixas pretas).
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-gray-600">
                  <li>Segundas e quartas-feiras, das 20h às 21h30</li>
                  <li>Sábados, das 10h às 12h</li>
                </ul>
                <p className="mt-2 text-gray-600">
                  O aluno poderá frequentar de 1 a 3 aulas semanais, conforme o
                  plano contratado. Não há reposição de aulas por ausência.
                </p>
              </ClauseCard>

              {/* ── Cláusula 2 – Condição Física ── */}
              <ClauseCard
                title="Cláusula – Da Condição Física e de Saúde do Aluno"
                checkId="clause-health"
                checkLabel="Declaro que o aluno(a) está em plenas condições de saúde e informarei quaisquer alterações."
                checked={form.clauseHealth}
                onChange={(v) => setForm((f) => ({ ...f, clauseHealth: v }))}
              >
                <p>
                  O aluno ou responsável legal declara estar ciente de que a
                  prática de atividades físicas exige condições adequadas de
                  saúde, comprometendo-se a informar previamente sobre
                  limitações, lesões ou condições médicas que possam influenciar
                  na participação nas aulas.
                </p>
                <p className="mt-2 text-gray-600">
                  Fica dispensada a apresentação de atestado médico, sendo que o
                  aluno ou responsável assume total responsabilidade pelas
                  informações prestadas.
                </p>
              </ClauseCard>

              {/* ── Cláusula 3 – Planos ── */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 flex flex-col gap-4">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  Cláusula – Dos Planos e das Aulas
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  A mensalidade deverá ser paga até o dia{" "}
                  <strong>10 de cada mês</strong>. O não pagamento por mais de
                  30 dias implica na suspensão automática do acesso às aulas.
                </p>

                {plans.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium text-gray-800">
                      Selecione seu plano{" "}
                      <span className="text-red-600">*</span>
                    </Label>
                    <div className="flex flex-col gap-2">
                      {plans.flatMap((plan) =>
                        plan.prices.map((price) => {
                          const optionId = `plan-${plan.id}-${price.id}`;
                          return (
                            <label
                              key={optionId}
                              htmlFor={optionId}
                              className={`flex items-start gap-3 rounded-md border p-3 cursor-pointer transition-colors ${
                                form.subscriptionPlanId === plan.id
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-200 bg-white hover:border-gray-300"
                              }`}
                            >
                              <input
                                id={optionId}
                                type="radio"
                                name="subscriptionPlan"
                                value={plan.id}
                                checked={form.subscriptionPlanId === plan.id}
                                onChange={() =>
                                  setForm((f) => ({
                                    ...f,
                                    subscriptionPlanId: plan.id,
                                  }))
                                }
                                required
                                className="mt-0.5 h-4 w-4 shrink-0 accent-red-600"
                              />
                              <span className="text-sm text-gray-800">
                                <span className="font-medium">{plan.name}</span>{" "}
                                — {billingLabels[price.billingPeriod]}{" "}
                                <span className="text-gray-600">
                                  ({formatPrice(price.amount)})
                                </span>
                                {plan.description && (
                                  <span className="block text-xs text-gray-500 mt-0.5">
                                    {plan.description}
                                  </span>
                                )}
                              </span>
                            </label>
                          );
                        }),
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Carregando planos disponíveis...
                  </p>
                )}
              </div>

              {/* ── Cláusula 4 – Outros Itens ── */}
              <ClauseCard
                title="Cláusula – Outros Itens"
                checkId="clause-others"
                checkLabel="Ciente, li e concordo."
                checked={form.clauseOthers}
                onChange={(v) => setForm((f) => ({ ...f, clauseOthers: v }))}
              >
                <ul className="space-y-1.5 text-gray-700">
                  <li>
                    <strong>Vigência:</strong> Prazo indeterminado, podendo ser
                    rescindido mediante aviso prévio de 30 dias.
                  </li>
                  <li>
                    <strong>Uniforme:</strong> É de responsabilidade do aluno
                    providenciar o kimono e demais equipamentos.
                  </li>
                  <li>
                    <strong>Imagem:</strong> O aluno ou responsável autoriza o
                    uso de imagens e vídeos das aulas para fins institucionais e
                    promocionais da academia.
                  </li>
                </ul>
              </ClauseCard>

              {/* ── Dados do aluno e responsável ── */}
              <div className="rounded-lg border border-gray-200 p-5 flex flex-col gap-5">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide border-b pb-3">
                  Dados do Aluno
                </h3>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="reg-fullName">
                    Nome completo do aluno{" "}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="reg-fullName"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, fullName: e.target.value }))
                    }
                    placeholder="Nome completo"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="reg-birthDate">
                    Data de nascimento do aluno{" "}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="reg-birthDate"
                    type="date"
                    value={form.birthDate}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, birthDate: e.target.value }))
                    }
                    required
                  />
                </div>

                {/* Responsável */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-800">
                      Responsável / Contato
                      {isMinor && (
                        <span className="ml-2 text-xs font-normal text-amber-600">
                          Obrigatório para menores de 18 anos
                        </span>
                      )}
                    </h4>
                    {!isMinor && (
                      <button
                        type="button"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            guardian: f.guardian
                              ? null
                              : { fullName: "", birthDate: "", phone: "" },
                          }))
                        }
                        className="text-xs text-red-600 underline-offset-4 hover:underline"
                      >
                        {form.guardian ? "Remover" : "Adicionar"}
                      </button>
                    )}
                  </div>

                  {form.guardian !== null && (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="reg-guardianName">
                          Nome do responsável{" "}
                          {isMinor && (
                            <span className="text-red-600">*</span>
                          )}
                        </Label>
                        <Input
                          id="reg-guardianName"
                          value={form.guardian.fullName}
                          onChange={(e) =>
                            updateGuardian("fullName", e.target.value)
                          }
                          placeholder="Nome completo do responsável"
                          required={isMinor}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="reg-guardianBirthDate">
                          Data de nascimento do responsável{" "}
                          {isMinor && (
                            <span className="text-red-600">*</span>
                          )}
                        </Label>
                        <Input
                          id="reg-guardianBirthDate"
                          type="date"
                          value={form.guardian.birthDate}
                          onChange={(e) =>
                            updateGuardian("birthDate", e.target.value)
                          }
                          required={isMinor}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="reg-guardianPhone">
                          Celular para contato (WhatsApp){" "}
                          {isMinor && (
                            <span className="text-red-600">*</span>
                          )}
                        </Label>
                        <Input
                          id="reg-guardianPhone"
                          type="tel"
                          value={form.guardian.phone}
                          onChange={(e) =>
                            updateGuardian("phone", e.target.value)
                          }
                          placeholder="(11) 99999-9999"
                          required={isMinor}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Endereço */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-sm font-semibold text-gray-800">
                    Endereço <span className="text-red-600">*</span>
                  </h4>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="reg-street">Rua</Label>
                    <Input
                      id="reg-street"
                      value={form.address.street}
                      onChange={(e) => updateAddress("street", e.target.value)}
                      placeholder="Nome da rua"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="reg-number">Número</Label>
                      <Input
                        id="reg-number"
                        value={form.address.number}
                        onChange={(e) =>
                          updateAddress("number", e.target.value)
                        }
                        placeholder="123"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="reg-zipCode">CEP</Label>
                      <Input
                        id="reg-zipCode"
                        value={form.address.zipCode}
                        onChange={(e) =>
                          updateAddress("zipCode", e.target.value)
                        }
                        placeholder="00000-000"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Cláusula 5 – Forma de Pagamento ── */}
              <ClauseCard
                title="Cláusula – Da Forma de Pagamento"
                checkId="clause-payment"
                checkLabel="Ciente das cláusulas do contrato, li e concordo."
                checked={form.clausePayment}
                onChange={(v) => setForm((f) => ({ ...f, clausePayment: v }))}
              >
                <p>
                  O pagamento poderá ser realizado por{" "}
                  <strong>
                    dinheiro, cartão de débito, cartão de crédito ou PIX
                  </strong>
                  , devendo ser efetuado até o dia <strong>10 de cada mês</strong>
                  . O aluno ou responsável poderá optar pelo pagamento mensal ou
                  semestral.
                </p>
              </ClauseCard>

              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="w-full bg-red-600 hover:bg-red-700 text-white text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando matrícula...
                  </>
                ) : (
                  "Realizar Matrícula"
                )}
              </Button>

              <p className="text-center text-xs text-gray-400">
                Academia Cross Fênix · Sensei Bruno ·{" "}
                <a
                  href="mailto:jeffersonlds3009@gmail.com"
                  className="underline hover:text-gray-600"
                >
                  jeffersonlds3009@gmail.com
                </a>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
