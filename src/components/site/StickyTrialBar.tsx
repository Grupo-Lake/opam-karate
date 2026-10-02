"use client";

import { usePathname } from "next/navigation";
import { TRIAL_LINK } from "@/lib/site";

const HIDDEN_ON = ["/matricula"];

/** Mobile-only fixed bar with the single primary action of the site. */
export default function StickyTrialBar() {
  const pathname = usePathname();
  if (HIDDEN_ON.some((p) => pathname?.startsWith(p))) return null;

  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pt-2.5 pb-[max(14px,env(safe-area-inset-bottom))] bg-gradient-to-b from-paper/0 to-paper to-30% pointer-events-none">
      <div className="pointer-events-auto bg-ink text-white rounded-lg py-2 pl-4 pr-2 flex items-center justify-between shadow-lg">
        <div className="leading-[1.2]">
          <div className="text-sm font-bold">Aula experimental grátis</div>
          <div className="text-xs text-white/60">Seg · Qua 20h · Sáb 10h</div>
        </div>
        <a
          href={TRIAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-opam hover:bg-opam-dark text-[15px] font-bold px-4 py-3.5 rounded-[5px] transition-colors"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
