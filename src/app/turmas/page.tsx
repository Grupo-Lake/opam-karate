"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby, User, Users2, Sword, CheckCircle } from "lucide-react";

const classes = [
  {
    icon: Baby,
    title: "Infantil (4-7 anos)",
    description: "Introdução ao Karate de forma lúdica e educativa",
    ageGroup: "4 a 7 anos",
    features: [
      "Desenvolvimento motor e coordenação",
      "Socialização e trabalho em grupo",
      "Introdução aos valores do Karate",
      "Atividades lúdicas e educativas",
      "Concentração e disciplina básica"
    ],
    schedule: "Segunda, Quarta e Sexta - 16h às 17h"
  },
  {
    icon: User,
    title: "Juvenil (8-13 anos)",
    description: "Fundamentos técnicos e formação de caráter",
    ageGroup: "8 a 13 anos",
    features: [
      "Técnicas fundamentais de Karate",
      "Katas e Kumite básico",
      "Desenvolvimento físico e mental",
      "Autoconfiança e autocontrole",
      "Preparação para graduações"
    ],
    schedule: "Segunda, Quarta e Sexta - 17h às 18h"
  },
  {
    icon: Users2,
    title: "Adolescente/Adulto (14+ anos)",
    description: "Treinamento completo e técnicas avançadas",
    ageGroup: "A partir de 14 anos",
    features: [
      "Técnicas avançadas de Karate",
      "Katas superiores e Kumite",
      "Defesa pessoal aplicada",
      "Condicionamento físico completo",
      "Preparação para competições"
    ],
    schedule: "Terça e Quinta - 19h às 20h30 / Sábado - 9h às 11h"
  },
  {
    icon: Sword,
    title: "Turma de Competição",
    description: "Preparação para atletas competidores",
    ageGroup: "Todas as idades (seleção)",
    features: [
      "Treino intensivo e específico",
      "Preparação técnica e tática",
      "Acompanhamento personalizado",
      "Participação em torneios",
      "Desenvolvimento de alta performance"
    ],
    schedule: "Segunda a Sexta - 18h às 19h + Sábado - 14h às 16h"
  }
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
              Nossas Turmas
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Encontre a turma perfeita para você ou seu filho começar a jornada no Karate
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
                        <h2 className="text-3xl font-bold mb-2">{classItem.title}</h2>
                        <p className="text-lg opacity-90">{classItem.ageGroup}</p>
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
                          <h3 className="font-bold text-gray-900 mb-2">Horários:</h3>
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
              Não sabe qual turma escolher?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Entre em contato conosco! Teremos prazer em ajudá-lo a encontrar a 
              turma ideal para você ou seu filho começar no Karate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/5511969392260?text=Olá!%20Gostaria%20de%20informações%20sobre%20as%20turmas%20de%20Karate" target="_blank" rel="noopener noreferrer">
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
