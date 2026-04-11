"use client";

import { useEffect, useState, useCallback } from "react";
import { useApiClient } from "@/lib/api/client-hook";
import type { StudentListItem } from "@/lib/api/types";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Loader2, Pencil, Trash2 } from "lucide-react";
import { StudentFormSheet } from "@/components/backoffice/alunos/StudentFormSheet";
import { DeleteStudentDialog } from "@/components/backoffice/alunos/DeleteStudentDialog";

export default function AlunosPage() {
  const api = useApiClient();
  const [students, setStudents] = useState<StudentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [createOpen, setCreateOpen] = useState(false);
  const [editStudentId, setEditStudentId] = useState<string | null>(null);
  const [deleteStudent, setDeleteStudent] = useState<StudentListItem | null>(null);

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.students.list({ page, limit: 20 });
      setStudents(result.data);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar alunos");
    } finally {
      setLoading(false);
    }
  }, [api.students, page]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Alunos
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gerenciar cadastros de alunos ({total} total)
          </p>
        </div>
        <Button className="gap-2" onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4" />
          Novo Aluno
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar aluno por nome..."
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
        <>
          <div className="rounded-lg border bg-white dark:bg-gray-800">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Idade</TableHead>
                  <TableHead>Data de Nascimento</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500">
                      Nenhum aluno encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.fullName}
                      </TableCell>
                      <TableCell>{calculateAge(student.birthDate)} anos</TableCell>
                      <TableCell>{formatDate(student.birthDate)}</TableCell>
                      <TableCell>
                        {student.guardianId ? (
                          <Badge variant="secondary">Sim</Badge>
                        ) : (
                          <Badge variant="outline">Não</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {student.termsAccepted ? (
                          <Badge>Ativo</Badge>
                        ) : (
                          <Badge variant="destructive">Pendente</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => setEditStudentId(student.id)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => setDeleteStudent(student)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Excluir</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {total > 20 && (
            <div className="mt-4 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Anterior
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Página {page} de {Math.ceil(total / 20)}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= Math.ceil(total / 20)}
              >
                Próxima
              </Button>
            </div>
          )}
        </>
      )}

      <StudentFormSheet
        mode="create"
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={loadStudents}
      />

      <StudentFormSheet
        mode="edit"
        studentId={editStudentId ?? undefined}
        open={editStudentId !== null}
        onOpenChange={(open) => { if (!open) setEditStudentId(null); }}
        onSuccess={loadStudents}
      />

      <DeleteStudentDialog
        student={deleteStudent}
        open={deleteStudent !== null}
        onOpenChange={(open) => { if (!open) setDeleteStudent(null); }}
        onSuccess={loadStudents}
      />
    </div>
  );
}
