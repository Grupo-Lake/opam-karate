"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby, User, Users2, Sword } from "lucide-react";

const classes = [
  {
    icon: Baby,
    title: "Infantil (4-7 anos)",
    description: "Desenvolvimento motor, coordenação e introdução aos valores do Karate através de atividades lúdicas.",
    features: ["Psicomotricidade", "Socialização", "Disciplina básica"]
  },
  {
    icon: User,
    title: "Juvenil (8-13 anos)",
    description: "Técnicas fundamentais, kata e kumite com foco em disciplina e autocontrole.",
    features: ["Técnicas básicas", "Katas", "Desenvolvimento físico"]
  },
  {
    icon: Users2,
    title: "Adolescente/Adulto (14+ anos)",
    description: "Treinamento completo com técnicas avançadas, preparação para competições e graduações.",
    features: ["Técnicas avançadas", "Competições", "Defesa pessoal"]
  },
  {
    icon: Sword,
    title: "Turma de Competição",
    description: "Para atletas que desejam competir em nível estadual e nacional com treinos específicos.",
    features: ["Treino intensivo", "Preparação para torneios", "Acompanhamento personalizado"]
  }
];

export default function ClassesSection() {
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
            Nossas <span className="text-red-600">Turmas</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Turmas especializadas para todas as idades e objetivos
          </p>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {classes.map((classItem, index) => {
            const Icon = classItem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">{classItem.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">
                      {classItem.description}
                    </CardDescription>
                    <div className="space-y-2">
                      <div className="font-semibold text-gray-900">Destaques:</div>
                      <ul className="space-y-1">
                        {classItem.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-gray-700">
                            <span className="w-2 h-2 bg-red-600 rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700 mt-4">
                      Saiba Mais
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
