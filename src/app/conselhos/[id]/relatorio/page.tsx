"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Share2, Printer } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useEffect, useState } from "react"
import { ConselhoOcorrenciasChart } from "@/components/painel-bi/conselho-ocorrencias-chart"
import { DatePicker } from "@/components/ui/date-picker"
import { useToast } from "@/hooks/use-toast"

// Mock data for council details
const mockConselhosData = {
  "1": {
    id: "1",
    nome: "Conselho Tutelar Norte",
    endereco: "Rua dos Conselhos, 123",
    telefone: "(48) 3222-1111",
    email: "conselho.norte@exemplo.com",
    coordenador: "Roberto Alves",
    regiao: "Norte",
    municipio: "Florianópolis",
    escolasVinculadas: 8,
    casosAtivos: 45,
    casosPendentes: 12,
    tempoMedioResposta: 2.3,
    status: "ativo",
  },
  "2": {
    id: "2",
    nome: "Conselho Tutelar Sul",
    endereco: "Av. dos Direitos, 456",
    telefone: "(48) 3222-2222",
    email: "conselho.sul@exemplo.com",
    coordenador: "Carla Santos",
    regiao: "Sul",
    municipio: "São José",
    escolasVinculadas: 6,
    casosAtivos: 38,
    casosPendentes: 15,
    tempoMedioResposta: 1.5,
    status: "ativo",
  },
  "3": {
    id: "3",
    nome: "Conselho Tutelar Leste",
    endereco: "Rua da Proteção, 789",
    telefone: "(48) 3222-3333",
    email: "conselho.leste@exemplo.com",
    coordenador: "Paulo Oliveira",
    regiao: "Leste",
    municipio: "Palhoça",
    escolasVinculadas: 5,
    casosAtivos: 52,
    casosPendentes: 8,
    tempoMedioResposta: 3.7,
    status: "ativo",
  },
  "4": {
    id: "4",
    nome: "Conselho Tutelar Oeste",
    endereco: "Av. da Criança, 321",
    telefone: "(48) 3222-4444",
    email: "conselho.oeste@exemplo.com",
    coordenador: "Mariana Costa",
    regiao: "Oeste",
    municipio: "Biguaçu",
    escolasVinculadas: 4,
    casosAtivos: 30,
    casosPendentes: 20,
    tempoMedioResposta: 2.1,
    status: "ativo",
  },
  "5": {
    id: "5",
    nome: "Conselho Tutelar Central",
    endereco: "Praça dos Direitos, 100",
    telefone: "(48) 3222-5555",
    email: "conselho.central@exemplo.com",
    coordenador: "Lucas Mendes",
    regiao: "Central",
    municipio: "Florianópolis",
    escolasVinculadas: 10,
    casosAtivos: 65,
    casosPendentes: 10,
    tempoMedioResposta: 4.2,
    status: "ativo",
  },
}

export default function ConselhoRelatorioPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [conselho, setConselho] = useState<any>(null)
  const [dataInicio, setDataInicio] = useState<Date | undefined>(
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
  )
  const [dataFim, setDataFim] = useState<Date | undefined>(new Date())

  useEffect(() => {
    // Simular carregamento de dados
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Simular delay de rede
        await new Promise((resolve) => setTimeout(resolve, 800))

        const conselhoData = mockConselhosData[params.id]
        setConselho(conselhoData)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [params.id])

  const handleBack = () => {
    router.push(`/conselhos/${params.id}`)
  }

  const handleExport = (format: string) => {
    toast({
      title: "Relatório exportado",
      description: `O relatório foi exportado no formato ${format.toUpperCase()}.`,
    })
  }

  const handlePrint = () => {
    toast({
      title: "Imprimindo relatório",
      description: "O relatório foi enviado para impressão.",
    })
  }

  const handleShare = () => {
    toast({
      title: "Compartilhar relatório",
      description: "Link para compartilhamento gerado e copiado para a área de transferência.",
    })
  }

  if (isLoading) {
    return (
      <ProtectedRoute allowedRoles={["mp"]}>
        <MainLayout>
          <div className="flex items-center justify-center h-[70vh]">
            <LoadingSpinner size="lg" />
          </div>
        </MainLayout>
      </ProtectedRoute>
    )
  }

  if (!conselho) {
    return (
      <ProtectedRoute allowedRoles={["mp"]}>
        <MainLayout>
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <h2 className="text-2xl font-bold mb-4">Conselho não encontrado</h2>
            <Button onClick={() => router.push("/conselhos")}>Voltar para a lista</Button>
          </div>
        </MainLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["mp"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-3xl font-bold">Relatório: {conselho.nome}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("pdf")}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("excel")}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Excel
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint} className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Compartilhar
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Relatório gerado em {new Date().toLocaleDateString("pt-BR")} às {new Date().toLocaleTimeString("pt-BR")}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">De:</span>
                <DatePicker date={dataInicio} setDate={setDataInicio} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Até:</span>
                <DatePicker date={dataFim} setDate={setDataFim} />
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumo do Conselho</CardTitle>
              <CardDescription>Visão geral das estatísticas do conselho tutelar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-800">Escolas Vinculadas</h3>
                  <p className="text-2xl font-bold text-blue-900">{conselho.escolasVinculadas}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-green-800">Casos Atendidos</h3>
                  <p className="text-2xl font-bold text-green-900">{conselho.casosAtivos}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-amber-800">Casos Pendentes</h3>
                  <p className="text-2xl font-bold text-amber-900">{conselho.casosPendentes}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-purple-800">Tempo Médio (dias)</h3>
                  <p className="text-2xl font-bold text-purple-900">{conselho.tempoMedioResposta}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="ocorrencias">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ocorrencias">Ocorrências</TabsTrigger>
              <TabsTrigger value="escolas">Escolas</TabsTrigger>
              <TabsTrigger value="alunos">Alunos em Risco</TabsTrigger>
            </TabsList>

            <TabsContent value="ocorrencias" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ocorrências por Status</CardTitle>
                  <CardDescription>Distribuição de ocorrências por status no período selecionado</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ConselhoOcorrenciasChart />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="escolas" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ocorrências por Escola</CardTitle>
                  <CardDescription>Distribuição de ocorrências por escola no período selecionado</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Dados sendo carregados...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alunos" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Alunos em Situação de Risco</CardTitle>
                  <CardDescription>Distribuição de alunos em situação de risco por escola</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Dados sendo carregados...</p>
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
