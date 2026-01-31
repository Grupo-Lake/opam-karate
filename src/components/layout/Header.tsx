"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
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
            <a href="https://wa.me/5511969392260?text=Olá!%20Gostaria%20de%20informações%20sobre%20as%20aulas%20de%20Karate" target="_blank" rel="noopener noreferrer">
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
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <a href="https://wa.me/5511969392260?text=Olá!%20Gostaria%20de%20informações%20sobre%20as%20aulas%20de%20Karate" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="bg-red-600 hover:bg-red-700 w-full mt-4">
                    Agende sua Aula
                  </Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
