"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveGrid } from "@/components/ui/responsive-grid"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { XAxis, YAxis, CartesianGrid } from "recharts"
import { LineChart, Line } from "recharts"
import { AlertTriangle, ArrowRightFromLine, Calendar, Users } from "lucide-react"

// Dados simulados para a escola
const mockOcorrencias = [
  { name: "Leves", value: 25, color: "#3b82f6" },
  { name: "Moderadas", value: 15, color: "#f59e0b" },
  { name: "Graves", value: 5, color: "#ef4444" },
]

const mockFrequencia = [
  { mes: "Jan", presenca: 92 },
  { mes: "Fev", presenca: 90 },
  { mes: "Mar", presenca: 88 },
  { mes: "Abr", presenca: 91 },
  { mes: "Mai", presenca: 89 },
  { mes: "Jun", presenca: 87 },
]

const mockEncaminhamentos = [
  { name: "Pendentes", value: 8, color: "#f59e0b" },
  { name: "Em andamento", value: 12, color: "#3b82f6" },
  { name: "Concluídos", value: 15, color: "#10b981" },
]

export function DashboardEscola() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [escolaData, setEscolaData] = useState<any>(null)

  useEffect(() => {
    // Simulação de carregamento de dados da API
    const fetchData = async () => {
      // Em um cenário real, aqui seria feita uma chamada à API
      // para buscar os dados específicos da escola logada
      setTimeout(() => {
        setEscolaData({
          nome: "Escola Municipal João da Silva",
          totalAlunos: 850,
          totalOcorrencias: 45,
          totalEncaminhamentos: 35,
          alertasFrequencia: 12,
        })
        setIsLoading(false)
      }, 1000)
    }

    fetchData()
  }, [user])

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
        <h1 className="text-2xl font-bold mb-2">Dashboard da Escola</h1>
        <p className="text-muted-foreground">{escolaData.nome}</p>
      </div>

      {/* Cards de estatísticas */}
      <ResponsiveGrid xs={1} sm={2} md={4} gap="md">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Alunos</p>
                <h3 className="text-2xl font-bold">{escolaData.totalAlunos}</h3>
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
                <h3 className="text-2xl font-bold">{escolaData.totalOcorrencias}</h3>
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
                <h3 className="text-2xl font-bold">{escolaData.totalEncaminhamentos}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded-full">
                <Calendar className="h-5 w-5 text-red-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Alertas de Frequência</p>
                <h3 className="text-2xl font-bold">{escolaData.alertasFrequencia}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </ResponsiveGrid>

      {/* Tabs com gráficos */}
      <Tabs defaultValue="ocorrencias" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ocorrencias">Ocorrências</TabsTrigger>
          <TabsTrigger value="frequencia">Frequência</TabsTrigger>
          <TabsTrigger value="encaminhamentos">Encaminhamentos</TabsTrigger>
        </TabsList>

        <TabsContent value="ocorrencias">
          <Card>
            <CardHeader>
              <CardTitle>Ocorrências por Gravidade</CardTitle>
              <CardDescription>Distribuição das ocorrências registradas na escola</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockOcorrencias}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockOcorrencias.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} ocorrências`, "Quantidade"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequencia">
          <Card>
            <CardHeader>
              <CardTitle>Frequência Mensal</CardTitle>
              <CardDescription>Percentual de presença dos alunos nos últimos meses</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockFrequencia}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, "Presença"]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="presenca"
                    name="Frequência"
                    stroke="#3b82f6"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="encaminhamentos">
          <Card>
            <CardHeader>
              <CardTitle>Status dos Encaminhamentos</CardTitle>
              <CardDescription>Distribuição dos encaminhamentos por status</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockEncaminhamentos}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockEncaminhamentos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} encaminhamentos`, "Quantidade"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Lista de alunos com alertas */}
      <Card>
        <CardHeader>
          <CardTitle>Alunos com Alertas Recentes</CardTitle>
          <CardDescription>Alunos que necessitam de atenção especial</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Aluno {i}</h4>
                  <p className="text-sm text-muted-foreground">
                    {i % 2 === 0 ? "Faltas consecutivas" : "Ocorrência disciplinar"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      i % 3 === 0
                        ? "bg-red-100 text-red-800"
                        : i % 3 === 1
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {i % 3 === 0 ? "Crítico" : i % 3 === 1 ? "Atenção" : "Monitorar"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
