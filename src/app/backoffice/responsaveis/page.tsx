"use client";

import { useEffect, useState, useCallback } from "react";
import { useApiClient } from "@/lib/api/client-hook";
import type { Student } from "@/lib/api/types";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Loader2, Phone } from "lucide-react";

type GuardianWithStudent = NonNullable<Student["guardian"]> & {
  studentId: string;
};

export default function ResponsaveisPage() {
  const api = useApiClient();
  const [guardians, setGuardians] = useState<GuardianWithStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadGuardians = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.guardians.list();
      setGuardians(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar responsáveis"
      );
    } finally {
      setLoading(false);
    }
  }, [api.guardians]);

  useEffect(() => {
    loadGuardians();
  }, [loadGuardians]);

  const filteredGuardians = guardians.filter((guardian) =>
    guardian.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const formatPhone = (phone: string) => {
    // Formatos aceitos:
    // +55XXXXXXXXXXX -> (XX) XXXXX-XXXX
    // XXXXXXXXXXX -> (XX) XXXXX-XXXX
    // XXXXXXXXXX -> (XX) XXXX-XXXX
    const cleaned = phone.replace(/\D/g, "");
    
    // Com código do país +55 (13 dígitos)
    if (cleaned.length === 13 && cleaned.startsWith("55")) {
      const ddd = cleaned.substring(2, 4);
      const part1 = cleaned.substring(4, 9);
      const part2 = cleaned.substring(9);
      return `(${ddd}) ${part1}-${part2}`;
    }
    
    // Celular 11 dígitos (com 9)
    if (cleaned.length === 11) {
      const ddd = cleaned.substring(0, 2);
      const part1 = cleaned.substring(2, 7);
      const part2 = cleaned.substring(7);
      return `(${ddd}) ${part1}-${part2}`;
    }
    
    // Telefone fixo 10 dígitos
    if (cleaned.length === 10) {
      const ddd = cleaned.substring(0, 2);
      const part1 = cleaned.substring(2, 6);
      const part2 = cleaned.substring(6);
      return `(${ddd}) ${part1}-${part2}`;
    }
    
    // Retorna o original se não reconhecer o formato
    return phone;
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Responsáveis
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Visualizar responsáveis cadastrados ({guardians.length} total)
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar responsável por nome..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-200">
          <strong>Erro:</strong> {error}
        </div>
      )}

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="rounded-lg border bg-white dark:bg-gray-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Data de Nascimento</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Cadastrado em</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuardians.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    {guardians.length === 0
                      ? "Nenhum responsável cadastrado"
                      : "Nenhum responsável encontrado"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredGuardians.map((guardian) => (
                  <TableRow key={guardian.id}>
                    <TableCell className="font-medium">
                      {guardian.fullName}
                    </TableCell>
                    <TableCell>{formatDate(guardian.birthDate)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{formatPhone(guardian.phone)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(guardian.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Badge>Ativo</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
