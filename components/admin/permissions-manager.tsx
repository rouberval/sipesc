"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPermissionsList } from "./user-permissions-list"
import { RolePermissionsEditor } from "./role-permissions-editor"
import { UserPermissionsEditor } from "./user-permissions-editor"
import { PermissionBulkActions } from "./permission-bulk-actions"
import { PermissionAuditLog } from "./permission-audit-log"
import { defaultPermissionsByRole, type UserPermissions } from "@/types/permissions"
import { Button } from "@/components/ui/button"
import { Download, Upload, RefreshCw, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Dados simulados de usuários com permissões
const mockUserPermissions: UserPermissions[] = [
  {
    userId: "1",
    permissions: defaultPermissionsByRole.escola,
  },
  {
    userId: "2",
    permissions: defaultPermissionsByRole.conselheiro,
  },
  {
    userId: "3",
    permissions: defaultPermissionsByRole.mp,
  },
  {
    userId: "4",
    permissions: defaultPermissionsByRole.admin,
  },
  {
    userId: "5",
    permissions: defaultPermissionsByRole.professor,
  },
]

// Dados simulados de usuários
const mockUsers = [
  {
    id: "1",
    name: "Escola Municipal",
    email: "escola@sipesc.com",
    role: "escola",
    escolaId: "1",
  },
  {
    id: "2",
    name: "Conselheiro Tutelar",
    email: "conselho@sipesc.com",
    role: "conselheiro",
    conselhoId: "1",
  },
  {
    id: "3",
    name: "Ministério Público",
    email: "mp@sipesc.com",
    role: "mp",
  },
  {
    id: "4",
    name: "Administrador",
    email: "admin@sipesc.com",
    role: "admin",
  },
  {
    id: "5",
    name: "Professor Silva",
    email: "professor@sipesc.com",
    role: "professor",
    escolaId: "1",
  },
]

console.log("Permissões padrão por perfil:", defaultPermissionsByRole)

export function PermissionsManager() {
  const [activeTab, setActiveTab] = useState("usuarios")
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [userPermissions, setUserPermissions] = useState<UserPermissions[]>(mockUserPermissions)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Encontrar o usuário selecionado
  const selectedUser = selectedUserId ? mockUsers.find((user) => user.id === selectedUserId) : null

  // Encontrar as permissões do usuário selecionado
  const selectedUserPermissions = selectedUserId
    ? userPermissions.find((up) => up.userId === selectedUserId)?.permissions || []
    : []

  // Função para atualizar as permissões de um usuário
  const updateUserPermissionsHandler = (userId: string, newPermissions: UserPermissions["permissions"]) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Atualizando permissões para usuário:", userId)
      console.log("Novas permissões:", newPermissions)

      setUserPermissions((prev) =>
        prev.map((up) => (up.userId === userId ? { ...up, permissions: [...newPermissions] } : up)),
      )

      // Registrar a alteração no log de auditoria (simulado)
      const user = mockUsers.find((u) => u.id === userId)
      const timestamp = new Date().toISOString()
      console.log(`[${timestamp}] Permissões atualizadas para ${user?.name} (${user?.email})`)
      console.log("Permissões atualizadas:", newPermissions)

      // Disparar evento para notificar outros componentes
      window.dispatchEvent(new Event("permissionsUpdated"))

      toast({
        title: "Permissões atualizadas",
        description: "As permissões do usuário foram atualizadas com sucesso.",
      })
    } catch (err) {
      console.error("Erro ao atualizar permissões:", err)
      setError("Ocorreu um erro ao atualizar as permissões. Por favor, tente novamente.")

      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar as permissões.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Função para atualizar as permissões de um perfil
  const updateRolePermissions = (role: string, newPermissions: UserPermissions["permissions"]) => {
    setIsLoading(true)
    setError(null)

    try {
      // Atualiza as permissões padrão do perfil
      defaultPermissionsByRole[role] = [...newPermissions]

      // Atualiza todos os usuários com esse perfil que não têm permissões personalizadas
      setUserPermissions((prev) =>
        prev.map((up) => {
          const user = mockUsers.find((u) => u.id === up.userId)
          if (user && user.role === role) {
            return { ...up, permissions: [...newPermissions] }
          }
          return up
        }),
      )

      // Registrar a alteração no log de auditoria (simulado)
      const timestamp = new Date().toISOString()
      console.log(`[${timestamp}] Permissões padrão atualizadas para o perfil ${role}`)

      // Disparar evento para notificar outros componentes
      window.dispatchEvent(new Event("permissionsUpdated"))

      toast({
        title: "Permissões do perfil atualizadas",
        description: `As permissões padrão do perfil ${role} foram atualizadas com sucesso.`,
      })
    } catch (err) {
      console.error("Erro ao atualizar permissões do perfil:", err)
      setError("Ocorreu um erro ao atualizar as permissões do perfil. Por favor, tente novamente.")

      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar as permissões do perfil.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Função para exportar todas as configurações de permissões
  const exportPermissions = () => {
    try {
      const data = {
        userPermissions,
        defaultPermissionsByRole,
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `sipesc-permissions-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Exportação concluída",
        description: "As configurações de permissões foram exportadas com sucesso.",
      })
    } catch (err) {
      console.error("Erro ao exportar permissões:", err)
      setError("Ocorreu um erro ao exportar as permissões. Por favor, tente novamente.")

      toast({
        title: "Erro",
        description: "Ocorreu um erro ao exportar as permissões.",
        variant: "destructive",
      })
    }
  }

  // Função para importar configurações de permissões
  const importPermissions = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "application/json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string)
            if (data.userPermissions && data.defaultPermissionsByRole) {
              setUserPermissions(data.userPermissions)
              Object.keys(data.defaultPermissionsByRole).forEach((role) => {
                defaultPermissionsByRole[role] = data.defaultPermissionsByRole[role]
              })

              // Disparar evento para notificar outros componentes
              window.dispatchEvent(new Event("permissionsUpdated"))

              toast({
                title: "Importação concluída",
                description: "As configurações de permissões foram importadas com sucesso.",
              })
            } else {
              throw new Error("Formato de arquivo inválido")
            }
          } catch (error) {
            setError("O arquivo selecionado não é válido.")

            toast({
              title: "Erro na importação",
              description: "O arquivo selecionado não é válido.",
              variant: "destructive",
            })
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  // Função para redefinir todas as permissões para os valores padrão
  const resetAllPermissions = () => {
    if (
      confirm(
        "Tem certeza que deseja redefinir todas as permissões para os valores padrão? Esta ação não pode ser desfeita.",
      )
    ) {
      try {
        // Recriar as permissões padrão para cada usuário com base em seu perfil
        const resetPermissions = mockUsers.map((user) => ({
          userId: user.id,
          permissions: [...(defaultPermissionsByRole[user.role] || [])],
        }))

        setUserPermissions(resetPermissions)

        // Disparar evento para notificar outros componentes
        window.dispatchEvent(new Event("permissionsUpdated"))

        toast({
          title: "Permissões redefinidas",
          description: "Todas as permissões foram redefinidas para os valores padrão.",
        })
      } catch (err) {
        console.error("Erro ao redefinir permissões:", err)
        setError("Ocorreu um erro ao redefinir as permissões. Por favor, tente novamente.")

        toast({
          title: "Erro",
          description: "Ocorreu um erro ao redefinir as permissões.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gerenciamento de Permissões</CardTitle>
            <CardDescription>Configure as permissões de acesso dos usuários e perfis no sistema.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportPermissions} disabled={isLoading}>
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
            <Button variant="outline" size="sm" onClick={importPermissions} disabled={isLoading}>
              <Upload className="mr-2 h-4 w-4" /> Importar
            </Button>
            <Button variant="outline" size="sm" onClick={resetAllPermissions} disabled={isLoading}>
              <RefreshCw className="mr-2 h-4 w-4" /> Redefinir
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="usuarios">Por Usuário</TabsTrigger>
              <TabsTrigger value="perfis">Por Perfil</TabsTrigger>
              <TabsTrigger value="acoes">Ações em Massa</TabsTrigger>
              <TabsTrigger value="auditoria">Log de Auditoria</TabsTrigger>
            </TabsList>

            <TabsContent value="usuarios" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <UserPermissionsList
                    users={mockUsers}
                    selectedUserId={selectedUserId}
                    onSelectUser={setSelectedUserId}
                  />
                </div>
                <div className="md:col-span-2">
                  {selectedUser ? (
                    <UserPermissionsEditor
                      user={selectedUser}
                      permissions={selectedUserPermissions}
                      onUpdatePermissions={(permissions) => updateUserPermissionsHandler(selectedUser.id, permissions)}
                    />
                  ) : (
                    <Card className="p-6 text-center text-muted-foreground">
                      Selecione um usuário para gerenciar suas permissões.
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="perfis">
              <RolePermissionsEditor onUpdateRolePermissions={updateRolePermissions} />
            </TabsContent>

            <TabsContent value="acoes">
              <PermissionBulkActions
                users={mockUsers}
                userPermissions={userPermissions}
                onUpdatePermissions={setUserPermissions}
              />
            </TabsContent>

            <TabsContent value="auditoria">
              <PermissionAuditLog />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
