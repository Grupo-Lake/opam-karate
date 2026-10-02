import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-xs md:text-[13px] font-bold uppercase tracking-[0.14em]",
        tone === "light" ? "text-opam" : "text-opam-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Kanji({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "font-jp pointer-events-none select-none leading-[1.05] [writing-mode:vertical-rl]",
        className,
      )}
    >
      {children}
    </div>
  );
}

const buttonTones = {
  red: "bg-opam text-white hover:bg-opam-dark",
  ink: "bg-ink text-white hover:bg-black",
  outline: "border border-ink/25 text-ink hover:border-ink",
  "outline-light": "border border-white/60 text-white hover:bg-white/10",
  "outline-paper": "border border-paper/40 text-paper hover:bg-paper/10",
} as const;

export function SiteButton({
  href,
  tone = "red",
  external,
  children,
  className,
}: {
  href: string;
  tone?: keyof typeof buttonTones;
  external?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-[4px] px-6 py-4 text-[15px] font-bold transition-colors",
    buttonTones[tone],
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** Ruled, numbered list used across the site ("01 — item"). */
export function NumberedList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ol className={cn("border-t-2 border-ink", className)}>
      {items.map((item, i) => (
        <li
          key={item}
          className="grid grid-cols-[32px_1fr] md:grid-cols-[44px_1fr] border-b border-ink/12 py-3.5 md:py-[15px] text-base md:text-lg"
        >
          <span className="pt-[3px] md:pt-1 text-xs md:text-[13px] font-bold text-opam">
            {String(i + 1).padStart(2, "0")}
          </span>
          {item}
        </li>
      ))}
    </ol>
  );
}

export function Breadcrumb({ current }: { current: string }) {
  return (
    <span className="hidden md:block text-[13px] text-faint">
      <Link href="/" className="hover:text-opam">
        Início
      </Link>{" "}
      / <b className="text-ink">{current}</b>
    </span>
  );
}

export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: ReactNode;
  text?: string;
  primary: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string; external?: boolean };
}) {
  return (
    <section className="bg-opam text-white px-5 py-12 md:px-14 md:py-16 grid md:grid-cols-[1fr_auto] gap-7 md:gap-10 items-center">
      <div>
        <h2 className="text-[34px] md:text-5xl leading-[1.02] font-extrabold tracking-[-0.03em]">
          {title}
        </h2>
        {text && (
          <p className="mt-2.5 text-[15px] md:text-[17px] text-white/90">{text}</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <SiteButton
          href={primary.href}
          external={primary.external}
          tone="ink"
          className="md:px-[26px] md:py-[18px]"
        >
          {primary.label} →
        </SiteButton>
        {secondary && (
          <SiteButton
            href={secondary.href}
            external={secondary.external}
            tone="outline-light"
            className="md:px-[26px] md:py-[18px]"
          >
            {secondary.label}
          </SiteButton>
        )}
      </div>
    </section>
  );
}
