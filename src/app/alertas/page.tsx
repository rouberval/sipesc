"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Filter, Search, ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for alerts
const mockAlertas = [
  {
    id: "1",
    tipo: "frequencia",
    descricao: "Aluno com mais de 25% de faltas no mês",
    escola: "Escola Municipal João da Silva",
    aluno: "Carlos Oliveira",
    data: "2023-10-15T14:30:00",
    status: "pendente",
    prioridade: "alta",
  },
  {
    id: "2",
    tipo: "ocorrencia",
    descricao: "Múltiplas ocorrências de violência em curto período",
    escola: "Escola Estadual Maria Oliveira",
    aluno: "Ana Silva",
    data: "2023-10-14T10:15:00",
    status: "em_analise",
    prioridade: "alta",
  },
  {
    id: "3",
    tipo: "encaminhamento",
    descricao: "Encaminhamento sem resposta há mais de 30 dias",
    escola: "Colégio Pedro Alves",
    aluno: "Pedro Santos",
    data: "2023-10-10T09:45:00",
    status: "em_analise",
    prioridade: "media",
  },
  {
    id: "4",
    tipo: "frequencia",
    descricao: "Aluno não comparece há 15 dias consecutivos",
    escola: "Escola Municipal Carlos Drummond",
    aluno: "Mariana Costa",
    data: "2023-10-05T16:20:00",
    status: "resolvido",
    prioridade: "alta",
  },
  {
    id: "5",
    tipo: "ocorrencia",
    descricao: "Relato de bullying recorrente",
    escola: "Colégio Estadual Machado de Assis",
    aluno: "Lucas Mendes",
    data: "2023-10-02T11:10:00",
    status: "pendente",
    prioridade: "media",
  },
  {
    id: "6",
    tipo: "encaminhamento",
    descricao: "Conselho tutelar não respondeu ao encaminhamento",
    escola: "Escola Municipal João da Silva",
    aluno: "Julia Ferreira",
    data: "2023-09-28T09:30:00",
    status: "pendente",
    prioridade: "baixa",
  },
  {
    id: "7",
    tipo: "frequencia",
    descricao: "Padrão irregular de frequência detectado",
    escola: "Escola Estadual Maria Oliveira",
    aluno: "Rafael Souza",
    data: "2023-09-25T14:15:00",
    status: "resolvido",
    prioridade: "baixa",
  },
]

// Função para formatar a data
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

