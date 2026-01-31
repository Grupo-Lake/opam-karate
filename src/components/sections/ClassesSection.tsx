"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users2 } from "lucide-react";

const classes = [
  {
    icon: Users2,
    title: "Turma Unificada (5+ anos)",
    description:
      "Nossa turma única acolhe praticantes de todas as idades e níveis, desde iniciantes a partir de 5 anos até os mais graduados faixas pretas.",
    features: [
      "Todas as idades e níveis",
      "Desenvolvimento progressivo",
      "Ambiente de aprendizado colaborativo",
      "Técnicas adaptadas ao nível de cada aluno",
    ],
  },
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
            Nossa <span className="text-red-600">Turma</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Uma turma única que une todas as idades e níveis de graduação
          </p>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
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
                        <CardTitle className="text-2xl font-bold">
                          {classItem.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">
                      {classItem.description}
                    </CardDescription>
                    <div className="space-y-2">
                      <div className="font-semibold text-gray-900">
                        Destaques:
                      </div>
                      <ul className="space-y-1">
                        {classItem.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-gray-700"
                          >
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

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/lp/foto-classes.webp"
                alt="Turma OPAM Karate"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
