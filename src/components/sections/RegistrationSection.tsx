"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const highlights = [
  {
    icon: Calendar,
    label: "Turmas disponíveis",
    description: "Seg/Qua 20h–21h30 · Sáb 10h–12h",
  },
  {
    icon: Clock,
    label: "Planos flexíveis",
    description: "1 a 3 aulas por semana, conforme sua rotina",
  },
  {
    icon: Shield,
    label: "Todas as idades",
    description: "Crianças, jovens e adultos bem-vindos",
  },
  {
    icon: MapPin,
    label: "Academia Cross Fênix",
    description: "R. Sabbado D'Ângelo, 1369 — Itaquera, SP",
  },
];

export default function RegistrationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="matricula"
      className="relative py-20 overflow-hidden bg-gray-900"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-white"
            >
              <span className="inline-block text-xs font-semibold tracking-widest text-red-400 uppercase mb-4">
                Matrículas abertas
              </span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                Comece sua{" "}
                <span className="text-red-500">jornada</span> no
                karatê
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Disciplina, respeito e evolução contínua. O karatê transforma
                não só o corpo, mas o caráter. Matricule-se na{" "}
                <strong className="text-white">Equipe OPAM</strong> e treine com
                o Sensei Bruno.
              </p>

              <Link href="/matricula">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white text-base px-8 py-6 group"
                >
                  Fazer minha matrícula
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <p className="mt-4 text-sm text-gray-500">
                Leva menos de 3 minutos · Sem burocracia
              </p>
            </motion.div>

            {/* Right — highlights */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {highlights.map(({ icon: Icon, label, description }) => (
                <div
                  key={label}
                  className="rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-colors"
                >
                  <Icon className="h-6 w-6 text-red-400 mb-3" />
                  <p className="font-semibold text-white text-sm mb-1">
                    {label}
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
