"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Heart, Target, Award, ExternalLink } from "lucide-react";

export default function CodecPage() {
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
              Congresso CODEC
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              Congresso de Desenvolvimento nos Esportes de Contato
            </p>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Evento de aperfeiçoamento e atualização acadêmica nas artes marciais
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sobre o CODEC */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Sobre o <span className="text-red-600">CODEC</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700">
              <p>
                O CODEC – Congresso de Desenvolvimento nos Esportes de Contato é um evento 
                de aperfeiçoamento e atualização acadêmica, propondo diversos momentos, 
                reflexões e dinâmicas de ensino através da práxis de profissionais da área 
                educacional.
              </p>
              <p>
                Juntos podemos entender melhor sobre o processo da aprendizagem dos esportes 
                de combate, promovendo discussões enriquecedoras sobre métodos de ensino e 
                práticas inovadoras.
              </p>
              <p className="font-semibold text-red-600">
                💡 Tema 2025: Desenvolvimento e aprendizagem dos esportes de contato
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Informações do Evento */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Informações do Evento
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Calendar,
                title: "Data",
                content: "14 de Novembro de 2025\n(Sexta-feira)"
              },
              {
                icon: MapPin,
                title: "Local",
                content: "ETEC Itaquera II\nAuditório"
              },
              {
                icon: Users,
                title: "Público-Alvo",
                content: "Atletas, educadores e\namantes das artes marciais"
              },
              {
                icon: Award,
                title: "Certificação",
                content: "Certificado digital\nde 4 horas"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-red-600" />
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 whitespace-pre-line">
                        {item.content}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Objetivos */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Objetivos do CODEC
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Target,
                title: "Métodos de Ensino",
                description: "Promover a discussão sobre métodos de ensino e aprendizagem nos esportes de contato."
              },
              {
                icon: Heart,
                title: "Inclusão Social",
                description: "Estimular a inclusão social por meio das artes marciais."
              },
              {
                icon: Award,
                title: "Práticas Inovadoras",
                description: "Divulgar projetos e práticas inovadoras relacionadas à acessibilidade e empoderamento."
              },
              {
                icon: Users,
                title: "Rede de Profissionais",
                description: "Fortalecer a rede de profissionais e praticantes da área."
              },
              {
                icon: Heart,
                title: "Responsabilidade Social",
                description: "Recolher brinquedos como forma de ingresso, promovendo responsabilidade social."
              },
              {
                icon: Target,
                title: "Transformação Social",
                description: "Usar o esporte como ferramenta de inclusão, empoderamento e transformação social."
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-red-600" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Responsabilidade Social */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Responsabilidade Social
            </h2>
            
            <Card className="bg-gradient-to-br from-red-50 to-white border-red-200">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">🎁</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Ingresso: 1 Brinquedo
                    </h3>
                  </div>
                  
                  <p className="text-lg text-gray-700 text-center">
                    O Congresso CODEC une esporte e responsabilidade social ao trocar 
                    a entrada por brinquedos para doação. Todos os brinquedos arrecadados 
                    serão doados para crianças em situação de vulnerabilidade social.
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-bold text-lg text-gray-900 mb-3">Como Participar:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✓</span>
                        Traga um brinquedo novo ou em bom estado de conservação
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✓</span>
                        Faça sua inscrição online através da plataforma oficial
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✓</span>
                        Entregue o brinquedo na entrada do evento
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Realização */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Realização
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-red-600 mb-4">
                OPAM
              </h3>
              <p className="text-lg text-gray-900 font-semibold mb-2">
                Organização Paulista de Artes Marciais
              </p>
              <p className="text-gray-700 mb-4">
                NIN DO RYU
              </p>
              <p className="text-gray-600">
                Nossa missão: Promover o desenvolvimento técnico e pedagógico nas 
                artes marciais, integrando tradição e inovação para formar 
                profissionais capacitados e conscientes de seu papel social.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              Participe do CODEC 2025
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Inscreva-se agora e faça parte deste evento transformador!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://congressocodec.com.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Acessar Site Oficial
                </Button>
              </a>
              <a
                href="https://www.even3.com.br/codec-652594"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Fazer Inscrição
                </Button>
              </a>
            </div>
            <p className="text-sm mt-6 opacity-90">
              📅 14 de Novembro de 2025 • 🕐 19h às 22h30 • 📍 ETEC Itaquera II
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
