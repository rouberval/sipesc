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
import { useResponsive } from "@/hooks/use-responsive"

interface AlunoFormProps {
  onClose: () => void
}

export function AlunoForm({ onClose }: AlunoFormProps) {
  const { toast } = useToast()
  const { isMobile } = useResponsive()

  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    turma: "",
    responsavel: "",
    telefone: "",
    endereco: "",
    observacoes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.nome || !formData.idade || !formData.turma || !formData.responsavel || !formData.telefone) {
      toast({
        title: "Erro ao cadastrar aluno",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would be an API call
    console.log("Cadastrando aluno:", formData)

    toast({
      title: "Aluno cadastrado",
      description: "O aluno foi cadastrado com sucesso",
    })

    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Aluno</DialogTitle>
          <DialogDescription>Preencha os dados para cadastrar um novo aluno</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                name="nome"
                placeholder="Nome do aluno"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="idade">Idade</Label>
                <Input
                  id="idade"
                  name="idade"
                  type="number"
                  placeholder="Idade"
                  value={formData.idade}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="turma">Turma</Label>
                <Select onValueChange={(value) => handleSelectChange("turma", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a turma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6º Ano A">6º Ano A</SelectItem>
                    <SelectItem value="7º Ano B">7º Ano B</SelectItem>
                    <SelectItem value="8º Ano C">8º Ano C</SelectItem>
                    <SelectItem value="9º Ano A">9º Ano A</SelectItem>
                    <SelectItem value="1º Ano EM">1º Ano EM</SelectItem>
                    <SelectItem value="2º Ano EM">2º Ano EM</SelectItem>
                    <SelectItem value="3º Ano EM">3º Ano EM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="responsavel">Responsável</Label>
              <Input
                id="responsavel"
                name="responsavel"
                placeholder="Nome do responsável"
                value={formData.responsavel}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                name="telefone"
                placeholder="(00) 00000-0000"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                name="endereco"
                placeholder="Endereço completo"
                value={formData.endereco}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Input
                id="observacoes"
                name="observacoes"
                placeholder="Observações adicionais"
                value={formData.observacoes}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter className={isMobile ? "flex-col space-y-2" : undefined}>
            <Button type="button" variant="outline" onClick={onClose} className={isMobile ? "w-full" : undefined}>
              Cancelar
            </Button>
            <Button type="submit" className={isMobile ? "w-full" : undefined}>
              Cadastrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
