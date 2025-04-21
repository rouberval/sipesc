"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  type Permission,
  type PermissionModule,
  moduleLabels,
  actionLabels,
  defaultPermissionsByRole,
} from "@/types/permissions"
import { Save } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface RolePermissionsEditorProps {
  onUpdateRolePermissions: (role: string, permissions: Permission[]) => void
}

export function RolePermissionsEditor({ onUpdateRolePermissions }: RolePermissionsEditorProps) {
  const [activeRole, setActiveRole] = useState<string>("escola")
  const [activeModule, setActiveModule] = useState<PermissionModule>("alunos")
  const [editedPermissions, setEditedPermissions] = useState<Record<string, Permission[]>>({
    escola: [...defaultPermissionsByRole.escola],
    conselheiro: [...defaultPermissionsByRole.conselheiro],
    mp: [...defaultPermissionsByRole.mp],
    professor: [...defaultPermissionsByRole.professor],
  })
  // Adicionar após a definição de editedPermissions
  console.log("Módulos disponíveis para perfis:", Object.keys(moduleLabels))
  console.log("Ações disponíveis para perfis:", Object.keys(actionLabels))
  const [hasChanges, setHasChanges] = useState<Record<string, boolean>>({
    escola: false,
    conselheiro: false,
    mp: false,
    professor: false,
  })
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)

  // Verificar se o perfil tem uma permissão específica
  const hasPermission = (role: string, module: PermissionModule, action: string) => {
    return editedPermissions[role]?.some((p) => p.module === module && p.action === action) || false
  }

  // Alternar uma permissão específica
  const togglePermission = (role: string, module: PermissionModule, action: string) => {
    const newPermissions = [...(editedPermissions[role] || [])]
    const existingIndex = newPermissions.findIndex((p) => p.module === module && p.action === action)

    if (existingIndex >= 0) {
      // Remover permissão existente
      newPermissions.splice(existingIndex, 1)
    } else {
      // Adicionar nova permissão
      newPermissions.push({ module, action: action as any })
    }

    setEditedPermissions((prev) => ({
      ...prev,
      [role]: newPermissions,
    }))

    setHasChanges((prev) => ({
      ...prev,
      [role]: true,
    }))
  }

  // Alternar todas as permissões para um módulo
  const toggleAllPermissionsForModule = (role: string, module: PermissionModule, enabled: boolean) => {
    let newPermissions = [...(editedPermissions[role] || [])]

    // Remover todas as permissões existentes para este módulo
    newPermissions = newPermissions.filter((p) => p.module !== module)

    // Se estiver habilitando, adicionar todas as permissões para este módulo
    if (enabled) {
      Object.keys(actionLabels).forEach((action) => {
        newPermissions.push({ module, action: action as any })
      })
    }

    setEditedPermissions((prev) => ({
      ...prev,
      [role]: newPermissions,
    }))

    setHasChanges((prev) => ({
      ...prev,
      [role]: true,
    }))
  }

  // Salvar alterações para o perfil atual
  const saveChanges = (role: string) => {
    onUpdateRolePermissions(role, editedPermissions[role])
    setHasChanges((prev) => ({
      ...prev,
      [role]: false,
    }))
  }

  // Mapeamento de nomes amigáveis para os perfis
  const roleLabels: Record<string, string> = {
    escola: "Escola",
    conselheiro: "Conselheiro Tutelar",
    mp: "Ministério Público",
    professor: "Professor",
    admin: "Administrador",
  }

  // Lista de perfis que podem ser editados (admin não está incluído pois tem todas as permissões por padrão)
  const editableRoles = ["escola", "conselheiro", "mp", "professor"]

  // Calcular estatísticas de permissões para o perfil atual
  const getPermissionStats = (role: string) => {
    const permissions = editedPermissions[role] || []
    return {
      total: permissions.length,
      byModule: Object.entries(moduleLabels).map(([module, label]) => ({
        module,
        label,
        count: permissions.filter((p) => p.module === module).length,
        total: Object.keys(actionLabels).length,
      })),
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeRole} onValueChange={setActiveRole}>
        <TabsList className="mb-4">
          {editableRoles.map((role) => (
            <TabsTrigger key={role} value={role}>
              {roleLabels[role]}
            </TabsTrigger>
          ))}
        </TabsList>

        {editableRoles.map((role) => {
          const permissionStats = getPermissionStats(role)

          return (
            <TabsContent key={role} value={role}>
              <Card className="h-[500px] flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Permissões do Perfil: {roleLabels[role]}</CardTitle>
                    <div className="text-sm text-muted-foreground mt-1">
                      Total de permissões: <Badge variant="secondary">{permissionStats.total}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Opções avançadas</span>
                      <Switch checked={showAdvancedOptions} onCheckedChange={setShowAdvancedOptions} />
                    </div>
                    <Button onClick={() => saveChanges(role)} disabled={!hasChanges[role]}>
                      <Save className="mr-2 h-4 w-4" /> Salvar
                    </Button>
                  </div>
                </CardHeader>

                {/* Barra horizontal */}
                <Separator className="mx-6" />

                {/* Barra horizontal adicional com informações */}
                <div className="px-6 py-2 flex items-center justify-between bg-muted/30">
                  <div className="text-sm font-medium">
                    Gerenciando permissões para: <span className="text-primary">{roleLabels[role]}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">Permitido</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-xs">Negado</span>
                    </div>
                  </div>
                </div>

                <CardContent className="flex-1 overflow-hidden p-0">
                  <div className="flex h-full">
                    {/* Coluna da esquerda - Lista de módulos */}
                    <div className="w-1/4 border-r">
                      <div className="p-4">
                        <h3 className="text-sm font-medium mb-2">Módulos</h3>
                      </div>
                      <ScrollArea className="h-[calc(100%-3rem)]">
                        <div className="space-y-1 p-2">
                          {Object.entries(moduleLabels).map(([module, label]) => {
                            return (
                              <button
                                key={module}
                                onClick={() => setActiveModule(module as PermissionModule)}
                                className={cn(
                                  "w-full flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors",
                                  activeModule === module ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                                )}
                              >
                                <span>{label}</span>
                                {permissionStats.byModule.find((s) => s.module === module) && (
                                  <Badge variant={activeModule === module ? "outline" : "secondary"} className="ml-2">
                                    {permissionStats.byModule.find((s) => s.module === module)?.count || 0}/
                                    {permissionStats.byModule.find((s) => s.module === module)?.total || 0}
                                  </Badge>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Barra vertical */}
                    <Separator orientation="vertical" className="mx-1" />

                    {/* Coluna da direita - Permissões do módulo selecionado */}
                    <div className="flex-1">
                      <ScrollArea className="h-full">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium">Permissões para {moduleLabels[activeModule]}</h3>
                            {showAdvancedOptions && (
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleAllPermissionsForModule(role, activeModule, true)}
                                >
                                  Selecionar Tudo
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleAllPermissionsForModule(role, activeModule, false)}
                                >
                                  Desmarcar Tudo
                                </Button>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(actionLabels).map(([action, actionLabel]) => (
                              <div key={action} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${role}-${activeModule}-${action}`}
                                  checked={hasPermission(role, activeModule, action)}
                                  onCheckedChange={() => togglePermission(role, activeModule, action)}
                                />
                                <label
                                  htmlFor={`${role}-${activeModule}-${action}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {actionLabel}
                                </label>
                              </div>
                            ))}
                          </div>

                          {showAdvancedOptions && (
                            <div className="mt-6 border-t pt-4">
                              <h4 className="text-sm font-medium mb-2">
                                Configurações avançadas para {moduleLabels[activeModule]}
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between rounded-lg border p-3">
                                  <div className="space-y-0.5">
                                    <label className="text-sm font-medium">Acesso somente leitura</label>
                                    <p className="text-xs text-muted-foreground">
                                      Permitir apenas visualização, sem edição
                                    </p>
                                  </div>
                                  <Switch
                                    checked={
                                      hasPermission(role, activeModule, "view") &&
                                      !hasPermission(role, activeModule, "create") &&
                                      !hasPermission(role, activeModule, "edit") &&
                                      !hasPermission(role, activeModule, "delete")
                                    }
                                    onCheckedChange={(checked) => {
                                      const newPermissions = [...(editedPermissions[role] || [])].filter(
                                        (p) => p.module !== activeModule,
                                      )
                                      if (checked) {
                                        newPermissions.push({
                                          module: activeModule,
                                          action: "view" as any,
                                        })
                                      }
                                      setEditedPermissions((prev) => ({
                                        ...prev,
                                        [role]: newPermissions,
                                      }))
                                      setHasChanges((prev) => ({
                                        ...prev,
                                        [role]: true,
                                      }))
                                    }}
                                  />
                                </div>

                                <div className="flex items-center justify-between rounded-lg border p-3">
                                  <div className="space-y-0.5">
                                    <label className="text-sm font-medium">Acesso completo</label>
                                    <p className="text-xs text-muted-foreground">
                                      Permitir todas as operações neste módulo
                                    </p>
                                  </div>
                                  <Switch
                                    checked={Object.keys(actionLabels).every((action) =>
                                      hasPermission(role, activeModule, action),
                                    )}
                                    onCheckedChange={(checked) => {
                                      toggleAllPermissionsForModule(role, activeModule, checked)
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
