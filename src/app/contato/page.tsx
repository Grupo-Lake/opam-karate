"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Estamos prontos para atendê-lo e tirar todas as suas dúvidas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: MapPin,
                title: "Endereço",
                content: "R. Sabbado D'Ângelo, 1369\nItaquera - São Paulo - SP\nCEP: 08215-545"
              },
              {
                icon: Phone,
                title: "Telefone / WhatsApp",
                content: "(11) 96939-2260\nSensei Bruno Garcia"
              },
              {
                icon: Mail,
                title: "E-mail",
                content: "contato@opamkarate.com\ninfo@opamkarate.com"
              },
              {
                icon: Clock,
                title: "Horário de Atendimento",
                content: "Segunda a Sexta: 14h às 21h\nSábado: 9h às 12h"
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
                  <Card className="h-full hover:shadow-lg transition-shadow text-center">
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

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <MessageCircle className="mr-2 h-6 w-6 text-red-600" />
                    Envie uma Mensagem
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        placeholder="Seu nome"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        placeholder="(00) 00000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assunto
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent">
                        <option>Aula Experimental</option>
                        <option>Informações sobre Turmas</option>
                        <option>Valores e Planos</option>
                        <option>Outros</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mensagem
                      </label>
                      <textarea
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        placeholder="Escreva sua mensagem..."
                      />
                    </div>

                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">Localização</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">
                    {/* Placeholder for map */}
                    <div className="text-center text-gray-500">
                      <MapPin className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg font-medium">
                        Mapa de Localização
                      </p>
                      <p className="text-sm mt-2">
                        R. Sabbado D'Ângelo, 1369<br />
                        Itaquera - São Paulo - SP<br />
                        CEP: 08215-545
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Prefere falar pelo WhatsApp?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Entre em contato direto com nossa equipe e tire suas dúvidas em tempo real!
            </p>
            <a href="https://wa.me/5511969392260?text=Olá!%20Gostaria%20de%20informações%20sobre%20as%20aulas%20de%20Karate" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar no WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
