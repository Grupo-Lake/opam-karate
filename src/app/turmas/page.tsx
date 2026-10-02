import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Accordion from "@/components/site/Accordion";
import { Breadcrumb, CtaBand, Eyebrow, NumberedList } from "@/components/site/ui";
import {
  ADDRESS,
  CLASSES,
  MAP_ROUTE_URL,
  TRIAL_LINK,
  WEEK_DAYS,
  whatsappLink,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Turma e Horários",
  description:
    "Turma unificada a partir de 5 anos, para todos os níveis. Aulas às segundas e quartas das 20h às 21h30 e aos sábados das 10h às 12h na Academia Cross Fênix, em Itaquera.",
  path: "/turmas",
});

const learn = [
  "Katas, Kumite e Defesa Pessoal",
  "Do iniciante ao faixa preta",
  "Desenvolvimento progressivo e personalizado",
  "Técnicas adaptadas ao nível de cada aluno",
  "Ambiente de aprendizado colaborativo",
  "Preparação para graduações e competições",
  "Valores tradicionais do Karate Shorin Ryu",
];

const plans = [
  { times: 1, hint: "Seg, Qua ou Sáb" },
  { times: 2, hint: "Escolha dois dias" },
  { times: 3, hint: "Todas as aulas", featured: true },
];

const info = [
  {
    id: "experimental",
    title: "Aulas experimentais",
    text: "Oferecemos uma aula experimental gratuita para novos alunos. Para a primeira aula, pode-se usar roupa confortável (calça e camiseta de ginástica).",
  },
  {
    id: "pontualidade",
    title: "Pontualidade",
    text: "Pedimos que os alunos cheguem com 10 minutos de antecedência para se prepararem adequadamente antes do início da aula.",
  },
  {
    id: "uniforme",
    title: "Uniforme",
    text: "O uso do kimono (gi) é obrigatório para todas as aulas. Uniformes podem ser adquiridos na secretaria da academia.",
  },
  {
    id: "reposicao",
    title: "Reposição de aulas",
    text: "Alunos que perderem aulas podem repô-las em outros horários, mediante disponibilidade de vagas. Consulte a secretaria.",
  },
  {
    id: "feriados",
    title: "Feriados",
    text: "Não há aulas em feriados nacionais e municipais. Consulte nosso calendário anual para verificar as datas.",
  },
];

const classOn = (day: number) => CLASSES.find((c) => c.day === day);

function SlotCard({ day, period }: { day: number; period: "morning" | "night" }) {
  const c = CLASSES.find((x) => x.day === day && x.period === period);
  if (!c) return <div className="h-24 rounded-[4px] bg-paper" />;
  return (
    <div className="h-24 rounded-[4px] bg-opam text-white p-3.5 flex flex-col justify-between">
      <div className="text-[22px] font-extrabold">{c.start}</div>
      <div className="text-[13px] leading-[1.3]">
        até {c.end}
        <br />
        Todas as idades
      </div>
    </div>
  );
}

