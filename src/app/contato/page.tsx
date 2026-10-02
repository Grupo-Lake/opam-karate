import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import ContactForm from "@/components/site/ContactForm";
import { Breadcrumb, Eyebrow } from "@/components/site/ui";
import { ADDRESS, MAP_EMBED_URL, MAP_ROUTE_URL, TRIAL_LINK } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contato",
  description:
    "Fale com o OPAM KARATE: WhatsApp (11) 96939-2260, e-mail e endereço na R. Sabbado D'Ângelo, 1369, Itaquera, São Paulo. Tire suas dúvidas e agende uma aula experimental.",
  path: "/contato",
});

const details = [
  {
    label: "Endereço",
    value: (
      <>
        {ADDRESS.street}
        <br />
        {ADDRESS.city}
      </>
    ),
    short: `${ADDRESS.street} · Itaquera · SP`,
  },
  {
    label: "WhatsApp",
    value: (
      <>
        <b>(11) 96939-2260</b>
        <br />
        Sensei Bruno Garcia
      </>
    ),
    desktopOnly: true,
  },
  {
    label: "E-mail",
    value: (
      <>
        contato@opamkarate.com
        <br />
        info@opamkarate.com
      </>
    ),
    desktopOnly: true,
  },
  {
    label: "Atendimento",
    value: (
      <>
        Segunda a Sexta: 14h às 21h
        <br />
        Sábado: 9h às 12h
      </>
    ),
    short: "Seg a Sex 14h–21h · Sáb 9h–12h",
  },
];

const shortcuts = [
  { label: "WhatsApp", href: TRIAL_LINK, external: true, primary: true },
  { label: "Ligar", href: "tel:+5511969392260" },
  { label: "Rota", href: MAP_ROUTE_URL, external: true },
];

export default function ContatoPage() {
  return (
    <>
      <section className="px-5 pt-7 pb-6 md:px-14 md:pt-16 md:pb-24 grid md:grid-cols-[1fr_1.05fr] md:gap-16">
        <div className="flex flex-col gap-3 md:gap-[22px]">
          <Breadcrumb current="Contato" />
          <Eyebrow>Fale conosco</Eyebrow>
          <h1 className="text-[42px] md:text-[72px] leading-[0.98] font-extrabold tracking-[-0.035em]">
            Entre em contato.
          </h1>
          <p className="max-w-[440px] text-base md:text-[19px] leading-[1.5] md:leading-[1.55] text-muted-ink">
            <span className="md:hidden">Estamos prontos para tirar todas as suas dúvidas.</span>
            <span className="hidden md:inline">
              Estamos prontos para atendê-lo e tirar todas as suas dúvidas.
            </span>
          </p>

          {/* Mobile shortcuts */}
          <div className="md:hidden grid grid-cols-3 gap-2 mt-2">
            {shortcuts.map((s) => (
              <a
                key={s.label}
                href={s.href}
                {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`rounded-md py-4 px-2.5 text-center text-sm font-bold ${
                  s.primary ? "bg-opam text-white" : "bg-white"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Mobile map goes right after the shortcuts */}
          <div className="md:hidden h-[170px] rounded-md overflow-hidden bg-[#e9e4dc]">
            <iframe
              title="Mapa — Academia Cross Fênix"
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0"
            />
          </div>

          <dl className="flex flex-col md:mt-3 border-t-0 md:border-t-2 border-ink">
            {details.map((d) => (
              <div
                key={d.label}
                className={`md:grid md:grid-cols-[150px_1fr] py-3.5 md:py-[18px] border-b border-ink/12 ${
                  d.desktopOnly ? "max-md:hidden" : ""
                }`}
              >
                <dt className="text-xs md:text-[13px] font-bold uppercase tracking-[0.08em] text-faint md:pt-[3px]">
                  {d.label}
                </dt>
                <dd className="mt-1 md:mt-0 text-base md:text-[17px] leading-[1.45] md:leading-[1.5]">
                  <span className="md:hidden">{d.short}</span>
                  <span className="hidden md:inline">{d.value}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-7 md:mt-0">
          <ContactForm />
        </div>
      </section>

      {/* Desktop map + photo */}
      <section className="hidden md:grid grid-cols-[1.6fr_1fr] h-[420px]">
        <div className="relative bg-[#e9e4dc]">
          <iframe
            title="Mapa — Academia Cross Fênix"
            src={MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
          />
          <a
            href={MAP_ROUTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-14 bottom-8 bg-ink hover:bg-black text-white text-sm font-bold px-[18px] py-3.5 rounded-[4px] transition-colors"
          >
            Como chegar →
          </a>
        </div>
        <div className="relative">
          <Image
            src="/lp/foto-hero.webp"
            alt="Academia Cross Fênix"
            fill
            sizes="35vw"
            className="object-cover"
          />
          <span className="absolute left-5 bottom-5 bg-paper text-[13px] font-bold px-3 py-2 rounded-[3px]">
            {ADDRESS.venue}
          </span>
        </div>
      </section>
    </>
  );
}
