import Link from "next/link";
import Image from "next/image";
import { ADDRESS, SOCIALS } from "@/lib/site";

const columnTitle =
  "text-xs font-bold uppercase tracking-[0.14em] text-paper/50";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper px-5 pt-12 pb-[110px] md:px-14 md:pt-16 md:pb-8">
      <div className="grid gap-9 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10 pb-10 md:pb-12 border-b border-paper/12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/opam-logo.jpeg"
              alt="OPAM Karate"
              width={48}
              height={48}
              className="size-12 rounded-full object-cover"
            />
            <div className="text-lg font-extrabold">
              OPAM <span className="text-opam-glow">KARATE</span>
            </div>
          </div>
          <p className="max-w-[300px] text-sm leading-[1.6] text-paper/60">
            Tradição, disciplina e excelência no ensino de Karate. Formando
            campeões dentro e fora do tatame.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 text-sm">
          <span className={columnTitle}>Navegação</span>
          <Link href="/sobre" className="hover:text-opam-soft">Sobre</Link>
          <Link href="/turmas" className="hover:text-opam-soft">Turma e Horários</Link>
          <Link href="/galeria" className="hover:text-opam-soft">Galeria</Link>
          <Link href="/contato" className="hover:text-opam-soft">Contato</Link>
          <Link href="/matricula" className="hover:text-opam-soft">Matrícula</Link>
        </div>

        <div className="flex flex-col gap-2.5 text-sm">
          <span className={columnTitle}>Contato</span>
          <span>
            {ADDRESS.street}
            <br />
            {ADDRESS.city}
          </span>
          <a href="tel:+5511969392260" className="hover:text-opam-soft">
            (11) 96939-2260
          </a>
          <a href="mailto:contato@opamkarate.com" className="hover:text-opam-soft">
            contato@opamkarate.com
          </a>
        </div>

        <div className="flex flex-col gap-2.5 text-sm">
          <span className={columnTitle}>Parcerias</span>
          <a
            href="https://congressocodec.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-opam-soft"
          >
            Congresso CODEC
          </a>
          <a
            href="https://shinshukan.com.br/site/filiados-shinshukan/opam-itaquera/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-opam-soft"
          >
            Filiado SHINSHUKAN
          </a>
          <a
            href="https://itaquera.net.br/sobre/opam-nin-do-ryu-karate"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-opam-soft"
          >
            Itaquera.net.br
          </a>
          <div className="flex flex-wrap gap-2 mt-2">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-paper/25 hover:border-paper/60 px-2.5 py-[7px] rounded-[3px] text-xs transition-colors"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-6 text-xs text-paper/45 flex flex-col gap-1.5 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} OPAM KARATE. Todos os direitos reservados.</span>
        <span>Organização Paulista de Artes Marciais · Nin do Ryu</span>
      </div>
    </footer>
  );
}
