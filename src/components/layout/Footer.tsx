import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/opam-logo.jpeg"
                alt="OPAM Karate Logo"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <div className="text-2xl font-bold">
                <span className="text-red-600">OPAM</span>{" "}
                <span className="text-white">KARATE</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Tradição, disciplina e excelência no ensino de Karate. 
              Formando campeões dentro e fora do tatame.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-red-600 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/turmas" className="text-gray-400 hover:text-red-600 transition-colors">
                  Turmas
                </Link>
              </li>
              <li>
                <Link href="/horarios" className="text-gray-400 hover:text-red-600 transition-colors">
                  Horários
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="text-gray-400 hover:text-red-600 transition-colors">
                  Galeria
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  R. Sabbado D'Ângelo, 1369<br />
                  Itaquera - São Paulo - SP<br />
                  CEP: 08215-545
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-red-600 flex-shrink-0" />
                <a href="tel:+5511969392260" className="text-gray-400 text-sm hover:text-red-600 transition-colors">
                  (11) 96939-2260
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span className="text-gray-400 text-sm">contato@opamkarate.com</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/karatenindoryu"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-red-600 transition-colors"
                aria-label="Facebook OPAM Karate"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/opamkarate/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-red-600 transition-colors"
                aria-label="Instagram OPAM Karate"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@senseibrunoopam8388"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-red-600 transition-colors"
                aria-label="YouTube OPAM Karate"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
                aria-label="Instagram OPAM Karate"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              Siga-nos nas redes sociais e acompanhe nossas novidades!
            </p>
            
            {/* CODEC Reference */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h4 className="font-semibold mb-2">Eventos & Parcerias</h4>
              <a
                href="https://congressocodec.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors text-sm flex items-center mb-3"
              >
                <span className="mr-2">🥋</span>
                Congresso CODEC
              </a>
              <a
                href="https://shinshukan.com.br/site/filiados-shinshukan/opam-itaquera/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors text-sm flex items-center mb-3"
              >
                <span className="mr-2">🏆</span>
                Filiado SHINSHUKAN
              </a>
              <a
                href="https://itaquera.net.br/sobre/opam-nin-do-ryu-karate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors text-sm flex items-center"
              >
                <span className="mr-2">📍</span>
                Itaquera.net.br
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} OPAM KARATE. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
