"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { FileText, Download, Filter, Search, Clock, BarChart, PieChart, LineChart, Table2 } from "lucide-react"

// Tipos para os relatórios
type ReportType = "alunos" | "ocorrencias" | "frequencia" | "encaminhamentos" | "escolas" | "conselhos"
type ReportFormat = "pdf" | "excel" | "csv"

interface Report {
  id: string
  title: string
  description: string
  type: ReportType
  lastGenerated?: string
  format: ReportFormat[]
  icon: React.ElementType
  roles: string[]
}

export default function RelatoriosPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<string>("todos")
  const [searchTerm, setSearchTerm] = useState("")

  // Lista de relatórios disponíveis
  const reports: Report[] = [
    {
      id: "alunos-risco",
      title: "Alunos em Situação de Risco",
      description: "Relatório detalhado de alunos identificados em situação de risco",
      type: "alunos",
      lastGenerated: "2023-11-10",
      format: ["pdf", "excel"],
      icon: Table2,
      roles: ["mp", "conselheiro", "escola"],
    },
    {
      id: "ocorrencias-tipo",
      title: "Ocorrências por Tipo",
      description: "Análise das ocorrências registradas classificadas por tipo",
      type: "ocorrencias",
      lastGenerated: "2023-11-12",
      format: ["pdf", "excel", "csv"],
      icon: BarChart,
      roles: ["mp", "conselheiro", "escola"],
    },
    {
      id: "frequencia-mensal",
      title: "Frequência Mensal",
      description: "Relatório mensal de frequência dos alunos",
      type: "frequencia",
      lastGenerated: "2023-11-15",
      format: ["pdf", "excel"],
      icon: LineChart,
      roles: ["mp", "escola"],
    },
    {
      id: "encaminhamentos-status",
      title: "Encaminhamentos por Status",
      description: "Análise dos encaminhamentos classificados por status atual",
      type: "encaminhamentos",
      lastGenerated: "2023-11-08",
      format: ["pdf", "excel", "csv"],
      icon: PieChart,
      roles: ["mp", "conselheiro"],
    },
    {
      id: "escolas-regiao",
      title: "Escolas por Região",
      description: "Mapeamento das escolas por região geográfica",
      type: "escolas",
      lastGenerated: "2023-11-05",
      format: ["pdf"],
      icon: BarChart,
      roles: ["mp", "conselheiro"],
    },
    {
      id: "conselhos-eficiencia",
      title: "Eficiência dos Conselhos",
      description: "Análise da eficiência dos conselhos tutelares",
      type: "conselhos",
      lastGenerated: "2023-11-01",
      format: ["pdf", "excel"],
      icon: LineChart,
      roles: ["mp"],
    },
    {
      id: "alunos-perfil",
      title: "Perfil dos Alunos",
      description: "Análise demográfica e comportamental dos alunos",
      type: "alunos",
      lastGenerated: "2023-11-03",
      format: ["pdf", "excel"],
      icon: PieChart,
      roles: ["mp", "conselheiro", "escola"],
    },
    {
      id: "ocorrencias-gravidade",
      title: "Ocorrências por Gravidade",
      description: "Análise das ocorrências classificadas por nível de gravidade",
      type: "ocorrencias",
      lastGenerated: "2023-11-07",
      format: ["pdf", "excel"],
      icon: BarChart,
      roles: ["mp", "conselheiro", "escola"],
    },
    {
      id: "encaminhamentos-tempo",
      title: "Tempo de Resposta",
      description: "Análise do tempo médio de resposta para encaminhamentos",
      type: "encaminhamentos",
      lastGenerated: "2023-11-09",
      format: ["pdf", "excel"],
      icon: LineChart,
      roles: ["mp", "conselheiro"],
    },
    {
      id: "casos-conselho",
      title: "Casos por Conselho",
      description: "Relatório de casos atendidos por cada conselho tutelar",
      type: "conselhos",
      format: ["pdf", "excel"],
      icon: BarChart,
      roles: ["mp", "conselheiro"],
    },
    {
      id: "alunos-encaminhados",
      title: "Alunos Encaminhados",
      description: "Lista de alunos que receberam encaminhamentos",
      type: "alunos",
      format: ["pdf", "excel", "csv"],
      icon: Table2,
      roles: ["mp", "conselheiro", "escola"],
    },
    {
      id: "reincidencia-ocorrencias",
      title: "Reincidência de Ocorrências",
      description: "Análise de alunos com ocorrências reincidentes",
      type: "ocorrencias",
      format: ["pdf", "excel"],
      icon: LineChart,
      roles: ["mp", "conselheiro", "escola"],
    },
  ]

  // Filtrar relatórios com base no papel do usuário
  const filteredByRole = reports.filter((report) => {
    return user && report.roles.includes(user.role)
  })

  // Filtrar relatórios com base na aba ativa
  const filteredByTab =
    activeTab === "todos" ? filteredByRole : filteredByRole.filter((report) => report.type === activeTab)

  // Filtrar relatórios com base no termo de busca
  const filteredReports = filteredByTab.filter(
    (report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Navegar para a página de personalização de relatórios
  const handleCustomizeReport = () => {
    router.push("/relatorios/personalizar")
  }

  // Gerar relatório (simulação)
  const handleGenerateReport = (reportId: string, format: ReportFormat) => {
    console.log(`Gerando relatório ${reportId} no formato ${format}`)
    // Em uma aplicação real, isso chamaria uma API para gerar o relatório
  }

  return (
    <ProtectedRoute allowedRoles={["mp", "conselheiro", "escola"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Relatórios</h1>
              <p className="text-muted-foreground mt-1">Acesse e gere relatórios com dados do sistema</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCustomizeReport}>
                <Filter className="mr-2 h-4 w-4" />
                Personalizar Relatórios
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar relatórios..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-7 w-full">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="alunos">Alunos</TabsTrigger>
              <TabsTrigger value="ocorrencias">Ocorrências</TabsTrigger>
              <TabsTrigger value="frequencia">Frequência</TabsTrigger>
              <TabsTrigger value="encaminhamentos">Encaminhamentos</TabsTrigger>
              <TabsTrigger value="escolas">Escolas</TabsTrigger>
              <TabsTrigger value="conselhos">Conselhos</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="pt-4">
              {filteredReports.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredReports.map((report) => (
                    <Card key={report.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-100 rounded-md text-blue-700">
                              <report.icon className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-lg">{report.title}</CardTitle>
                          </div>
                        </div>
                        <CardDescription className="mt-2">{report.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {report.lastGenerated && (
                          <div className="flex items-center text-xs text-muted-foreground mb-3">
                            <Clock className="h-3 w-3 mr-1" />
                            Última geração: {new Date(report.lastGenerated).toLocaleDateString()}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {report.format.map((format) => (
                            <Button
                              key={format}
                              variant="outline"
                              size="sm"
                              className="flex items-center"
                              onClick={() => handleGenerateReport(report.id, format)}
                            >
                              <Download className="h-3 w-3 mr-1" />
                              {format.toUpperCase()}
                            </Button>
                          ))}
                          <Button
                            variant="default"
                            size="sm"
                            className="flex items-center"
                            onClick={() => router.push(`/relatorios/${report.id}`)}
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            Visualizar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground border rounded-md">
                  Nenhum relatório encontrado para os filtros selecionados.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
