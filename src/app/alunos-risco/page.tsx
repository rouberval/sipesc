"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

// Mock data for students at risk
const mockAlunos = [
  {
    id: "1",
    nome: "Carlos Oliveira",
    idade: 14,
    escola: "Escola Municipal João da Silva",
    escolaId: "1",
    nivel: "vermelho",
    ocorrencias: 8,
    faltas: 25,
    ultimaOcorrencia: "2023-04-05",
    reincidente: true,
  },
  {
    id: "2",
    nome: "Ana Silva",
    idade: 12,
    escola: "Escola Municipal João da Silva",
    escolaId: "1",
    nivel: "amarelo",
    ocorrencias: 4,
    faltas: 15,
    ultimaOcorrencia: "2023-04-02",
    reincidente: false,
  },
  {
    id: "3",
    nome: "Pedro Santos",
    idade: 15,
    escola: "Escola Estadual Maria Oliveira",
    escolaId: "2",
    nivel: "vermelho",
    ocorrencias: 6,
    faltas: 30,
    ultimaOcorrencia: "2023-04-01",
    reincidente: true,
  },
  {
    id: "4",
    nome: "Mariana Costa",
    idade: 13,
    escola: "Colégio Pedro Alves",
    escolaId: "3",
    nivel: "azul",
    ocorrencias: 2,
    faltas: 8,
    ultimaOcorrencia: "2023-03-28",
    reincidente: false,
  },
  {
    id: "5",
    nome: "Lucas Mendes",
    idade: 16,
    escola: "Escola Estadual Maria Oliveira",
    escolaId: "2",
    nivel: "amarelo",
    ocorrencias: 3,
    faltas: 12,
    ultimaOcorrencia: "2023-03-25",
    reincidente: true,
  },
]

export default function AlunosRiscoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useMobile()
  const [loadingView, setLoadingView] = useState<string | null>(null)
  const [loadingReport, setLoadingReport] = useState<string | null>(null)

  const handleViewStudent = (id: string) => {
    setLoadingView(id)
    // Simulando um pequeno atraso para mostrar o estado de carregamento
    setTimeout(() => {
      router.push(`/alunos-risco/${id}`)
      setLoadingView(null)
    }, 500)
  }

  const handleViewReport = (id: string) => {
    setLoadingReport(id)
    // Simulando um pequeno atraso para mostrar o estado de carregamento
    setTimeout(() => {
      router.push(`/alunos-risco/${id}/relatorio`)
      setLoadingReport(null)
    }, 500)
  }

  const getNivelBadge = (nivel: string) => {
    switch (nivel) {
      case "vermelho":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Alerta</Badge>
      case "amarelo":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Atenção</Badge>
      case "azul":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Moderado</Badge>
      default:
        return <Badge variant="outline">Normal</Badge>
    }
  }

  // Função para renderizar a tabela em telas maiores
  const renderTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Idade</TableHead>
          <TableHead>Escola</TableHead>
          <TableHead>Nível</TableHead>
          <TableHead>Ocorrências</TableHead>
          <TableHead>Faltas</TableHead>
          <TableHead>Reincidente</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockAlunos.map((aluno) => (
          <TableRow
            key={aluno.id}
            className={cn(aluno.nivel === "vermelho" && "bg-red-50", aluno.nivel === "amarelo" && "bg-amber-50")}
          >
            <TableCell className="font-medium">{aluno.nome}</TableCell>
            <TableCell>{aluno.idade}</TableCell>
            <TableCell>{aluno.escola}</TableCell>
            <TableCell>{getNivelBadge(aluno.nivel)}</TableCell>
            <TableCell>{aluno.ocorrencias}</TableCell>
            <TableCell>{aluno.faltas}</TableCell>
            <TableCell>{aluno.reincidente ? "Sim" : "Não"}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewStudent(aluno.id)}
                  disabled={loadingView === aluno.id}
                  className="flex items-center gap-1"
                >
                  {loadingView === aluno.id ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">Visualizar</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewReport(aluno.id)}
                  disabled={loadingReport === aluno.id}
                  className="flex items-center gap-1"
                >
                  {loadingReport === aluno.id ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : (
                    <FileText className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">Relatório</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  // Função para renderizar cards em telas menores
  const renderCards = () => (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      {mockAlunos.map((aluno) => (
        <Card
          key={aluno.id}
          className={cn(
            "overflow-hidden",
            aluno.nivel === "vermelho" && "border-l-4 border-l-red-500",
            aluno.nivel === "amarelo" && "border-l-4 border-l-amber-500",
            aluno.nivel === "azul" && "border-l-4 border-l-blue-500",
          )}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{aluno.nome}</CardTitle>
              {getNivelBadge(aluno.nivel)}
            </div>
            <CardDescription>{aluno.escola}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
              <div>
                <span className="font-medium">Idade:</span> {aluno.idade}
              </div>
              <div>
                <span className="font-medium">Reincidente:</span> {aluno.reincidente ? "Sim" : "Não"}
              </div>
              <div>
                <span className="font-medium">Ocorrências:</span> {aluno.ocorrencias}
              </div>
              <div>
                <span className="font-medium">Faltas:</span> {aluno.faltas}
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewStudent(aluno.id)}
                disabled={loadingView === aluno.id}
                className="flex items-center gap-1"
              >
                {loadingView === aluno.id ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                Visualizar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewReport(aluno.id)}
                disabled={loadingReport === aluno.id}
                className="flex items-center gap-1"
              >
                {loadingReport === aluno.id ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <FileText className="h-4 w-4" />
                )}
                Relatório
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <ProtectedRoute allowedRoles={["conselheiro", "mp"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Alunos em Situação de Risco</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Alunos Monitorados</CardTitle>
              <CardDescription>Lista de alunos com ocorrências e faltas excessivas</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Tabela para telas maiores */}
              <div className="hidden md:block">{renderTable()}</div>

              {/* Cards para telas menores */}
              {renderCards()}
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
