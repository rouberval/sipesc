"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveGrid } from "@/components/ui/responsive-grid"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Legend, Tooltip, ResponsiveContainer } from "recharts"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { LineChart, Line } from "recharts"
import { AlertTriangle, Building, Shield, AlertCircle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchDashboardMPData } from "@/services/bi-service"
import type { DashboardMPData } from "@/services/bi-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import MapComponent from "./map-component"

// Dados estáticos para garantir que o gráfico seja renderizado
const dadosRegioes = [
  { name: "Norte", ocorrencias: 125, encaminhamentos: 95, percentual: 76 },
  { name: "Sul", ocorrencias: 98, encaminhamentos: 72, percentual: 73 },
  { name: "Leste", ocorrencias: 145, encaminhamentos: 110, percentual: 76 },
  { name: "Oeste", ocorrencias: 87, encaminhamentos: 65, percentual: 75 },
  { name: "Centro", ocorrencias: 165, encaminhamentos: 130, percentual: 79 },
]

export function DashboardMP() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [mpData, setMpData] = useState<DashboardMPData | null>(null)
  const [filtroRegiao, setFiltroRegiao] = useState("todas")
  const [filtroPeriodo, setFiltroPeriodo] = useState("ultimo-mes")
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("regioes")
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        // Adicionar um pequeno delay para garantir que a UI seja atualizada
        await new Promise((resolve) => setTimeout(resolve, 100))
        const data = await fetchDashboardMPData()
        setMpData(data)
      } catch (err) {
        console.error("Erro ao carregar dados do dashboard:", err)
        setError(err instanceof Error ? err : new Error("Erro ao carregar dados do dashboard"))
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [user, filtroRegiao, filtroPeriodo])

  // Efeito para garantir que o gráfico seja renderizado corretamente
  useEffect(() => {
    if (!isLoading && chartContainerRef.current) {
      // Forçar um reflow para garantir que o gráfico seja renderizado
      const width = chartContainerRef.current.offsetWidth
      const height = chartContainerRef.current.offsetHeight
      console.log(`Dimensões do contêiner do gráfico: ${width}x${height}`)
    }
  }, [isLoading, activeTab])

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro ao carregar dados</AlertTitle>
        <AlertDescription>
          Ocorreu um erro ao carregar os dados do dashboard. Por favor, tente novamente mais tarde.
        </AlertDescription>
        <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </Alert>
    )
  }

  if (!mpData) {
    return (
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Dados não disponíveis</AlertTitle>
        <AlertDescription>
          Não foi possível carregar os dados do dashboard. Por favor, tente novamente mais tarde.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard do Ministério Público</h1>
        <p className="text-muted-foreground">Visão geral do sistema SIPESC</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Selecione os filtros para visualizar os dados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Região</label>
              <Select
                value={filtroRegiao}
                onValueChange={(value) => {
                  setFiltroRegiao(value)
                  setIsLoading(true) // Recarregar dados ao mudar filtro
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a região" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Regiões</SelectItem>
                  <SelectItem value="norte">Região Norte</SelectItem>
                  <SelectItem value="sul">Região Sul</SelectItem>
                  <SelectItem value="leste">Região Leste</SelectItem>
                  <SelectItem value="oeste">Região Oeste</SelectItem>
                  <SelectItem value="centro">Região Centro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Período</label>
              <Select
                value={filtroPeriodo}
                onValueChange={(value) => {
                  setFiltroPeriodo(value)
                  setIsLoading(true) // Recarregar dados ao mudar filtro
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ultimo-mes">Último Mês</SelectItem>
                  <SelectItem value="ultimo-trimestre">Último Trimestre</SelectItem>
                  <SelectItem value="ultimo-semestre">Último Semestre</SelectItem>
                  <SelectItem value="ultimo-ano">Último Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de estatísticas */}
      <ResponsiveGrid xs={1} sm={2} md={3} gap="md">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <Building className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Escolas Monitoradas</p>
                <h3 className="text-2xl font-bold">{mpData.totalEscolas}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-full">
                <Shield className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conselhos Tutelares</p>
                <h3 className="text-2xl font-bold">{mpData.totalConselhos}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Casos Não Tratados</p>
                <h3 className="text-2xl font-bold">{mpData.casosNaoTratados}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </ResponsiveGrid>

      {/* Tabs com gráficos */}
      <Tabs
        defaultValue="regioes"
        className="w-full"
        onValueChange={(value) => {
          setActiveTab(value)
          // Recarregar dados quando mudar de aba
          if (value === "regioes") {
            setIsLoading(true)
            setTimeout(() => setIsLoading(false), 300)
          }
        }}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="regioes">Regiões</TabsTrigger>
          <TabsTrigger value="conselhos">Conselhos</TabsTrigger>
          <TabsTrigger value="tendencias">Tendências</TabsTrigger>
        </TabsList>

        <TabsContent value="regioes">
          <Card>
            <CardHeader className="space-y-1.5">
              <CardTitle className="text-xl font-bold">Ocorrências e Encaminhamentos por Região</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Distribuição de casos por região geográfica e taxa de encaminhamento (em média 75% das ocorrências geram
                encaminhamentos)
              </CardDescription>
              <div className="flex items-center gap-2 mt-1 text-sm">
                <Info className="h-4 w-4 text-blue-500" />
                <span className="text-muted-foreground">
                  As barras mostram o número absoluto de ocorrências (laranja) e encaminhamentos (azul) por região
                </span>
              </div>
            </CardHeader>
            <CardContent className="h-80">
              {isLoading ? (
                <div className="flex h-full items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="flex flex-col h-full" ref={chartContainerRef}>
                  {/* Gráfico de barras responsivo */}
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={dadosRegioes}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 20,
                          bottom: 30,
                        }}
                        barSize={20}
                        barGap={10}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          formatter={(value, name, props) => {
                            if (name === "ocorrencias") return [`${value} ocorrências`, "Ocorrências"]
                            if (name === "encaminhamentos") return [`${value} encaminhamentos`, "Encaminhamentos"]
                            return [value, name]
                          }}
                          labelFormatter={(label) => `Região ${label}`}
                        />
                        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                        <Bar dataKey="ocorrencias" name="Ocorrências" fill="#f59e0b" />
                        <Bar dataKey="encaminhamentos" name="Encaminhamentos" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Tabela de resumo */}
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr>
                          <th className="text-left font-medium p-2 border-b">Região</th>
                          <th className="text-center font-medium p-2 border-b">Ocorrências</th>
                          <th className="text-center font-medium p-2 border-b">Encaminhamentos</th>
                          <th className="text-center font-medium p-2 border-b">Taxa (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dadosRegioes.map((regiao) => (
                          <tr key={regiao.name}>
                            <td className="p-2 border-b">{regiao.name}</td>
                            <td className="text-center p-2 border-b">{regiao.ocorrencias}</td>
                            <td className="text-center p-2 border-b">{regiao.encaminhamentos}</td>
                            <td className="text-center p-2 border-b">{regiao.percentual}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conselhos">
          <Card>
            <CardHeader>
              <CardTitle>Eficiência dos Conselhos Tutelares</CardTitle>
              <CardDescription>Taxa de resolução de casos por conselho tutelar</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Conselho Norte", taxa: 85 },
                      { name: "Conselho Sul", taxa: 72 },
                      { name: "Conselho Leste", taxa: 93 },
                      { name: "Conselho Oeste", taxa: 68 },
                      { name: "Conselho Central", taxa: 79 },
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    barSize={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, "Taxa de Resolução"]} />
                    <Legend />
                    <Bar dataKey="taxa" name="Taxa de Resolução (%)" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tendencias">
          <Card>
            <CardHeader>
              <CardTitle>Tendência de Ocorrências e Encaminhamentos</CardTitle>
              <CardDescription>Evolução mensal dos casos registrados no sistema</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { mes: "Jan", ocorrencias: 85, encaminhamentos: 65 },
                      { mes: "Fev", ocorrencias: 92, encaminhamentos: 70 },
                      { mes: "Mar", ocorrencias: 78, encaminhamentos: 60 },
                      { mes: "Abr", ocorrencias: 95, encaminhamentos: 75 },
                      { mes: "Mai", ocorrencias: 105, encaminhamentos: 85 },
                      { mes: "Jun", ocorrencias: 88, encaminhamentos: 70 },
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="ocorrencias"
                      name="Ocorrências"
                      stroke="#f59e0b"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="encaminhamentos"
                      name="Encaminhamentos"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Casos críticos não tratados */}
      <Card>
        <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <CardTitle>Casos Críticos Não Tratados</CardTitle>
            <CardDescription>Situações que requerem intervenção imediata</CardDescription>
          </div>
          <Button onClick={() => router.push("/painel-bi")} className="mt-2 sm:mt-0 self-start sm:self-center">
            Ver análise completa
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mpData.casosCriticos.map((caso) => (
              <div key={caso.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{caso.nome}</h4>
                  <p className="text-sm text-muted-foreground">{caso.tipo}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{caso.status}</Badge>
                  <Button variant="outline" size="sm" onClick={() => router.push(`/alertas/${caso.id}`)}>
                    Intervir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mapa de distribuição */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição Geográfica</CardTitle>
          <CardDescription>Mapa de calor de ocorrências por região</CardDescription>
        </CardHeader>
        <CardContent className="h-96 p-0 overflow-hidden rounded-b-lg">
          {/* Integração do componente de mapa real */}
          <MapComponent />
        </CardContent>
      </Card>
    </div>
  )
}
