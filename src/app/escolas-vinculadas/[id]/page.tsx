"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Phone, Mail, MapPin, AlertTriangle, FileText, Calendar } from "lucide-react"
import Link from "next/link"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Mock data for a school
const mockEscola = {
  id: "1",
  nome: "Escola Municipal João da Silva",
  endereco: "Rua das Flores, 123",
  telefone: "(48) 3333-1111",
  email: "escola.joao@edu.sc.gov.br",
  diretor: "Maria Santos",
  regiao: "Norte",
  municipio: "Florianópolis",
  totalAlunos: 450,
  alunosRisco: 12,
  ocorrencias: 25,
  encaminhamentos: 8,
}

// Mock data for students at risk
const mockAlunosRisco = [
  {
    id: "1",
    nome: "Carlos Oliveira",
    idade: 14,
    turma: "9º Ano A",
    status: "risco",
    ocorrencias: 3,
    faltas: 25,
    ultimaOcorrencia: "2023-04-05",
  },
  {
    id: "2",
    nome: "Ana Silva",
    idade: 12,
    turma: "7º Ano B",
    status: "atencao",
    ocorrencias: 2,
    faltas: 15,
    ultimaOcorrencia: "2023-04-04",
  },
  {
    id: "3",
    nome: "Pedro Santos",
    idade: 15,
    turma: "1º Ano EM",
    status: "risco",
    ocorrencias: 4,
    faltas: 30,
    ultimaOcorrencia: "2023-04-03",
  },
]

// Mock data for occurrences
const mockOcorrencias = [
  {
    id: "1",
    aluno: "Carlos Oliveira",
    tipo: "Comportamento",
    gravidade: "Grave",
    data: "2023-04-05",
    descricao: "Agressão verbal a outro aluno durante o intervalo",
  },
  {
    id: "2",
    aluno: "Ana Silva",
    tipo: "Acadêmico",
    gravidade: "Moderado",
    data: "2023-04-04",
    descricao: "Não entregou trabalho pela terceira vez consecutiva",
  },
  {
    id: "3",
    aluno: "Pedro Santos",
    tipo: "Comportamento",
    gravidade: "Leve",
    data: "2023-04-03",
    descricao: "Uso de celular durante a aula após advertência",
  },
]

// Mock data for referrals
const mockEncaminhamentos = [
  {
    id: "1",
    aluno: "Carlos Oliveira",
    destino: "Conselho Tutelar",
    tipo: "Abandono Escolar",
    data: "2023-04-10",
    status: "Pendente",
  },
  {
    id: "2",
    aluno: "Ana Silva",
    destino: "CRAS",
    tipo: "Vulnerabilidade Social",
    data: "2023-03-25",
    status: "Pendente",
  },
  {
    id: "3",
    aluno: "Pedro Santos",
    destino: "Psicólogo",
    tipo: "Comportamento Agressivo",
    data: "2023-03-22",
    status: "Pendente",
  },
]

