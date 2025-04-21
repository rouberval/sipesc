"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Printer, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

// Mock data para o relatório da escola
const mockEscolaRelatorio = {
  "1": {
    id: "1",
    nome: "Escola Municipal João da Silva",
    endereco: "Rua das Flores, 123",
    telefone: "(48) 3333-1111",
    diretor: "Maria Santos",
    alunos: 450,
    ocorrencias: {
      total: 12,
      porTipo: {
        comportamental: 5,
        faltas: 4,
        outros: 3,
      },
      porMes: [
        { mes: "Jan", quantidade: 0 },
        { mes: "Fev", quantidade: 1 },
        { mes: "Mar", quantidade: 2 },
        { mes: "Abr", quantidade: 1 },
        { mes: "Mai", quantidade: 0 },
        { mes: "Jun", quantidade: 1 },
        { mes: "Jul", quantidade: 0 },
        { mes: "Ago", quantidade: 2 },
        { mes: "Set", quantidade: 3 },
        { mes: "Out", quantidade: 2 },
        { mes: "Nov", quantidade: 0 },
        { mes: "Dez", quantidade: 0 },
      ],
    },
    encaminhamentos: {
      total: 5,
      porDestino: {
        conselhoTutelar: 2,
        psicologo: 2,
        assistenteSocial: 1,
      },
      porStatus: {
        pendente: 1,
        emAndamento: 2,
        concluido: 2,
      },
    },
    alunosRisco: {
      total: 3,
      porNivel: {
        alto: 1,
        medio: 1,
        baixo: 1,
      },
    },
  },
  "2": {
    id: "2",
    nome: "Escola Estadual Maria Oliveira",
    endereco: "Av. Principal, 456",
    telefone: "(48) 3333-2222",
    diretor: "João Pereira",
    alunos: 320,
    ocorrencias: {
      total: 8,
      porTipo: {
        comportamental: 3,
        faltas: 4,
        outros: 1,
      },
      porMes: [
        { mes: "Jan", quantidade: 0 },
        { mes: "Fev", quantidade: 0 },
        { mes: "Mar", quantidade: 1 },
        { mes: "Abr", quantidade: 2 },
        { mes: "Mai", quantidade: 1 },
        { mes: "Jun", quantidade: 0 },
        { mes: "Jul", quantidade: 0 },
        { mes: "Ago", quantidade: 1 },
        { mes: "Set", quantidade: 2 },
        { mes: "Out", quantidade: 1 },
        { mes: "Nov", quantidade: 0 },
        { mes: "Dez", quantidade: 0 },
      ],
    },
    encaminhamentos: {
      total: 2,
      porDestino: {
        conselhoTutelar: 1,
        psicologo: 1,
        assistenteSocial: 0,
      },
      porStatus: {
        pendente: 1,
        emAndamento: 0,
        concluido: 1,
      },
    },
    alunosRisco: {
      total: 1,
      porNivel: {
        alto: 0,
        medio: 1,
        baixo: 0,
      },
    },
  },
  "3": {
    id: "3",
    nome: "Colégio Pedro Alves",
    endereco: "Rua Secundária, 789",
    telefone: "(48) 3333-3333",
    diretor: "Ana Oliveira",
    alunos: 280,
    ocorrencias: {
      total: 5,
      porTipo: {
        comportamental: 2,
        faltas: 2,
        outros: 1,
      },
      porMes: [
        { mes: "Jan", quantidade: 0 },
        { mes: "Fev", quantidade: 0 },
        { mes: "Mar", quantidade: 0 },
        { mes: "Abr", quantidade: 1 },
        { mes: "Mai", quantidade: 0 },
        { mes: "Jun", quantidade: 1 },
        { mes: "Jul", quantidade: 0 },
        { mes: "Ago", quantidade: 0 },
        { mes: "Set", quantidade: 2 },
        { mes: "Out", quantidade: 1 },
        { mes: "Nov", quantidade: 0 },
        { mes: "Dez", quantidade: 0 },
      ],
    },
    encaminhamentos: {
      total: 1,
      porDestino: {
        conselhoTutelar: 0,
        psicologo: 0,
        assistenteSocial: 1,
      },
      porStatus: {
        pendente: 0,
        emAndamento: 1,
        concluido: 0,
      },
    },
    alunosRisco: {
      total: 0,
      porNivel: {
        alto: 0,
        medio: 0,
        baixo: 0,
      },
    },
  },
  "4": {
    id: "4",
    nome: "Escola Municipal Carlos Drummond",
    endereco: "Av. Central, 567",
    telefone: "(48) 3333-4444",
    diretor: "Roberto Campos",
    alunos: 520,
    ocorrencias: {
      total: 15,
      porTipo: {
        comportamental: 7,
        faltas: 5,
        outros: 3,
      },
      porMes: [
        { mes: "Jan", quantidade: 1 },
        { mes: "Fev", quantidade: 1 },
        { mes: "Mar", quantidade: 2 },
        { mes: "Abr", quantidade: 1 },
        { mes: "Mai", quantidade: 1 },
        { mes: "Jun", quantidade: 1 },
        { mes: "Jul", quantidade: 0 },
        { mes: "Ago", quantidade: 2 },
        { mes: "Set", quantidade: 3 },
        { mes: "Out", quantidade: 3 },
        { mes: "Nov", quantidade: 0 },
        { mes: "Dez", quantidade: 0 },
      ],
    },
    encaminhamentos: {
      total: 7,
      porDestino: {
        conselhoTutelar: 3,
        psicologo: 3,
        assistenteSocial: 1,
      },
      porStatus: {
        pendente: 2,
        emAndamento: 3,
        concluido: 2,
      },
    },
    alunosRisco: {
      total: 4,
      porNivel: {
        alto: 2,
        medio: 1,
        baixo: 1,
      },
    },
  },
  "5": {
    id: "5",
    nome: "Colégio Estadual Machado de Assis",
    endereco: "Rua dos Escritores, 890",
    telefone: "(48) 3333-5555",
    diretor: "Carla Mendes",
    alunos: 380,
    ocorrencias: {
      total: 9,
      porTipo: {
        comportamental: 4,
        faltas: 3,
        outros: 2,
      },
      porMes: [
        { mes: "Jan", quantidade: 0 },
        { mes: "Fev", quantidade: 1 },
        { mes: "Mar", quantidade: 1 },
        { mes: "Abr", quantidade: 0 },
        { mes: "Mai", quantidade: 1 },
        { mes: "Jun", quantidade: 1 },
        { mes: "Jul", quantidade: 0 },
        { mes: "Ago", quantidade: 1 },
        { mes: "Set", quantidade: 2 },
        { mes: "Out", quantidade: 2 },
        { mes: "Nov", quantidade: 0 },
        { mes: "Dez", quantidade: 0 },
      ],
    },
    encaminhamentos: {
      total: 3,
      porDestino: {
        conselhoTutelar: 1,
        psicologo: 1,
        assistenteSocial: 1,
      },
      porStatus: {
        pendente: 1,
        emAndamento: 1,
        concluido: 1,
      },
    },
    alunosRisco: {
      total: 2,
      porNivel: {
        alto: 0,
        medio: 2,
        baixo: 0,
      },
    },
  },
}

