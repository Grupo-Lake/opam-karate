import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Roots from "@/components/site/Roots";
import { Breadcrumb, CtaBand, Eyebrow, Kanji, SiteButton } from "@/components/site/ui";
import { TRIAL_LINK } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Sobre",
  description:
    "Fundado em 1999, o OPAM KARATE preserva e difunde os valores tradicionais do Karate Shorin Ryu em Itaquera, São Paulo. Conheça nossa história, raízes, linhagem e instrutor.",
  path: "/sobre",
});

const lineage = [
  { name: "Matsumura Sokon", note: "1800–1890", short: "1800–1890" },
  { name: "Anko Itosu", note: "1831–1915", short: "1831–1915" },
  { name: "Choshin Chibana", note: "1885–1969 · nomeia o estilo em 1933", short: "1885–1969" },
  { name: "Yoshihide Shinzato", note: "1927–2008 · chega ao Brasil em 1954", short: "1927–2008" },
  { name: "Masahiro Shinzato", note: "União Shorin-Ryu Karate-Do do Brasil", short: null },
  { name: "OPAM Karate", note: "Itaquera · desde 1999", short: "Itaquera · desde 1999", current: true },
];

const values = [
  { title: "Respeito", text: "Respeito ao mestre, aos colegas e a si mesmo." },
  { title: "Disciplina", text: "Compromisso com o treino e desenvolvimento constante." },
  { title: "Excelência", text: "Busca contínua pela perfeição técnica e pessoal." },
  { title: "Comunidade", text: "União e apoio mútuo entre todos os praticantes." },
];

