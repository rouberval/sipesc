"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, FileText, Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for schools
const mockEscolas = [
  {
    id: "1",
    nome: "Escola Municipal João da Silva",
    endereco: "Rua das Flores, 123",
    telefone: "(48) 3333-1111",
    diretor: "Maria Santos",
    alunos: 450,
    ocorrencias: 12,
    encaminhamentos: 5,
    alertas: 3,
    regiao: "Norte",
  },
  {
    id: "2",
    nome: "Escola Estadual Maria Oliveira",
    endereco: "Av. Principal, 456",
    telefone: "(48) 3333-2222",
    diretor: "João Pereira",
    alunos: 320,
    ocorrencias: 8,
    encaminhamentos: 2,
    alertas: 1,
    regiao: "Sul",
  },
  {
    id: "3",
    nome: "Colégio Pedro Alves",
    endereco: "Rua Secundária, 789",
    telefone: "(48) 3333-3333",
    diretor: "Ana Oliveira",
    alunos: 280,
    ocorrencias: 5,
    encaminhamentos: 1,
    alertas: 0,
    regiao: "Leste",
  },
  {
    id: "4",
    nome: "Escola Municipal Carlos Drummond",
    endereco: "Av. Central, 567",
    telefone: "(48) 3333-4444",
    diretor: "Roberto Campos",
    alunos: 520,
    ocorrencias: 15,
    encaminhamentos: 7,
    alertas: 4,
    regiao: "Oeste",
  },
  {
    id: "5",
    nome: "Colégio Estadual Machado de Assis",
    endereco: "Rua dos Escritores, 890",
    telefone: "(48) 3333-5555",
    diretor: "Carla Mendes",
    alunos: 380,
    ocorrencias: 9,
    encaminhamentos: 3,
    alertas: 2,
    regiao: "Centro",
  },
]

export default function EscolasPage() {
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useMobile()
  const [searchTerm, setSearchTerm] = useState("")
  const [regiaoFilter, setRegiaoFilter] = useState("todas")
  const [alertasFilter, setAlertasFilter] = useState("todos")
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({})

  const handleViewSchool = (id: string) => {
    setIsLoading((prev) => ({ ...prev, [`view_${id}`]: true }))

    // Simular carregamento
    setTimeout(() => {
      router.push(`/escolas/${id}`)
      setIsLoading((prev) => ({ ...prev, [`view_${id}`]: false }))
    }, 500)
  }

  const handleViewReport = (id: string) => {
    setIsLoading((prev) => ({ ...prev, [`report_${id}`]: true }))

    // Simular carregamento
    setTimeout(() => {
      router.push(`/escolas/${id}/relatorio`)
      setIsLoading((prev) => ({ ...prev, [`report_${id}`]: false }))
    }, 500)
  }

  // Filtrar escolas com base nos filtros aplicados
  const escolasFiltradas = mockEscolas.filter((escola) => {
    const matchesSearch =
      escola.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      escola.diretor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      escola.regiao.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRegiao = regiaoFilter === "todas" || escola.regiao.toLowerCase() === regiaoFilter.toLowerCase()

    const matchesAlertas =
      alertasFilter === "todos" ||
      (alertasFilter === "com" && escola.alertas > 0) ||
      (alertasFilter === "sem" && escola.alertas === 0)

    return matchesSearch && matchesRegiao && matchesAlertas
  })

  return (
    <ProtectedRoute allowedRoles={["mp", "admin", "conselheiro"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Escolas Cadastradas</h1>
              <p className="text-muted-foreground">Monitoramento e acompanhamento das escolas no sistema</p>
            </div>
            <div className="w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtros
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <div className="p-2">
                    <p className="text-sm font-medium mb-2">Região</p>
                    <Select value={regiaoFilter} onValueChange={setRegiaoFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Todas as regiões" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas as regiões</SelectItem>
                        <SelectItem value="norte">Norte</SelectItem>
                        <SelectItem value="sul">Sul</SelectItem>
                        <SelectItem value="leste">Leste</SelectItem>
                        <SelectItem value="oeste">Oeste</SelectItem>
                        <SelectItem value="centro">Centro</SelectItem>
                      </SelectContent>
                    </Select>

                    <p className="text-sm font-medium mt-4 mb-2">Alertas</p>
                    <Select value={alertasFilter} onValueChange={setAlertasFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Todos os alertas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos os alertas</SelectItem>
                        <SelectItem value="com">Com alertas</SelectItem>
                        <SelectItem value="sem">Sem alertas</SelectItem>
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
              placeholder="Buscar por nome, diretor ou região..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Escolas</CardTitle>
              <CardDescription>Lista de todas as escolas cadastradas no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Versão para desktop */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Diretor</TableHead>
                      <TableHead>Região</TableHead>
                      <TableHead>Alunos</TableHead>
                      <TableHead>Ocorrências</TableHead>
                      <TableHead>Alertas</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {escolasFiltradas.map((escola) => (
                      <TableRow key={escola.id}>
                        <TableCell className="font-medium">{escola.nome}</TableCell>
                        <TableCell>{escola.diretor}</TableCell>
                        <TableCell>{escola.regiao}</TableCell>
                        <TableCell>{escola.alunos}</TableCell>
                        <TableCell>{escola.ocorrencias}</TableCell>
                        <TableCell>
                          {escola.alertas > 0 ? (
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{escola.alertas}</Badge>
                          ) : (
                            <Badge variant="outline">0</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewSchool(escola.id)}
                              disabled={isLoading[`view_${escola.id}`]}
                            >
                              {isLoading[`view_${escola.id}`] ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewReport(escola.id)}
                              disabled={isLoading[`report_${escola.id}`]}
                            >
                              {isLoading[`report_${escola.id}`] ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                              ) : (
                                <FileText className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Versão para mobile */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {escolasFiltradas.map((escola) => (
                  <Card key={escola.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{escola.nome}</CardTitle>
                          <CardDescription>Diretor: {escola.diretor}</CardDescription>
                          <p className="text-sm text-muted-foreground mt-1">Região: {escola.regiao}</p>
                        </div>
                        {escola.alertas > 0 && (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{escola.alertas} alertas</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Alunos</p>
                          <p className="font-medium">{escola.alunos}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Ocorrências</p>
                          <p className="font-medium">{escola.ocorrencias}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Encaminhamentos</p>
                          <p className="font-medium">{escola.encaminhamentos}</p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewSchool(escola.id)}
                          disabled={isLoading[`view_${escola.id}`]}
                          className="w-full sm:w-auto"
                        >
                          {isLoading[`view_${escola.id}`] ? (
                            <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                          ) : (
                            <Eye className="h-4 w-4 mr-2" />
                          )}
                          Visualizar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewReport(escola.id)}
                          disabled={isLoading[`report_${escola.id}`]}
                          className="w-full sm:w-auto"
                        >
                          {isLoading[`report_${escola.id}`] ? (
                            <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                          ) : (
                            <FileText className="h-4 w-4 mr-2" />
                          )}
                          Relatório
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {escolasFiltradas.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">Nenhuma escola encontrada</div>
              )}
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
