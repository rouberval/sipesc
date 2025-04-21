"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ArrowLeft, Share2, Printer, FileText } from "lucide-react"
import { ReportVisualization } from "@/components/relatorios/report-visualization"
import { ReportFilters } from "@/components/relatorios/report-filters"
import { useToast } from "@/hooks/use-toast"

export default function RelatorioDetalhesPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<string>("visualizacao")
  const [isLoading, setIsLoading] = useState(true)
  const [reportData, setReportData] = useState<ReportType>(null)

  // Simulação de carregamento de dados do relatório
  useEffect(() => {
    const reportId = params?.id as string

    // Simulação de chamada à API
    setTimeout(() => {
      // Dados simulados com base no ID do relatório
      const mockReportData = getMockReportData(reportId)
      setReportData(mockReportData)
      setIsLoading(false)
    }, 1000)
  }, [params])

  // Função para obter dados simulados com base no ID do relatório
  const getMockReportData = (reportId: string) => {
    // Dados simulados para diferentes tipos de relatórios
    const mockData: Record<string, any> = {
      "alunos-risco": {
        title: "Alunos em Situação de Risco",
        description: "Relatório detalhado de alunos identificados em situação de risco",
        type: "table",
        lastUpdated: "15/11/2023",
        columns: ["Nome", "Idade", "Escola", "Risco", "Ocorrências", "Faltas"],
        data: [
          ["Ana Silva", 14, "Escola Municipal Centro", "Alto", 3, 12],
          ["Carlos Oliveira", 15, "Escola Municipal Norte", "Médio", 2, 8],
          ["Mariana Santos", 13, "Escola Municipal Sul", "Alto", 4, 15],
          ["Pedro Costa", 16, "Escola Municipal Leste", "Médio", 1, 7],
          ["Juliana Lima", 12, "Escola Municipal Oeste", "Alto", 3, 10],
        ],
      },
      "ocorrencias-tipo": {
        title: "Ocorrências por Tipo",
        description: "Análise das ocorrências registradas classificadas por tipo",
        type: "bar",
        lastUpdated: "12/11/2023",
        labels: ["Bullying", "Violência", "Indisciplina", "Danos ao patrimônio", "Outros"],
        data: [42, 28, 65, 19, 33],
      },
      "frequencia-mensal": {
        title: "Frequência Mensal",
        description: "Relatório mensal de frequência dos alunos",
        type: "line",
        lastUpdated: "15/11/2023",
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov"],
        data: [92, 90, 88, 85, 87, 84, 82, 86, 88, 85, 83],
      },
      "encaminhamentos-status": {
        title: "Encaminhamentos por Status",
        description: "Análise dos encaminhamentos classificados por status atual",
        type: "pie",
        lastUpdated: "08/11/2023",
        labels: ["Pendente", "Em andamento", "Concluído", "Arquivado", "Cancelado"],
        data: [25, 38, 42, 15, 5],
      },
      "escolas-regiao": {
        title: "Escolas por Região",
        description: "Mapeamento das escolas por região geográfica",
        type: "bar",
        lastUpdated: "05/11/2023",
        labels: ["Norte", "Sul", "Leste", "Oeste", "Central"],
        data: [12, 15, 8, 10, 5],
      },
      "conselhos-eficiencia": {
        title: "Eficiência dos Conselhos",
        description: "Análise da eficiência dos conselhos tutelares",
        type: "line",
        lastUpdated: "01/11/2023",
        labels: ["Conselho Norte", "Conselho Sul", "Conselho Leste", "Conselho Oeste", "Conselho Central"],
        data: [75, 82, 68, 79, 85],
      },
      "alunos-perfil": {
        title: "Perfil dos Alunos",
        description: "Análise demográfica e comportamental dos alunos",
        type: "pie",
        lastUpdated: "03/11/2023",
        labels: ["6-10 anos", "11-14 anos", "15-18 anos"],
        data: [35, 45, 20],
      },
      "ocorrencias-gravidade": {
        title: "Ocorrências por Gravidade",
        description: "Análise das ocorrências classificadas por nível de gravidade",
        type: "bar",
        lastUpdated: "07/11/2023",
        labels: ["Baixa", "Média", "Alta", "Crítica"],
        data: [45, 32, 18, 5],
      },
      "encaminhamentos-tempo": {
        title: "Tempo de Resposta",
        description: "Análise do tempo médio de resposta para encaminhamentos",
        type: "line",
        lastUpdated: "09/11/2023",
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov"],
        data: [5.2, 4.8, 4.5, 3.9, 4.2, 3.5, 3.2, 3.0, 2.8, 2.5, 2.3],
      },
      "casos-conselho": {
        title: "Casos por Conselho",
        description: "Relatório de casos atendidos por cada conselho tutelar",
        type: "bar",
        lastUpdated: "10/11/2023",
        labels: ["Conselho Norte", "Conselho Sul", "Conselho Leste", "Conselho Oeste", "Conselho Central"],
        data: [45, 52, 38, 42, 65],
      },
      "alunos-encaminhados": {
        title: "Alunos Encaminhados",
        description: "Lista de alunos que receberam encaminhamentos",
        type: "table",
        lastUpdated: "11/11/2023",
        columns: ["Nome", "Idade", "Escola", "Encaminhamentos", "Status", "Data"],
        data: [
          ["Bruno Almeida", 15, "Escola Municipal Centro", 2, "Em andamento", "10/11/2023"],
          ["Camila Ferreira", 13, "Escola Municipal Norte", 1, "Concluído", "05/11/2023"],
          ["Diego Souza", 16, "Escola Municipal Sul", 3, "Pendente", "08/11/2023"],
          ["Eduarda Lima", 14, "Escola Municipal Leste", 1, "Em andamento", "12/11/2023"],
          ["Fábio Santos", 17, "Escola Municipal Oeste", 2, "Concluído", "03/11/2023"],
        ],
      },
      "reincidencia-ocorrencias": {
        title: "Reincidência de Ocorrências",
        description: "Análise de alunos com ocorrências reincidentes",
        type: "line",
        lastUpdated: "13/11/2023",
        labels: ["1 ocorrência", "2 ocorrências", "3 ocorrências", "4 ocorrências", "5+ ocorrências"],
        data: [65, 28, 15, 8, 4],
      },
    }

    return (
      mockData[reportId] || {
        title: "Relatório não encontrado",
        description: "O relatório solicitado não foi encontrado",
        type: "error",
      }
    )
  }

  // Função para exportar o relatório
  const handleExport = (format: string) => {
    toast({
      title: "Exportando relatório",
      description: `O relatório está sendo exportado em formato ${format.toUpperCase()}.`,
    })

    // Em uma aplicação real, isso chamaria uma API para gerar o arquivo
    setTimeout(() => {
      toast({
        title: "Exportação concluída",
        description: `O relatório foi exportado com sucesso em formato ${format.toUpperCase()}.`,
      })
    }, 2000)
  }

  // Função para compartilhar o relatório
  const handleShare = () => {
    toast({
      title: "Compartilhando relatório",
      description: "Configurando permissões de compartilhamento...",
    })

    // Em uma aplicação real, isso abriria um diálogo de compartilhamento
    setTimeout(() => {
      toast({
        title: "Relatório compartilhado",
        description: "O link para o relatório foi copiado para a área de transferência.",
      })
    }, 1500)
  }

  // Função para imprimir o relatório
  const handlePrint = () => {
    toast({
      title: "Preparando impressão",
      description: "O relatório está sendo preparado para impressão.",
    })

    // Em uma aplicação real, isso chamaria a função de impressão do navegador
    setTimeout(() => {
      window.print()
    }, 1000)
  }

  return (
    <ProtectedRoute allowedRoles={["mp", "conselheiro", "escola"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{reportData?.title || "Carregando..."}</h1>
                <p className="text-muted-foreground mt-1">{reportData?.description || ""}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
              <Button onClick={() => handleExport("pdf")}>
                <FileText className="mr-2 h-4 w-4" />
                Exportar PDF
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="visualizacao">Visualização</TabsTrigger>
              <TabsTrigger value="filtros">Filtros</TabsTrigger>
            </TabsList>

            <TabsContent value="visualizacao" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Visualização do Relatório</CardTitle>
                  <CardDescription>Última atualização: {reportData?.lastUpdated || "Carregando..."}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <p>Carregando relatório...</p>
                    </div>
                  ) : (
                    <ReportVisualization data={reportData} />
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Gerado pelo sistema SIPESC</div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleExport("csv")}>
                      CSV
                    </Button>
                    <Button variant="outline" onClick={() => handleExport("excel")}>
                      Excel
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="filtros" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Filtros do Relatório</CardTitle>
                  <CardDescription>Personalize os filtros para ajustar os dados exibidos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportFilters reportType={reportData?.type} />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => setActiveTab("visualizacao")}>Aplicar Filtros</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