const stats = [
  { value: "1999", label: "Fundação do OPAM", mobile: "fundação" },
  { value: "25+", label: "anos de história", mobile: "anos de história" },
  { value: "Centenas", label: "de praticantes formados", accent: true },
];

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <section className="grid md:grid-cols-[1.1fr_1fr] md:min-h-[520px]">
        <div className="px-5 pt-7 pb-6 md:px-14 md:py-16 flex flex-col justify-center gap-3 md:gap-[22px]">
          <Breadcrumb current="Sobre" />
          <Eyebrow>
            <span className="md:hidden">Sobre o OPAM</span>
            <span className="hidden md:inline">Sobre o OPAM Karate</span>
          </Eyebrow>
          <h1 className="text-[38px] md:text-[72px] leading-none md:leading-[0.98] font-extrabold tracking-[-0.035em] text-pretty">
            Uma história de dedicação, tradição e excelência.
          </h1>
          <p className="hidden md:block max-w-[520px] text-[19px] leading-[1.55] text-muted-ink">
            Fundado em 1999, o OPAM KARATE nasceu do sonho de mestres apaixonados
            pela arte do Karate Shorin Ryu e comprometidos em preservar e
            difundir seus valores tradicionais.
          </p>
        </div>
        <div className="relative h-60 md:h-auto">
          <Image
            src="/sobre/sobre.webp"
            alt="Treino de karatê no OPAM"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <Kanji className="absolute right-3.5 top-3.5 md:right-7 md:top-7 text-[40px] md:text-[72px] text-paper/85">
            空手道
          </Kanji>
        </div>
      </section>

      {/* História */}
      <section className="px-5 pt-7 pb-2 md:px-14 md:py-24 grid md:grid-cols-[320px_1fr] md:gap-[72px] md:border-b md:border-ink/12">
        <div className="flex flex-col gap-3.5 md:gap-7">
          <Eyebrow className="hidden md:block">Nossa história</Eyebrow>
          <dl className="grid grid-cols-2 md:grid-cols-1 gap-y-7 md:gap-y-7 border-t-2 border-ink md:border-0">
            {stats.map((s, i) => (
              <div
                key={s.value}
                className={`pt-2.5 md:pt-3.5 md:border-t ${
                  i === 0 ? "md:border-t-2 md:border-ink" : "md:border-ink/15"
                } ${i === 1 ? "pl-3.5 border-l border-ink/15 md:pl-0 md:border-l-0" : ""} ${
                  s.accent ? "max-md:hidden" : ""
                }`}
              >
                <dd
                  className={`text-[30px] md:text-[44px] font-extrabold tracking-[-0.03em] ${
                    s.accent ? "text-opam" : ""
                  }`}
                >
                  {s.value}
                </dd>
                <dt className="text-[13px] md:text-sm text-faint">
                  <span className="md:hidden">{s.mobile ?? s.label}</span>
                  <span className="hidden md:inline">{s.label}</span>
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-5 md:mt-0 flex flex-col gap-[22px] md:text-xl leading-[1.6] text-body max-w-[720px]">
          <p className="md:hidden text-base">
            Fundado em 1999, o OPAM KARATE nasceu do sonho de mestres
            apaixonados pela arte do Karate Shorin Ryu e comprometidos em
            preservar e difundir seus valores tradicionais.
          </p>
          <p className="hidden md:block text-[30px] leading-[1.3] font-semibold text-ink tracking-[-0.015em] text-pretty">
            Ao longo de mais de 25 anos, nos consolidamos como uma das
            principais academias de Karate da região, formando centenas de
            praticantes que levam consigo não apenas técnicas marciais, mas
            valores para a vida.
          </p>
          <p className="hidden md:block">
            Nossa metodologia de ensino une tradição e modernidade, respeitando
            os princípios fundamentais do Karate enquanto adaptamos nosso ensino
            às necessidades contemporâneas de nossos alunos.
          </p>
          <p className="hidden md:block">
            Localizado na R. Sabbado D&apos;Ângelo, 1369 — Itaquera, São Paulo,
            somos reconhecidos como referência em Karate na região, conforme
            destacado no{" "}
            <a
              href="https://itaquera.net.br/sobre/opam-nin-do-ryu-karate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-opam font-semibold hover:underline"
            >
              guia de comércios e serviços de Itaquera
            </a>
            .
          </p>
        </div>
      </section>

      {/* Raízes */}
      <section className="px-5 pt-9 md:px-14 md:py-24">
        <Eyebrow>Nossas raízes</Eyebrow>
        <h2 className="hidden md:block mt-2.5 mb-10 text-[52px] font-extrabold tracking-[-0.03em]">
          O caminho que seguimos.
        </h2>
        <div className="mt-3.5 md:mt-0">
          <Roots />
        </div>
      </section>

      {/* Linhagem */}
      <section className="mt-9 md:mt-0 bg-ink text-paper px-5 py-7 md:px-14 md:py-[72px]">
        <Eyebrow tone="dark">
          <span className="md:hidden">Linhagem</span>
          <span className="hidden md:inline">Linhagem Shorin-Ryu</span>
        </Eyebrow>

        {/* Desktop timeline */}
        <ol className="hidden md:grid grid-cols-6 mt-8 relative">
          <div className="absolute inset-x-0 top-[7px] h-px bg-paper/25" />
          {lineage.map((l) => (
            <li key={l.name} className="relative flex flex-col gap-3 pr-5">
              <span
                className={
                  l.current
                    ? "size-[15px] rounded-full bg-opam shadow-[0_0_0_5px_rgba(212,35,42,0.3)]"
                    : "size-[15px] rounded-full bg-paper"
                }
              />
              <div className={`text-lg font-bold ${l.current ? "text-opam-soft" : ""}`}>
                {l.name}
              </div>
              <div className="text-sm text-paper/60">{l.note}</div>
            </li>
          ))}
        </ol>

        {/* Mobile list */}
        <ol className="md:hidden mt-4 flex flex-col gap-4 border-l border-paper/25 pl-[18px]">
          {lineage
            .filter((l) => l.short)
            .map((l) => (
              <li key={l.name}>
                <div className={`text-base font-bold ${l.current ? "text-opam-soft" : ""}`}>
                  {l.name}
                </div>
                <div className="text-[13px] text-paper/60">{l.short}</div>
              </li>
            ))}
        </ol>
      </section>

      {/* Valores */}
      <section className="hidden md:block px-14 py-24">
        <Eyebrow>Nossos valores</Eyebrow>
        <h2 className="mt-2.5 mb-10 text-[52px] font-extrabold tracking-[-0.03em]">
          Os princípios que guiam nossa academia.
        </h2>
        <ol className="grid grid-cols-4 border-t-2 border-ink">
          {values.map((v, i) => (
            <li
              key={v.title}
              className={`pt-7 ${i === 0 ? "pr-6" : "px-6 border-l border-ink/15"}`}
            >
              <div className="text-[13px] font-bold text-opam">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-2xl font-bold mt-2.5 mb-2">{v.title}</div>
              <div className="text-base leading-[1.5] text-muted-ink">{v.text}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* Instrutor */}
      <section className="px-5 py-9 md:px-14 md:py-0 md:mb-0">
        <div className="md:grid md:grid-cols-[400px_1fr] md:bg-white md:rounded-md overflow-hidden">
          <div className="relative h-[280px] md:h-auto md:min-h-[460px] rounded-md md:rounded-none overflow-hidden">
            <Image
              src="/bruno.jpeg"
              alt="Sensei Bruno Garcia"
              fill
              sizes="(min-width: 768px) 400px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-3 md:mt-0 md:p-14 flex flex-col gap-3 md:gap-[18px]">
            <Eyebrow className="mt-1.5 md:mt-0">Instrutor principal</Eyebrow>
            <h2 className="text-[26px] md:text-[44px] font-extrabold tracking-[-0.02em] md:tracking-[-0.03em]">
              Sensei Bruno Garcia
            </h2>
            <p className="text-[15px] md:text-[17px] leading-[1.55] md:leading-[1.6] text-muted-ink">
              <span className="md:hidden">
                Faixa preta graduado, com certificação reconhecida por federações
                nacionais e internacionais.
              </span>
              <span className="hidden md:inline">
                Nossa equipe é formada por faixas pretas graduadas, com anos de
                experiência no ensino do Karate Shorin Ryu e certificação
                reconhecida por federações nacionais e internacionais.
              </span>
            </p>
            <p className="hidden md:block text-[17px] leading-[1.6] text-muted-ink">
              Além da formação técnica, são educadores comprometidos com o
              desenvolvimento integral de cada aluno — e participam ativamente do
              Congresso CODEC.
            </p>
            <SiteButton href={TRIAL_LINK} external className="hidden md:inline-flex self-start mt-1.5">
              Treinar com o Sensei Bruno →
            </SiteButton>
          </div>
        </div>
      </section>

      {/* Filiação e parceria */}
      <section className="hidden md:grid grid-cols-2 gap-5 px-14 py-24">
        <div className="border border-ink/15 rounded-md p-10 flex flex-col gap-3.5">
          <Eyebrow>Filiação</Eyebrow>
          <div className="text-[32px] font-extrabold tracking-[-0.02em]">SHINSHUKAN</div>
          <p className="text-base leading-[1.55] text-muted-ink">
            Treinamento nos mais altos padrões técnicos e pedagógicos, com acesso
            a eventos, campeonatos e exames de faixa oficialmente reconhecidos.
          </p>
          <a
            href="https://shinshukan.com.br/site/filiados-shinshukan/opam-itaquera/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-bold hover:text-opam"
          >
            Ver página oficial →
          </a>
        </div>
        <div className="border border-ink/15 rounded-md p-10 flex flex-col gap-3.5">
          <Eyebrow>Parceria</Eyebrow>
          <div className="text-[32px] font-extrabold tracking-[-0.02em]">Congresso CODEC</div>
          <p className="text-base leading-[1.55] text-muted-ink">
            Congresso de Desenvolvimento nos Esportes de Contato: métodos de
            ensino, inclusão social e práticas inovadoras nas artes marciais.
          </p>
          <a
            href="/codec"
            className="text-[15px] font-bold hover:text-opam"
          >
            Conheça o CODEC →
          </a>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Pronto para começar
            <br className="hidden md:block" /> sua jornada?
          </>
        }
        primary={{ label: "Agendar aula grátis", href: TRIAL_LINK, external: true }}
        secondary={{ label: "Fazer matrícula", href: "/matricula" }}
      />
    </>
  );
}
