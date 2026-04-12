import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RegistrationForm from "@/components/matricula/RegistrationForm";

export const metadata: Metadata = {
  title: "Matrícula",
  description:
    "Faça sua matrícula na Equipe OPAM Karatê. Preencha o contrato online e comece sua jornada no karatê com o Sensei Bruno na Academia Cross Fênix.",
};

export default function MatriculaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao início
          </Link>

          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Contrato de Matrícula
            </h1>
            <p className="text-gray-500">
              Karatê Equipe OPAM · Academia Cross Fênix · Sensei Bruno
            </p>
          </div>
        </div>
      </div>

      {/* Form area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl mx-auto">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
