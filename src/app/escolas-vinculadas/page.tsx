"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Mock data for linked schools
const mockEscolas = [
  {
    id: "1",
    nome: "Escola Municipal João da Silva",
    endereco: "Rua das Flores, 123",
    telefone: "(48) 3333-1111",
    diretor: "Maria Santos",
    regiao: "Norte",
    municipio: "Florianópolis",
    totalAlunos: 450,
    alunosRisco: 12,
    ocorrencias: 25,
    encaminhamentos: 8,
  },
  {
    id: "2",
    nome: "Escola Estadual Maria Oliveira",
    endereco: "Av. Principal, 456",
    telefone: "(48) 3333-2222",
    diretor: "João Pereira",
    regiao: "Sul",
    municipio: "São José",
    totalAlunos: 320,
    alunosRisco: 8,
    ocorrencias: 15,
    encaminhamentos: 5,
  },
  {
    id: "3",
    nome: "Colégio Pedro Alves",
    endereco: "Rua Secundária, 789",
    telefone: "(48) 3333-3333",
    diretor: "Ana Oliveira",
    regiao: "Leste",
    municipio: "Palhoça",
    totalAlunos: 280,
    alunosRisco: 5,
    ocorrencias: 10,
    encaminhamentos: 3,
  },
  {
    id: "4",
    nome: "Escola Básica Ana Souza",
    endereco: "Av. Central, 321",
    telefone: "(48) 3333-4444",
    diretor: "Carlos Silva",
    regiao: "Oeste",
    municipio: "Biguaçu",
    totalAlunos: 210,
    alunosRisco: 3,
    ocorrencias: 8,
    encaminhamentos: 2,
  },
  {
    id: "5",
    nome: "Instituto Educacional Central",
    endereco: "Praça da Cidade, 100",
    telefone: "(48) 3333-5555",
    diretor: "Fernanda Lima",
    regiao: "Central",
    municipio: "Florianópolis",
    totalAlunos: 380,
    alunosRisco: 10,
    ocorrencias: 20,
    encaminhamentos: 7,
  },
]

export default function EscolasVinculadasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [escolas, setEscolas] = useState<typeof mockEscolas>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    // Simular carregamento de dados
    const loadData = async () => {
      setIsLoading(true)

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Em uma aplicação real, filtraria as escolas vinculadas ao conselho específico
      // Aqui estamos usando dados mockados
      if (user?.role === "conselheiro" && user?.councilId) {
        // Filtrar escolas por conselho
        setEscolas(mockEscolas)
      } else {
        // Para admin, mostrar todas as escolas
        setEscolas(mockEscolas)
      }

      setIsLoading(false)
    }

    loadData()
  }, [user])

  // Filtrar escolas com base no termo de busca
  const escolasFiltradas = escolas.filter(
    (escola) =>
      escola.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      escola.municipio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      escola.regiao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <ProtectedRoute allowedRoles={["conselheiro", "admin"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Escolas Vinculadas</h1>
              <p className="text-muted-foreground mt-1">Escolas vinculadas ao seu conselho tutelar</p>
            </div>
            <div className="w-full sm:w-64">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar escolas..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Escolas Vinculadas</CardTitle>
              <CardDescription>Lista de escolas vinculadas ao seu conselho tutelar</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="lg" />
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead className="hidden md:table-cell">Município</TableHead>
                        <TableHead className="hidden md:table-cell">Região</TableHead>
                        <TableHead>Alunos em Risco</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {escolasFiltradas.length > 0 ? (
                        escolasFiltradas.map((escola) => (
                          <TableRow key={escola.id}>
                            <TableCell className="font-medium">{escola.nome}</TableCell>
                            <TableCell className="hidden md:table-cell">{escola.municipio}</TableCell>
                            <TableCell className="hidden md:table-cell">{escola.regiao}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Badge
                                  className={`${
                                    escola.alunosRisco > 10
                                      ? "bg-red-100 text-red-800"
                                      : escola.alunosRisco > 5
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-blue-100 text-blue-800"
                                  } mr-2`}
                                >
                                  {escola.alunosRisco}
                                </Badge>
                                {escola.alunosRisco > 10 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/escolas-vinculadas/${escola.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Detalhes
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">
                            Nenhuma escola encontrada
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
