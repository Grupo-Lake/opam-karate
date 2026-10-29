import Image from "next/image";
import { Eyebrow, SiteButton } from "@/components/site/ui";
import { ADDRESS } from "@/lib/site";
import { FIRST_AID_REGISTRATION_LINK } from "@/lib/blog";

const details = [
  { label: "Data", value: "Sábado, 28 de novembro" },
  { label: "Horário", value: "11h às 15h" },
  { label: "Local", value: `${ADDRESS.venue}, Itaquera` },
  { label: "Investimento", value: "R$ 50 · 25 vagas" },
];

export default function EventHighlightSection() {
  return (
    <section
      aria-labelledby="evento-destaque"
      className="bg-ink text-paper px-5 py-10 md:px-14 md:py-20 grid gap-8 md:grid-cols-[1fr_340px] md:gap-16 items-center"
    >
      <div>
        <Eyebrow tone="dark">Próximo evento · com apoio do CODEC</Eyebrow>
        <h2
          id="evento-destaque"
          className="mt-2.5 text-[34px] md:text-[56px] leading-[1.02] font-extrabold tracking-[-0.03em]"
        >
          Curso de Primeiros Socorros para Atletas.
        </h2>
        <p className="mt-4 max-w-[560px] text-base md:text-[19px] leading-[1.5] text-paper/75">
          Curso prático com o Prof. Wagner Cortez: imobilizações, atendimento
          de emergência e técnicas que podem salvar uma vida. Com certificado
          impresso e digital.
        </p>

        <dl className="mt-6 md:mt-8 border-t-2 border-paper/80 max-w-[560px]">
          {details.map((d) => (
            <div
              key={d.label}
              className="grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] border-b border-paper/12 py-3 text-base md:text-lg"
            >
              <dt className="pt-0.5 text-xs md:text-[13px] font-bold uppercase tracking-[0.14em] text-opam-soft">
                {d.label}
              </dt>
              <dd>{d.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <SiteButton href={FIRST_AID_REGISTRATION_LINK} external>
            Garantir minha vaga →
          </SiteButton>
          <SiteButton
            href="/blog/curso-primeiros-socorros-para-atletas"
            tone="outline-paper"
          >
            Ler no blog
          </SiteButton>
        </div>
      </div>

      <figure className="relative overflow-hidden rounded-md aspect-[3/4] w-full max-w-[340px] justify-self-center md:justify-self-end">
        <Image
          src="/curso-primeiro-socorros-para-atletas.jpeg"
          alt="Cartaz do Curso de Primeiros Socorros para Atletas, 28 de novembro, Academia Cross Fênix"
          fill
          sizes="(min-width: 768px) 340px, 340px"
          className="object-cover"
        />
      </figure>
    </section>
  );
}