export default function TurmasPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-5 pt-7 md:px-14 md:pt-16 grid md:grid-cols-2 gap-6 md:gap-14 items-end">
        <div className="flex flex-col gap-3 md:gap-5 md:pb-2">
          <Breadcrumb current="Turma e Horários" />
          <Eyebrow>Nossa turma</Eyebrow>
          <h1 className="text-[42px] md:text-[72px] leading-[0.98] font-extrabold tracking-[-0.035em]">
            Uma turma.
            <br className="hidden md:block" /> Todas as idades.
          </h1>
          <p className="max-w-[500px] text-base md:text-[19px] leading-[1.5] md:leading-[1.55] text-muted-ink">
            <span className="md:hidden">
              Do iniciante a partir de 5 anos ao faixa preta.
            </span>
            <span className="hidden md:inline">
              Nossa turma única acolhe praticantes de todas as idades e níveis,
              desde iniciantes a partir de 5 anos até os mais graduados faixas
              pretas.
            </span>
          </p>
        </div>
        <dl className="hidden md:grid grid-cols-3 border-t-2 border-ink">
          {[
            ["5+", "anos de idade"],
            ["Todos", "os níveis de faixa"],
            ["3×", "aulas por semana"],
          ].map(([value, label], i) => (
            <div
              key={value}
              className={cn("pt-[18px] px-4", i === 0 ? "pl-0" : "border-l border-ink/15")}
            >
              <dd className="text-4xl font-extrabold tracking-[-0.03em]">{value}</dd>
              <dt className="text-sm text-faint">{label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Agenda */}
      <section className="px-4 pt-6 pb-0 md:px-14 md:pt-12 md:pb-24">
        <div className="bg-white rounded-md p-[18px] md:p-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 mb-3 md:mb-6">
            <h2 className="text-lg md:text-[32px] font-extrabold md:tracking-[-0.02em]">
              <span className="md:hidden">Esta semana</span>
              <span className="hidden md:inline">Agenda semanal</span>
            </h2>
            <span className="hidden md:block text-sm text-faint">
              {ADDRESS.venue} · {ADDRESS.street} — Itaquera
            </span>
          </div>

          {/* Mobile: week strip + list */}
          <div className="md:hidden">
            <div className="grid grid-cols-7 gap-[5px] mb-3.5">
              {WEEK_DAYS.map((d, i) => (
                <div
                  key={d.short}
                  className={cn(
                    "text-center py-2 rounded-[4px] text-xs font-bold",
                    classOn(i) ? "bg-opam text-white" : "bg-paper text-[#a59d93]",
                  )}
                >
                  {d.initial}
                </div>
              ))}
            </div>
            <ul>
              {CLASSES.map((c, i) => (
                <li
                  key={c.day}
                  className={cn(
                    "flex justify-between py-[13px] border-t border-ink/12 text-base",
                    i === CLASSES.length - 1 && "border-b",
                  )}
                >
                  <b>{WEEK_DAYS[c.day].long}</b>
                  <span>
                    {c.start} – {c.end}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-1.5 text-[13px] text-faint">
              {ADDRESS.venue} · Itaquera ·{" "}
              <a href={MAP_ROUTE_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-opam">
                Como chegar →
              </a>
            </p>
          </div>

          {/* Desktop: weekly grid */}
          <div className="hidden md:grid grid-cols-[64px_repeat(7,1fr)] gap-2">
            <div />
            {WEEK_DAYS.map((d, i) => (
              <div
                key={d.short}
                className={cn(
                  "pb-2 text-[13px] font-bold",
                  classOn(i) ? "text-opam" : "text-[#a59d93]",
                )}
              >
                {d.short}
              </div>
            ))}
            {(["morning", "night"] as const).map((period) => (
              <div key={period} className="contents">
                <div className="pt-1.5 text-[13px] text-faint">
                  {period === "morning" ? "Manhã" : "Noite"}
                </div>
                {WEEK_DAYS.map((d, i) => (
                  <SlotCard key={d.short} day={i} period={period} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que aprender */}
      <section className="md:grid md:grid-cols-2 md:border-t md:border-ink/12">
        <div className="px-5 pt-7 md:px-14 md:py-20">
          <Eyebrow>O que você vai aprender</Eyebrow>
          <NumberedList items={learn} className="mt-3 md:mt-7" />
        </div>
        <div className="relative mt-7 h-[220px] md:mt-0 md:h-auto">
          <Image
            src="/lp/foto-classes.webp"
            alt="Alunos em aula de karatê"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Planos e informações */}
      <section className="px-5 pt-7 pb-28 md:px-14 md:py-24 grid md:grid-cols-[1fr_1.3fr] md:gap-[72px]">
        <div className="flex flex-col gap-3 md:gap-[18px]">
          <Eyebrow>
            <span className="md:hidden">Planos</span>
            <span className="hidden md:inline">Planos flexíveis</span>
          </Eyebrow>
          <h2 className="hidden md:block text-[44px] leading-[1.02] font-extrabold tracking-[-0.03em]">
            1 a 3 aulas por semana, conforme sua rotina.
          </h2>
          <div className="flex gap-2 md:flex-col md:gap-2.5 md:mt-2.5">
            {plans.map((p) => (
              <a
                key={p.times}
                href={whatsappLink(
                  `Olá! Gostaria de saber valores do plano de ${p.times}x por semana.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex-1 md:flex-none rounded-md px-3 py-3.5 md:px-[22px] md:py-5 flex md:flex-row md:justify-between md:items-center flex-col transition-opacity hover:opacity-90",
                  p.featured ? "bg-ink text-paper" : "bg-white",
                )}
              >
                <div>
                  <div className="text-2xl md:text-[19px] font-extrabold md:font-bold">
                    {p.times}×
                    <span className="hidden md:inline"> por semana</span>
                  </div>
                  <div
                    className={cn(
                      "text-xs md:text-sm",
                      p.featured ? "text-paper/60" : "text-faint",
                    )}
                  >
                    <span className="md:hidden">por semana</span>
                    <span className="hidden md:inline">{p.hint}</span>
                  </div>
                </div>
                <span
                  className={cn(
                    "hidden md:inline text-sm font-bold",
                    p.featured ? "text-opam-soft" : "text-opam",
                  )}
                >
                  Consultar →
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-7 md:mt-0">
          <Eyebrow>
            <span className="md:hidden">Antes da primeira aula</span>
            <span className="hidden md:inline">Informações importantes</span>
          </Eyebrow>
          <Accordion
            className="mt-3 md:mt-[22px]"
            items={info.map((i) => ({
              id: i.id,
              title: i.title,
              content: <p>{i.text}</p>,
            }))}
          />
        </div>
      </section>

      <CtaBand
        title="Experimente uma aula grátis."
        text="Sem taxa de matrícula · Venha de roupa confortável · Leva menos de 3 minutos"
        primary={{ label: "Agendar pelo WhatsApp", href: TRIAL_LINK, external: true }}
        secondary={{ label: "Fazer matrícula", href: "/matricula" }}
      />
    </>
  );
}
