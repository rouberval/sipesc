"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Plus, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for messages
const mockMensagens = [
  {
    id: "1",
    remetente: "Escola Municipal João da Silva",
    remetenteId: "1",
    destinatario: "Conselho Tutelar Norte",
    destinatarioId: "1",
    assunto: "Aluno com faltas consecutivas",
    data: "2023-04-10T10:30:00",
    lida: true,
    tipo: "escola-para-conselho",
  },
  {
    id: "2",
    remetente: "Conselho Tutelar Norte",
    remetenteId: "1",
    destinatario: "Escola Municipal João da Silva",
    destinatarioId: "1",
    assunto: "Resposta: Aluno com faltas consecutivas",
    data: "2023-04-11T14:15:00",
    lida: false,
    tipo: "conselho-para-escola",
  },
  {
    id: "3",
    remetente: "Escola Estadual Maria Oliveira",
    remetenteId: "2",
    destinatario: "Conselho Tutelar Norte",
    destinatarioId: "1",
    assunto: "Suspeita de maus-tratos",
    data: "2023-04-12T09:45:00",
    lida: false,
    tipo: "escola-para-conselho",
  },
  {
    id: "4",
    remetente: "Escola Municipal João da Silva",
    remetenteId: "1",
    destinatario: "Conselho Tutelar Norte",
    destinatarioId: "1",
    assunto: "Solicitação de intervenção",
    data: "2023-04-15T11:20:00",
    lida: true,
    tipo: "escola-para-conselho",
  },
  {
    id: "5",
    remetente: "Conselho Tutelar Norte",
    remetenteId: "1",
    destinatario: "Escola Municipal João da Silva",
    destinatarioId: "1",
    assunto: "Agendamento de visita",
    data: "2023-04-16T09:00:00",
    lida: false,
    tipo: "conselho-para-escola",
  },
]

export default function MensagensPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todas")

  // Filtrar mensagens com base no perfil do usuário
  const mensagensFiltradas = mockMensagens
    .filter((msg) => {
      if (user?.role === "escola" && user.escolaId) {
        // Usuário escolar vê apenas mensagens relacionadas à sua escola
        return msg.remetenteId === user.escolaId || msg.destinatarioId === user.escolaId
      } else if (user?.role === "conselheiro" && user.conselhoId) {
        // Conselheiro vê apenas mensagens relacionadas ao seu conselho
        return msg.remetenteId === user.conselhoId || msg.destinatarioId === user.conselhoId
      }
      // Admin vê todas as mensagens
      return user?.role === "admin"
    })
    .filter((msg) => {
      // Filtro de pesquisa
      if (!searchTerm) return true
      return (
        msg.assunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.remetente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.destinatario.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    .filter((msg) => {
      // Filtro de status
      if (statusFilter === "todas") return true
      if (statusFilter === "lidas") return msg.lida
      if (statusFilter === "nao-lidas") return !msg.lida
      return true
    })
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()) // Ordenar por data mais recente

  const handleViewMessage = (id: string) => {
    router.push(`/mensagens/${id}`)
  }

  const handleNewMessage = () => {
    router.push("/mensagens/nova")
  }

  return (
    <ProtectedRoute allowedRoles={["escola", "conselheiro", "admin"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Mensagens</h1>
            <Button onClick={handleNewMessage}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Mensagem
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Caixa de Mensagens</CardTitle>
              <CardDescription>Comunicação entre escolas e conselhos tutelares</CardDescription>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar mensagens..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as mensagens</SelectItem>
                    <SelectItem value="lidas">Mensagens lidas</SelectItem>
                    <SelectItem value="nao-lidas">Mensagens não lidas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Remetente</TableHead>
                    <TableHead>Destinatário</TableHead>
                    <TableHead>Assunto</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mensagensFiltradas.map((mensagem) => (
                    <TableRow key={mensagem.id} className={!mensagem.lida ? "bg-blue-50" : ""}>
                      <TableCell className="font-medium">{mensagem.remetente}</TableCell>
                      <TableCell>{mensagem.destinatario}</TableCell>
                      <TableCell>{mensagem.assunto}</TableCell>
                      <TableCell>{new Date(mensagem.data).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>
                        {mensagem.lida ? (
                          <Badge variant="outline">Lida</Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Nova</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleViewMessage(mensagem.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {mensagensFiltradas.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">Nenhuma mensagem encontrada</div>
              )}
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
