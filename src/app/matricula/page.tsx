import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import RegistrationForm from "@/components/matricula/RegistrationForm";
import { Eyebrow } from "@/components/site/ui";

export const metadata: Metadata = pageMetadata({
  title: "Matrícula",
  description:
    "Faça sua matrícula na Equipe OPAM Karatê. Preencha o contrato online e comece sua jornada no karatê com o Sensei Bruno na Academia Cross Fênix.",
  path: "/matricula",
});

export default function MatriculaPage() {
  return (
    <>
      <section className="px-5 pt-7 pb-8 md:px-14 md:pt-16 md:pb-12 flex flex-col gap-3 md:gap-5">
        <span className="text-[13px] text-faint">
          <Link href="/" className="hover:text-opam">
            Início
          </Link>{" "}
          / <b className="text-ink">Matrícula</b>
        </span>
        <Eyebrow>Matrículas abertas</Eyebrow>
        <h1 className="text-[42px] md:text-[72px] leading-[0.98] font-extrabold tracking-[-0.035em]">
          Contrato de matrícula.
        </h1>
        <p className="max-w-[520px] text-base md:text-[19px] leading-[1.5] text-muted-ink">
          Karatê Equipe OPAM · Academia Cross Fênix · Sensei Bruno. Leva menos de
          3 minutos.
        </p>
      </section>

      <section className="px-4 pb-16 md:px-14 md:pb-24">
        <div className="max-w-2xl md:mx-0">
          <RegistrationForm />
        </div>
      </section>
    </>
  );
}
