"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  type Permission,
  type PermissionModule,
  type PermissionAction,
  moduleLabels,
  actionLabels,
} from "@/types/permissions"
import { UserPlus, UserMinus } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface UserPermissions {
  userId: string
  permissions: Permission[]
}

interface PermissionBulkActionsProps {
  users: User[]
  userPermissions: UserPermissions[]
  onUpdatePermissions: (permissions: UserPermissions[]) => void
}

export function PermissionBulkActions({ users, userPermissions, onUpdatePermissions }: PermissionBulkActionsProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedModule, setSelectedModule] = useState<PermissionModule | "">("")
  const [selectedAction, setSelectedAction] = useState<PermissionAction | "">("")
  const [selectedRole, setSelectedRole] = useState<string | "">("")
  const { toast } = useToast()

  // Filtrar usuários por perfil
  const filteredUsers = selectedRole ? users.filter((user) => user.role === selectedRole) : users

  // Selecionar/deselecionar todos os usuários
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  // Alternar seleção de um usuário
  const toggleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, userId])
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId))
    }
  }

  // Adicionar permissão para os usuários selecionados
  const addPermissionToSelected = () => {
    if (!selectedModule || !selectedAction || selectedUsers.length === 0) {
      toast({
        title: "Informações incompletas",
        description: "Selecione um módulo, uma ação e pelo menos um usuário.",
        variant: "destructive",
      })
      return
    }

    const updatedPermissions = [...userPermissions]

    selectedUsers.forEach((userId) => {
      const userIndex = updatedPermissions.findIndex((up) => up.userId === userId)
      if (userIndex >= 0) {
        // Verificar se a permissão já existe
        const permissionExists = updatedPermissions[userIndex].permissions.some(
          (p) => p.module === selectedModule && p.action === selectedAction,
        )

        if (!permissionExists) {
          updatedPermissions[userIndex] = {
            ...updatedPermissions[userIndex],
            permissions: [
              ...updatedPermissions[userIndex].permissions,
              { module: selectedModule, action: selectedAction },
            ],
          }
        }
      }
    })

    onUpdatePermissions(updatedPermissions)

    toast({
      title: "Permissão adicionada",
      description: `A permissão ${actionLabels[selectedAction]} ${moduleLabels[selectedModule]} foi adicionada para ${selectedUsers.length} usuário(s).`,
    })
  }

  // Remover permissão dos usuários selecionados
  const removePermissionFromSelected = () => {
    if (!selectedModule || !selectedAction || selectedUsers.length === 0) {
      toast({
        title: "Informações incompletas",
        description: "Selecione um módulo, uma ação e pelo menos um usuário.",
        variant: "destructive",
      })
      return
    }

    const updatedPermissions = [...userPermissions]

    selectedUsers.forEach((userId) => {
      const userIndex = updatedPermissions.findIndex((up) => up.userId === userId)
      if (userIndex >= 0) {
        updatedPermissions[userIndex] = {
          ...updatedPermissions[userIndex],
          permissions: updatedPermissions[userIndex].permissions.filter(
            (p) => !(p.module === selectedModule && p.action === selectedAction),
          ),
        }
      }
    })

    onUpdatePermissions(updatedPermissions)

    toast({
      title: "Permissão removida",
      description: `A permissão ${actionLabels[selectedAction]} ${moduleLabels[selectedModule]} foi removida de ${selectedUsers.length} usuário(s).`,
    })
  }

  // Formatar o nome do papel do usuário
  const formatRole = (role: string): string => {
    const roleMap: Record<string, string> = {
      escola: "Escola",
      conselheiro: "Conselheiro Tutelar",
      mp: "Ministério Público",
      admin: "Administrador",
      professor: "Professor",
    }

    return roleMap[role] || role
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Selecione os critérios para aplicar as permissões</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role-filter">Filtrar por perfil</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger id="role-filter">
                <SelectValue placeholder="Todos os perfis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os perfis</SelectItem>
                <SelectItem value="escola">Escola</SelectItem>
                <SelectItem value="conselheiro">Conselheiro Tutelar</SelectItem>
                <SelectItem value="mp">Ministério Público</SelectItem>
                <SelectItem value="professor">Professor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="module-select">Módulo</Label>
            <Select value={selectedModule} onValueChange={(value) => setSelectedModule(value as PermissionModule)}>
              <SelectTrigger id="module-select">
                <SelectValue placeholder="Selecione um módulo" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(moduleLabels).map(([module, label]) => (
                  <SelectItem key={module} value={module}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="action-select">Ação</Label>
            <Select value={selectedAction} onValueChange={(value) => setSelectedAction(value as PermissionAction)}>
              <SelectTrigger id="action-select">
                <SelectValue placeholder="Selecione uma ação" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(actionLabels).map(([action, label]) => (
                  <SelectItem key={action} value={action}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 space-y-2">
            <Button
              onClick={addPermissionToSelected}
              disabled={!selectedModule || !selectedAction || selectedUsers.length === 0}
              className="w-full"
            >
              <UserPlus className="mr-2 h-4 w-4" /> Adicionar Permissão
            </Button>
            <Button
              onClick={removePermissionFromSelected}
              disabled={!selectedModule || !selectedAction || selectedUsers.length === 0}
              variant="outline"
              className="w-full"
            >
              <UserMinus className="mr-2 h-4 w-4" /> Remover Permissão
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Usuários</CardTitle>
              <CardDescription>Selecione os usuários para aplicar as alterações</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={selectedUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                onCheckedChange={toggleSelectAll}
              />
              <Label htmlFor="select-all">Selecionar todos</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`user-${user.id}`}
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={(checked) => toggleSelectUser(user.id, !!checked)}
                      />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{formatRole(user.role)}</Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  Nenhum usuário encontrado com os filtros selecionados.
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedUsers.length} de {filteredUsers.length} usuários selecionados
            </div>
            {selectedUsers.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedUsers([])}>
                Limpar seleção
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
