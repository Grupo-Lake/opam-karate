import Image from "next/image";
import { Eyebrow, Kanji } from "@/components/site/ui";
import TrialForm from "@/components/site/TrialForm";

const stats = [
  { value: "25+", label: "anos de experiência", short: "anos" },
  { value: "5+", label: "faixas pretas", short: "faixas pretas" },
  { value: "100+", label: "medalhas", short: "medalhas" },
];

export default function HeroSection() {
  return (
    <section className="relative">
      {/* Altura: preenche a tela (menos o header) em qualquer dispositivo */}
      <div className="grid md:grid-cols-2 md:min-h-[max(560px,calc(100svh-76px-96px))] lg:min-h-[max(640px,calc(100svh-76px-56px-96px))]">
        <div className="order-2 md:order-1 relative flex flex-col justify-center gap-4 md:gap-6 px-5 pt-8 md:px-8 lg:px-14 md:py-16 lg:pt-[72px] lg:pb-[140px]">
          <Kanji className="absolute right-3.5 top-6 md:right-4 lg:right-6 md:top-10 lg:top-12 text-[64px] md:text-[96px] lg:text-[140px] text-opam/[0.12] lg:text-opam/10">
            空手道
          </Kanji>

          <Eyebrow>Matrículas abertas</Eyebrow>
          <h1 className="relative text-[46px] sm:text-[56px] md:text-[56px] lg:text-[80px] xl:text-[88px] leading-[0.98] font-extrabold tracking-[-0.035em] max-md:max-w-[88%]">
            Comece sua jornada no karatê.
          </h1>
          <p className="max-w-[460px] lg:max-w-[500px] text-base md:text-[17px] lg:text-xl leading-[1.5] lg:leading-[1.55] text-muted-ink text-pretty">
            Disciplina, respeito e evolução contínua. O karatê transforma não só
            o corpo, mas o caráter. Treine com o Sensei Bruno.
          </p>

          <dl className="grid grid-cols-3 md:flex md:gap-6 lg:gap-8 border-t-2 border-ink md:border-0 mt-1 md:mt-3">
            {stats.map((s, i) => (
              <div
                key={s.value}
                className={
                  i === 0
                    ? "pt-2.5 md:pt-0"
                    : "pt-2.5 pl-3 border-l border-ink/15 md:pt-0 md:pl-6 lg:pl-8"
                }
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold">{s.value}</div>
                  <div className="text-xs md:text-[13px] text-faint">
                    <span className="md:hidden">{s.short}</span>
                    <span className="hidden md:inline">{s.label}</span>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 md:order-2 relative h-[clamp(280px,42svh,400px)] md:h-auto">
          <Image
            src="/lp/foto-sobre.webp"
            alt="Alunos de karatê da equipe OPAM em treino"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 lg:left-6 lg:top-6 bg-paper text-xs font-semibold px-2.5 py-1.5 rounded-[3px]">
            Filiado SHINSHUKAN
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-4 mt-7 md:mx-8 md:-mt-12 lg:mx-0 lg:mt-0 lg:absolute lg:inset-x-14 lg:-bottom-14">
        <TrialForm id="agendar" />
      </div>
    </section>
  );
}
