"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import {
  User,
  Mail,
  Calendar,
  Shield,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  Settings,
  Lock,
  LayoutDashboard,
} from "lucide-react"

// Tipos para os usuários
type UserRole = "escola" | "conselheiro" | "mp" | "admin" | "professor"

type UserDetails = {
  id: string
  name: string
  email: string
  role: UserRole
  status: "ativo" | "inativo"
  lastLogin?: string
  createdAt?: string
  escolaId?: string
  conselhoId?: string
  escola?: {
    id: string
    name: string
  }
  conselho?: {
    id: string
    name: string
  }
}

interface UsuarioAdminDetailsProps {
  user: UserDetails
  onClose: () => void
  onEdit: (user: UserDetails) => void
}

export function UsuarioAdminDetails({ user, onClose, onEdit }: UsuarioAdminDetailsProps) {
  const [activeTab, setActiveTab] = useState("info")
  const router = useRouter()

  // Formatar o nome do papel do usuário
  const formatRole = (role: UserRole): string => {
    const roleMap: Record<string, string> = {
      escola: "Escola",
      conselheiro: "Conselheiro Tutelar",
      mp: "Ministério Público",
      admin: "Administrador",
      professor: "Professor",
    }

    return roleMap[role] || role
  }

  // Formatar data
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Navegar para a página de configuração de módulos
  const handleConfigureModules = () => {
    router.push(`/admin/usuarios/${user.id}/modulos`)
  }

  // Navegar para a página de configuração de permissões
  const handleConfigurePermissions = () => {
    router.push(`/admin/usuarios/${user.id}/permissoes`)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription className="mt-1">{user.email}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={user.status === "ativo" ? "default" : "destructive"}>
              {user.status === "ativo" ? "Ativo" : "Inativo"}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {formatRole(user.role)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="access">Acesso</TabsTrigger>
            <TabsTrigger value="actions">Ações</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="info" className="p-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Nome</p>
                  <p className="text-muted-foreground">{user.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Papel</p>
                  <p className="text-muted-foreground capitalize">{formatRole(user.role)}</p>
                </div>
              </div>

              {user.role === "escola" && user.escola && (
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Escola</p>
                    <p className="text-muted-foreground">{user.escola.name}</p>
                  </div>
                </div>
              )}

              {user.role === "conselheiro" && user.conselho && (
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Conselho Tutelar</p>
                    <p className="text-muted-foreground">{user.conselho.name}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Data de Criação</p>
                  <p className="text-muted-foreground">{formatDate(user.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Último Acesso</p>
                  <p className="text-muted-foreground">{formatDate(user.lastLogin)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                {user.status === "ativo" ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                )}
                <div>
                  <p className="font-medium">Status</p>
                  <p className="text-muted-foreground capitalize">{user.status}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="access" className="p-6 pt-4">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Módulos do Sistema</CardTitle>
                  <CardDescription>Configure quais módulos o usuário pode acessar</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-sm text-muted-foreground mb-4">
                    Gerencie o acesso do usuário aos diferentes módulos e funcionalidades do sistema.
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button onClick={handleConfigureModules} className="w-full">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Configurar Módulos
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Permissões Detalhadas</CardTitle>
                  <CardDescription>Configure permissões específicas do usuário</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-sm text-muted-foreground mb-4">
                    Defina permissões granulares para cada módulo, como visualizar, editar, excluir, etc.
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button onClick={handleConfigurePermissions} className="w-full">
                    <Lock className="mr-2 h-4 w-4" />
                    Configurar Permissões
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="actions" className="p-6 pt-4">
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Ações do Usuário</CardTitle>
                <CardDescription>Gerencie as ações disponíveis para este usuário</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" onClick={() => onEdit(user)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Editar Usuário
                    </Button>

                    <Button variant={user.status === "ativo" ? "destructive" : "default"}>
                      {user.status === "ativo" ? (
                        <>
                          <XCircle className="mr-2 h-4 w-4" />
                          Desativar Usuário
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Ativar Usuário
                        </>
                      )}
                    </Button>

                    <Button variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Enviar Email
                    </Button>

                    <Button variant="outline">
                      <Lock className="mr-2 h-4 w-4" />
                      Redefinir Senha
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <CardFooter className="flex justify-end border-t p-4">
        <Button variant="outline" onClick={onClose}>
          Fechar
        </Button>
      </CardFooter>
    </Card>
  )
}
