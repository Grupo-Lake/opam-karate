"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useApiClient } from "@/lib/api/client-hook"
import type { StudentListItem } from "@/lib/api/types"

interface DeleteStudentDialogProps {
  student: StudentListItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function DeleteStudentDialog({
  student,
  open,
  onOpenChange,
  onSuccess,
}: DeleteStudentDialogProps) {
  const api = useApiClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!student) return
    setLoading(true)
    setError(null)
    try {
      toast.loading("Excluindo aluno...", { id: "delete-student" })
      await api.students.delete(student.id)
      toast.success("Aluno excluído com sucesso!", { id: "delete-student" })
      onSuccess()
      onOpenChange(false)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao excluir aluno"
      toast.error(errorMessage, { id: "delete-student" })
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir aluno</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir{" "}
            <strong>{student?.fullName}</strong>? Esta ação não pode ser
            desfeita.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">
            {error}
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
