"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, FileText, MapPin, Phone, User, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnviarMensagemButton } from "@/components/escola/enviar-mensagem-button"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

// Mock data for school details
const mockEscolaDetails = {
  "1": {
    id: "1",
    nome: "Escola Municipal João da Silva",
    endereco: "Rua das Flores, 123",
    telefone: "(48) 3333-1111",
    diretor: "Maria Santos",
    email: "escola.joao.silva@edu.sc.gov.br",
    alunos: 450,
    ocorrencias: 12,
    encaminhamentos: 5,
    alertas: 3,
    regiao: "Norte",
    municipio: "Florianópolis",
    bairro: "Centro",
    cep: "88000-000",
    coordenadas: { lat: -27.5969, lng: -48.5495 },
    ultimasOcorrencias: [
      { id: "o1", aluno: "Carlos Silva", tipo: "Comportamental", data: "2023-10-15", status: "Em análise" },
      { id: "o2", aluno: "Ana Oliveira", tipo: "Falta", data: "2023-10-12", status: "Resolvido" },
      { id: "o3", aluno: "Pedro Santos", tipo: "Comportamental", data: "2023-10-10", status: "Encaminhado" },
    ],
    ultimosEncaminhamentos: [
      { id: "e1", aluno: "Carlos Silva", destino: "Conselho Tutelar", data: "2023-10-15", status: "Pendente" },
      { id: "e2", aluno: "Mariana Lima", destino: "Psicólogo", data: "2023-10-08", status: "Em andamento" },
      { id: "e3", aluno: "João Pereira", destino: "Assistente Social", data: "2023-10-01", status: "Concluído" },
    ],
    alunosRisco: [
      { id: "a1", nome: "Carlos Silva", idade: 12, faltas: 15, ocorrencias: 3, risco: "Alto" },
      { id: "a2", nome: "Mariana Lima", idade: 10, faltas: 8, ocorrencias: 2, risco: "Médio" },
      { id: "a3", nome: "João Pereira", idade: 14, faltas: 12, ocorrencias: 1, risco: "Médio" },
    ],
  },
  "2": {
    id: "2",
    nome: "Escola Estadual Maria Oliveira",
    endereco: "Av. Principal, 456",
    telefone: "(48) 3333-2222",
    diretor: "João Pereira",
    email: "escola.maria.oliveira@edu.sc.gov.br",
    alunos: 320,
    ocorrencias: 8,
    encaminhamentos: 2,
    alertas: 1,
    regiao: "Sul",
    municipio: "São José",
    bairro: "Campinas",
    cep: "88100-000",
    coordenadas: { lat: -27.6146, lng: -48.6366 },
    ultimasOcorrencias: [
      { id: "o4", aluno: "Fernanda Costa", tipo: "Comportamental", data: "2023-10-14", status: "Em análise" },
      { id: "o5", aluno: "Lucas Mendes", tipo: "Falta", data: "2023-10-11", status: "Resolvido" },
    ],
    ultimosEncaminhamentos: [
      { id: "e4", aluno: "Fernanda Costa", destino: "Conselho Tutelar", data: "2023-10-14", status: "Pendente" },
      { id: "e5", aluno: "Roberto Alves", destino: "Psicólogo", data: "2023-10-05", status: "Concluído" },
    ],
    alunosRisco: [
      { id: "a4", nome: "Fernanda Costa", idade: 13, faltas: 10, ocorrencias: 2, risco: "Médio" },
      { id: "a5", nome: "Roberto Alves", idade: 15, faltas: 5, ocorrencias: 1, risco: "Baixo" },
    ],
  },
  "3": {
    id: "3",
    nome: "Colégio Pedro Alves",
    endereco: "Rua Secundária, 789",
    telefone: "(48) 3333-3333",
    diretor: "Ana Oliveira",
    email: "colegio.pedro.alves@edu.sc.gov.br",
    alunos: 280,
    ocorrencias: 5,
    encaminhamentos: 1,
    alertas: 0,
    regiao: "Leste",
    municipio: "Palhoça",
    bairro: "Centro",
    cep: "88130-000",
    coordenadas: { lat: -27.6447, lng: -48.6697 },
    ultimasOcorrencias: [
      { id: "o6", aluno: "Juliana Martins", tipo: "Falta", data: "2023-10-13", status: "Resolvido" },
      { id: "o7", aluno: "Ricardo Sousa", tipo: "Comportamental", data: "2023-10-09", status: "Em análise" },
    ],
    ultimosEncaminhamentos: [
      { id: "e6", aluno: "Ricardo Sousa", destino: "Assistente Social", data: "2023-10-09", status: "Em andamento" },
    ],
    alunosRisco: [{ id: "a6", nome: "Ricardo Sousa", idade: 11, faltas: 7, ocorrencias: 1, risco: "Baixo" }],
  },
  "4": {
    id: "4",
    nome: "Escola Municipal Carlos Drummond",
    endereco: "Av. Central, 567",
    telefone: "(48) 3333-4444",
    diretor: "Roberto Campos",
    email: "escola.carlos.drummond@edu.sc.gov.br",
    alunos: 520,
    ocorrencias: 15,
    encaminhamentos: 7,
    alertas: 4,
    regiao: "Oeste",
    municipio: "Florianópolis",
    bairro: "Ingleses",
    cep: "88058-000",
    coordenadas: { lat: -27.4347, lng: -48.389 },
    ultimasOcorrencias: [
      { id: "o8", aluno: "Marcos Silva", tipo: "Comportamental", data: "2023-10-16", status: "Em análise" },
      { id: "o9", aluno: "Luiza Mendes", tipo: "Falta", data: "2023-10-14", status: "Resolvido" },
      { id: "o10", aluno: "Gabriel Santos", tipo: "Comportamental", data: "2023-10-12", status: "Encaminhado" },
    ],
    ultimosEncaminhamentos: [
      { id: "e7", aluno: "Marcos Silva", destino: "Conselho Tutelar", data: "2023-10-16", status: "Pendente" },
      { id: "e8", aluno: "Luiza Mendes", destino: "Psicólogo", data: "2023-10-10", status: "Em andamento" },
      { id: "e9", aluno: "Gabriel Santos", destino: "Assistente Social", data: "2023-10-05", status: "Concluído" },
    ],
    alunosRisco: [
      { id: "a7", nome: "Marcos Silva", idade: 13, faltas: 18, ocorrencias: 4, risco: "Alto" },
      { id: "a8", nome: "Luiza Mendes", idade: 11, faltas: 10, ocorrencias: 2, risco: "Médio" },
      { id: "a9", nome: "Gabriel Santos", idade: 15, faltas: 14, ocorrencias: 3, risco: "Alto" },
      { id: "a10", nome: "Juliana Costa", idade: 12, faltas: 7, ocorrencias: 1, risco: "Baixo" },
    ],
  },
  "5": {
    id: "5",
    nome: "Colégio Estadual Machado de Assis",
    endereco: "Rua dos Escritores, 890",
    telefone: "(48) 3333-5555",
    diretor: "Carla Mendes",
    email: "colegio.machado.assis@edu.sc.gov.br",
    alunos: 380,
    ocorrencias: 9,
    encaminhamentos: 3,
    alertas: 2,
    regiao: "Centro",
    municipio: "Florianópolis",
    bairro: "Trindade",
    cep: "88036-000",
    coordenadas: { lat: -27.5908, lng: -48.5245 },
    ultimasOcorrencias: [
      { id: "o11", aluno: "Beatriz Lima", tipo: "Comportamental", data: "2023-10-15", status: "Em análise" },
      { id: "o12", aluno: "Rafael Costa", tipo: "Falta", data: "2023-10-13", status: "Resolvido" },
    ],
    ultimosEncaminhamentos: [
      { id: "e10", aluno: "Beatriz Lima", destino: "Conselho Tutelar", data: "2023-10-15", status: "Pendente" },
      { id: "e11", aluno: "Rafael Costa", destino: "Psicólogo", data: "2023-10-08", status: "Em andamento" },
      { id: "e12", aluno: "Amanda Silva", destino: "Assistente Social", data: "2023-10-01", status: "Concluído" },
    ],
    alunosRisco: [
      { id: "a11", nome: "Beatriz Lima", idade: 14, faltas: 12, ocorrencias: 3, risco: "Médio" },
      { id: "a12", nome: "Rafael Costa", idade: 16, faltas: 9, ocorrencias: 2, risco: "Médio" },
    ],
  },
}

