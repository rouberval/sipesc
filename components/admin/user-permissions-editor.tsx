"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  type Permission,
  type PermissionModule,
  moduleLabels,
  actionLabels,
  defaultPermissionsByRole,
} from "@/types/permissions"
import { AlertCircle, Save, Copy, Clock, Search, Filter } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface UserPermissionsEditorProps {
  user: User
  permissions: Permission[]
  onUpdatePermissions: (permissions: Permission[]) => void
}

export function UserPermissionsEditor({ user, permissions, onUpdatePermissions }: UserPermissionsEditorProps) {
  const [editedPermissions, setEditedPermissions] = useState<Permission[]>(permissions)
  const [activeModule, setActiveModule] = useState<PermissionModule>("alunos")
  const [hasChanges, setHasChanges] = useState(false)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterByStatus, setFilterByStatus] = useState<"all" | "granted" | "denied">("all")
  const { toast } = useToast()

  const [temporaryPermissions, setTemporaryPermissions] = useState<{
    active: boolean
    permissions: Permission[]
    expiresAt: string
  }>({
    active: false,
    permissions: [],
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 7 dias a partir de hoje
  })

  // Atualizar permissões editadas quando as permissões do usuário mudarem
  useEffect(() => {
    setEditedPermissions(permissions)
    setHasChanges(false)
  }, [permissions])

  // Verificar se o usuário tem uma permissão específica
  const hasPermission = (module: PermissionModule, action: string) => {
    return editedPermissions.some((p) => p.module === module && p.action === action)
  }

  // Alternar uma permissão específica
  const togglePermission = (module: PermissionModule, action: string) => {
    const newPermissions = [...editedPermissions]
    const existingIndex = newPermissions.findIndex((p) => p.module === module && p.action === action)

    if (existingIndex >= 0) {
      // Remover permissão existente
      newPermissions.splice(existingIndex, 1)
    } else {
      // Adicionar nova permissão
      newPermissions.push({ module, action: action as any })
    }

    setEditedPermissions(newPermissions)
    setHasChanges(true)
  }

  // Alternar todas as permissões para um módulo
  const toggleAllPermissionsForModule = (module: PermissionModule, enabled: boolean) => {
    let newPermissions = [...editedPermissions]

    // Remover todas as permissões existentes para este módulo
    newPermissions = newPermissions.filter((p) => p.module !== module)

    // Se estiver habilitando, adicionar todas as permissões para este módulo
    if (enabled) {
      Object.keys(actionLabels).forEach((action) => {
        newPermissions.push({ module, action: action as any })
      })
    }

    setEditedPermissions(newPermissions)
    setHasChanges(true)
  }

  // Restaurar permissões padrão do perfil
  const resetToRoleDefaults = () => {
    const defaultPerms = defaultPermissionsByRole[user.role] || []
    setEditedPermissions([...defaultPerms])
    setHasChanges(true)
  }

  // Salvar alterações
  const saveChanges = () => {
    onUpdatePermissions(editedPermissions)
    setHasChanges(false)

    toast({
      title: "Permissões atualizadas",
      description: `As permissões de ${user.name} foram atualizadas com sucesso.`,
    })
  }

  // Salvar permissões temporárias
  const saveTemporaryPermissions = () => {
    // Em um sistema real, você salvaria isso no banco de dados
    // e implementaria a lógica para expirar as permissões
    console.log("Permissões temporárias:", temporaryPermissions)
    setTemporaryPermissions({
      ...temporaryPermissions,
      active: true,
    })

    toast({
      title: "Permissões temporárias configuradas",
      description: `As permissões temporárias expirarão em ${temporaryPermissions.expiresAt}.`,
    })
  }

  // Copiar permissões de outro usuário
  const copyPermissionsFromUser = (sourceUserId: string) => {
    // Em um sistema real, você buscaria as permissões do usuário selecionado
    // Aqui estamos apenas simulando com dados fictícios
    const mockSourcePermissions = [
      { module: "alunos" as PermissionModule, action: "view" as any },
      { module: "alunos" as PermissionModule, action: "create" as any },
      { module: "ocorrencias" as PermissionModule, action: "view" as any },
    ]

    setEditedPermissions([...mockSourcePermissions])
    setHasChanges(true)

    toast({
      title: "Permissões copiadas",
      description: "As permissões foram copiadas com sucesso.",
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

  // Verificar se as permissões foram personalizadas em relação ao padrão do perfil
  const hasCustomPermissions = () => {
    const defaultPerms = defaultPermissionsByRole[user.role] || []

    if (defaultPerms.length !== editedPermissions.length) return true

    return (
      !defaultPerms.every((dp) => editedPermissions.some((ep) => ep.module === dp.module && dp.action === dp.action)) ||
      !editedPermissions.every((ep) => defaultPerms.some((dp) => dp.module === ep.module && dp.action === dp.action))
    )
  }

  // Calcular estatísticas de permissões
  const permissionStats = {
    total: editedPermissions.length,
    byModule: Object.entries(moduleLabels).map(([module, label]) => ({
      module,
      label,
      count: editedPermissions.filter((p) => p.module === module).length,
      total: Object.keys(actionLabels).length,
    })),
  }

  // Adicionar após a definição de permissionStats
  console.log("Módulos disponíveis:", Object.keys(moduleLabels))
  console.log("Ações disponíveis:", Object.keys(actionLabels))
  console.log("Permissões do usuário:", editedPermissions)

  // Filtrar módulos com base na pesquisa
  const filteredModules = Object.entries(moduleLabels).filter(
    ([module, label]) =>
      searchTerm.trim() === "" ||
      label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filtrar ações com base na pesquisa e no status
  const filteredActions = Object.entries(actionLabels).filter(([action, label]) => {
    const matchesSearch =
      searchTerm.trim() === "" ||
      label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterByStatus === "all") return matchesSearch
    if (filterByStatus === "granted") return matchesSearch && hasPermission(activeModule, action)
    if (filterByStatus === "denied") return matchesSearch && !hasPermission(activeModule, action)

    return matchesSearch
  })

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription className="mt-1.5">
              {user.email} ·{" "}
              <Badge variant="outline" className="capitalize">
                {formatRole(user.role)}
              </Badge>
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Copy className="mr-2 h-4 w-4" /> Copiar de
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Copiar Permissões</DialogTitle>
                  <DialogDescription>Selecione um usuário para copiar suas permissões.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="sourceUser">Usuário de origem</Label>
                  <Select onValueChange={(value) => copyPermissionsFromUser(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Escola Municipal</SelectItem>
                      <SelectItem value="2">Conselheiro Tutelar</SelectItem>
                      <SelectItem value="3">Ministério Público</SelectItem>
                      <SelectItem value="5">Professor Silva</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="submit">Copiar Permissões</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" /> Temporário
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Permissões Temporárias</DialogTitle>
                  <DialogDescription>
                    Configure permissões que expiram automaticamente após uma data específica.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="temp-active"
                      checked={temporaryPermissions.active}
                      onCheckedChange={(checked) => setTemporaryPermissions((prev) => ({ ...prev, active: checked }))}
                    />
                    <Label htmlFor="temp-active">Ativar permissões temporárias</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Data de expiração</Label>
                    <Input
                      id="expiry-date"
                      type="date"
                      value={temporaryPermissions.expiresAt}
                      onChange={(e) => setTemporaryPermissions((prev) => ({ ...prev, expiresAt: e.target.value }))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={saveTemporaryPermissions}>Salvar Configuração</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={resetToRoleDefaults} disabled={!hasCustomPermissions()}>
              Restaurar Padrão
            </Button>
            <Button onClick={saveChanges} disabled={!hasChanges}>
              <Save className="mr-2 h-4 w-4" /> Salvar
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Barra horizontal */}
      <Separator className="mx-6" />

      {/* Barra de informações */}
      <div className="px-6 py-2 flex items-center justify-between bg-muted/30">
        <div className="text-sm font-medium">
          Gerenciando permissões para: <span className="text-primary">{user.name}</span>
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
        {hasCustomPermissions() && (
          <Alert className="mx-4 mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Permissões personalizadas</AlertTitle>
            <AlertDescription>Este usuário possui permissões diferentes do padrão de seu perfil.</AlertDescription>
          </Alert>
        )}

        {temporaryPermissions.active && (
          <Alert className="mx-4 mb-4" variant="warning">
            <Clock className="h-4 w-4" />
            <AlertTitle>Permissões temporárias ativas</AlertTitle>
            <AlertDescription>
              Este usuário possui permissões temporárias que expiram em {temporaryPermissions.expiresAt}.
            </AlertDescription>
          </Alert>
        )}

        <div className="px-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Total de permissões: <Badge variant="secondary">{permissionStats.total}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Opções avançadas</span>
              <Switch checked={showAdvancedOptions} onCheckedChange={setShowAdvancedOptions} />
            </div>
          </div>
        </div>

        {/* Barra de pesquisa e filtros */}
        <div className="px-4 mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar permissões..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={filterByStatus} onValueChange={(value) => setFilterByStatus(value as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as permissões</SelectItem>
              <SelectItem value="granted">Permissões concedidas</SelectItem>
              <SelectItem value="denied">Permissões negadas</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex h-full">
          {/* Coluna da esquerda - Lista de módulos */}
          <div className="w-1/4 border-r">
            <div className="p-4">
              <h3 className="text-sm font-medium mb-2">Módulos</h3>
            </div>
            <ScrollArea className="h-[calc(100%-3rem)]">
              <div className="space-y-1 p-2">
                {filteredModules.map(([module, label]) => {
                  const moduleStats = permissionStats.byModule.find((s) => s.module === module)
                  return (
                    <button
                      key={module}
                      onClick={() => setActiveModule(module as PermissionModule)}
                      className={`w-full flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        activeModule === module ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                    >
                      <span>{label}</span>
                      {moduleStats && (
                        <Badge variant={activeModule === module ? "outline" : "secondary"} className="ml-2">
                          {moduleStats.count}/{moduleStats.total}
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
                        onClick={() => toggleAllPermissionsForModule(activeModule, true)}
                      >
                        Selecionar Tudo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAllPermissionsForModule(activeModule, false)}
                      >
                        Desmarcar Tudo
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredActions.map(([action, actionLabel]) => (
                    <div key={action} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                      <Checkbox
                        id={`${activeModule}-${action}`}
                        checked={hasPermission(activeModule, action)}
                        onCheckedChange={() => togglePermission(activeModule, action)}
                      />
                      <label
                        htmlFor={`${activeModule}-${action}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                      >
                        {actionLabel}
                      </label>
                      {hasPermission(activeModule, action) ? (
                        <Badge variant="success" className="ml-auto">
                          Permitido
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="ml-auto text-muted-foreground">
                          Negado
                        </Badge>
                      )}
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
                          <p className="text-xs text-muted-foreground">Permitir apenas visualização, sem edição</p>
                        </div>
                        <Switch
                          checked={
                            hasPermission(activeModule, "view") &&
                            !hasPermission(activeModule, "create") &&
                            !hasPermission(activeModule, "edit") &&
                            !hasPermission(activeModule, "delete")
                          }
                          onCheckedChange={(checked) => {
                            const newPermissions = [...editedPermissions].filter((p) => p.module !== activeModule)
                            if (checked) {
                              newPermissions.push({
                                module: activeModule,
                                action: "view" as any,
                              })
                            }
                            setEditedPermissions(newPermissions)
                            setHasChanges(true)
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Acesso completo</label>
                          <p className="text-xs text-muted-foreground">Permitir todas as operações neste módulo</p>
                        </div>
                        <Switch
                          checked={Object.keys(actionLabels).every((action) => hasPermission(activeModule, action))}
                          onCheckedChange={(checked) => {
                            toggleAllPermissionsForModule(activeModule, checked)
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
  )
}
