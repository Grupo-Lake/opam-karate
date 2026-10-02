"use client";

import { useState, type FormEvent } from "react";
import { whatsappLink } from "@/lib/site";
import { formatPhone } from "@/components/site/phone";

const AGES = [
  "Até 7 anos",
  "8 a 12 anos",
  "13 a 17 anos",
  "Adulto (18+)",
];

const field =
  "w-full bg-white text-ink placeholder:text-[#8a8178] text-[15px] md:text-sm px-4 py-3.5 md:py-[15px] rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-ink";

/** "Agende sua aula grátis" — opens WhatsApp with the message already filled. */
export default function TrialForm({ id }: { id?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = `Olá! Gostaria de agendar uma aula experimental grátis.

*Nome:* ${name}
*WhatsApp:* ${phone}
*Idade do aluno:* ${age}`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className="scroll-mt-24 bg-opam text-white rounded-md p-[22px_18px] md:px-7 md:py-6 flex flex-col gap-2.5 md:grid md:grid-cols-2 md:gap-3.5 lg:grid-cols-[auto_1fr_1fr_1fr_auto] lg:items-center lg:py-[26px] shadow-[0_20px_40px_-20px_rgba(120,10,10,0.5)]"
    >
      <div className="text-xl lg:text-lg font-extrabold leading-[1.15] md:col-span-2 lg:col-span-1 lg:pr-2.5">
        Agende sua
        <br className="hidden lg:block" /> aula grátis
      </div>
      <input
        required
        aria-label="Nome completo"
        placeholder="Nome completo"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={field}
      />
      <input
        required
        aria-label="WhatsApp"
        placeholder="WhatsApp"
        inputMode="tel"
        autoComplete="tel"
        minLength={14}
        value={phone}
        onChange={(e) => setPhone(formatPhone(e.target.value))}
        className={field}
      />
      <select
        required
        aria-label="Idade do aluno"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className={`${field} ${age ? "" : "text-[#8a8178]"}`}
      >
        <option value="" disabled>
          Idade do aluno
        </option>
        {AGES.map((a) => (
          <option key={a} value={a} className="text-ink">
            {a}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-ink hover:bg-black text-white text-[15px] md:text-sm font-bold px-[22px] py-4 md:py-[15px] rounded-[4px] transition-colors md:col-span-2 lg:col-span-1"
      >
        Quero agendar →
      </button>
    </form>
  );
}
