"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/site/ui";
import { cn } from "@/lib/utils";

const benefits = [
  {
    title: "Saúde Física",
    description:
      "Melhore sua condição cardiovascular, força, flexibilidade e coordenação motora.",
  },
  {
    title: "Foco e Concentração",
    description:
      "Desenvolva disciplina mental e capacidade de concentração para todas as áreas da vida.",
  },
  {
    title: "Autodefesa",
    description: "Aprenda técnicas eficazes de defesa pessoal e ganhe confiança.",
  },
  {
    title: "Comunidade",
    description:
      "Faça parte de uma família unida por respeito, valores e objetivos comuns.",
  },
  {
    title: "Conquistas",
    description:
      "Participe de campeonatos e alcance novos patamares na sua jornada.",
  },
  {
    title: "Autoconfiança",
    description:
      "Desenvolva autoestima, autocontrole e capacidade de superação.",
  },
];

const INITIAL_MOBILE = 3;

export default function BenefitsSection() {
  const [expanded, setExpanded] = useState(false);
  const hidden = benefits.length - INITIAL_MOBILE;

  return (
    <section className="px-5 pt-10 md:px-14 md:pt-16 lg:pt-[136px] md:pb-24">
      <div className="mb-[18px] md:mb-10">
        <Eyebrow>Benefícios</Eyebrow>
        <h2 className="mt-2 md:mt-2.5 text-[30px] md:text-[52px] leading-[1.05] font-extrabold tracking-[-0.03em] md:max-w-[760px]">
          Transforme sua vida através da prática do Karate.
        </h2>
      </div>

      <ol className="border-t-2 border-ink md:grid md:grid-cols-3">
        {benefits.map((b, i) => (
          <li
            key={b.title}
            className={cn(
              "grid grid-cols-[34px_1fr] py-3.5 border-b border-ink/12",
              "md:block md:py-7 md:px-7 md:border-b-0",
              i % 3 === 0 && "md:pl-0",
              i % 3 !== 0 && "md:border-l md:border-ink/15",
              i < 3 && "md:border-b md:border-b-ink/15",
              i >= INITIAL_MOBILE && !expanded && "hidden md:block",
            )}
          >
            <span className="pt-1 md:pt-0 text-xs md:text-[13px] font-bold text-opam">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="text-lg md:text-[22px] font-bold md:mt-2.5 md:mb-2">
                {b.title}
              </div>
              <p className="mt-[3px] md:mt-0 text-sm md:text-[15px] leading-[1.45] md:leading-[1.5] text-muted-ink">
                {b.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="md:hidden flex w-full justify-between py-3.5 border-b border-ink/12 text-[15px] font-bold"
        >
          <span>Ver mais {hidden} benefícios</span>
          <span>+</span>
        </button>
      )}
    </section>
  );
}
