"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import { UsuarioDetails } from "./usuario-details"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMobile } from "@/hooks/use-mobile"

// Mock data for users
const mockUsuarios = [
  {
    id: 1,
    name: "Maria Santos",
    email: "maria.santos@escola.com",
    role: "gestor",
    school: "Escola Municipal João da Silva",
    status: "ativo",
  },
  {
    id: 2,
    name: "João Pereira",
    email: "joao.pereira@escola.com",
    role: "secretaria",
    school: "Escola Municipal João da Silva",
    status: "ativo",
  },
  {
    id: 3,
    name: "Ana Oliveira",
    email: "ana.oliveira@escola.com",
    role: "professor",
    school: "Escola Municipal João da Silva",
    status: "ativo",
  },
  {
    id: 4,
    name: "Carlos Silva",
    email: "carlos.silva@escola.com",
    role: "professor",
    school: "Escola Estadual Maria Oliveira",
    status: "inativo",
  },
  {
    id: 5,
    name: "Fernanda Lima",
    email: "fernanda.lima@escola.com",
    role: "secretaria",
    school: "Escola Estadual Maria Oliveira",
    status: "ativo",
  },
  {
    id: 6,
    name: "Roberto Alves",
    email: "roberto.alves@escola.com",
    role: "gestor",
    school: "Colégio Pedro Alves",
    status: "ativo",
  },
]

interface UsuariosListProps {
  onEdit?: (userId: number) => void
}

export function UsuariosList({ onEdit }: UsuariosListProps) {
  const [selectedUsuario, setSelectedUsuario] = useState<any | null>(null)
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("todos")
  const [statusFilter, setStatusFilter] = useState<string>("todos")
  const isMobile = useMobile()

  const handleDelete = (id: number) => {
    // In a real app, this would be an API call
    console.log("Deletando usuário:", id)

    toast({
      title: "Usuário excluído",
      description: "O usuário foi excluído com sucesso",
    })
  }

  // Filtrar usuários com base nos critérios
  const filteredUsuarios = mockUsuarios.filter((usuario) => {
    const matchesSearch =
      usuario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "todos" || usuario.role === roleFilter
    const matchesStatus = statusFilter === "todos" || usuario.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // Renderização responsiva para dispositivos móveis
  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="space-y-4">
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por papel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os papéis</SelectItem>
                <SelectItem value="gestor">Gestor</SelectItem>
                <SelectItem value="secretaria">Secretaria</SelectItem>
                <SelectItem value="professor">Professor</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredUsuarios.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">Nenhum usuário encontrado.</Card>
        ) : (
          filteredUsuarios.map((usuario) => (
            <Card key={usuario.id} className="p-4">
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{usuario.name}</h3>
                  <Badge variant={usuario.status === "ativo" ? "success" : "secondary"} className="capitalize">
                    {usuario.status}
                  </Badge>
                </div>
                <p className="text-sm">{usuario.email}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="capitalize">
                    {usuario.role}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{usuario.school}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => setSelectedUsuario(usuario)}>
                    <Eye className="h-4 w-4 mr-2" /> Detalhes
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => onEdit && onEdit(usuario.id)}>
                    <Pencil className="h-4 w-4 mr-2" /> Editar
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleDelete(usuario.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Excluir
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}

        {selectedUsuario && <UsuarioDetails usuario={selectedUsuario} onClose={() => setSelectedUsuario(null)} />}
      </div>
    )
  }

  // Renderização para desktop
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por papel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os papéis</SelectItem>
              <SelectItem value="gestor">Gestor</SelectItem>
              <SelectItem value="secretaria">Secretaria</SelectItem>
              <SelectItem value="professor">Professor</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Papel</TableHead>
            <TableHead>Escola</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsuarios.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell className="font-medium">{usuario.name}</TableCell>
              <TableCell>{usuario.email}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {usuario.role}
                </Badge>
              </TableCell>
              <TableCell>{usuario.school}</TableCell>
              <TableCell>
                <Badge variant={usuario.status === "ativo" ? "success" : "secondary"} className="capitalize">
                  {usuario.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedUsuario(usuario)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit && onEdit(usuario.id)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(usuario.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredUsuarios.length === 0 && (
        <Card className="p-6 text-center text-muted-foreground mt-4">Nenhum usuário encontrado.</Card>
      )}

      {selectedUsuario && <UsuarioDetails usuario={selectedUsuario} onClose={() => setSelectedUsuario(null)} />}
    </div>
  )
}
