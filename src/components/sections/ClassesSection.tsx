import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/site/ui";
import { ADDRESS, CLASSES, WEEK_DAYS } from "@/lib/site";

export default function ClassesSection() {
  return (
    <section className="px-4 pt-10 md:px-14 md:pt-0">
      <div className="grid md:grid-cols-2 bg-white rounded-md overflow-hidden">
        <div className="order-2 md:order-1 flex flex-col gap-2.5 md:gap-[18px] px-[18px] py-[22px] md:p-14">
          <Eyebrow>Nossa turma</Eyebrow>
          <h2 className="text-[26px] md:text-[44px] leading-[1.05] md:leading-[1.02] font-extrabold tracking-[-0.02em] md:tracking-[-0.03em]">
            Turma Unificada
            <br className="hidden md:block" /> a partir de 5 anos
          </h2>
          <p className="hidden md:block text-[17px] leading-[1.55] text-muted-ink">
            Nossa turma única acolhe praticantes de todas as idades e níveis,
            desde iniciantes até os mais graduados faixas pretas.
          </p>

          <ul className="flex flex-col mt-1 md:mt-2.5">
            {CLASSES.map((c, i) => (
              <li
                key={c.day}
                className={`flex justify-between py-[13px] md:py-4 border-t border-ink/12 text-base md:text-[17px] ${
                  i === CLASSES.length - 1 ? "border-b" : ""
                }`}
              >
                <b>{WEEK_DAYS[c.day].long}</b>
                <span>
                  {c.start} – {c.end}
                </span>
              </li>
            ))}
          </ul>

          <p className="text-[13px] md:text-sm text-faint">
            {ADDRESS.venue} · {ADDRESS.street} — Itaquera, SP
          </p>
          <Link
            href="/turmas"
            className="self-start text-sm font-bold text-opam hover:underline underline-offset-4"
          >
            Ver agenda completa →
          </Link>
        </div>

        <div className="order-1 md:order-2 relative h-[180px] md:h-auto md:min-h-[480px]">
          <Image
            src="/lp/foto-hero.webp"
            alt="Turma de karatê treinando na Academia Cross Fênix"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
