"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const schedule = [
  {
    day: "Segunda-feira",
    classes: [
      { time: "20:00 - 21:30", class: "Todas as idades" }
    ]
  },
  {
    day: "Quarta-feira",
    classes: [
      { time: "20:00 - 21:30", class: "Todas as idades" }
    ]
  },
  {
    day: "Sábado",
    classes: [
      { time: "10:00 - 12:00", class: "Todas as idades" }
    ]
  }
];

export default function HorariosPage() {
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
              Horários das Aulas
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Confira nossos horários e encontre o melhor para você
            </p>
          </motion.div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedule.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-red-600 text-white">
                    <CardTitle className="flex items-center text-2xl">
                      <Clock className="mr-2 h-6 w-6" />
                      {day.day}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {day.classes.map((classItem, idx) => (
                        <div
                          key={idx}
                          className="border-l-4 border-red-600 pl-4 py-2"
                        >
                          <div className="font-bold text-gray-900">
                            {classItem.time}
                          </div>
                          <div className="text-gray-600">{classItem.class}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Informações Importantes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Pontualidade
                    </h3>
                    <p>
                      Pedimos que os alunos cheguem com 10 minutos de antecedência 
                      para se prepararem adequadamente antes do início da aula.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Uniforme
                    </h3>
                    <p>
                      O uso do kimono (gi) é obrigatório para todas as aulas. 
                      Uniformes podem ser adquiridos na secretaria da academia.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Aulas Experimentais
                    </h3>
                    <p>
                      Oferecemos uma aula experimental gratuita para novos alunos. 
                      Para a primeira aula, pode-se usar roupa confortável (calça e 
                      camiseta de ginástica).
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Reposição de Aulas
                    </h3>
                    <p>
                      Alunos que perderem aulas podem repô-las em outros horários, 
                      mediante disponibilidade de vagas. Consulte a secretaria.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Feriados
                    </h3>
                    <p>
                      Não há aulas em feriados nacionais e municipais. Consulte 
                      nosso calendário anual para verificar as datas.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
