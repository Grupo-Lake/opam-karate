"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const images = [
  { id: 1, title: "Treino Infantil", category: "Infantil" },
  { id: 2, title: "Kata em Grupo", category: "Técnica" },
  { id: 3, title: "Kumite", category: "Competição" },
  { id: 4, title: "Cerimônia de Graduação", category: "Eventos" },
  { id: 5, title: "Turma Adulto", category: "Adulto" },
  { id: 6, title: "Campeonato Estadual", category: "Competição" },
  { id: 7, title: "Treino Juvenil", category: "Juvenil" },
  { id: 8, title: "Seminário com Mestre", category: "Eventos" },
  { id: 9, title: "Defesa Pessoal", category: "Técnica" },
];

export default function GaleriaPage() {
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
              Galeria de Fotos
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Momentos especiais da nossa jornada no Karate
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all">
                  <div className="relative h-64 bg-gradient-to-br from-red-600 to-gray-900">
                    {/* Placeholder for images */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <div className="text-6xl mb-4 opacity-30">📷</div>
                      <div className="text-xl font-bold">{image.title}</div>
                      <div className="text-sm opacity-75">{image.category}</div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-gray-900">
                      {image.title}
                    </h3>
                    <p className="text-sm text-gray-600">{image.category}</p>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Siga-nos nas Redes Sociais
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Acompanhe nosso dia a dia, eventos, campeonatos e muito mais
              através das nossas redes sociais!
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/opamkarate/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Instagram
              </a>
              <a
                href="https://web.facebook.com/karatenindoryu"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Facebook
              </a>
              <a
                href="https://www.youtube.com/@senseibrunoopam8388"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                YouTube
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
