"use client";

import { useState, type FormEvent } from "react";
import { whatsappLink } from "@/lib/site";
import { formatPhone } from "@/components/site/phone";
import { cn } from "@/lib/utils";

const SUBJECTS = [
  "Aula Experimental",
  "Informações sobre Turmas",
  "Valores e Planos",
  "Outros",
];

const input =
  "w-full border border-ink/20 bg-white rounded-[4px] px-4 py-3.5 md:py-[15px] text-[15px] placeholder:text-[#8a8178] outline-none focus:border-opam focus:ring-1 focus:ring-opam";

export default function ContactForm() {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "" });

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({
        ...f,
        [key]: key === "telefone" ? formatPhone(e.target.value) : e.target.value,
      }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = `Olá! Vim através do site.

*Nome:* ${form.nome}
*E-mail:* ${form.email}
*Telefone:* ${form.telefone}
*Assunto:* ${subject}

*Mensagem:*
${form.mensagem}`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-md p-[22px_18px] md:p-10 flex flex-col gap-3 md:gap-[18px] md:self-start md:shadow-[0_30px_60px_-40px_rgba(23,19,15,0.35)]"
    >
      <h2 className="text-[22px] md:text-[26px] font-extrabold md:tracking-[-0.02em]">
        Envie uma mensagem
      </h2>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-[13px] font-semibold">Assunto</legend>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {SUBJECTS.map((s) => (
            <button
              type="button"
              key={s}
              aria-pressed={subject === s}
              onClick={() => setSubject(s)}
              className={cn(
                "rounded-full px-3 md:px-3.5 py-2.5 text-[13px] md:text-sm transition-colors",
                subject === s
                  ? "bg-ink text-white font-semibold"
                  : "border border-ink/20 hover:border-ink",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2 text-[13px] font-semibold">
        Nome completo
        <input
          required
          autoComplete="name"
          placeholder="Seu nome"
          value={form.nome}
          onChange={set("nome")}
          className={cn(input, "font-normal")}
        />
      </label>

      <div className="grid md:grid-cols-2 gap-3 md:gap-3.5">
        <label className="flex flex-col gap-2 text-[13px] font-semibold">
          E-mail
          <input
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={set("email")}
            className={cn(input, "font-normal")}
          />
        </label>
        <label className="flex flex-col gap-2 text-[13px] font-semibold">
          Telefone
          <input
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 9 8765-4321"
            value={form.telefone}
            onChange={set("telefone")}
            className={cn(input, "font-normal")}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-[13px] font-semibold">
        Mensagem
        <textarea
          required
          rows={4}
          placeholder="Escreva sua mensagem..."
          value={form.mensagem}
          onChange={set("mensagem")}
          className={cn(input, "font-normal resize-none")}
        />
      </label>

      <button
        type="submit"
        className="bg-opam hover:bg-opam-dark text-white text-[15px] md:text-base font-bold p-4 md:p-[18px] rounded-[4px] transition-colors"
      >
        <span className="md:hidden">Enviar via WhatsApp →</span>
        <span className="hidden md:inline">Enviar mensagem via WhatsApp →</span>
      </button>
      <p className="hidden md:block text-[13px] text-faint text-center">
        Abre o WhatsApp com sua mensagem já preenchida.
      </p>
    </form>
  );
}
