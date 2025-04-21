"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, PlusCircle, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AlunoForm } from "@/components/alunos/aluno-form"
import { AlunoDetails } from "@/components/alunos/aluno-details"

// Mock data for students
const mockAlunos = [
  {
    id: "1",
    nome: "Carlos Oliveira",
    idade: 14,
    turma: "9º Ano A",
    responsavel: "Maria Oliveira",
    telefone: "(48) 99999-1111",
    faltas: 25,
    ocorrencias: 8,
    status: "risco",
  },
  {
    id: "2",
    nome: "Ana Silva",
    idade: 12,
    turma: "7º Ano B",
    responsavel: "João Silva",
    telefone: "(48) 99999-2222",
    faltas: 15,
    ocorrencias: 4,
    status: "atencao",
  },
  {
    id: "3",
    nome: "Pedro Santos",
    idade: 15,
    turma: "1º Ano EM",
    responsavel: "Carla Santos",
    telefone: "(48) 99999-3333",
    faltas: 30,
    ocorrencias: 6,
    status: "risco",
  },
  {
    id: "4",
    nome: "Mariana Costa",
    idade: 13,
    turma: "8º Ano C",
    responsavel: "Roberto Costa",
    telefone: "(48) 99999-4444",
    faltas: 8,
    ocorrencias: 2,
    status: "normal",
  },
  {
    id: "5",
    nome: "Lucas Mendes",
    idade: 16,
    turma: "2º Ano EM",
    responsavel: "Fernanda Mendes",
    telefone: "(48) 99999-5555",
    faltas: 12,
    ocorrencias: 3,
    status: "atencao",
  },
]

export default function AlunosPage() {
  const router = useRouter()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedAluno, setSelectedAluno] = useState<any | null>(null)

  const handleViewStudent = (aluno: any) => {
    setSelectedAluno(aluno)
  }

  const handleEditStudent = (id: string) => {
    router.push(`/alunos/${id}/editar`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "risco":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Risco</Badge>
      case "atencao":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Atenção</Badge>
      case "normal":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Normal</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <ProtectedRoute allowedRoles={["escola"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Alunos</h1>
            <Button onClick={() => setIsFormOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Aluno
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Alunos Cadastrados</CardTitle>
              <CardDescription>Lista de todos os alunos cadastrados na escola</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Idade</TableHead>
                    <TableHead>Turma</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Faltas</TableHead>
                    <TableHead>Ocorrências</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAlunos.map((aluno) => (
                    <TableRow key={aluno.id}>
                      <TableCell className="font-medium">{aluno.nome}</TableCell>
                      <TableCell>{aluno.idade}</TableCell>
                      <TableCell>{aluno.turma}</TableCell>
                      <TableCell>{aluno.responsavel}</TableCell>
                      <TableCell>{aluno.faltas}</TableCell>
                      <TableCell>{aluno.ocorrencias}</TableCell>
                      <TableCell>{getStatusBadge(aluno.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewStudent(aluno)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEditStudent(aluno.id)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {isFormOpen && <AlunoForm onClose={() => setIsFormOpen(false)} />}
          {selectedAluno && <AlunoDetails aluno={selectedAluno} onClose={() => setSelectedAluno(null)} />}
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
