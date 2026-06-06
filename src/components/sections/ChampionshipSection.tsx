"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Star, Users, FileText, ExternalLink } from "lucide-react";

const details = [
  {
    icon: Trophy,
    label: "Modalidade",
    description: "Kata — individual, todas as faixas",
  },
  {
    icon: Users,
    label: "Quem pode participar",
    description: "Alunos de qualquer academia ou dojo",
  },
  {
    icon: Star,
    label: "Formato",
    description: "100% online — envie seu vídeo pela plataforma",
  },
  {
    icon: FileText,
    label: "Inscrição",
    description: "Gratuita — preencha o formulário abaixo",
  },
];

export default function ChampionshipSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="campeonato"
      className="relative py-20 overflow-hidden bg-gray-950"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Red glow top-left */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      {/* Red glow bottom-right */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-red-400 uppercase mb-4 border border-red-500/30 bg-red-500/10 px-4 py-1.5 rounded-full">
              <Trophy className="h-3.5 w-3.5" />
              Evento especial · Inscrições abertas
            </span>

            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
              1º Campeonato de <span className="text-red-500">Kata</span>{" "}
              <span className="block md:inline">Online</span>
            </h2>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Mostre sua técnica, represente seu dojo e compete com praticantes
              de todo o Brasil — tudo online, sem sair de casa.
            </p>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14"
          >
            {details.map(({ icon: Icon, label, description }) => (
              <div
                key={label}
                className="rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/8 hover:border-red-500/30 transition-colors duration-200"
              >
                <Icon className="h-5 w-5 text-red-400 mb-2" />
                <p className="font-semibold text-white text-xs mb-1">{label}</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Google Form embed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            {/* Form header bar */}
            <div className="bg-red-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-white/90" />
                <span className="text-white font-bold text-sm tracking-wide uppercase">
                  Inscrição — 1º Campeonato de Kata Online
                </span>
              </div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe2uJORg3zeJd8bjqmjPlWMgT6fuWpL0wX9gWIeX_g2GJXADQ/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs transition-colors duration-150 cursor-pointer"
                title="Abrir formulário em nova aba"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Abrir em nova aba</span>
              </a>
            </div>

            {/* Embedded form */}
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSe2uJORg3zeJd8bjqmjPlWMgT6fuWpL0wX9gWIeX_g2GJXADQ/viewform?embedded=true"
              width="100%"
              height="700"
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
              className="block bg-white"
              title="Formulário de inscrição — 1º Campeonato de Kata Online"
              loading="lazy"
            >
              Carregando formulário…
            </iframe>
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-gray-600 text-xs mt-6"
          >
            Formulário hospedado pelo Google Forms · Seus dados são tratados com
            segurança · Dúvidas? Entre em contato pelo WhatsApp.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
