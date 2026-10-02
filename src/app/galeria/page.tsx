import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { Breadcrumb, CtaBand, Eyebrow } from "@/components/site/ui";
import { SOCIALS, TRIAL_LINK } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Galeria",
  description:
    "Fotos dos treinos, alunos e do Sensei Bruno no OPAM KARATE, em Itaquera, São Paulo.",
  path: "/galeria",
});

const photos = [
  { src: "/lp/foto-hero.webp", alt: "Turma treinando na Academia Cross Fênix", caption: "Treino na Academia Cross Fênix", wide: true },
  { src: "/bruno.jpeg", alt: "Sensei Bruno Garcia", caption: "Sensei Bruno Garcia" },
  { src: "/lp/foto-sobre.webp", alt: "Alunos da equipe OPAM", caption: "Equipe OPAM" },
  { src: "/lp/foto-classes.webp", alt: "Alunos em aula de karatê", caption: "Aula da turma unificada" },
  { src: "/sobre/sobre.webp", alt: "Treino de karatê no OPAM", caption: "Tradição Shorin-Ryu", wide: true },
];

export default function GaleriaPage() {
  return (
    <>
      <section className="px-5 pt-7 pb-8 md:px-14 md:pt-16 md:pb-14 flex flex-col gap-3 md:gap-5">
        <Breadcrumb current="Galeria" />
        <Eyebrow>Galeria</Eyebrow>
        <h1 className="text-[42px] md:text-[72px] leading-[0.98] font-extrabold tracking-[-0.035em]">
          O dojo em imagens.
        </h1>
        <p className="max-w-[520px] text-base md:text-[19px] leading-[1.5] text-muted-ink">
          Treinos, graduações e momentos da equipe. Para ver mais, siga a gente
          nas redes.
        </p>
      </section>

      <section className="px-4 pb-16 md:px-14 md:pb-24 grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-4">
        {photos.map((p) => (
          <figure
            key={p.src}
            className={`relative overflow-hidden rounded-md bg-ink/5 aspect-[4/5] md:aspect-[4/3] ${
              p.wide ? "col-span-2 aspect-[16/10] md:col-span-2 md:aspect-[16/9]" : ""
            }`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
            <figcaption className="absolute left-3 bottom-3 bg-paper text-xs font-bold px-2.5 py-1.5 rounded-[3px]">
              {p.caption}
            </figcaption>
          </figure>
        ))}
        <div className="col-span-2 md:col-span-1 rounded-md bg-ink text-paper p-6 flex flex-col justify-between gap-6 min-h-[200px]">
          <div>
            <Eyebrow tone="dark">Redes sociais</Eyebrow>
            <p className="mt-3 text-xl font-bold leading-snug">
              Mais fotos e vídeos dos treinos.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-paper/30 hover:border-paper px-3 py-2 rounded-[3px] text-[13px] font-semibold transition-colors"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Venha treinar com a gente."
        primary={{ label: "Agendar aula grátis", href: TRIAL_LINK, external: true }}
        secondary={{ label: "Fazer matrícula", href: "/matricula" }}
      />
    </>
  );
}
