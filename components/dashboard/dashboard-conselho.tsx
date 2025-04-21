"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveGrid } from "@/components/ui/responsive-grid"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { AlertTriangle, ArrowRightFromLine, Building, Users, Phone, Mail, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Adicione esta interface após as importações
declare global {
  interface Window {
    L: any
  }
}

// Interface para os dados da escola
interface EscolaData {
  id: string
  name: string
  ocorrencias: number
  endereco: string
  telefone: string
  email: string
  diretor: string
  totalAlunos: number
  alunosEmRisco: number
}

// Dados simulados para o conselho tutelar
const mockEscolasData = [
  { name: "Escola A", ocorrencias: 25 },
  { name: "Escola B", ocorrencias: 18 },
  { name: "Escola C", ocorrencias: 32 },
  { name: "Escola D", ocorrencias: 12 },
  { name: "Escola E", ocorrencias: 8 },
]

const mockTiposOcorrencias = [
  { name: "Faltas Excessivas", value: 45, color: "#3b82f6" },
  { name: "Comportamento", value: 30, color: "#f59e0b" },
  { name: "Violência", value: 15, color: "#ef4444" },
  { name: "Abandono", value: 10, color: "#10b981" },
]

const mockStatusEncaminhamentos = [
  { name: "Pendentes", value: 28, color: "#f59e0b" },
  { name: "Em andamento", value: 42, color: "#3b82f6" },
  { name: "Concluídos", value: 35, color: "#10b981" },
]

// Dados detalhados das escolas
const mockEscolasDetalhadas: EscolaData[] = [
  {
    id: "1",
    name: "Escola Municipal Centro",
    ocorrencias: 25,
    endereco: "Rua Central, 123 - Centro",
    telefone: "(48) 3333-1111",
    email: "escola.centro@sipesc.edu.br",
    diretor: "Maria Silva",
    totalAlunos: 450,
    alunosEmRisco: 12,
  },
  {
    id: "2",
    name: "Escola Estadual Norte",
    ocorrencias: 18,
    endereco: "Av. Norte, 456 - Bairro Norte",
    telefone: "(48) 3333-2222",
    email: "escola.norte@sipesc.edu.br",
    diretor: "João Santos",
    totalAlunos: 380,
    alunosEmRisco: 8,
  },
  {
    id: "3",
    name: "Escola Municipal Sul",
    ocorrencias: 32,
    endereco: "Rua Sul, 789 - Bairro Sul",
    telefone: "(48) 3333-3333",
    email: "escola.sul@sipesc.edu.br",
    diretor: "Ana Oliveira",
    totalAlunos: 520,
    alunosEmRisco: 15,
  },
  {
    id: "4",
    name: "Colégio Leste",
    ocorrencias: 12,
    endereco: "Av. Leste, 321 - Bairro Leste",
    telefone: "(48) 3333-4444",
    email: "colegio.leste@sipesc.edu.br",
    diretor: "Carlos Pereira",
    totalAlunos: 290,
    alunosEmRisco: 5,
  },
  {
    id: "5",
    name: "Instituto Educacional Oeste",
    ocorrencias: 8,
    endereco: "Rua Oeste, 654 - Bairro Oeste",
    telefone: "(48) 3333-5555",
    email: "instituto.oeste@sipesc.edu.br",
    diretor: "Fernanda Lima",
    totalAlunos: 310,
    alunosEmRisco: 4,
  },
]

