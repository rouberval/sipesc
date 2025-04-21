"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, FileText, AlertTriangle, Calendar, Clock, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

// Mock data for students at risk
const mockAlunos = [
  {
    id: "1",
    nome: "Carlos Oliveira",
    idade: 14,
    dataNascimento: "2009-05-15",
    escola: "Escola Municipal João da Silva",
    escolaId: "1",
    turma: "9º Ano A",
    nivel: "vermelho",
    ocorrencias: 8,
    faltas: 25,
    ultimaOcorrencia: "2023-04-05",
    reincidente: true,
    responsavel: "Maria Oliveira",
    telefoneResponsavel: "(48) 99999-1234",
    endereco: "Rua das Flores, 123 - Centro",
    historico: [
      { data: "2023-04-05", tipo: "Ocorrência", descricao: "Comportamento agressivo em sala" },
      { data: "2023-03-28", tipo: "Falta", descricao: "Ausência sem justificativa" },
      { data: "2023-03-15", tipo: "Ocorrência", descricao: "Desrespeito ao professor" },
      { data: "2023-03-10", tipo: "Falta", descricao: "Ausência sem justificativa" },
      { data: "2023-02-22", tipo: "Ocorrência", descricao: "Não realizou atividades" },
    ],
  },
  {
    id: "2",
    nome: "Ana Silva",
    idade: 12,
    dataNascimento: "2011-08-20",
    escola: "Escola Municipal João da Silva",
    escolaId: "1",
    turma: "7º Ano B",
    nivel: "amarelo",
    ocorrencias: 4,
    faltas: 15,
    ultimaOcorrencia: "2023-04-02",
    reincidente: false,
    responsavel: "João Silva",
    telefoneResponsavel: "(48) 99999-5678",
    endereco: "Av. Principal, 456 - Bairro Novo",
    historico: [
      { data: "2023-04-02", tipo: "Ocorrência", descricao: "Uso de celular em sala" },
      { data: "2023-03-25", tipo: "Falta", descricao: "Ausência sem justificativa" },
      { data: "2023-03-18", tipo: "Falta", descricao: "Ausência sem justificativa" },
      { data: "2023-03-10", tipo: "Ocorrência", descricao: "Não realizou atividades" },
    ],
  },
  {
    id: "3",
    nome: "Pedro Santos",
    idade: 15,
    dataNascimento: "2008-02-10",
    escola: "Escola Estadual Maria Oliveira",
    escolaId: "2",
    turma: "1º Ano EM",
    nivel: "vermelho",
    ocorrencias: 6,
    faltas: 30,
    ultimaOcorrencia: "2023-04-01",
    reincidente: true,
    responsavel: "Antônio Santos",
    telefoneResponsavel: "(48) 99999-9012",
    endereco: "Rua dos Pinheiros, 789 - Jardim",
    historico: [
      { data: "2023-04-01", tipo: "Ocorrência", descricao: "Comportamento agressivo com colegas" },
      { data: "2023-03-28", tipo: "Falta", descricao: "Ausência sem justificativa" },
      { data: "2023-03-27", tipo: "Falta", descricao: "Ausência sem justificativa" },
      { data: "2023-03-26", tipo: "Falta", descricao: "Ausência sem justificativa" },
      { data: "2023-03-20", tipo: "Ocorrência", descricao: "Desrespeito ao professor" },
      { data: "2023-03-15", tipo: "Ocorrência", descricao: "Não realizou atividades" },
    ],
  },
  {
    id: "4",
    nome: "Mariana Costa",
    idade: 13,
    dataNascimento: "2010-11-05",
    escola: "Colégio Pedro Alves",
    escolaId: "3",
    turma: "8º Ano C",
    nivel: "azul",
    ocorrencias: 2,
    faltas: 8,
    ultimaOcorrencia: "2023-03-28",
    reincidente: false,
    responsavel: "Carla Costa",
    telefoneResponsavel: "(48) 99999-3456",
    endereco: "Av. Central, 321 - Centro",
    historico: [
      { data: "2023-03-28", tipo: "Ocorrência", descricao: "Não realizou atividades" },
      { data: "2023-03-15", tipo: "Falta", descricao: "Ausência sem justificativa" },
      { data: "2023-03-10", tipo: "Falta", descricao: "Ausência sem justificativa" },
      { data: "2023-02-28", tipo: "Ocorrência", descricao: "Uso de celular em sala" },
    ],
  },
  {
    id: "5",
    nome: "Lucas Mendes",
    idade: 16,
    dataNascimento: "2007-07-25",
    escola: "Escola Estadual Maria Oliveira",
    escolaId: "2",
    turma: "2º Ano EM",
    nivel: "amarelo",
    ocorrencias: 3,
    faltas: 12,
    ultimaOcorrencia: "2023-03-25",
    reincidente: true,
    responsavel: "Paulo Mendes",
    telefoneResponsavel: "(48) 99999-7890",
    endereco: "Rua das Palmeiras, 654 - Jardim",
    historico: [
      { data: "2023-03-25", tipo: "Ocorrência", descricao: "Atraso excessivo" },
      { data: "2023-03-20", tipo: "Falta", descricao: "Ausência sem justificativa" },
      { data: "2023-03-15", tipo: "Falta", descricao: "Ausência sem justificativa" },
      { data: "2023-03-10", tipo: "Ocorrência", descricao: "Não realizou atividades" },
      { data: "2023-02-28", tipo: "Ocorrência", descricao: "Comportamento inadequado" },
    ],
  },
]

export default function AlunoRiscoDetalhesPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [loading, setLoading] = useState(true)
  const [aluno, setAluno] = useState<any>(null)
  const [loadingReport, setLoadingReport] = useState(false)

  useEffect(() => {
    // Simulando carregamento de dados
    const timer = setTimeout(() => {
      const foundAluno = mockAlunos.find((a) => a.id === id)
      setAluno(foundAluno)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [id])

  const handleViewReport = () => {
    setLoadingReport(true)
    setTimeout(() => {
      router.push(`/alunos-risco/${id}/relatorio`)
      setLoadingReport(false)
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

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["conselheiro", "mp"]}>
        <MainLayout>
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Carregando informações do aluno...</p>
          </div>
        </MainLayout>
      </ProtectedRoute>
    )
  }

  if (!aluno) {
    return (
      <ProtectedRoute allowedRoles={["conselheiro", "mp"]}>
        <MainLayout>
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <h2 className="text-2xl font-bold mb-2">Aluno não encontrado</h2>
            <p className="text-muted-foreground mb-4">O aluno solicitado não foi encontrado no sistema.</p>
            <Button onClick={() => router.back()}>Voltar</Button>
          </div>
        </MainLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["conselheiro", "mp"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Button variant="ghost" className="mb-2 p-0 hover:bg-transparent" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Voltar</span>
              </Button>
              <h1 className="text-3xl font-bold">{aluno.nome}</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleViewReport}
                disabled={loadingReport}
                className="flex items-center gap-1"
              >
                {loadingReport ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent mr-1" />
                ) : (
                  <FileText className="h-4 w-4 mr-1" />
                )}
                <span>Ver Relatório</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Informações do Aluno</span>
                  {getNivelBadge(aluno.nivel)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Nome Completo</h3>
                    <p className="text-base">{aluno.nome}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Idade</h3>
                    <p className="text-base">{aluno.idade} anos</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Data de Nascimento</h3>
                    <p className="text-base">{new Date(aluno.dataNascimento).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Escola</h3>
                    <p className="text-base">{aluno.escola}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Turma</h3>
                    <p className="text-base">{aluno.turma}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Reincidente</h3>
                    <p className="text-base">{aluno.reincidente ? "Sim" : "Não"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Responsável</h3>
                    <p className="text-base">{aluno.responsavel}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Telefone</h3>
                    <p className="text-base">{aluno.telefoneResponsavel}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Endereço</h3>
                    <p className="text-base">{aluno.endereco}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Indicadores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                      <span>Ocorrências</span>
                    </div>
                    <Badge variant="outline" className="text-base font-bold">
                      {aluno.ocorrencias}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-amber-500 mr-2" />
                      <span>Faltas</span>
                    </div>
                    <Badge variant="outline" className="text-base font-bold">
                      {aluno.faltas}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-500 mr-2" />
                      <span>Última Ocorrência</span>
                    </div>
                    <span className="text-sm">{new Date(aluno.ultimaOcorrencia).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Histórico</CardTitle>
              <CardDescription>Registro de ocorrências e faltas do aluno</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="todos">
                <TabsList className="mb-4">
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="ocorrencias">Ocorrências</TabsTrigger>
                  <TabsTrigger value="faltas">Faltas</TabsTrigger>
                </TabsList>

                <TabsContent value="todos" className="space-y-4">
                  {aluno.historico.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-md border ${
                        item.tipo === "Ocorrência" ? "border-l-4 border-l-red-500" : "border-l-4 border-l-amber-500"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <div className="flex items-center">
                          {item.tipo === "Ocorrência" ? (
                            <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                          ) : (
                            <Calendar className="h-4 w-4 text-amber-500 mr-2" />
                          )}
                          <span className="font-medium">{item.tipo}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(item.data).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <p>{item.descricao}</p>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="ocorrencias" className="space-y-4">
                  {aluno.historico
                    .filter((item) => item.tipo === "Ocorrência")
                    .map((item, index) => (
                      <div key={index} className="p-4 rounded-md border border-l-4 border-l-red-500">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                          <div className="flex items-center">
                            <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                            <span className="font-medium">{item.tipo}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(item.data).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <p>{item.descricao}</p>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="faltas" className="space-y-4">
                  {aluno.historico
                    .filter((item) => item.tipo === "Falta")
                    .map((item, index) => (
                      <div key={index} className="p-4 rounded-md border border-l-4 border-l-amber-500">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-amber-500 mr-2" />
                            <span className="font-medium">{item.tipo}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(item.data).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <p>{item.descricao}</p>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
