"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { moduleLabels, actionLabels, type PermissionModule, type PermissionAction } from "@/types/permissions"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"

// Tipos para os usuários
type UserRole = "escola" | "conselheiro" | "mp" | "admin" | "professor"

type User = {
  id?: string
  name: string
  email: string
  role: UserRole
  status: "ativo" | "inativo"
  lastLogin?: string
  createdAt?: string
  escolaId?: string
  conselhoId?: string
}

interface UsuarioAdminFormProps {
  user?: User | null
  onSuccess: () => void
}

export function UsuarioAdminForm({ user, onSuccess }: UsuarioAdminFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<User>({
    id: user?.id || undefined,
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "escola",
    status: user?.status || "ativo",
    escolaId: user?.escolaId,
    conselhoId: user?.conselhoId,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, boolean>>({})

  // Manipuladores de eventos
  const handleChange = (field: keyof User, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Limpar erro quando o campo é alterado
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handlePermissionChange = (module: PermissionModule, action: PermissionAction, checked: boolean) => {
    const key = `${module}-${action}`
    setSelectedPermissions((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (formData.role === "escola" && !formData.escolaId) {
      newErrors.escolaId = "Escola é obrigatória para este perfil"
    }

    if (formData.role === "conselheiro" && !formData.conselhoId) {
      newErrors.conselhoId = "Conselho Tutelar é obrigatório para este perfil"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Dados do formulário:", formData)
      console.log("Permissões selecionadas:", selectedPermissions)

      toast({
        title: user ? "Usuário atualizado" : "Usuário cadastrado",
        description: user
          ? "O usuário foi atualizado com sucesso"
          : "O usuário foi cadastrado com sucesso e vinculado à organização",
      })

      onSuccess()
    } catch (error) {
      console.error("Erro ao salvar usuário:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar a solicitação",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Opções para escolas e conselhos (mock)
  const escolasOptions = [
    { id: "1", name: "Escola Municipal Centro" },
    { id: "2", name: "Escola Estadual Norte" },
    { id: "3", name: "Escola Municipal Sul" },
  ]

  const conselhosOptions = [
    { id: "1", name: "Conselho Tutelar Centro" },
    { id: "2", name: "Conselho Tutelar Norte" },
    { id: "3", name: "Conselho Tutelar Sul" },
  ]

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="info">Informações Básicas</TabsTrigger>
          <TabsTrigger value="permissions">Permissões</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Nome completo"
                className={errors.name ? "border-red-500" : ""}
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="email@exemplo.com"
                className={errors.email ? "border-red-500" : ""}
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Papel</Label>
              <Select
                value={formData.role}
                onValueChange={(value: UserRole) => handleChange("role", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um papel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="escola">Escola</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                  <SelectItem value="conselheiro">Conselheiro Tutelar</SelectItem>
                  <SelectItem value="mp">Ministério Público</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formData.status === "ativo"}
                  onCheckedChange={(checked) => handleChange("status", checked ? "ativo" : "inativo")}
                  disabled={isSubmitting}
                />
                <Label htmlFor="status">{formData.status === "ativo" ? "Ativo" : "Inativo"}</Label>
              </div>
            </div>

            {formData.role === "escola" && (
              <div className="space-y-2">
                <Label htmlFor="escolaId">Escola</Label>
                <Select
                  value={formData.escolaId || ""}
                  onValueChange={(value) => handleChange("escolaId", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={errors.escolaId ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecione uma escola" />
                  </SelectTrigger>
                  <SelectContent>
                    {escolasOptions.map((escola) => (
                      <SelectItem key={escola.id} value={escola.id}>
                        {escola.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.escolaId && <p className="text-sm text-red-500">{errors.escolaId}</p>}
              </div>
            )}

            {formData.role === "conselheiro" && (
              <div className="space-y-2">
                <Label htmlFor="conselhoId">Conselho Tutelar</Label>
                <Select
                  value={formData.conselhoId || ""}
                  onValueChange={(value) => handleChange("conselhoId", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={errors.conselhoId ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecione um conselho" />
                  </SelectTrigger>
                  <SelectContent>
                    {conselhosOptions.map((conselho) => (
                      <SelectItem key={conselho.id} value={conselho.id}>
                        {conselho.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.conselhoId && <p className="text-sm text-red-500">{errors.conselhoId}</p>}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {Object.entries(moduleLabels).map(([module, moduleLabel]) => (
                  <div key={module} className="space-y-2">
                    <h3 className="font-medium">{moduleLabel}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {Object.entries(actionLabels).map(([action, actionLabel]) => (
                        <div key={`${module}-${action}`} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${module}-${action}`}
                            checked={selectedPermissions[`${module}-${action}`] || false}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                module as PermissionModule,
                                action as PermissionAction,
                                checked as boolean,
                              )
                            }
                            disabled={isSubmitting}
                          />
                          <Label htmlFor={`${module}-${action}`}>{actionLabel}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" type="button" onClick={onSuccess} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoadingSpinner className="mr-2" />
              Processando...
            </>
          ) : user ? (
            "Atualizar"
          ) : (
            "Cadastrar"
          )}
        </Button>
      </div>
    </form>
  )
}
