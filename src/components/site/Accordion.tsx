"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

export default function Accordion({
  items,
  defaultOpen = 0,
  className,
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
  className?: string;
}) {
  const [open, setOpen] = useState<string | null>(
    defaultOpen === null ? null : (items[defaultOpen]?.id ?? null),
  );

  return (
    <div className={cn("border-t-2 border-ink", className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id} className="border-b border-ink/12">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 py-[18px] md:py-[22px] text-left text-[17px] md:text-xl font-bold"
            >
              <span>{item.title}</span>
              <span className={cn("text-xl leading-none", isOpen && "text-opam")}>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="pb-5 text-[14px] md:text-base leading-[1.55] text-body max-w-[640px]">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
