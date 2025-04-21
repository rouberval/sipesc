"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, FileText, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Mock data for councils
const mockConselhos = [
  {
    id: "1",
    nome: "Conselho Tutelar Norte",
    endereco: "Rua dos Conselhos, 123",
    telefone: "(48) 3222-1111",
    coordenador: "Roberto Alves",
    regiao: "Norte",
    municipio: "Florianópolis",
    escolasVinculadas: 8,
    casosAtivos: 45,
    casosPendentes: 12,
    tempoMedioResposta: 2.3,
  },
  {
    id: "2",
    nome: "Conselho Tutelar Sul",
    endereco: "Av. dos Direitos, 456",
    telefone: "(48) 3222-2222",
    coordenador: "Carla Santos",
    regiao: "Sul",
    municipio: "São José",
    escolasVinculadas: 6,
    casosAtivos: 38,
    casosPendentes: 15,
    tempoMedioResposta: 1.5,
  },
  {
    id: "3",
    nome: "Conselho Tutelar Leste",
    endereco: "Rua da Proteção, 789",
    telefone: "(48) 3222-3333",
    coordenador: "Paulo Oliveira",
    regiao: "Leste",
    municipio: "Palhoça",
    escolasVinculadas: 5,
    casosAtivos: 52,
    casosPendentes: 8,
    tempoMedioResposta: 3.7,
  },
  {
    id: "4",
    nome: "Conselho Tutelar Oeste",
    endereco: "Av. da Criança, 321",
    telefone: "(48) 3222-4444",
    coordenador: "Mariana Costa",
    regiao: "Oeste",
    municipio: "Biguaçu",
    escolasVinculadas: 4,
    casosAtivos: 30,
    casosPendentes: 20,
    tempoMedioResposta: 2.1,
  },
  {
    id: "5",
    nome: "Conselho Tutelar Central",
    endereco: "Praça dos Direitos, 100",
    telefone: "(48) 3222-5555",
    coordenador: "Lucas Mendes",
    regiao: "Central",
    municipio: "Florianópolis",
    escolasVinculadas: 10,
    casosAtivos: 65,
    casosPendentes: 10,
    tempoMedioResposta: 4.2,
  },
]

export default function ConselhosPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleViewCouncil = (id: string) => {
    setIsLoading(true)
    router.push(`/conselhos/${id}`)
  }

  const handleViewReport = (id: string) => {
    setIsLoading(true)
    router.push(`/conselhos/${id}/relatorio`)
  }

  // Filtrar conselhos com base no termo de busca
  const conselhosFiltrados = mockConselhos.filter(
    (conselho) =>
      conselho.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conselho.municipio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conselho.regiao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <ProtectedRoute allowedRoles={["mp"]}>
      <MainLayout>
        {isLoading ? (
          <div className="flex items-center justify-center h-[70vh]">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Conselhos Tutelares</h1>
              <div className="w-1/3">
                <Input
                  placeholder="Buscar por nome, município ou região..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Conselhos Cadastrados</CardTitle>
                <CardDescription>Lista de todos os conselhos tutelares monitorados pelo sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Região</TableHead>
                      <TableHead>Município</TableHead>
                      <TableHead>Escolas Vinculadas</TableHead>
                      <TableHead>Casos Ativos</TableHead>
                      <TableHead>Casos Pendentes</TableHead>
                      <TableHead>Tempo Médio (dias)</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {conselhosFiltrados.map((conselho) => (
                      <TableRow key={conselho.id}>
                        <TableCell className="font-medium">{conselho.nome}</TableCell>
                        <TableCell>{conselho.regiao}</TableCell>
                        <TableCell>{conselho.municipio}</TableCell>
                        <TableCell>{conselho.escolasVinculadas}</TableCell>
                        <TableCell>{conselho.casosAtivos}</TableCell>
                        <TableCell>
                          {conselho.casosPendentes > 0 ? (
                            <div className="flex items-center">
                              <span className="mr-1">{conselho.casosPendentes}</span>
                              {conselho.casosPendentes > 10 && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                            </div>
                          ) : (
                            0
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              conselho.tempoMedioResposta > 3
                                ? "bg-red-100 text-red-800"
                                : conselho.tempoMedioResposta > 2
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {conselho.tempoMedioResposta}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewCouncil(conselho.id)}
                              title="Visualizar detalhes"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewReport(conselho.id)}
                              title="Ver relatório"
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {conselhosFiltrados.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">Nenhum conselho encontrado</div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </MainLayout>
    </ProtectedRoute>
  )
}
