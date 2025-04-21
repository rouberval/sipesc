"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download } from "lucide-react"

// Tipo para os registros de auditoria
interface AuditLogEntry {
  id: string
  timestamp: string
  userId: string
  userName: string
  userEmail: string
  action: "add" | "remove" | "update" | "reset"
  details: string
}

// Dados simulados para o log de auditoria
const mockAuditLog: AuditLogEntry[] = [
  {
    id: "1",
    timestamp: "2023-06-15T14:30:00Z",
    userId: "4",
    userName: "Administrador",
    userEmail: "admin@sipesc.com",
    action: "add",
    details: "Adicionada permissão 'Visualizar Alunos' para o usuário 'Escola Municipal'",
  },
  {
    id: "2",
    timestamp: "2023-06-15T14:35:00Z",
    userId: "4",
    userName: "Administrador",
    userEmail: "admin@sipesc.com",
    action: "remove",
    details: "Removida permissão 'Excluir Ocorrências' do usuário 'Professor Silva'",
  },
  {
    id: "3",
    timestamp: "2023-06-16T09:20:00Z",
    userId: "4",
    userName: "Administrador",
    userEmail: "admin@sipesc.com",
    action: "update",
    details: "Atualizadas permissões padrão para o perfil 'Conselheiro Tutelar'",
  },
  {
    id: "4",
    timestamp: "2023-06-16T10:45:00Z",
    userId: "4",
    userName: "Administrador",
    userEmail: "admin@sipesc.com",
    action: "reset",
    details: "Redefinidas todas as permissões para o usuário 'Ministério Público'",
  },
  {
    id: "5",
    timestamp: "2023-06-17T08:15:00Z",
    userId: "4",
    userName: "Administrador",
    userEmail: "admin@sipesc.com",
    action: "add",
    details: "Adicionadas múltiplas permissões para 3 usuários",
  },
]

export function PermissionAuditLog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  // Filtrar os registros de auditoria
  const filteredLogs = mockAuditLog.filter((log) => {
    // Filtro por termo de pesquisa
    const matchesSearch =
      searchTerm === "" ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro por tipo de ação
    const matchesAction = actionFilter === "" || log.action === actionFilter

    // Filtro por data
    const logDate = new Date(log.timestamp)
    const matchesStartDate = startDate === "" || new Date(startDate) <= logDate
    const matchesEndDate = endDate === "" || new Date(endDate) >= logDate

    return matchesSearch && matchesAction && matchesStartDate && matchesEndDate
  })

  // Formatar data e hora
  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Obter a cor do badge com base no tipo de ação
  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case "add":
        return "success"
      case "remove":
        return "destructive"
      case "update":
        return "warning"
      case "reset":
        return "default"
      default:
        return "secondary"
    }
  }

  // Obter o texto do badge com base no tipo de ação
  const getActionText = (action: string) => {
    switch (action) {
      case "add":
        return "Adição"
      case "remove":
        return "Remoção"
      case "update":
        return "Atualização"
      case "reset":
        return "Redefinição"
      default:
        return action
    }
  }

  // Exportar logs para CSV
  const exportToCSV = () => {
    const headers = ["Data/Hora", "Usuário", "Email", "Ação", "Detalhes"]
    const rows = filteredLogs.map((log) => [
      formatDateTime(log.timestamp),
      log.userName,
      log.userEmail,
      getActionText(log.action),
      log.details,
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `log-permissoes-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Log de Auditoria de Permissões</CardTitle>
            <CardDescription>Histórico de alterações nas permissões do sistema</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" /> Exportar CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por usuário ou detalhes..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="w-full md:w-40">
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as ações" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as ações</SelectItem>
                    <SelectItem value="add">Adição</SelectItem>
                    <SelectItem value="remove">Remoção</SelectItem>
                    <SelectItem value="update">Atualização</SelectItem>
                    <SelectItem value="reset">Redefinição</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-40">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Data inicial"
                />
              </div>
              <div className="w-full md:w-40">
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="Data final"
                />
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead className="w-[40%]">Detalhes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{formatDateTime(log.timestamp)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{log.userName}</div>
                          <div className="text-sm text-muted-foreground">{log.userEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getActionBadgeVariant(log.action)}>{getActionText(log.action)}</Badge>
                      </TableCell>
                      <TableCell>{log.details}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Nenhum registro encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
