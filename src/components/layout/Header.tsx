"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAVIGATION, SOCIALS, TRIAL_LINK } from "@/lib/site";
import { Kanji } from "@/components/site/ui";
import { cn } from "@/lib/utils";

function Brand({ onDark = false, onClick }: { onDark?: boolean; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2.5 lg:gap-3">
      <Image
        src="/opam-logo.jpeg"
        alt="OPAM Karate"
        width={44}
        height={44}
        className="size-[34px] lg:size-11 rounded-full object-cover"
        priority
      />
      <div className="leading-[1.05]">
        <div className="text-[15px] lg:text-[17px] font-extrabold lg:tracking-[0.02em]">
          OPAM{" "}
          <span className={onDark ? "text-opam-glow" : "text-opam"}>KARATE</span>
        </div>
        <div className="hidden lg:block text-[11px] tracking-[0.08em] text-faint">
          NIN DO RYU · ITAQUERA
        </div>
      </div>
    </Link>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-ink/10">
      <div className="h-14 lg:h-[76px] px-[18px] lg:px-14 flex items-center justify-between">
        <Brand />

        <nav className="hidden lg:flex gap-[30px] text-sm font-medium" aria-label="Principal">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "pb-1 transition-colors hover:text-opam",
                isActive(item.href) &&
                  "text-opam shadow-[inset_0_-2px_0_var(--color-opam)]",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={TRIAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink text-paper hover:bg-black text-[13px] font-semibold px-4 py-[9px] rounded-[4px] transition-colors"
          >
            Aula grátis
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          className="lg:hidden size-11 -mr-2 flex flex-col items-end justify-center gap-1.5"
        >
          <span className="h-0.5 w-[22px] bg-ink" />
          <span className="h-0.5 w-[15px] bg-ink" />
        </button>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="lg:hidden fixed inset-0 z-[60] bg-ink text-paper flex flex-col overflow-y-auto"
        >
          <div className="h-14 shrink-0 px-[18px] flex items-center justify-between border-b border-paper/10">
            <Brand onDark onClick={() => setIsOpen(false)} />
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setIsOpen(false)}
              className="size-11 -mr-2 flex items-center justify-end text-[26px] font-light"
            >
              ✕
            </button>
          </div>

          <Kanji className="absolute right-3 top-[100px] text-[96px] text-opam/25">
            空手道
          </Kanji>

          <nav className="relative px-5 pt-5 flex flex-col" aria-label="Menu móvel">
            {NAVIGATION.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-baseline justify-between py-4 border-b border-paper/12"
              >
                <span
                  className={cn(
                    "text-[34px] font-extrabold tracking-[-0.02em]",
                    isActive(item.href) && "text-opam-soft",
                  )}
                >
                  {item.name}
                </span>
                <span className="text-xs font-bold text-opam-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>

          <div className="relative mt-auto px-4 pb-[30px] pt-8 flex flex-col gap-2.5">
            <a
              href={TRIAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-opam text-white text-base font-bold p-[18px] rounded-[5px] text-center"
            >
              Agendar aula grátis
            </a>
            <Link
              href="/matricula"
              onClick={() => setIsOpen(false)}
              className="border border-paper/30 text-base font-bold p-[17px] rounded-[5px] text-center"
            >
              Fazer matrícula
            </Link>
            <div className="flex justify-center gap-[22px] text-[13px] text-paper/60 mt-2">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
