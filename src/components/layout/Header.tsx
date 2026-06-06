"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Sobre", href: "/sobre" },
  { name: "Turmas", href: "/turmas" },
  { name: "Horários", href: "/horarios" },
  { name: "Galeria", href: "/galeria" },
  { name: "CODEC", href: "/codec" },
  { name: "Contato", href: "/contato" },
];

const championship = { name: "Campeonato", href: "/#campeonato" };

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/opam-logo.jpeg"
              alt="OPAM Karate Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <div className="text-2xl md:text-3xl font-bold">
              <span className="text-red-600">OPAM</span>{" "}
              <span className="text-gray-900">KARATE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={championship.href}
              className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-semibold transition-colors border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-full text-sm"
            >
              <Trophy className="h-3.5 w-3.5" />
              {championship.name}
            </Link>
            <a
              href="https://wa.me/5511969392260?text=Olá!%20Gostaria%20de%20informações%20sobre%20as%20aulas%20de%20Karate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-red-600 hover:bg-red-700">
                Agende sua Aula
              </Button>
            </a>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col h-full">
                <div className="flex flex-col space-y-1 mt-8 flex-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-gray-800 hover:text-red-600 hover:bg-red-50 transition-colors px-4 py-3 rounded-lg"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href={championship.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-lg font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors px-4 py-3 rounded-lg border border-red-100"
                  >
                    <Trophy className="h-4 w-4" />
                    {championship.name}
                  </Link>
                </div>
                <div className="pt-6 pb-8 border-t border-gray-200">
                  <a
                    href="https://wa.me/5511969392260?text=Olá!%20Gostaria%20de%20informações%20sobre%20as%20aulas%20de%20Karate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="bg-red-600 hover:bg-red-700 w-full text-base font-semibold py-6 shadow-lg">
                      Agende sua Aula
                    </Button>
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