// Função para traduzir o tipo de alerta
function getTipoAlerta(tipo: string) {
  const tipoMap: Record<string, { label: string; color: string }> = {
    frequencia: { label: "Frequência", color: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
    ocorrencia: { label: "Ocorrência", color: "bg-amber-100 text-amber-800 hover:bg-amber-100" },
    encaminhamento: { label: "Encaminhamento", color: "bg-purple-100 text-purple-800 hover:bg-purple-100" },
  }
  return tipoMap[tipo] || { label: tipo, color: "bg-gray-100 text-gray-800 hover:bg-gray-100" }
}

// Função para traduzir o status do alerta
function getStatusAlerta(status: string) {
  const statusMap: Record<string, { label: string; color: string }> = {
    pendente: { label: "Pendente", color: "bg-red-100 text-red-800 hover:bg-red-100" },
    em_analise: { label: "Em Análise", color: "bg-amber-100 text-amber-800 hover:bg-amber-100" },
    resolvido: { label: "Resolvido", color: "bg-green-100 text-green-800 hover:bg-green-100" },
  }
  return statusMap[status] || { label: status, color: "bg-gray-100 text-gray-800 hover:bg-gray-100" }
}

// Função para traduzir a prioridade do alerta
function getPrioridadeAlerta(prioridade: string) {
  const prioridadeMap: Record<string, { label: string; color: string }> = {
    alta: { label: "Alta", color: "bg-red-100 text-red-800 hover:bg-red-100" },
    media: { label: "Média", color: "bg-amber-100 text-amber-800 hover:bg-amber-100" },
    baixa: { label: "Baixa", color: "bg-green-100 text-green-800 hover:bg-green-100" },
  }
  return prioridadeMap[prioridade] || { label: prioridade, color: "bg-gray-100 text-gray-800 hover:bg-gray-100" }
}

export default function AlertasPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [tipoFilter, setTipoFilter] = useState("todos")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [prioridadeFilter, setPrioridadeFilter] = useState("todas")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)

  const handleViewAlert = (id: string) => {
    router.push(`/alertas/${id}`)
  }

  // Função para ordenar os alertas
  const sortedAlertas = [...mockAlertas].sort((a, b) => {
    if (!sortConfig) return 0

    if (sortConfig.key === "data") {
      return sortConfig.direction === "asc"
        ? new Date(a.data).getTime() - new Date(b.data).getTime()
        : new Date(b.data).getTime() - new Date(a.data).getTime()
    }

    const aValue = a[sortConfig.key as keyof typeof a]
    const bValue = b[sortConfig.key as keyof typeof b]

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1
    }
    return 0
  })

  // Função para alternar a ordenação
  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Filtrar alertas com base nos filtros aplicados
  const alertasFiltrados = sortedAlertas.filter((alerta) => {
    const matchesSearch =
      alerta.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alerta.escola.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alerta.aluno.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTipo = tipoFilter === "todos" || alerta.tipo === tipoFilter
    const matchesStatus = statusFilter === "todos" || alerta.status === statusFilter
    const matchesPrioridade = prioridadeFilter === "todas" || alerta.prioridade === prioridadeFilter

    return matchesSearch && matchesTipo && matchesStatus && matchesPrioridade
  })

  return (
    <ProtectedRoute allowedRoles={["mp"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Alertas Críticos</h1>
              <p className="text-muted-foreground">Monitoramento de situações que requerem atenção imediata</p>
            </div>
            <div className="w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtros Avançados
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[240px]">
                  <div className="p-2">
                    <p className="text-sm font-medium mb-2">Tipo de Alerta</p>
                    <Select value={tipoFilter} onValueChange={setTipoFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Todos os tipos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos os tipos</SelectItem>
                        <SelectItem value="frequencia">Frequência</SelectItem>
                        <SelectItem value="ocorrencia">Ocorrência</SelectItem>
                        <SelectItem value="encaminhamento">Encaminhamento</SelectItem>
                      </SelectContent>
                    </Select>

                    <p className="text-sm font-medium mt-4 mb-2">Status</p>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Todos os status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos os status</SelectItem>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="em_analise">Em Análise</SelectItem>
                        <SelectItem value="resolvido">Resolvido</SelectItem>
                      </SelectContent>
                    </Select>

                    <p className="text-sm font-medium mt-4 mb-2">Prioridade</p>
                    <Select value={prioridadeFilter} onValueChange={setPrioridadeFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Todas as prioridades" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas as prioridades</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="baixa">Baixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por descrição, escola ou aluno..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="todos">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
              <TabsTrigger value="em_analise">Em Análise</TabsTrigger>
              <TabsTrigger value="resolvidos">Resolvidos</TabsTrigger>
            </TabsList>
            <TabsContent value="todos">
              <Card>
                <CardHeader>
                  <CardTitle>Todos os Alertas</CardTitle>
                  <CardDescription>Lista completa de alertas no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <Button variant="ghost" onClick={() => requestSort("tipo")} className="flex items-center">
                            Tipo
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Escola</TableHead>
                        <TableHead>Aluno</TableHead>
                        <TableHead>
                          <Button variant="ghost" onClick={() => requestSort("data")} className="flex items-center">
                            Data
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button variant="ghost" onClick={() => requestSort("status")} className="flex items-center">
                            Status
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            onClick={() => requestSort("prioridade")}
                            className="flex items-center"
                          >
                            Prioridade
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {alertasFiltrados.map((alerta) => (
                        <TableRow key={alerta.id}>
                          <TableCell>
                            <Badge className={getTipoAlerta(alerta.tipo).color}>
                              {getTipoAlerta(alerta.tipo).label}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{alerta.descricao}</TableCell>
                          <TableCell>{alerta.escola}</TableCell>
                          <TableCell>{alerta.aluno}</TableCell>
                          <TableCell>{formatDate(alerta.data)}</TableCell>
                          <TableCell>
                            <Badge className={getStatusAlerta(alerta.status).color}>
                              {getStatusAlerta(alerta.status).label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPrioridadeAlerta(alerta.prioridade).color}>
                              {getPrioridadeAlerta(alerta.prioridade).label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleViewAlert(alerta.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {alertasFiltrados.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">Nenhum alerta encontrado</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pendentes">{/* Conteúdo similar para alertas pendentes */}</TabsContent>
            <TabsContent value="em_analise">{/* Conteúdo similar para alertas em análise */}</TabsContent>
            <TabsContent value="resolvidos">{/* Conteúdo similar para alertas resolvidos */}</TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
