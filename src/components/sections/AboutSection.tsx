"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sobre o <span className="text-red-600">OPAM KARATE</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative h-100 md:h-125 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/lp/foto-sobre.webp"
                alt="OPAM Karate Dojo"
                fill
                className="object-cover"
              />
              {/* Overlay com caracteres japoneses */}
              <div className="absolute top-4 right-4 text-white text-5xl font-bold opacity-30 mix-blend-overlay">
                空手道
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900">
              Tradição e Excelência desde 1999
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              O OPAM KARATE nasceu com a missão de preservar e difundir os valores 
              tradicionais do Karate Shorin Ryu, promovendo não apenas o desenvolvimento 
              físico, mas também o crescimento pessoal e espiritual de nossos alunos.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Com mais de 25 anos de história, formamos centenas de praticantes que 
              levam consigo os princípios de disciplina, respeito, perseverança e 
              autocontrole para todas as áreas de suas vidas.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nossa equipe de instrutores é altamente qualificada, com formação 
              reconhecida nacional e internacionalmente, garantindo um ensino de 
              excelência para todas as idades. Participamos ativamente do{" "}
              <a
                href="https://congressocodec.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Congresso CODEC
              </a>
              , evento de referência no desenvolvimento das artes marciais.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="border-l-4 border-red-600 pl-4">
                <div className="text-3xl font-bold text-red-600">25+</div>
                <div className="text-sm text-gray-600">Anos de Experiência</div>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <div className="text-3xl font-bold text-red-600">10+</div>
                <div className="text-sm text-gray-600">Instrutores Qualificados</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
