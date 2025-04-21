"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ModulePermission {
  id: string
  name: string
  description: string
  enabled: boolean
  category: "navigation" | "dashboard" | "reports" | "admin"
  highlight?: boolean // Adicione esta propriedade
}

interface UserModulePermissionsProps {
  userId: string
  userName: string
  userRole: string
  onSave?: (permissions: ModulePermission[]) => void
}

export function UserModulePermissions({ userId, userName, userRole, onSave }: UserModulePermissionsProps) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Estado inicial com todos os módulos mencionados
  const [modulePermissions, setModulePermissions] = useState<ModulePermission[]>([
    // Navegação principal
    {
      id: "dashboard",
      name: "Dashboard",
      description: "Acesso à página inicial do sistema",
      enabled: true,
      category: "navigation",
    },
    {
      id: "painel_bi",
      name: "Painel BI",
      description: "Acesso ao painel de Business Intelligence",
      enabled: true,
      category: "dashboard",
    },
    { id: "alunos", name: "Alunos", description: "Acesso ao módulo de alunos", enabled: true, category: "navigation" },
    {
      id: "alunos_risco",
      name: "Alunos em Risco",
      description: "Acesso ao módulo de alunos em situação de risco",
      enabled: true,
      category: "navigation",
    },
    {
      id: "ocorrencias",
      name: "Ocorrências",
      description: "Acesso ao módulo de ocorrências",
      enabled: true,
      category: "navigation",
    },
    {
      id: "frequencia",
      name: "Frequência",
      description: "Acesso ao módulo de frequência",
      enabled: true,
      category: "navigation",
    },
    {
      id: "encaminhamentos",
      name: "Encaminhamentos",
      description: "Acesso ao módulo de encaminhamentos",
      enabled: true,
      category: "navigation",
    },
    {
      id: "escolas",
      name: "Escolas",
      description: "Acesso ao módulo de escolas",
      enabled: true,
      category: "navigation",
    },
    {
      id: "escolas_vinculadas",
      name: "Escolas Vinculadas",
      description: "Acesso ao módulo de escolas vinculadas",
      enabled: true,
      category: "navigation",
    },
    {
      id: "conselhos",
      name: "Conselhos",
      description: "Acesso ao módulo de conselhos tutelares",
      enabled: true,
      category: "navigation",
    },
    {
      id: "mensagens",
      name: "Mensagens",
      description: "Acesso ao módulo de mensagens",
      enabled: true,
      category: "navigation",
    },
    {
      id: "alertas",
      name: "Alertas Críticos",
      description: "Acesso ao módulo de alertas críticos",
      enabled: true,
      category: "navigation",
    },
    {
      id: "relatorios",
      name: "Relatórios",
      description: "Acesso ao módulo de relatórios",
      enabled: true,
      category: "reports",
    },
    {
      id: "medicacoes",
      name: "Medicações",
      description: "Acesso ao módulo de medicações",
      enabled: true,
      category: "navigation",
    },

    // Módulos específicos do MP
    {
      id: "escolas_cadastradas",
      name: "Escolas Cadastradas",
      description: "Visualização de escolas cadastradas",
      enabled: true,
      category: "dashboard",
      highlight: true, // Adicione esta propriedade
    },
    {
      id: "conselhos_cadastrados",
      name: "Conselhos Cadastrados",
      description: "Visualização de conselhos cadastrados",
      enabled: true,
      category: "dashboard",
    },
    {
      id: "alertas_mp",
      name: "Alertas",
      description: "Visualização de alertas para o MP",
      enabled: true,
      category: "dashboard",
    },
  ])

  // Função para alternar o estado de um módulo
  const toggleModule = (id: string) => {
    setModulePermissions((prev) =>
      prev.map((module) => (module.id === id ? { ...module, enabled: !module.enabled } : module)),
    )
    setHasChanges(true)
  }

  // Função para desabilitar todos os módulos
  const disableAllModules = () => {
    setModulePermissions((prev) => prev.map((module) => ({ ...module, enabled: false })))
    setHasChanges(true)
  }

  // Função para habilitar todos os módulos
  const enableAllModules = () => {
    setModulePermissions((prev) => prev.map((module) => ({ ...module, enabled: true })))
    setHasChanges(true)
  }

  // Função para salvar as configurações
  const handleSave = async () => {
    setIsSaving(true)

    try {
      // Simulação de uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Chamar a função de callback se fornecida
      if (onSave) {
        onSave(modulePermissions)
      }

      toast({
        title: "Configurações salvas",
        description: "As permissões de acesso foram atualizadas com sucesso.",
        variant: "success",
      })

      setHasChanges(false)
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Filtrar módulos por categoria
  const navigationModules = modulePermissions.filter((m) => m.category === "navigation")
  const dashboardModules = modulePermissions.filter((m) => m.category === "dashboard")
  const reportModules = modulePermissions.filter((m) => m.category === "reports")

  // Contar módulos habilitados/desabilitados
  const enabledCount = modulePermissions.filter((m) => m.enabled).length
  const disabledCount = modulePermissions.length - enabledCount

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Permissões de Acesso aos Módulos</CardTitle>
            <CardDescription>Configure quais módulos o usuário {userName} pode acessar</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={userRole === "mp" ? "default" : "outline"} className="capitalize">
              {userRole === "mp" ? "Ministério Público" : userRole}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {hasChanges && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Alterações não salvas</AlertTitle>
            <AlertDescription>
              Você fez alterações nas permissões. Clique em "Salvar alterações" para aplicá-las.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{enabledCount}</span> módulos habilitados,
            <span className="font-medium"> {disabledCount}</span> desabilitados
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={enableAllModules}>
              Habilitar todos
            </Button>
            <Button variant="outline" size="sm" onClick={disableAllModules}>
              Desabilitar todos
            </Button>
          </div>
        </div>

        <Tabs defaultValue="navigation">
          <TabsList className="mb-4">
            <TabsTrigger value="navigation">Navegação</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboards</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="navigation">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {navigationModules.map((module) => (
                  <div
                    key={module.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                  >
                    <div>
                      <Label htmlFor={`module-${module.id}`} className="font-medium">
                        {module.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                    <Switch
                      id={`module-${module.id}`}
                      checked={module.enabled}
                      onCheckedChange={() => toggleModule(module.id)}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="dashboard">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {dashboardModules.map((module) => (
                  <div
                    key={module.id}
                    className={`flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 ${
                      module.highlight ? "border-blue-300 bg-blue-50" : ""
                    }`}
                  >
                    <div>
                      <Label
                        htmlFor={`module-${module.id}`}
                        className={`font-medium ${module.highlight ? "text-blue-700" : ""}`}
                      >
                        {module.name}
                      </Label>
                      <p className={`text-sm ${module.highlight ? "text-blue-600" : "text-muted-foreground"}`}>
                        {module.description}
                      </p>
                    </div>
                    <Switch
                      id={`module-${module.id}`}
                      checked={module.enabled}
                      onCheckedChange={() => toggleModule(module.id)}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="reports">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {reportModules.map((module) => (
                  <div
                    key={module.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                  >
                    <div>
                      <Label htmlFor={`module-${module.id}`} className="font-medium">
                        {module.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                    <Switch
                      id={`module-${module.id}`}
                      checked={module.enabled}
                      onCheckedChange={() => toggleModule(module.id)}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-end border-t p-4">
        <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
          {isSaving ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar alterações
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
