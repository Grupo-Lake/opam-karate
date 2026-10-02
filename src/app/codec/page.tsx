import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb, CtaBand, Eyebrow } from "@/components/site/ui";

export const metadata: Metadata = pageMetadata({
  title: "Congresso CODEC",
  description:
    "CODEC — Congresso de Desenvolvimento nos Esportes de Contato: aperfeiçoamento acadêmico, inclusão social e práticas inovadoras nas artes marciais.",
  path: "/codec",
});

const info = [
  { label: "Data", value: "14 de Novembro de 2025 (Sexta-feira)" },
  { label: "Local", value: "ETEC Itaquera II · Auditório" },
  { label: "Público-alvo", value: "Atletas, educadores e amantes das artes marciais" },
  { label: "Certificação", value: "Certificado digital de 4 horas" },
];

const objectives = [
  { title: "Métodos de Ensino", text: "Promover a discussão sobre métodos de ensino e aprendizagem nos esportes de contato." },
  { title: "Inclusão Social", text: "Estimular a inclusão social por meio das artes marciais." },
  { title: "Práticas Inovadoras", text: "Divulgar projetos e práticas inovadoras relacionadas à acessibilidade e empoderamento." },
  { title: "Rede de Profissionais", text: "Fortalecer a rede de profissionais e praticantes da área." },
  { title: "Responsabilidade Social", text: "Recolher brinquedos como forma de ingresso, promovendo responsabilidade social." },
  { title: "Transformação Social", text: "Usar o esporte como ferramenta de inclusão, empoderamento e transformação social." },
];

const howTo = [
  "Traga um brinquedo novo ou em bom estado de conservação",
  "Faça sua inscrição online através da plataforma oficial",
  "Entregue o brinquedo na entrada do evento",
];

export default function CodecPage() {
  return (
    <>
      <section className="px-5 pt-7 pb-10 md:px-14 md:pt-16 md:pb-20 flex flex-col gap-3 md:gap-[22px]">
        <Breadcrumb current="CODEC" />
        <Eyebrow>Parceria</Eyebrow>
        <h1 className="text-[42px] md:text-[72px] leading-[0.98] font-extrabold tracking-[-0.035em]">
          Congresso CODEC
        </h1>
        <p className="max-w-[620px] text-base md:text-[19px] leading-[1.5] md:leading-[1.55] text-muted-ink">
          Congresso de Desenvolvimento nos Esportes de Contato — evento de
          aperfeiçoamento e atualização acadêmica nas artes marciais.
        </p>
        <p className="max-w-[720px] text-base md:text-xl leading-[1.6] text-body">
          Propõe diversos momentos, reflexões e dinâmicas de ensino através da
          práxis de profissionais da área educacional, promovendo discussões
          sobre métodos de ensino e práticas inovadoras. Tema 2025:{" "}
          <b className="text-ink">
            Desenvolvimento e aprendizagem dos esportes de contato.
          </b>
        </p>
      </section>

      <section className="px-5 md:px-14">
        <dl className="grid md:grid-cols-4 border-t-2 border-ink">
          {info.map((d, i) => (
            <div
              key={d.label}
              className={`py-5 md:pt-7 md:pb-0 border-b border-ink/12 md:border-b-0 ${
                i === 0 ? "md:pr-6" : "md:px-6 md:border-l md:border-ink/15"
              }`}
            >
              <dt className="text-xs md:text-[13px] font-bold uppercase tracking-[0.08em] text-opam">
                {d.label}
              </dt>
              <dd className="mt-1.5 text-lg md:text-xl font-bold leading-snug">{d.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="px-5 py-12 md:px-14 md:py-24">
        <Eyebrow>Objetivos</Eyebrow>
        <h2 className="mt-2 md:mt-2.5 mb-8 md:mb-10 text-[30px] md:text-[52px] leading-[1.05] font-extrabold tracking-[-0.03em]">
          Objetivos do CODEC.
        </h2>
        <ol className="grid md:grid-cols-3 border-t-2 border-ink">
          {objectives.map((o, i) => (
            <li
              key={o.title}
              className={`py-5 md:py-7 border-b border-ink/12 md:px-7 ${
                i % 3 === 0 ? "md:pl-0" : "md:border-l md:border-ink/15"
              }`}
            >
              <div className="text-xs md:text-[13px] font-bold text-opam">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-xl md:text-[22px] font-bold mt-2 mb-1.5">{o.title}</div>
              <p className="text-[15px] leading-[1.5] text-muted-ink">{o.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-4 md:mx-14 mb-12 md:mb-24 bg-white rounded-md p-6 md:p-14 grid md:grid-cols-2 gap-8 md:gap-14">
        <div className="flex flex-col gap-3.5">
          <Eyebrow>Responsabilidade social</Eyebrow>
          <h2 className="text-[30px] md:text-[44px] leading-[1.02] font-extrabold tracking-[-0.03em]">
            Ingresso: 1 brinquedo.
          </h2>
          <p className="text-base md:text-[17px] leading-[1.6] text-muted-ink">
            O CODEC une esporte e responsabilidade social ao trocar a entrada por
            brinquedos para doação. Todos os brinquedos arrecadados serão doados
            para crianças em situação de vulnerabilidade social.
          </p>
        </div>
        <div>
          <Eyebrow>Como participar</Eyebrow>
          <ol className="mt-3 border-t-2 border-ink">
            {howTo.map((h, i) => (
              <li
                key={h}
                className="grid grid-cols-[32px_1fr] md:grid-cols-[44px_1fr] border-b border-ink/12 py-3.5 text-base md:text-lg"
              >
                <span className="pt-1 text-xs md:text-[13px] font-bold text-opam">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {h}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Conheça o CODEC."
        text="Informações e inscrições no site oficial do congresso."
        primary={{ label: "Site oficial", href: "https://congressocodec.com.br/", external: true }}
      />
    </>
  );
}