export function DashboardConselho() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [conselhoData, setConselhoData] = useState<any>(null)
  const router = useRouter()
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [escolasData, setEscolasData] = useState<EscolaData[]>([])
  const [loadingEscolasData, setLoadingEscolasData] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    // Simulação de carregamento de dados da API
    const fetchData = async () => {
      // Em um cenário real, aqui seria feita uma chamada à API
      // para buscar os dados específicos do conselho tutelar logado
      setTimeout(() => {
        setConselhoData({
          nome: "Conselho Tutelar Norte",
          totalEscolas: 12,
          totalOcorrencias: 105,
          totalEncaminhamentos: 85,
          alunosEmRisco: 28,
        })
        setIsLoading(false)
      }, 1000)
    }

    fetchData()
  }, [user])

  // Inicializar o mapa quando os dados estiverem carregados
  useEffect(() => {
    if (isLoading || mapLoaded || typeof window === "undefined") return

    // Carregar o Leaflet dinamicamente
    const loadLeaflet = async () => {
      try {
        // Verificar se o Leaflet já está carregado
        if (!window.L) {
          // Carregar CSS do Leaflet
          const linkElement = document.createElement("link")
          linkElement.rel = "stylesheet"
          linkElement.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          document.head.appendChild(linkElement)

          // Carregar JS do Leaflet
          const script = document.createElement("script")
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          script.async = true

          // Aguardar o carregamento do script
          await new Promise((resolve) => {
            script.onload = resolve
            document.body.appendChild(script)
          })
        }

        // Inicializar o mapa após o carregamento do Leaflet
        setTimeout(() => {
          initializeMap()
        }, 500)
      } catch (error) {
        console.error("Erro ao carregar Leaflet:", error)
      }
    }

    loadLeaflet()
  }, [isLoading, mapLoaded])

  // Inicializar o mapa
  const initializeMap = () => {
    if (!window.L || document.getElementById("dashboard-map")?.hasChildNodes()) return

    try {
      // Criar o mapa
      const mapInstance = window.L.map("dashboard-map").setView([-27.5969, -48.5495], 12)

      // Adicionar camada de tiles
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance)

      // Adicionar marcadores para escolas
      const escolasData = [
        { id: "1", nome: "Escola Municipal Centro", latitude: -27.5969, longitude: -48.5495, ocorrencias: 25 },
        { id: "2", nome: "Escola Estadual Norte", latitude: -27.5869, longitude: -48.5395, ocorrencias: 18 },
        { id: "3", nome: "Escola Municipal Sul", latitude: -27.6069, longitude: -48.5595, ocorrencias: 32 },
        { id: "4", nome: "Colégio Leste", latitude: -27.5969, longitude: -48.5395, ocorrencias: 12 },
        { id: "5", nome: "Instituto Educacional Oeste", latitude: -27.5869, longitude: -48.5595, ocorrencias: 8 },
      ]

      const newMarkers = escolasData.map((escola) => {
        const marker = window.L.marker([escola.latitude, escola.longitude]).addTo(mapInstance)

        // Adicionar popup com informações da escola
        marker.bindPopup(`
        <div>
          <h3 style="font-weight: bold; margin-bottom: 5px;">${escola.nome}</h3>
          <p><strong>Ocorrências:</strong> ${escola.ocorrencias}</p>
        </div>
      `)

        return marker
      })

      setMap(mapInstance)
      setMarkers(newMarkers)
      setMapLoaded(true)
    } catch (error) {
      console.error("Erro ao inicializar o mapa:", error)
    }
  }

  // Função para buscar dados de ocorrências por escola
  const fetchOcorrenciasPorEscola = async () => {
    setLoadingEscolasData(true)
    try {
      // Simulação de chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Em um cenário real, aqui seria feita uma chamada à API
      // para buscar os dados de ocorrências por escola
      const response = mockEscolasDetalhadas.map((escola) => ({
        ...escola,
        ocorrencias: Math.floor(Math.random() * 10) + escola.ocorrencias - 5,
      }))

      setEscolasData(response)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Erro ao buscar dados de ocorrências por escola:", error)
      // Em caso de erro, usar dados mockados como fallback
      setEscolasData(mockEscolasDetalhadas)
    } finally {
      setLoadingEscolasData(false)
    }
  }

  // Carregar dados de ocorrências por escola
  useEffect(() => {
    if (!isLoading) {
      fetchOcorrenciasPorEscola()
    }
  }, [isLoading])

  // Atualização periódica dos dados (a cada 30 segundos)
  useEffect(() => {
    if (!isLoading && autoRefresh) {
      const intervalId = setInterval(() => {
        fetchOcorrenciasPorEscola()
      }, 30000) // 30 segundos

      return () => clearInterval(intervalId)
    }
  }, [isLoading, autoRefresh])

  // Limpar o mapa ao desmontar o componente
  useEffect(() => {
    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [map])

  // Componente personalizado para o tooltip do gráfico
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const escola = escolasData.find((e) => e.name === label)
      if (!escola) return null

      return (
        <div className="bg-white p-4 border rounded-md shadow-md">
          <h4 className="font-bold text-sm mb-1">{escola.name}</h4>
          <p className="text-sm mb-1">
            <MapPin className="inline h-3 w-3 mr-1" /> {escola.endereco}
          </p>
          <p className="text-sm mb-1">
            <Phone className="inline h-3 w-3 mr-1" /> {escola.telefone}
          </p>
          <p className="text-sm mb-1">
            <Mail className="inline h-3 w-3 mr-1" /> {escola.email}
          </p>
          <p className="text-sm mb-1">
            <Users className="inline h-3 w-3 mr-1" /> {escola.totalAlunos} alunos
          </p>
          <p className="text-sm font-bold text-red-600">{payload[0].value} ocorrências</p>
        </div>
      )
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard do Conselho Tutelar</h1>
        <p className="text-muted-foreground">{conselhoData.nome}</p>
      </div>

      {/* Cards de estatísticas */}
      <ResponsiveGrid xs={1} sm={2} md={4} gap="md">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <Building className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Escolas Vinculadas</p>
                <h3 className="text-2xl font-bold">{conselhoData.totalEscolas}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-amber-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ocorrências</p>
                <h3 className="text-2xl font-bold">{conselhoData.totalOcorrencias}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-full">
                <ArrowRightFromLine className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Encaminhamentos</p>
                <h3 className="text-2xl font-bold">{conselhoData.totalEncaminhamentos}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded-full">
                <Users className="h-5 w-5 text-red-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Alunos em Risco</p>
                <h3 className="text-2xl font-bold">{conselhoData.alunosEmRisco}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </ResponsiveGrid>

      {/* Tabs com gráficos */}
      <Tabs defaultValue="escolas" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="escolas">Escolas</TabsTrigger>
          <TabsTrigger value="ocorrencias">Ocorrências</TabsTrigger>
          <TabsTrigger value="encaminhamentos">Encaminhamentos</TabsTrigger>
        </TabsList>

        <TabsContent value="escolas">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Ocorrências por Escola</CardTitle>
              <CardDescription>Total de ocorrências registradas por escola</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-72">
                <div className="h-full w-full">
                  {loadingEscolasData ? (
                    <div className="flex h-full items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs text-muted-foreground">
                          {lastUpdate ? (
                            <>
                              Última atualização: {lastUpdate.toLocaleTimeString()}
                              {autoRefresh && <span className="ml-1">(Auto)</span>}
                            </>
                          ) : (
                            "Carregando dados..."
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAutoRefresh(!autoRefresh)}
                            className="text-xs h-7 px-2"
                          >
                            {autoRefresh ? "Desativar" : "Ativar"} auto
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fetchOcorrenciasPorEscola()}
                            disabled={loadingEscolasData}
                            className="text-xs h-7 px-2"
                          >
                            {loadingEscolasData ? "..." : "Atualizar"}
                          </Button>
                        </div>
                      </div>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={escolasData}
                          margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0,
                          }}
                          barSize={30}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend wrapperStyle={{ marginTop: 0, paddingTop: 0 }} />
                          <Bar dataKey="ocorrencias" name="Ocorrências" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </>
                  )}
                </div>
              </div>

              {/* Tabela com dados detalhados das escolas */}
              <div className="mt-2">
                <h3 className="text-lg font-medium mb-2">Dados Detalhados das Escolas</h3>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Escola</TableHead>
                        <TableHead>Diretor(a)</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead className="text-right">Total Alunos</TableHead>
                        <TableHead className="text-right">Alunos em Risco</TableHead>
                        <TableHead className="text-right">Ocorrências</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {escolasData.map((escola) => (
                        <TableRow key={escola.id}>
                          <TableCell className="font-medium">{escola.name}</TableCell>
                          <TableCell>{escola.diretor}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-xs">{escola.telefone}</span>
                              <span className="text-xs text-muted-foreground">{escola.email}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{escola.totalAlunos}</TableCell>
                          <TableCell className="text-right">
                            <span className={escola.alunosEmRisco > 10 ? "text-red-600 font-medium" : ""}>
                              {escola.alunosEmRisco}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant={escola.ocorrencias > 20 ? "destructive" : "outline"}>
                              {escola.ocorrencias}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.push(`/escolas-vinculadas/${escola.id}`)}
                            >
                              Detalhes
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ocorrencias">
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Ocorrências</CardTitle>
              <CardDescription>Distribuição das ocorrências por tipo</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockTiposOcorrencias}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockTiposOcorrencias.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} ocorrências`, "Quantidade"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="encaminhamentos">
          <Card>
            <CardHeader>
              <CardTitle>Status dos Encaminhamentos</CardTitle>
              <CardDescription>Distribuição dos encaminhamentos por status</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <div className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockStatusEncaminhamentos}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockStatusEncaminhamentos.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} encaminhamentos`, "Quantidade"]} />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Lista de alunos em risco */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Alunos em Situação de Risco</CardTitle>
            <CardDescription>Casos que necessitam de atenção imediata</CardDescription>
          </div>
          <Button onClick={() => router.push("/alunos-risco")}>Ver todos</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Aluno {i}</h4>
                  <p className="text-sm text-muted-foreground">
                    Escola {String.fromCharCode(64 + i)} • {i % 2 === 0 ? "Faltas consecutivas" : "Violência"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      i % 3 === 0
                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                        : i % 3 === 1
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                    }
                  >
                    {i % 3 === 0 ? "Crítico" : i % 3 === 1 ? "Atenção" : "Monitorar"}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => router.push(`/alunos-risco/${i}`)}>
                    Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mapa de escolas */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição Geográfica</CardTitle>
          <CardDescription>Localização das escolas e ocorrências na região</CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          {isLoading ? (
            <div className="flex h-full items-center justify-center bg-gray-100">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div id="dashboard-map" className="h-full w-full rounded-md border"></div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
