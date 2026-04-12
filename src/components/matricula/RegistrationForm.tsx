"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SubscriptionPlan } from "@/lib/api/types";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  fullName: string;
  birthDate: string;
  subscriptionPlanId: string;
  address: { street: string; number: string; zipCode: string };
  guardian: { fullName: string; birthDate: string; phone: string } | null;
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepNumber({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
      {n}
    </span>
  );
}

function SectionCard({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <StepNumber n={step} />
        <h2 className="font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function ClauseBox({
  id,
  label,
  checked,
  onChange,
  children,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700 leading-relaxed">
        {children}
      </div>
      <label
        htmlFor={id}
        className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
          checked
            ? "border-green-400 bg-green-50"
            : "border-gray-200 hover:border-gray-300 bg-white"
        }`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-red-600 cursor-pointer"
        />
        <span className="text-sm font-medium text-gray-800">
          {label} <span className="text-red-500">*</span>
        </span>
      </label>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RegistrationForm() {
  const formRef = useRef<HTMLFormElement>(null);
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

  // Auto-open guardian for minors
  useEffect(() => {
    if (isMinor && !form.guardian) {
      setForm((f) => ({
        ...f,
        guardian: { fullName: "", birthDate: "", phone: "" },
      }));
    }
  }, [isMinor, form.guardian]);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const updateAddress = (field: keyof FormData["address"], value: string) =>
    setForm((f) => ({ ...f, address: { ...f.address, [field]: value } }));

  const updateGuardian = (
    field: keyof NonNullable<FormData["guardian"]>,
    value: string,
  ) =>
    setForm((f) => ({
      ...f,
      guardian: {
        fullName: f.guardian?.fullName ?? "",
        birthDate: f.guardian?.birthDate ?? "",
        phone: f.guardian?.phone ?? "",
        [field]: value,
      },
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const guardianData =
        form.guardian?.fullName && form.guardian.birthDate && form.guardian.phone
          ? {
              fullName: form.guardian.fullName,
              birthDate: new Date(form.guardian.birthDate).toISOString(),
              phone: form.guardian.phone,
            }
          : null;

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          birthDate: new Date(form.birthDate).toISOString(),
          termsAccepted: true,
          subscriptionPlanId: form.subscriptionPlanId,
          address: form.address,
          guardian: guardianData,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Erro ao realizar cadastro");
      }

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao realizar cadastro");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20 text-center px-4">
        <div className="rounded-full bg-green-100 p-6">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Matrícula enviada!
          </h2>
          <p className="text-gray-600 max-w-md text-lg">
            Recebemos seu cadastro com sucesso. O{" "}
            <strong>Sensei Bruno</strong> entrará em contato pelo WhatsApp para
            confirmar sua matrícula e dar as boas-vindas à equipe.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <a
            href="https://wa.me/5511969392260?text=Olá!%20Acabei%20de%20preencher%20o%20formulário%20de%20matrícula."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Falar no WhatsApp
            </Button>
          </a>
          <Button
            variant="outline"
            onClick={() => {
              setSuccess(false);
              setForm(emptyForm);
            }}
          >
            Fazer outro cadastro
          </Button>
        </div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
      noValidate={false}
    >
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          <strong>Erro:</strong> {error}
        </div>
      )}

      {/* ── 1. Do Objeto ── */}
      <SectionCard step={1} title="Cláusula — Do Objeto">
        <ClauseBox
          id="clause-object"
          label="Li e estou de acordo"
          checked={form.clauseObject}
          onChange={(v) => set("clauseObject", v)}
        >
          <p>
            Este instrumento tem por objeto a prestação de serviços de aulas de
            karatê na <strong>Academia Cross Fênix</strong>, sob orientação do{" "}
            <strong>Professor Bruno</strong>, com auxílio de instrutores
            graduados (faixas pretas).
          </p>
          <ul className="mt-3 space-y-1 list-disc list-inside text-gray-600">
            <li>Segundas e quartas-feiras — 20h às 21h30</li>
            <li>Sábados — 10h às 12h</li>
          </ul>
          <p className="mt-3 text-gray-600">
            O aluno poderá frequentar de <strong>1 a 3 aulas semanais</strong>{" "}
            conforme o plano contratado. Não há reposição de aulas por ausência.
          </p>
        </ClauseBox>
      </SectionCard>

      {/* ── 2. Condição Física ── */}
      <SectionCard step={2} title="Cláusula — Da Condição Física e de Saúde">
        <ClauseBox
          id="clause-health"
          label="Declaro que o aluno(a) está em plenas condições de saúde e informarei quaisquer alterações."
          checked={form.clauseHealth}
          onChange={(v) => set("clauseHealth", v)}
        >
          <p>
            O aluno ou responsável declara estar ciente de que a prática de
            atividades físicas exige condições adequadas de saúde, comprometendo‑se
            a informar previamente sobre limitações, lesões ou condições médicas.
          </p>
          <p className="mt-2 text-gray-600">
            Fica dispensada a apresentação de atestado médico. O aluno ou
            responsável assume total responsabilidade pelas informações prestadas,
            isentando o professor e a academia de responsabilidades por omissões
            ou condições preexistentes.
          </p>
        </ClauseBox>
      </SectionCard>

      {/* ── 3. Planos ── */}
      <SectionCard step={3} title="Cláusula — Dos Planos e das Aulas">
        <p className="text-sm text-gray-600 leading-relaxed">
          A mensalidade deverá ser paga até o dia <strong>10 de cada mês</strong>.
          O não pagamento por mais de 30 dias implica suspensão automática do
          acesso às aulas até regularização.
        </p>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-gray-800">
            Selecione seu plano <span className="text-red-500">*</span>
          </Label>

          {plans.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-gray-500 py-3">
              <Loader2 className="h-4 w-4 animate-spin" />
              Carregando planos...
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {plans.flatMap((plan) =>
                plan.prices.map((price) => {
                  const isSelected = form.subscriptionPlanId === plan.id;
                  return (
                    <label
                      key={`${plan.id}-${price.id}`}
                      htmlFor={`plan-${plan.id}-${price.id}`}
                      className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                        isSelected
                          ? "border-red-500 bg-red-50 shadow-sm"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <input
                        id={`plan-${plan.id}-${price.id}`}
                        type="radio"
                        name="subscriptionPlan"
                        value={plan.id}
                        checked={isSelected}
                        onChange={() => set("subscriptionPlanId", plan.id)}
                        required
                        className="mt-0.5 h-4 w-4 shrink-0 accent-red-600"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="font-semibold text-gray-900 text-sm">
                            {plan.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {billingLabels[price.billingPeriod]}
                          </span>
                          <span
                            className={`ml-auto font-bold text-sm ${isSelected ? "text-red-600" : "text-gray-700"}`}
                          >
                            {formatPrice(price.amount)}
                          </span>
                        </div>
                        {plan.description && (
                          <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                            {plan.description}
                          </p>
                        )}
                      </div>
                    </label>
                  );
                }),
              )}
            </div>
          )}
        </div>
      </SectionCard>

      {/* ── 4. Outros Itens ── */}
      <SectionCard step={4} title="Cláusula — Outros Itens">
        <ClauseBox
          id="clause-others"
          label="Ciente, li e concordo."
          checked={form.clauseOthers}
          onChange={(v) => set("clauseOthers", v)}
        >
          <ul className="space-y-2">
            <li>
              <strong>Vigência:</strong> Prazo indeterminado, podendo ser
              rescindido mediante aviso prévio de 30 dias.
            </li>
            <li>
              <strong>Uniforme:</strong> É responsabilidade do aluno
              providenciar e manter o kimono e demais equipamentos.
            </li>
            <li>
              <strong>Imagem:</strong> O aluno ou responsável autoriza o uso de
              imagens e vídeos das aulas para fins institucionais e promocionais
              da academia, eventos e assuntos do karatê.
            </li>
          </ul>
        </ClauseBox>
      </SectionCard>

      {/* ── 5. Dados pessoais ── */}
      <SectionCard step={5} title="Dados do Aluno e Responsável">
        {/* Aluno */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Aluno
          </h3>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reg-fullName">
              Nome completo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="reg-fullName"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              placeholder="Nome completo do aluno"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reg-birthDate">
              Data de nascimento <span className="text-red-500">*</span>
            </Label>
            <Input
              id="reg-birthDate"
              type="date"
              value={form.birthDate}
              onChange={(e) => set("birthDate", e.target.value)}
              required
            />
          </div>
        </div>

        {/* Endereço */}
        <div className="flex flex-col gap-4 pt-4 border-t">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Endereço <span className="text-red-500">*</span>
          </h3>

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
                onChange={(e) => updateAddress("number", e.target.value)}
                placeholder="123"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reg-zipCode">CEP</Label>
              <Input
                id="reg-zipCode"
                value={form.address.zipCode}
                onChange={(e) => updateAddress("zipCode", e.target.value)}
                placeholder="00000-000"
                required
              />
            </div>
          </div>
        </div>

        {/* Responsável */}
        <div className="flex flex-col gap-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Responsável
              {isMinor && (
                <span className="ml-2 normal-case text-xs font-normal text-amber-600">
                  Obrigatório para menores de 18 anos
                </span>
              )}
            </h3>
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
                className="text-xs text-red-600 hover:underline underline-offset-2"
              >
                {form.guardian ? "Remover" : "Adicionar responsável"}
              </button>
            )}
          </div>

          {form.guardian !== null && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="reg-guardianName">
                  Nome completo do responsável
                  {isMinor && <span className="text-red-500"> *</span>}
                </Label>
                <Input
                  id="reg-guardianName"
                  value={form.guardian.fullName}
                  onChange={(e) => updateGuardian("fullName", e.target.value)}
                  placeholder="Nome completo"
                  required={isMinor}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="reg-guardianBirthDate">
                  Data de nascimento do responsável
                  {isMinor && <span className="text-red-500"> *</span>}
                </Label>
                <Input
                  id="reg-guardianBirthDate"
                  type="date"
                  value={form.guardian.birthDate}
                  onChange={(e) => updateGuardian("birthDate", e.target.value)}
                  required={isMinor}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="reg-guardianPhone">
                  Celular para contato (WhatsApp)
                  {isMinor && <span className="text-red-500"> *</span>}
                </Label>
                <Input
                  id="reg-guardianPhone"
                  type="tel"
                  value={form.guardian.phone}
                  onChange={(e) => updateGuardian("phone", e.target.value)}
                  placeholder="(11) 99999-9999"
                  required={isMinor}
                />
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      {/* ── 6. Forma de Pagamento ── */}
      <SectionCard step={6} title="Cláusula — Da Forma de Pagamento">
        <ClauseBox
          id="clause-payment"
          label="Ciente das cláusulas do contrato, li e concordo."
          checked={form.clausePayment}
          onChange={(v) => set("clausePayment", v)}
        >
          <p>
            O pagamento poderá ser realizado por{" "}
            <strong>dinheiro, cartão de débito, cartão de crédito ou PIX</strong>
            , devendo ser efetuado até o dia <strong>10 de cada mês</strong>. O
            aluno ou responsável poderá optar pelo pagamento mensal ou semestral.
          </p>
        </ClauseBox>
      </SectionCard>

      {/* ── Submit ── */}
      <Button
        type="submit"
        disabled={loading}
        size="lg"
        className="w-full bg-red-600 hover:bg-red-700 text-white text-base py-6 mt-2"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando matrícula...
          </>
        ) : (
          <>
            Confirmar matrícula
            <ChevronRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-gray-400 pb-4">
        Academia Cross Fênix · Sensei Bruno · Karatê Equipe OPAM
      </p>
    </form>
  );
}
