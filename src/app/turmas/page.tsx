"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users2, CheckCircle } from "lucide-react";

const classes = [
  {
    icon: Users2,
    title: "Turma Unificada (5+ anos)",
    description:
      "Nossa turma única acolhe praticantes de todas as idades e níveis, desde iniciantes a partir de 5 anos até os mais graduados faixas pretas",
    ageGroup: "A partir de 5 anos - Todos os níveis",
    features: [
      "Todas as idades e níveis juntos",
      "Desenvolvimento progressivo e personalizado",
      "Ambiente de aprendizado colaborativo",
      "Técnicas adaptadas ao nível de cada aluno",
      "Do iniciante ao faixa preta",
      "Katas, Kumite e Defesa Pessoal",
      "Preparação para graduações e competições",
      "Valores tradicionais do Karate Shorin Ryu",
    ],
    schedule: "Consulte-nos para conhecer os horários disponíveis",
  },
];

export default function TurmasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Nossa Turma
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Uma turma única que une todas as idades e níveis de graduação
            </p>
          </motion.div>
        </div>
      </section>

      {/* Turmas */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {classes.map((classItem, index) => {
              const Icon = classItem.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-shadow">
                    <div className="grid md:grid-cols-3">
                      {/* Left Side - Icon and Title */}
                      <div className="bg-gradient-to-br from-red-600 to-red-800 text-white p-8 flex flex-col justify-center items-center text-center">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
                          <Icon className="h-12 w-12" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">
                          {classItem.title}
                        </h2>
                        <p className="text-lg opacity-90">
                          {classItem.ageGroup}
                        </p>
                      </div>

                      {/* Right Side - Details */}
                      <div className="md:col-span-2 p-8">
                        <p className="text-xl text-gray-700 mb-6">
                          {classItem.description}
                        </p>

                        <div className="mb-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-3">
                            O que você vai aprender:
                          </h3>
                          <ul className="space-y-2">
                            {classItem.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                          <h3 className="font-bold text-gray-900 mb-2">
                            Horários:
                          </h3>
                          <p className="text-gray-700">{classItem.schedule}</p>
                        </div>

                        <a
                          href={`https://wa.me/5511969392260?text=Olá!%20Gostaria%20de%20agendar%20uma%20aula%20experimental%20-%20${encodeURIComponent(classItem.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="w-full md:w-auto bg-red-600 hover:bg-red-700">
                            Agendar Aula Experimental
                          </Button>
                        </a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Pronto para começar sua jornada no Karate?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Entre em contato conosco e agende sua aula experimental gratuita!
              Nossa turma unificada acolhe praticantes de todas as idades e
              níveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5511969392260?text=Olá!%20Gostaria%20de%20informações%20sobre%20as%20turmas%20de%20Karate"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  Fale Conosco
                </Button>
              </a>
              <a href="/contato">
                <Button size="lg" variant="outline">
                  Agendar Visita
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
