"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, UserPlus, Edit, Trash, Lock, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { UsuarioAdminForm } from "./usuario-admin-form"
import { UsuarioAdminDetails } from "./usuario-admin-details"

// Tipos para os usuários
type UserRole = "escola" | "conselheiro" | "mp" | "admin" | "professor"

type User = {
  id: string
  name: string
  email: string
  role: UserRole
  status: "ativo" | "inativo"
  lastLogin?: string
  createdAt: string
  escolaId?: string
  conselhoId?: string
}

// Dados de exemplo
const mockUsers: User[] = [
  {
    id: "1",
    name: "Escola Municipal",
    email: "escola@sipesc.com",
    role: "escola",
    status: "ativo",
    lastLogin: "2023-10-15T14:30:00",
    createdAt: "2023-01-10T09:00:00",
    escolaId: "1",
  },
  {
    id: "2",
    name: "Conselheiro Tutelar",
    email: "conselho@sipesc.com",
    role: "conselheiro",
    status: "ativo",
    lastLogin: "2023-10-14T10:15:00",
    createdAt: "2023-01-15T11:30:00",
    conselhoId: "1",
  },
  {
    id: "3",
    name: "Ministério Público",
    email: "mp@sipesc.com",
    role: "mp",
    status: "ativo",
    lastLogin: "2023-10-16T09:45:00",
    createdAt: "2023-01-05T08:20:00",
  },
  {
    id: "4",
    name: "Administrador",
    email: "admin@sipesc.com",
    role: "admin",
    status: "ativo",
    lastLogin: "2023-10-16T16:20:00",
    createdAt: "2022-12-01T10:00:00",
  },
  {
    id: "5",
    name: "Professor Silva",
    email: "professor@sipesc.com",
    role: "professor",
    status: "ativo",
    lastLogin: "2023-10-13T11:10:00",
    createdAt: "2023-02-20T13:45:00",
    escolaId: "1",
  },
  {
    id: "6",
    name: "Escola Estadual",
    email: "escola2@sipesc.com",
    role: "escola",
    status: "inativo",
    lastLogin: "2023-09-20T09:30:00",
    createdAt: "2023-03-05T14:20:00",
    escolaId: "2",
  },
  {
    id: "7",
    name: "Conselheiro Regional",
    email: "conselho2@sipesc.com",
    role: "conselheiro",
    status: "inativo",
    createdAt: "2023-04-10T10:15:00",
    conselhoId: "2",
  },
]

// Função para formatar a data
function formatDate(dateString?: string) {
  if (!dateString) return "Nunca"

  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

// Função para traduzir o papel do usuário
function translateRole(role: UserRole) {
  const roleMap: Record<UserRole, string> = {
    escola: "Escola",
    conselheiro: "Conselheiro Tutelar",
    mp: "Ministério Público",
    admin: "Administrador",
    professor: "Professor",
  }
  return roleMap[role] || role
}

interface UsuariosAdminListProps {
  filter?: "todos" | "ativos" | "inativos"
}

export function UsuariosAdminList({ filter = "todos" }: UsuariosAdminListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("todos")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Filtrar usuários com base nos critérios
  const filteredUsers = mockUsers.filter((user) => {
    // Filtro de status
    if (filter === "ativos" && user.status !== "ativo") return false
    if (filter === "inativos" && user.status !== "inativo") return false

    // Filtro de busca
    const searchLower = searchTerm.toLowerCase()
    const nameMatch = user.name.toLowerCase().includes(searchLower)
    const emailMatch = user.email.toLowerCase().includes(searchLower)
    const searchMatch = nameMatch || emailMatch

    // Filtro de papel
    const roleMatch = roleFilter === "todos" || user.role === roleFilter

    return searchMatch && roleMatch
  })

  // Manipuladores de eventos
  const handleAddUser = () => {
    setSelectedUser(null)
    setIsFormOpen(true)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsFormOpen(true)
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setIsDetailsOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex space-x-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por papel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os papéis</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="escola">Escola</SelectItem>
              <SelectItem value="professor">Professor</SelectItem>
              <SelectItem value="conselheiro">Conselheiro</SelectItem>
              <SelectItem value="mp">Ministério Público</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddUser}>
            <UserPlus className="h-4 w-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Papel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último Acesso</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{translateRole(user.role)}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "ativo" ? "success" : "destructive"}>
                      {user.status === "ativo" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.lastLogin)}</TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewUser(user)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Lock className="h-4 w-4 mr-2" />
                          Permissões
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal de formulário de usuário */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedUser ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
          </DialogHeader>
          <UsuarioAdminForm user={selectedUser} onSuccess={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Modal de detalhes do usuário */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Usuário</DialogTitle>
          </DialogHeader>
          {selectedUser && <UsuarioAdminDetails user={selectedUser} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
