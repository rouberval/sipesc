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
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface OrgaoFormProps {
  onClose: () => void
  orgao?: any
}

// Lista de módulos disponíveis
const modulosDisponiveis = [
  { id: "alunos", nome: "Alunos" },
  { id: "ocorrencias", nome: "Ocorrências" },
  { id: "encaminhamentos", nome: "Encaminhamentos" },
  { id: "frequencia", nome: "Frequência" },
  { id: "escolas", nome: "Escolas" },
  { id: "conselhos", nome: "Conselhos" },
  { id: "relatorios", nome: "Relatórios" },
  { id: "medicacoes", nome: "Medicações" },
  { id: "mensagens", nome: "Mensagens" },
  { id: "alertas", nome: "Alertas" },
  { id: "dashboard", nome: "Dashboard" },
  { id: "painel-bi", nome: "Painel BI" },
]

export function OrgaoForm({ onClose, orgao }: OrgaoFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nome: orgao?.nome || "",
    descricao: orgao?.descricao || "",
    permissoes: orgao?.permissoes || [],
    status: orgao?.status || "ativo",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePermissaoToggle = (permissao: string) => {
    setFormData((prev) => {
      const permissoes = [...prev.permissoes]
      if (permissoes.includes(permissao)) {
        return { ...prev, permissoes: permissoes.filter((p) => p !== permissao) }
      } else {
        return { ...prev, permissoes: [...permissoes, permissao] }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar formulário
    if (!formData.nome || !formData.descricao || formData.permissoes.length === 0) {
      toast({
        title: "Erro ao cadastrar órgão",
        description: "Preencha todos os campos obrigatórios e selecione pelo menos uma permissão",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulação de chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Em uma aplicação real, isso seria uma chamada de API
      console.log("Cadastrando/atualizando órgão:", formData)

      toast({
        title: orgao ? "Órgão atualizado" : "Órgão cadastrado",
        description: orgao ? "O órgão foi atualizado com sucesso" : "O órgão foi cadastrado com sucesso",
      })

      onClose()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar a solicitação",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{orgao ? "Editar Órgão" : "Cadastrar Novo Órgão"}</DialogTitle>
          <DialogDescription>
            {orgao ? "Atualize os dados do órgão" : "Preencha os dados para cadastrar um novo órgão no sistema"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome do Órgão</Label>
              <Input
                id="nome"
                name="nome"
                placeholder="Nome do órgão"
                value={formData.nome}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                name="descricao"
                placeholder="Descreva a função deste órgão no sistema"
                value={formData.descricao}
                onChange={handleChange}
                required
                rows={3}
                disabled={isSubmitting}
              />
            </div>

            <div className="grid gap-2">
              <Label>Módulos de Acesso</Label>
              <div className="grid grid-cols-2 gap-2 border rounded-md p-4 h-40 overflow-y-auto">
                {modulosDisponiveis.map((modulo) => (
                  <div key={modulo.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`modulo-${modulo.id}`}
                      checked={formData.permissoes.includes(modulo.id)}
                      onCheckedChange={() => handlePermissaoToggle(modulo.id)}
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor={`modulo-${modulo.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {modulo.nome}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Selecione os módulos que este órgão poderá acessar</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="status"
                  checked={formData.status === "ativo"}
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({ ...prev, status: checked ? "ativo" : "inativo" }))
                  }}
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="status"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ativo
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  Processando...
                </>
              ) : orgao ? (
                "Salvar Alterações"
              ) : (
                "Cadastrar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
