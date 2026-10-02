"use client";

import { useState } from "react";
import Accordion from "@/components/site/Accordion";
import { cn } from "@/lib/utils";

const roots = [
  {
    id: "karate-do",
    mark: "空手道",
    markClass: "font-jp",
    title: "Karate-Do",
    tag: "“Caminho das mãos vazias”",
    summary:
      "Arte marcial desenvolvida em Okinawa, Japão, como meio de autodefesa. Mais do que uma técnica de combate, é um caminho de desenvolvimento pessoal que busca o aperfeiçoamento do caráter.",
    more: [
      "Ao longo do tempo, na luta pela sobrevivência, o ser humano procurou meios de defesa para vencer as adversidades, e em Okinawa se desenvolveu esta arte inicialmente chamada “TE” (Mão). Esta luta ensinava o praticante a enfrentar sem armas o seu adversário.",
      "Por duas vezes houve proibição do uso de armas em Okinawa, o que fez com que o Karate-Do assumisse maior valor como meio de defesa eficaz contra adversários armados.",
      "Pela disciplina física e mental, promove valores como respeito, humildade, autocontrole e perseverança.",
    ],
  },
  {
    id: "shorin-ryu",
    mark: "少林流",
    markClass: "font-jp",
    title: "Shorin-Ryu",
    tag: "“Estilo do pequeno bosque”",
    summary:
      "Estilo que combina técnicas marciais da China com estilos tradicionais de Okinawa. Shorin é a pronúncia okinawana de Shaolin — uma homenagem ao monastério chinês.",
    more: [
      "Shorin é a pronúncia okinawana de Shaolin, monastério budista da província chinesa de Henan, e significa “pequeno bosque”. Como “ryu” significa estilo, Shorin-Ryu é o “estilo do pequeno bosque”.",
      "O estilo se desenvolveu a partir do Shuri-Te, praticado na região de Shuri. O Karate-Do nasceu em três locais — Shuri-Te, Naha-Te e Tomari-Te — e Shuri-Te e Tomari-Te deram origem ao estilo Shorin.",
      "A linhagem inclui Matsumura Sokon, Anko Itosu e Choshin Chibana, que em 1933 escolheu denominar o estilo de Shorin-Ryu.",
    ],
  },
  {
    id: "shinshukan",
    mark: "心",
    markClass: "font-display font-extrabold tracking-[-0.02em]",
    title: "SHINSHUKAN",
    tag: "FILIAÇÃO OFICIAL",
    summary:
      "Uma das mais respeitadas organizações de Karate Shorin Ryu do Brasil. A filiação garante graduações reconhecidas nacional e internacionalmente.",
    more: [
      "Fundada pelo Mestre Yoshihide Shinzato (1927-2008), pioneiro na difusão do Shorin-Ryu no Brasil. Hanshi 10º Dan de Karate e 9º Dan de Kobudo, ele chegou ao país em 15 de janeiro de 1954 e começou a ensinar aos membros da colônia japonesa.",
      "Em 1962 fundou seu primeiro dojô em Santos e, em 1967, a União Shorin-Ryu Karate-Do do Brasil, hoje sob a liderança do Mestre Masahiro Shinzato, seu filho primogênito.",
      "A filiação dá acesso a treinamentos, seminários e eventos com mestres de todo o Brasil.",
    ],
  },
];

export default function Roots() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      {/* Desktop: three columns */}
      <div className="hidden md:grid grid-cols-3 border-t-2 border-ink">
        {roots.map((r, i) => {
          const isOpen = open === r.id;
          return (
            <div
              key={r.id}
              className={cn(
                "flex flex-col gap-3.5 py-8",
                i === 0 ? "pr-8" : "px-8 border-l border-ink/15",
              )}
            >
              <div className={cn("text-[56px] leading-none text-opam", r.markClass)}>
                {r.mark}
              </div>
              <div className="text-2xl font-bold">{r.title}</div>
              <div className="text-[13px] font-semibold tracking-[0.06em] uppercase text-faint">
                {r.tag}
              </div>
              <p className="text-base leading-[1.6] text-muted-ink">{r.summary}</p>
              {isOpen &&
                r.more.map((p) => (
                  <p key={p} className="text-base leading-[1.6] text-muted-ink">
                    {p}
                  </p>
                ))}
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : r.id)}
                className="self-start mt-1 text-sm font-bold hover:text-opam"
              >
                {isOpen ? "Ler menos −" : "Ler mais +"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Mobile: accordion */}
      <Accordion
        className="md:hidden"
        defaultOpen={0}
        items={roots.map((r) => ({
          id: r.id,
          title: (
            <span className="flex items-baseline gap-3">
              <span className={cn("text-2xl text-opam", r.markClass)}>{r.mark}</span>
              <span className="text-[19px]">{r.title}</span>
            </span>
          ),
          content: (
            <div className="space-y-3">
              <p className="font-semibold text-faint">{r.tag}</p>
              <p>{r.summary}</p>
              {r.more.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          ),
        }))}
      />
    </>
  );
}
