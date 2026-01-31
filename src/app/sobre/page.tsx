"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Heart, Target, Users } from "lucide-react";

export default function SobrePage() {
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
              Sobre o OPAM KARATE
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Uma história de dedicação, tradição e excelência no ensino de
              Karate
            </p>
          </motion.div>
        </div>
      </section>

      {/* História */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  Fundado em 1999, o OPAM KARATE nasceu do sonho de mestres
                  apaixonados pela arte do Karate Shorin Ryu e comprometidos em
                  preservar e difundir seus valores tradicionais.
                </p>
                <p>
                  Ao longo de mais de 25 anos, nos consolidamos como uma das
                  principais academias de Karate da região, formando centenas de
                  praticantes que levam consigo não apenas técnicas marciais,
                  mas valores para a vida.
                </p>
                <p>
                  Nossa metodologia de ensino une tradição e modernidade,
                  respeitando os princípios fundamentais do Karate enquanto
                  adaptamos nosso ensino às necessidades contemporâneas de
                  nossos alunos.
                </p>
                <p>
                  Localizado na R. Sabbado D'Ângelo, 1369 - Itaquera, São Paulo,
                  somos reconhecidos como referência em Karate na região,
                  conforme destacado no{" "}
                  <a
                    href="https://itaquera.net.br/sobre/opam-nin-do-ryu-karate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    guia de comércios e serviços de Itaquera
                  </a>
                  .
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl"
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* O que é o Karate-Do */}
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
              O que é o Karate-Do?
            </h2>
            <Card className="bg-gradient-to-br from-gray-50 to-white">
              <CardContent className="p-8 space-y-4 text-gray-700 text-lg">
                <p>
                  O <strong>Karate-Do</strong> (空手道 - "caminho das mãos
                  vazias") é uma arte marcial que se desenvolveu em Okinawa,
                  Japão, como meio de autodefesa. Ao longo do tempo, na luta
                  pela sobrevivência, o ser humano procurou meios de defesa para
                  vencer as adversidades, e em Okinawa se desenvolveu esta arte
                  inicialmente chamada "TE" (Mão).
                </p>
                <p>
                  Esta luta ensinava o praticante a enfrentar sem armas o seu
                  adversário. Por duas vezes houve proibição do uso de armas em
                  Okinawa, o que fez com que o Karate-Do assumisse maior valor
                  como meio de defesa eficaz contra adversários armados.
                </p>
                <p>
                  Mais do que uma técnica de combate, o Karate-Do é um caminho
                  de desenvolvimento pessoal que busca o aperfeiçoamento do
                  caráter através da disciplina física e mental, promovendo
                  valores como respeito, humildade, autocontrole e perseverança.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* O que é Shorin Ryu */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              O que é Shorin Ryu?
            </h2>
            <Card className="bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-8 space-y-4 text-gray-700 text-lg">
                <p>
                  <strong>Shorin-Ryu</strong> (少林流) é um estilo de Karate-Do
                  que combina técnicas marciais provenientes da China com
                  elementos advindos de estilos de luta tradicionais de Okinawa.
                  Shorin é a pronúncia okinawana da palavra Shaolin – monastério
                  budista localizado na província chinesa de Henan –, e que
                  significa "pequeno bosque". Considerando que "ryu" significa
                  estilo, a tradução para Shorin-Ryu é "estilo do pequeno
                  bosque", uma homenagem ao monastério chinês.
                </p>
                <p>
                  O estilo se desenvolveu a partir do Shuri-Te, praticado na
                  região de Shuri em Okinawa. O Karate-Do se desenvolveu em três
                  locais diferentes: Shuri-Te, Naha-Te e Tomari-Te, sendo que
                  Shuri-Te e Tomari-Te deram origem ao estilo Shorin.
                </p>
                <p>
                  A linhagem inclui grandes mestres como Matsumura Sokon
                  (1800-1890), Anko Itosu (1831-1915) e Choshin Chibana
                  (1885-1969), que em 1933 escolheu denominar de Shorin-Ryu o
                  estilo marcial como forma de diferenciá-lo de outros estilos e
                  como homenagem às raízes chinesas.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* O que é a SHINSHUKAN */}
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
              O que é a SHINSHUKAN?
            </h2>
            <Card className="bg-gradient-to-br from-red-50 to-white border-l-4 border-red-600">
              <CardContent className="p-8 space-y-4 text-gray-700 text-lg">
                <p>
                  A <strong>SHINSHUKAN</strong> é uma das mais respeitadas
                  organizações de Karate Shorin Ryu do Brasil, fundada pelo
                  Mestre Yoshihide Shinzato (1927-2008), pioneiro na difusão do
                  estilo Shorin-Ryu em nosso país.
                </p>
                <p>
                  Sensei Shinzato, Hanshi (grão-mestre) 10º Dan de Karate e 9º
                  Dan de Kobudo, chegou ao Brasil em 15 de janeiro de 1954 e
                  começou a ensinar Karate-Do aos membros da colônia japonesa.
                  Em 1954, na cerimônia de inauguração do Parque Ibirapuera em
                  São Paulo, fez demonstrações públicas de Karate e Kobudo,
                  contribuindo significativamente para a difusão desta nobre
                  arte marcial.
                </p>
                <p>
                  Em 1962, fundou seu primeiro Dojô em Santos, a Academia
                  Santista de Karate-Do, que em 1965 viria a se chamar
                  Associação Okinawa Shorin-Ryu Karate-Do do Brasil. Em 1967,
                  fundou a União Shorin-Ryu Karate-Do do Brasil, organização que
                  continua a difundir o Karate da escola Shorin-Ryu sob a
                  liderança do Mestre Masahiro Shinzato, seu filho primogênito.
                </p>
                <p className="font-semibold text-red-700">
                  A filiação à SHINSHUKAN garante aos nossos alunos graduações
                  reconhecidas nacional e internacionalmente, além de acesso a
                  treinamentos, seminários e eventos com mestres de todo o
                  Brasil.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Valores */}
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
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Os princípios que guiam nossa academia e nossos alunos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Respeito",
                description: "Respeito ao mestre, aos colegas e a si mesmo",
              },
              {
                icon: Target,
                title: "Disciplina",
                description:
                  "Compromisso com o treino e desenvolvimento constante",
              },
              {
                icon: Award,
                title: "Excelência",
                description: "Busca contínua pela perfeição técnica e pessoal",
              },
              {
                icon: Users,
                title: "Comunidade",
                description: "União e apoio mútuo entre todos os praticantes",
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Instrutores */}
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
              Nossos Instrutores
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Equipe qualificada e experiente dedicada ao seu desenvolvimento
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src="/bruno.jpeg"
                        alt="Sensei Bruno Garcia"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="font-bold text-xl text-gray-900">
                        Sensei Bruno Garcia
                      </h3>
                      <p className="text-red-600 font-semibold">
                        Instrutor Principal
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4 text-gray-700">
                    <p className="text-lg">
                      Nossa equipe de instrutores é formada por faixas pretas
                      graduadas, com anos de experiência no ensino do Karate
                      Shorin Ryu. Todos possuem certificação reconhecida por
                      federações nacionais e internacionais.
                    </p>
                    <p className="text-lg">
                      Além da formação técnica, nossos mestres são educadores
                      comprometidos com o desenvolvimento integral de cada
                      aluno, respeitando suas individualidades e potencializando
                      suas capacidades.
                    </p>
                    <p className="text-lg">
                      Com participação regular em cursos, seminários e
                      competições, mantemos nossa equipe sempre atualizada com
                      as melhores práticas pedagógicas e técnicas do Karate
                      mundial.
                    </p>
                    <p className="text-lg">
                      Nossos instrutores participam ativamente de eventos como o{" "}
                      <a
                        href="https://congressocodec.com.br/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 font-semibold underline"
                      >
                        Congresso CODEC
                      </a>{" "}
                      (Congresso de Desenvolvimento nos Esportes de Contato),
                      mantendo-se atualizados com as práticas mais modernas de
                      ensino e inclusão nas artes marciais.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CODEC Section */}
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
              Parceiro do Congresso CODEC
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              O OPAM KARATE participa ativamente do Congresso de Desenvolvimento
              nos Esportes de Contato (CODEC), um evento que promove a discussão
              sobre métodos de ensino, inclusão social e práticas inovadoras nas
              artes marciais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://congressocodec.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100"
                >
                  Conheça o CODEC
                </Button>
              </a>
            </div>
            <p className="text-sm mt-6 opacity-90">
              📅 Evento anual dedicado ao desenvolvimento técnico e pedagógico
              nas artes marciais
            </p>
          </motion.div>
        </div>
      </section>

      {/* SHINSHUKAN Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Filiação <span className="text-red-600">SHINSHUKAN</span>
              </h2>
              <div className="w-20 h-1 bg-red-600 mx-auto mb-6" />
            </div>

            <Card className="bg-gradient-to-br from-gray-50 to-white">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 text-center">
                    O OPAM KARATE é oficialmente filiado à{" "}
                    <strong>SHINSHUKAN</strong>, uma das mais respeitadas
                    organizações de Karate Shorin Ryu do Brasil, garantindo o
                    reconhecimento e validade de nossas graduações em âmbito
                    nacional e internacional.
                  </p>

                  <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
                    <p className="text-gray-700">
                      A filiação à SHINSHUKAN assegura que nossos alunos recebam
                      treinamento de acordo com os mais altos padrões técnicos e
                      pedagógicos, além de acesso a eventos, campeonatos e
                      exames de faixa oficialmente reconhecidos.
                    </p>
                  </div>

                  <div className="text-center">
                    <a
                      href="https://shinshukan.com.br/site/filiados-shinshukan/opam-itaquera/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="lg" className="bg-red-600 hover:bg-red-700">
                        Ver Página Oficial na SHINSHUKAN
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