export default function EscolaDetalhesPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [escola, setEscola] = useState<any>(null)
  const [isReportLoading, setIsReportLoading] = useState(false)

  useEffect(() => {
    // Simular carregamento de dados
    const loadData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const escolaData = mockEscolaDetails[params.id as keyof typeof mockEscolaDetails]
      if (escolaData) {
        setEscola(escolaData)
      } else {
        // Redirecionar para a página de escolas se a escola não for encontrada
        toast({
          title: "Escola não encontrada",
          description: "A escola solicitada não foi encontrada no sistema.",
          variant: "destructive",
        })
        router.push("/escolas")
      }

      setIsLoading(false)
    }

    loadData()
  }, [params.id, router, toast])

  const handleVoltar = () => {
    router.back()
  }

  const handleViewAluno = (alunoId: string) => {
    router.push(`/alunos/${alunoId}`)
  }

  const handleViewOcorrencia = (ocorrenciaId: string) => {
    router.push(`/ocorrencias/${ocorrenciaId}`)
  }

  const handleViewEncaminhamento = (encaminhamentoId: string) => {
    router.push(`/encaminhamentos/${encaminhamentoId}`)
  }

  const handleViewReport = () => {
    setIsReportLoading(true)

    // Simular carregamento
    setTimeout(() => {
      router.push(`/escolas/${params.id}/relatorio`)
      setIsReportLoading(false)
    }, 500)
  }

  if (isLoading) {
    return (
      <ProtectedRoute allowedRoles={["mp", "admin", "conselheiro"]}>
        <MainLayout>
          <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </MainLayout>
      </ProtectedRoute>
    )
  }

  if (!escola) {
    return (
      <ProtectedRoute allowedRoles={["mp", "admin", "conselheiro"]}>
        <MainLayout>
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <h2 className="text-2xl font-bold mb-4">Escola não encontrada</h2>
            <Button onClick={handleVoltar}>Voltar para a lista de escolas</Button>
          </div>
        </MainLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["mp", "admin", "conselheiro"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleVoltar}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold">{escola.nome}</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleViewReport} disabled={isReportLoading}>
                {isReportLoading ? (
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <FileText className="h-4 w-4 mr-2" />
                )}
                Ver Relatório
              </Button>
              <EnviarMensagemButton escolaId={escola.id} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Informações da Escola</CardTitle>
                <CardDescription>Detalhes e estatísticas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Diretor(a)</p>
                        <p className="font-medium">{escola.diretor}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Endereço</p>
                        <p className="font-medium">{escola.endereco}</p>
                        <p className="text-sm">
                          {escola.bairro}, {escola.municipio} - {escola.cep}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Contato</p>
                        <p className="font-medium">{escola.telefone}</p>
                        <p className="text-sm">{escola.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <Users className="h-8 w-8 text-primary mb-2" />
                        <p className="text-3xl font-bold">{escola.alunos}</p>
                        <p className="text-sm text-muted-foreground">Alunos</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <Calendar className="h-8 w-8 text-amber-500 mb-2" />
                        <p className="text-3xl font-bold">{escola.ocorrencias}</p>
                        <p className="text-sm text-muted-foreground">Ocorrências</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <FileText className="h-8 w-8 text-blue-500 mb-2" />
                        <p className="text-3xl font-bold">{escola.encaminhamentos}</p>
                        <p className="text-sm text-muted-foreground">Encaminhamentos</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center mb-2 ${
                            escola.alertas > 0 ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <span className="font-bold">{escola.alertas}</span>
                        </div>
                        <p className="text-3xl font-bold">{escola.alertas}</p>
                        <p className="text-sm text-muted-foreground">Alertas</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alunos em Risco</CardTitle>
                <CardDescription>Alunos que necessitam atenção</CardDescription>
              </CardHeader>
              <CardContent>
                {escola.alunosRisco.length > 0 ? (
                  <div className="space-y-4">
                    {escola.alunosRisco.map((aluno: any) => (
                      <div key={aluno.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                        <div>
                          <p className="font-medium">{aluno.nome}</p>
                          <p className="text-sm text-muted-foreground">{aluno.idade} anos</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              aluno.risco === "Alto"
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : aluno.risco === "Médio"
                                  ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                  : "bg-green-100 text-green-800 hover:bg-green-100"
                            }
                          >
                            {aluno.risco}
                          </Badge>
                          <Button variant="ghost" size="sm" onClick={() => handleViewAluno(aluno.id)}>
                            Ver
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">Nenhum aluno em situação de risco</div>
                )}
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="ocorrencias" className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
              <TabsTrigger value="ocorrencias">Ocorrências Recentes</TabsTrigger>
              <TabsTrigger value="encaminhamentos">Encaminhamentos</TabsTrigger>
            </TabsList>
            <TabsContent value="ocorrencias">
              <Card>
                <CardHeader>
                  <CardTitle>Ocorrências Recentes</CardTitle>
                  <CardDescription>Últimas ocorrências registradas na escola</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Versão para desktop */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Aluno</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {escola.ultimasOcorrencias.map((ocorrencia: any) => (
                          <TableRow key={ocorrencia.id}>
                            <TableCell className="font-medium">{ocorrencia.aluno}</TableCell>
                            <TableCell>{ocorrencia.tipo}</TableCell>
                            <TableCell>{new Date(ocorrencia.data).toLocaleDateString("pt-BR")}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  ocorrencia.status === "Em análise"
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                    : ocorrencia.status === "Resolvido"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                }
                              >
                                {ocorrencia.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleViewOcorrencia(ocorrencia.id)}>
                                Visualizar
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Versão para mobile */}
                  <div className="grid grid-cols-1 gap-4 md:hidden">
                    {escola.ultimasOcorrencias.map((ocorrencia: any) => (
                      <Card key={ocorrencia.id} className="overflow-hidden">
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{ocorrencia.aluno}</CardTitle>
                            <Badge
                              className={
                                ocorrencia.status === "Em análise"
                                  ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                  : ocorrencia.status === "Resolvido"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            >
                              {ocorrencia.status}
                            </Badge>
                          </div>
                          <CardDescription>
                            {ocorrencia.tipo} • {new Date(ocorrencia.data).toLocaleDateString("pt-BR")}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewOcorrencia(ocorrencia.id)}
                            className="w-full"
                          >
                            Visualizar
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {escola.ultimasOcorrencias.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">Nenhuma ocorrência registrada</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="encaminhamentos">
              <Card>
                <CardHeader>
                  <CardTitle>Encaminhamentos</CardTitle>
                  <CardDescription>Encaminhamentos realizados pela escola</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Versão para desktop */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Aluno</TableHead>
                          <TableHead>Destino</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {escola.ultimosEncaminhamentos.map((encaminhamento: any) => (
                          <TableRow key={encaminhamento.id}>
                            <TableCell className="font-medium">{encaminhamento.aluno}</TableCell>
                            <TableCell>{encaminhamento.destino}</TableCell>
                            <TableCell>{new Date(encaminhamento.data).toLocaleDateString("pt-BR")}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  encaminhamento.status === "Pendente"
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                    : encaminhamento.status === "Concluído"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                }
                              >
                                {encaminhamento.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewEncaminhamento(encaminhamento.id)}
                              >
                                Visualizar
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Versão para mobile */}
                  <div className="grid grid-cols-1 gap-4 md:hidden">
                    {escola.ultimosEncaminhamentos.map((encaminhamento: any) => (
                      <Card key={encaminhamento.id} className="overflow-hidden">
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{encaminhamento.aluno}</CardTitle>
                            <Badge
                              className={
                                encaminhamento.status === "Pendente"
                                  ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                  : encaminhamento.status === "Concluído"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            >
                              {encaminhamento.status}
                            </Badge>
                          </div>
                          <CardDescription>
                            {encaminhamento.destino} • {new Date(encaminhamento.data).toLocaleDateString("pt-BR")}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewEncaminhamento(encaminhamento.id)}
                            className="w-full"
                          >
                            Visualizar
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {escola.ultimosEncaminhamentos.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">Nenhum encaminhamento registrado</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