export default function EscolaRelatorioPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [relatorio, setRelatorio] = useState<any>(null)
  const [visualizacao, setVisualizacao] = useState("tabela")
  const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    // Simular carregamento de dados
    const loadData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const relatorioData = mockEscolaRelatorio[params.id as keyof typeof mockEscolaRelatorio]
      if (relatorioData) {
        setRelatorio(relatorioData)
      } else {
        // Redirecionar para a página de escolas se a escola não for encontrada
        toast({
          title: "Relatório não encontrado",
          description: "O relatório solicitado não foi encontrado no sistema.",
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

  const handleExportar = (formato: string) => {
    setActionLoading((prev) => ({ ...prev, [formato]: true }))

    // Simular processamento
    setTimeout(() => {
      toast({
        title: "Relatório exportado",
        description: `O relatório foi exportado no formato ${formato.toUpperCase()}.`,
      })
      setActionLoading((prev) => ({ ...prev, [formato]: false }))
    }, 1500)
  }

  const handleImprimir = () => {
    setActionLoading((prev) => ({ ...prev, print: true }))

    // Simular processamento
    setTimeout(() => {
      toast({
        title: "Enviando para impressão",
        description: "O relatório foi enviado para impressão.",
      })
      setActionLoading((prev) => ({ ...prev, print: false }))
    }, 1500)
  }

  const handleCompartilhar = () => {
    setActionLoading((prev) => ({ ...prev, share: true }))

    // Simular processamento
    setTimeout(() => {
      toast({
        title: "Compartilhar relatório",
        description: "Link de compartilhamento copiado para a área de transferência.",
      })
      setActionLoading((prev) => ({ ...prev, share: false }))
    }, 1000)
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

  if (!relatorio) {
    return (
      <ProtectedRoute allowedRoles={["mp", "admin", "conselheiro"]}>
        <MainLayout>
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <h2 className="text-2xl font-bold mb-4">Relatório não encontrado</h2>
            <Button onClick={handleVoltar}>Voltar</Button>
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
              <div>
                <h1 className="text-3xl font-bold">Relatório da Escola</h1>
                <p className="text-muted-foreground">{relatorio.nome}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => handleExportar("pdf")} disabled={actionLoading["pdf"]}>
                {actionLoading["pdf"] ? (
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportar("excel")}
                disabled={actionLoading["excel"]}
              >
                {actionLoading["excel"] ? (
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Excel
              </Button>
              <Button variant="outline" size="sm" onClick={handleImprimir} disabled={actionLoading["print"]}>
                {actionLoading["print"] ? (
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <Printer className="h-4 w-4 mr-2" />
                )}
                Imprimir
              </Button>
              <Button variant="outline" size="sm" onClick={handleCompartilhar} disabled={actionLoading["share"]}>
                {actionLoading["share"] ? (
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <Share2 className="h-4 w-4 mr-2" />
                )}
                Compartilhar
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
              <CardDescription>Visão geral dos dados da escola</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Total de Alunos</div>
                    <div className="text-3xl font-bold">{relatorio.alunos}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Ocorrências</div>
                    <div className="text-3xl font-bold">{relatorio.ocorrencias.total}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Encaminhamentos</div>
                    <div className="text-3xl font-bold">{relatorio.encaminhamentos.total}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Alunos em Risco</div>
                    <div className="text-3xl font-bold">{relatorio.alunosRisco.total}</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="ocorrencias" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="ocorrencias">Ocorrências</TabsTrigger>
                <TabsTrigger value="encaminhamentos">Encaminhamentos</TabsTrigger>
                <TabsTrigger value="alunos">Alunos em Risco</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button
                  variant={visualizacao === "tabela" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVisualizacao("tabela")}
                >
                  Tabela
                </Button>
                <Button
                  variant={visualizacao === "barras" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVisualizacao("barras")}
                >
                  Barras
                </Button>
                <Button
                  variant={visualizacao === "pizza" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVisualizacao("pizza")}
                >
                  Pizza
                </Button>
              </div>
            </div>

            <TabsContent value="ocorrencias">
              <Card>
                <CardHeader>
                  <CardTitle>Ocorrências</CardTitle>
                  <CardDescription>Análise das ocorrências registradas</CardDescription>
                </CardHeader>
                <CardContent>
                  {visualizacao === "tabela" && (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-4">Tipo</th>
                            <th className="text-right py-2 px-4">Quantidade</th>
                            <th className="text-right py-2 px-4">Percentual</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 px-4">Comportamental</td>
                            <td className="text-right py-2 px-4">{relatorio.ocorrencias.porTipo.comportamental}</td>
                            <td className="text-right py-2 px-4">
                              {Math.round(
                                (relatorio.ocorrencias.porTipo.comportamental / relatorio.ocorrencias.total) * 100,
                              )}
                              %
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">Faltas</td>
                            <td className="text-right py-2 px-4">{relatorio.ocorrencias.porTipo.faltas}</td>
                            <td className="text-right py-2 px-4">
                              {Math.round((relatorio.ocorrencias.porTipo.faltas / relatorio.ocorrencias.total) * 100)}%
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">Outros</td>
                            <td className="text-right py-2 px-4">{relatorio.ocorrencias.porTipo.outros}</td>
                            <td className="text-right py-2 px-4">
                              {Math.round((relatorio.ocorrencias.porTipo.outros / relatorio.ocorrencias.total) * 100)}%
                            </td>
                          </tr>
                          <tr className="font-bold">
                            <td className="py-2 px-4">Total</td>
                            <td className="text-right py-2 px-4">{relatorio.ocorrencias.total}</td>
                            <td className="text-right py-2 px-4">100%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {visualizacao === "barras" && (
                    <div className="h-64 flex items-end justify-around gap-4 pt-8">
                      <div className="flex flex-col items-center">
                        <div
                          className="bg-blue-500 w-16 rounded-t"
                          style={{
                            height: `${(relatorio.ocorrencias.porTipo.comportamental / relatorio.ocorrencias.total) * 200}px`,
                          }}
                        ></div>
                        <div className="mt-2 text-sm">Comportamental</div>
                        <div className="text-sm font-bold">{relatorio.ocorrencias.porTipo.comportamental}</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="bg-green-500 w-16 rounded-t"
                          style={{
                            height: `${(relatorio.ocorrencias.porTipo.faltas / relatorio.ocorrencias.total) * 200}px`,
                          }}
                        ></div>
                        <div className="mt-2 text-sm">Faltas</div>
                        <div className="text-sm font-bold">{relatorio.ocorrencias.porTipo.faltas}</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="bg-amber-500 w-16 rounded-t"
                          style={{
                            height: `${(relatorio.ocorrencias.porTipo.outros / relatorio.ocorrencias.total) * 200}px`,
                          }}
                        ></div>
                        <div className="mt-2 text-sm">Outros</div>
                        <div className="text-sm font-bold">{relatorio.ocorrencias.porTipo.outros}</div>
                      </div>
                    </div>
                  )}

                  {visualizacao === "pizza" && (
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative h-64 w-64">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-lg font-bold">{relatorio.ocorrencias.total}</div>
                          <div className="text-sm">Total</div>
                        </div>
                        {/* Aqui seria renderizado um gráfico de pizza real */}
                        <div className="h-full w-full rounded-full border-8 border-gray-200 overflow-hidden">
                          <div
                            className="bg-blue-500 h-full"
                            style={{
                              width: `${(relatorio.ocorrencias.porTipo.comportamental / relatorio.ocorrencias.total) * 100}%`,
                              float: "left",
                            }}
                          ></div>
                          <div
                            className="bg-green-500 h-full"
                            style={{
                              width: `${(relatorio.ocorrencias.porTipo.faltas / relatorio.ocorrencias.total) * 100}%`,
                              float: "left",
                            }}
                          ></div>
                          <div
                            className="bg-amber-500 h-full"
                            style={{
                              width: `${(relatorio.ocorrencias.porTipo.outros / relatorio.ocorrencias.total) * 100}%`,
                              float: "left",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-4">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                          <span>Comportamental ({relatorio.ocorrencias.porTipo.comportamental})</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-green-500 mr-2"></div>
                          <span>Faltas ({relatorio.ocorrencias.porTipo.faltas})</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-amber-500 mr-2"></div>
                          <span>Outros ({relatorio.ocorrencias.porTipo.outros})</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="encaminhamentos">
              <Card>
                <CardHeader>
                  <CardTitle>Encaminhamentos</CardTitle>
                  <CardDescription>Análise dos encaminhamentos realizados</CardDescription>
                </CardHeader>
                <CardContent>
                  {visualizacao === "tabela" && (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-4">Destino</th>
                            <th className="text-right py-2 px-4">Quantidade</th>
                            <th className="text-right py-2 px-4">Percentual</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 px-4">Conselho Tutelar</td>
                            <td className="text-right py-2 px-4">
                              {relatorio.encaminhamentos.porDestino.conselhoTutelar}
                            </td>
                            <td className="text-right py-2 px-4">
                              {Math.round(
                                (relatorio.encaminhamentos.porDestino.conselhoTutelar /
                                  relatorio.encaminhamentos.total) *
                                  100,
                              )}
                              %
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">Psicólogo</td>
                            <td className="text-right py-2 px-4">{relatorio.encaminhamentos.porDestino.psicologo}</td>
                            <td className="text-right py-2 px-4">
                              {Math.round(
                                (relatorio.encaminhamentos.porDestino.psicologo / relatorio.encaminhamentos.total) *
                                  100,
                              )}
                              %
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">Assistente Social</td>
                            <td className="text-right py-2 px-4">
                              {relatorio.encaminhamentos.porDestino.assistenteSocial}
                            </td>
                            <td className="text-right py-2 px-4">
                              {Math.round(
                                (relatorio.encaminhamentos.porDestino.assistenteSocial /
                                  relatorio.encaminhamentos.total) *
                                  100,
                              )}
                              %
                            </td>
                          </tr>
                          <tr className="font-bold">
                            <td className="py-2 px-4">Total</td>
                            <td className="text-right py-2 px-4">{relatorio.encaminhamentos.total}</td>
                            <td className="text-right py-2 px-4">100%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {visualizacao === "barras" && (
                    <div className="h-64 flex items-end justify-around gap-4 pt-8">
                      <div className="flex flex-col items-center">
                        <div
                          className="bg-blue-500 w-16 rounded-t"
                          style={{
                            height:
                              relatorio.encaminhamentos.total > 0
                                ? `${(relatorio.encaminhamentos.porDestino.conselhoTutelar / relatorio.encaminhamentos.total) * 200}px`
                                : "0px",
                          }}
                        ></div>
                        <div className="mt-2 text-sm">Conselho Tutelar</div>
                        <div className="text-sm font-bold">{relatorio.encaminhamentos.porDestino.conselhoTutelar}</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="bg-green-500 w-16 rounded-t"
                          style={{
                            height:
                              relatorio.encaminhamentos.total > 0
                                ? `${(relatorio.encaminhamentos.porDestino.psicologo / relatorio.encaminhamentos.total) * 200}px`
                                : "0px",
                          }}
                        ></div>
                        <div className="mt-2 text-sm">Psicólogo</div>
                        <div className="text-sm font-bold">{relatorio.encaminhamentos.porDestino.psicologo}</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="bg-amber-500 w-16 rounded-t"
                          style={{
                            height:
                              relatorio.encaminhamentos.total > 0
                                ? `${(relatorio.encaminhamentos.porDestino.assistenteSocial / relatorio.encaminhamentos.total) * 200}px`
                                : "0px",
                          }}
                        ></div>
                        <div className="mt-2 text-sm">Assistente Social</div>
                        <div className="text-sm font-bold">{relatorio.encaminhamentos.porDestino.assistenteSocial}</div>
                      </div>
                    </div>
                  )}

                  {visualizacao === "pizza" && (
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative h-64 w-64">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-lg font-bold">{relatorio.encaminhamentos.total}</div>
                          <div className="text-sm">Total</div>
                        </div>
                        {/* Aqui seria renderizado um gráfico de pizza real */}
                        <div className="h-full w-full rounded-full border-8 border-gray-200 overflow-hidden">
                          <div
                            className="bg-blue-500 h-full"
                            style={{
                              width:
                                relatorio.encaminhamentos.total > 0
                                  ? `${(relatorio.encaminhamentos.porDestino.conselhoTutelar / relatorio.encaminhamentos.total) * 100}%`
                                  : "0%",
                              float: "left",
                            }}
                          ></div>
                          <div
                            className="bg-green-500 h-full"
                            style={{
                              width:
                                relatorio.encaminhamentos.total > 0
                                  ? `${(relatorio.encaminhamentos.porDestino.psicologo / relatorio.encaminhamentos.total) * 100}%`
                                  : "0%",
                              float: "left",
                            }}
                          ></div>
                          <div
                            className="bg-amber-500 h-full"
                            style={{
                              width:
                                relatorio.encaminhamentos.total > 0
                                  ? `${(relatorio.encaminhamentos.porDestino.assistenteSocial / relatorio.encaminhamentos.total) * 100}%`
                                  : "0%",
                              float: "left",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-4">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                          <span>Conselho Tutelar ({relatorio.encaminhamentos.porDestino.conselhoTutelar})</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-green-500 mr-2"></div>
                          <span>Psicólogo ({relatorio.encaminhamentos.porDestino.psicologo})</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-amber-500 mr-2"></div>
                          <span>Assistente Social ({relatorio.encaminhamentos.porDestino.assistenteSocial})</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alunos">
              <Card>
                <CardHeader>
                  <CardTitle>Alunos em Risco</CardTitle>
                  <CardDescription>Análise dos alunos em situação de risco</CardDescription>
                </CardHeader>
                <CardContent>
                  {visualizacao === "tabela" && (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-4">Nível de Risco</th>
                            <th className="text-right py-2 px-4">Quantidade</th>
                            <th className="text-right py-2 px-4">Percentual</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 px-4">Alto</td>
                            <td className="text-right py-2 px-4">{relatorio.alunosRisco.porNivel.alto}</td>
                            <td className="text-right py-2 px-4">
                              {relatorio.alunosRisco.total > 0
                                ? Math.round((relatorio.alunosRisco.porNivel.alto / relatorio.alunosRisco.total) * 100)
                                : 0}
                              %
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">Médio</td>
                            <td className="text-right py-2 px-4">{relatorio.alunosRisco.porNivel.medio}</td>
                            <td className="text-right py-2 px-4">
                              {relatorio.alunosRisco.total > 0
                                ? Math.round((relatorio.alunosRisco.porNivel.medio / relatorio.alunosRisco.total) * 100)
                                : 0}
                              %
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">Baixo</td>
                            <td className="text-right py-2 px-4">{relatorio.alunosRisco.porNivel.baixo}</td>
                            <td className="text-right py-2 px-4">
                              {relatorio.alunosRisco.total > 0
                                ? Math.round((relatorio.alunosRisco.porNivel.baixo / relatorio.alunosRisco.total) * 100)
                                : 0}
                              %
                            </td>
                          </tr>
                          <tr className="font-bold">
                            <td className="py-2 px-4">Total</td>
                            <td className="text-right py-2 px-4">{relatorio.alunosRisco.total}</td>
                            <td className="text-right py-2 px-4">100%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {visualizacao === "barras" && (
                    <div className="h-64 flex items-end justify-around gap-4 pt-8">
                      <div className="flex flex-col items-center">
                        <div
                          className="bg-red-500 w-16 rounded-t"
                          style={{
                            height:
                              relatorio.alunosRisco.total > 0
                                ? `${(relatorio.alunosRisco.porNivel.alto / relatorio.alunosRisco.total) * 200}px`
                                : "0px",
                          }}
                        ></div>
                        <div className="mt-2 text-sm">Alto</div>
                        <div className="text-sm font-bold">{relatorio.alunosRisco.porNivel.alto}</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="bg-amber-500 w-16 rounded-t"
                          style={{
                            height:
                              relatorio.alunosRisco.total > 0
                                ? `${(relatorio.alunosRisco.porNivel.medio / relatorio.alunosRisco.total) * 200}px`
                                : "0px",
                          }}
                        ></div>
                        <div className="mt-2 text-sm">Médio</div>
                        <div className="text-sm font-bold">{relatorio.alunosRisco.porNivel.medio}</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div
                          className="bg-green-500 w-16 rounded-t"
                          style={{
                            height:
                              relatorio.alunosRisco.total > 0
                                ? `${(relatorio.alunosRisco.porNivel.baixo / relatorio.alunosRisco.total) * 200}px`
                                : "0px",
                          }}
                        ></div>
                        <div className="mt-2 text-sm">Baixo</div>
                        <div className="text-sm font-bold">{relatorio.alunosRisco.porNivel.baixo}</div>
                      </div>
                    </div>
                  )}

                  {visualizacao === "pizza" && (
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative h-64 w-64">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-lg font-bold">{relatorio.alunosRisco.total}</div>
                          <div className="text-sm">Total</div>
                        </div>
                        {/* Aqui seria renderizado um gráfico de pizza real */}
                        <div className="h-full w-full rounded-full border-8 border-gray-200 overflow-hidden">
                          <div
                            className="bg-red-500 h-full"
                            style={{
                              width:
                                relatorio.alunosRisco.total > 0
                                  ? `${(relatorio.alunosRisco.porNivel.alto / relatorio.alunosRisco.total) * 100}%`
                                  : "0%",
                              float: "left",
                            }}
                          ></div>
                          <div
                            className="bg-amber-500 h-full"
                            style={{
                              width:
                                relatorio.alunosRisco.total > 0
                                  ? `${(relatorio.alunosRisco.porNivel.medio / relatorio.alunosRisco.total) * 100}%`
                                  : "0%",
                              float: "left",
                            }}
                          ></div>
                          <div
                            className="bg-green-500 h-full"
                            style={{
                              width:
                                relatorio.alunosRisco.total > 0
                                  ? `${(relatorio.alunosRisco.porNivel.baixo / relatorio.alunosRisco.total) * 100}%`
                                  : "0%",
                              float: "left",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-4">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-red-500 mr-2"></div>
                          <span>Alto ({relatorio.alunosRisco.porNivel.alto})</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-amber-500 mr-2"></div>
                          <span>Médio ({relatorio.alunosRisco.porNivel.medio})</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-green-500 mr-2"></div>
                          <span>Baixo ({relatorio.alunosRisco.porNivel.baixo})</span>
                        </div>
                      </div>
                    </div>
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