export default function EscolaVinculadaDetalhesPage() {
  const params = useParams()
  const router = useRouter()
  const [escola, setEscola] = useState<typeof mockEscola | null>(null)
  const [alunosRisco, setAlunosRisco] = useState<typeof mockAlunosRisco>([])
  const [ocorrencias, setOcorrencias] = useState<typeof mockOcorrencias>([])
  const [encaminhamentos, setEncaminhamentos] = useState<typeof mockEncaminhamentos>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados
    const loadData = async () => {
      setIsLoading(true)

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Em uma aplicação real, buscaria os dados da escola específica
      // Aqui estamos usando dados mockados
      setEscola(mockEscola)
      setAlunosRisco(mockAlunosRisco)
      setOcorrencias(mockOcorrencias)
      setEncaminhamentos(mockEncaminhamentos)

      setIsLoading(false)
    }

    if (params.id) {
      loadData()
    }
  }, [params.id])

  if (isLoading) {
    return (
      <ProtectedRoute allowedRoles={["conselheiro", "admin"]}>
        <MainLayout>
          <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <LoadingSpinner size="lg" />
          </div>
        </MainLayout>
      </ProtectedRoute>
    )
  }

  if (!escola) {
    return (
      <ProtectedRoute allowedRoles={["conselheiro", "admin"]}>
        <MainLayout>
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <h2 className="text-2xl font-bold mb-4">Escola não encontrada</h2>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </div>
        </MainLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["conselheiro", "admin"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{escola.nome}</h1>
                <p className="text-muted-foreground">Detalhes da escola vinculada</p>
              </div>
            </div>
            <Button asChild>
              <Link href={`/escolas-vinculadas/${params.id}/relatorio`}>Gerar Relatório</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Informações da Escola</CardTitle>
                <CardDescription>Dados gerais da instituição</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p>{escola.endereco}</p>
                    <p>
                      {escola.municipio} - Região {escola.regiao}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p>{escola.telefone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p>{escola.email}</p>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-1">Diretor(a)</p>
                  <p className="font-medium">{escola.diretor}</p>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-1">Total de Alunos</p>
                  <p className="font-medium">{escola.totalAlunos}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
                <CardDescription>Visão geral dos indicadores da escola</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <div className="flex items-center justify-between">
                      <p className="text-amber-800 font-medium">Alunos em Risco</p>
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <p className="text-3xl font-bold text-amber-800 mt-2">{escola.alunosRisco}</p>
                    <p className="text-sm text-amber-700 mt-1">
                      {Math.round((escola.alunosRisco / escola.totalAlunos) * 100)}% do total
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between">
                      <p className="text-blue-800 font-medium">Ocorrências</p>
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold text-blue-800 mt-2">{escola.ocorrencias}</p>
                    <p className="text-sm text-blue-700 mt-1">Últimos 30 dias</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <div className="flex items-center justify-between">
                      <p className="text-purple-800 font-medium">Encaminhamentos</p>
                      <Calendar className="h-5 w-5 text-purple-500" />
                    </div>
                    <p className="text-3xl font-bold text-purple-800 mt-2">{escola.encaminhamentos}</p>
                    <p className="text-sm text-purple-700 mt-1">Últimos 30 dias</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="alunos">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="alunos">Alunos em Risco</TabsTrigger>
              <TabsTrigger value="ocorrencias">Ocorrências</TabsTrigger>
              <TabsTrigger value="encaminhamentos">Encaminhamentos</TabsTrigger>
            </TabsList>
            <TabsContent value="alunos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alunos em Situação de Risco</CardTitle>
                  <CardDescription>
                    Lista de alunos identificados em situação de risco ou que requerem atenção
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Idade</TableHead>
                          <TableHead>Turma</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ocorrências</TableHead>
                          <TableHead>Faltas</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {alunosRisco.map((aluno) => (
                          <TableRow key={aluno.id}>
                            <TableCell className="font-medium">{aluno.nome}</TableCell>
                            <TableCell>{aluno.idade}</TableCell>
                            <TableCell>{aluno.turma}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  aluno.status === "risco" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                                }
                              >
                                {aluno.status === "risco" ? "Risco" : "Atenção"}
                              </Badge>
                            </TableCell>
                            <TableCell>{aluno.ocorrencias}</TableCell>
                            <TableCell>{aluno.faltas}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/alunos-risco/${aluno.id}`}>
                                  <AlertTriangle className="h-4 w-4 mr-2" />
                                  Detalhes
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ocorrencias" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ocorrências Recentes</CardTitle>
                  <CardDescription>Ocorrências registradas nos últimos 30 dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Aluno</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Gravidade</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead className="hidden md:table-cell">Descrição</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ocorrencias.map((ocorrencia) => (
                          <TableRow key={ocorrencia.id}>
                            <TableCell className="font-medium">{ocorrencia.aluno}</TableCell>
                            <TableCell>{ocorrencia.tipo}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  ocorrencia.gravidade === "Grave"
                                    ? "bg-red-100 text-red-800"
                                    : ocorrencia.gravidade === "Moderado"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-blue-100 text-blue-800"
                                }
                              >
                                {ocorrencia.gravidade}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(ocorrencia.data).toLocaleDateString("pt-BR")}</TableCell>
                            <TableCell className="hidden md:table-cell max-w-xs truncate">
                              {ocorrencia.descricao}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/ocorrencias?id=${ocorrencia.id}`}>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Detalhes
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="encaminhamentos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Encaminhamentos</CardTitle>
                  <CardDescription>Encaminhamentos realizados pela escola</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Aluno</TableHead>
                          <TableHead>Destino</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {encaminhamentos.map((encaminhamento) => (
                          <TableRow key={encaminhamento.id}>
                            <TableCell className="font-medium">{encaminhamento.aluno}</TableCell>
                            <TableCell>{encaminhamento.destino}</TableCell>
                            <TableCell>{encaminhamento.tipo}</TableCell>
                            <TableCell>{new Date(encaminhamento.data).toLocaleDateString("pt-BR")}</TableCell>
                            <TableCell>
                              <Badge variant={encaminhamento.status === "Pendente" ? "outline" : "secondary"}>
                                {encaminhamento.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/encaminhamentos?id=${encaminhamento.id}`}>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Detalhes
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
