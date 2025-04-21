"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UsuarioFormProps {
  onClose: () => void
  usuario?: any // Para edição
}

export function UsuarioForm({ onClose, usuario }: UsuarioFormProps) {
  const { toast } = useToast()
  const isEditing = !!usuario

  const [formData, setFormData] = useState({
    name: usuario?.name || "",
    email: usuario?.email || "",
    password: "",
    confirmPassword: "",
    role: usuario?.role || "",
    school: usuario?.school || "",
    status: usuario?.status || "ativo",
    permissions: {
      alunos: usuario?.permissions?.alunos || false,
      ocorrencias: usuario?.permissions?.ocorrencias || false,
      encaminhamentos: usuario?.permissions?.encaminhamentos || false,
      relatorios: usuario?.permissions?.relatorios || false,
      configuracoes: usuario?.permissions?.configuracoes || false,
    },
  })

  const [activeTab, setActiveTab] = useState("informacoes")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.role || !formData.school) {
      toast({
        title: "Erro ao cadastrar usuário",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    if (!isEditing && (!formData.password || formData.password !== formData.confirmPassword)) {
      toast({
        title: "Erro ao cadastrar usuário",
        description: isEditing ? "Preencha a senha corretamente" : "As senhas não coincidem",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would be an API call
    console.log("Salvando usuário:", formData)

    toast({
      title: isEditing ? "Usuário atualizado" : "Usuário cadastrado",
      description: isEditing ? "O usuário foi atualizado com sucesso" : "O usuário foi cadastrado com sucesso",
    })

    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Usuário" : "Cadastrar Novo Usuário"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize os dados do usuário conforme necessário"
              : "Preencha os dados para cadastrar um novo usuário"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="informacoes">Informações</TabsTrigger>
              <TabsTrigger value="permissoes">Permissões</TabsTrigger>
            </TabsList>

            <TabsContent value="informacoes" className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nome completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@escola.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Senha {isEditing && "(deixe em branco para manter)"}</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required={!isEditing}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="role">Papel</Label>
                    <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o papel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gestor">Gestor</SelectItem>
                        <SelectItem value="secretaria">Secretaria</SelectItem>
                        <SelectItem value="professor">Professor</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="school">Escola</Label>
                    <Select
                      value={formData.school}
                      onValueChange={(value) => handleSelectChange("school", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a escola" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Escola Municipal João da Silva">Escola Municipal João da Silva</SelectItem>
                        <SelectItem value="Escola Estadual Maria Oliveira">Escola Estadual Maria Oliveira</SelectItem>
                        <SelectItem value="Colégio Pedro Alves">Colégio Pedro Alves</SelectItem>
                        <SelectItem value="Escola Básica Ana Souza">Escola Básica Ana Souza</SelectItem>
                        <SelectItem value="Instituto Educacional Central">Instituto Educacional Central</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="status"
                    checked={formData.status === "ativo"}
                    onCheckedChange={(checked) => handleSelectChange("status", checked ? "ativo" : "inativo")}
                  />
                  <Label htmlFor="status">Usuário ativo</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="permissoes" className="space-y-4 py-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Acesso aos módulos do sistema</h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="perm-alunos"
                      checked={formData.permissions.alunos}
                      onCheckedChange={(checked) => handlePermissionChange("alunos", checked)}
                    />
                    <Label htmlFor="perm-alunos">Gerenciamento de Alunos</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="perm-ocorrencias"
                      checked={formData.permissions.ocorrencias}
                      onCheckedChange={(checked) => handlePermissionChange("ocorrencias", checked)}
                    />
                    <Label htmlFor="perm-ocorrencias">Registro de Ocorrências</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="perm-encaminhamentos"
                      checked={formData.permissions.encaminhamentos}
                      onCheckedChange={(checked) => handlePermissionChange("encaminhamentos", checked)}
                    />
                    <Label htmlFor="perm-encaminhamentos">Encaminhamentos</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="perm-relatorios"
                      checked={formData.permissions.relatorios}
                      onCheckedChange={(checked) => handlePermissionChange("relatorios", checked)}
                    />
                    <Label htmlFor="perm-relatorios">Relatórios</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="perm-configuracoes"
                      checked={formData.permissions.configuracoes}
                      onCheckedChange={(checked) => handlePermissionChange("configuracoes", checked)}
                    />
                    <Label htmlFor="perm-configuracoes">Configurações do Sistema</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{isEditing ? "Salvar Alterações" : "Cadastrar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
