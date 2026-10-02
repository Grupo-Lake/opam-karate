import Image from "next/image";
import { Eyebrow } from "@/components/site/ui";

export default function InstructorSection() {
  return (
    <section className="px-5 py-10 md:px-14 md:py-24 flex gap-4 items-center md:grid md:grid-cols-[360px_1fr] md:gap-16">
      <div className="relative shrink-0 w-24 h-28 md:w-[360px] md:h-[420px] rounded-[4px] md:rounded-md overflow-hidden">
        <Image
          src="/bruno.jpeg"
          alt="Sensei Bruno Garcia"
          fill
          sizes="(min-width: 768px) 360px, 96px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1.5 md:gap-[18px]">
        <Eyebrow>
          <span className="md:hidden">Instrutor</span>
          <span className="hidden md:inline">Instrutor principal</span>
        </Eyebrow>
        <h2 className="text-[22px] md:text-[44px] font-extrabold tracking-[-0.02em] md:tracking-[-0.03em]">
          Sensei Bruno Garcia
        </h2>
        <p className="md:hidden text-sm text-muted-ink">Faixa preta · Shorin Ryu</p>
        <p className="hidden md:block max-w-[620px] text-lg leading-[1.6] text-muted-ink text-pretty">
          Faixa preta graduado com anos de experiência no ensino do Karate
          Shorin Ryu, comprometido com o desenvolvimento integral de cada aluno,
          respeitando suas individualidades e potencializando suas capacidades.
        </p>
        <div className="hidden md:flex gap-2.5">
          {["SHINSHUKAN", "Congresso CODEC"].map((tag) => (
            <span
              key={tag}
              className="text-[13px] font-semibold px-3 py-2 border border-ink/20 rounded-[3px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
