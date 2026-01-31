"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Target, 
  Shield, 
  Users, 
  Trophy, 
  Zap 
} from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Saúde Física",
    description: "Melhore sua condição cardiovascular, força, flexibilidade e coordenação motora."
  },
  {
    icon: Target,
    title: "Foco e Concentração",
    description: "Desenvolva disciplina mental e capacidade de concentração para todas as áreas da vida."
  },
  {
    icon: Shield,
    title: "Autodefesa",
    description: "Aprenda técnicas eficazes de defesa pessoal e ganhe confiança."
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Faça parte de uma família unida por respeito, valores e objetivos comuns."
  },
  {
    icon: Trophy,
    title: "Conquistas",
    description: "Participe de campeonatos e alcance novos patamares na sua jornada."
  },
  {
    icon: Zap,
    title: "Autoconfiança",
    description: "Desenvolva autoestima, autocontrole e capacidade de superação."
  }
];

export default function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Benefícios do <span className="text-red-600">Karate</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transforme sua vida através da prática do Karate
          </p>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-red-600">
                  <CardHeader>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-xl font-bold">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {benefit.description}
                    </CardDescription>
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
