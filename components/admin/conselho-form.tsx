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
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface ConselhoFormProps {
  onClose: () => void
  conselho?: any
}

export function ConselhoForm({ onClose, conselho }: ConselhoFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nome: conselho?.nome || "",
    endereco: conselho?.endereco || "",
    telefone: conselho?.telefone || "",
    email: conselho?.email || "",
    regiao: conselho?.regiao || "",
    municipio: conselho?.municipio || "",
    coordenador: conselho?.coordenador || "",
    senha: "",
    confirmarSenha: "",
    cep: conselho?.cep || "",
    latitude: conselho?.latitude || "",
    longitude: conselho?.longitude || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const buscarCep = async () => {
    if (!formData.cep || formData.cep.length !== 8) {
      toast({
        title: "CEP inválido",
        description: "Por favor, informe um CEP válido com 8 dígitos",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`)
      const data = await response.json()

      if (data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "O CEP informado não foi encontrado",
          variant: "destructive",
        })
        return
      }

      // Atualizar os dados do formulário com os dados do CEP
      setFormData((prev) => ({
        ...prev,
        endereco: `${data.logradouro}, ${data.bairro}`,
        municipio: data.localidade,
      }))

      // Buscar coordenadas geográficas (simulação)
      // Em um ambiente real, usaríamos uma API de geocodificação
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          latitude: "-27.5969",
          longitude: "-48.5495",
        }))
        setIsSubmitting(false)
      }, 1000)
    } catch (error) {
      toast({
        title: "Erro ao buscar CEP",
        description: "Ocorreu um erro ao buscar o CEP",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar formulário
    if (
      !formData.nome ||
      !formData.endereco ||
      !formData.telefone ||
      !formData.email ||
      !formData.regiao ||
      !formData.municipio ||
      !formData.coordenador
    ) {
      toast({
        title: "Erro ao cadastrar conselho tutelar",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    // Se for um novo cadastro, validar senha
    if (!conselho && (!formData.senha || formData.senha !== formData.confirmarSenha)) {
      toast({
        title: "Erro ao cadastrar conselho tutelar",
        description: "As senhas não coincidem ou estão em branco",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulação de chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Em uma aplicação real, isso seria uma chamada de API
      console.log("Cadastrando/atualizando conselho tutelar:", formData)

      toast({
        title: conselho ? "Conselho tutelar atualizado" : "Conselho tutelar cadastrado",
        description: conselho
          ? "O conselho tutelar foi atualizado com sucesso"
          : "O conselho tutelar foi cadastrado com sucesso",
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
          <DialogTitle>{conselho ? "Editar Conselho Tutelar" : "Cadastrar Novo Conselho Tutelar"}</DialogTitle>
          <DialogDescription>
            {conselho
              ? "Atualize os dados do conselho tutelar"
              : "Preencha os dados para cadastrar um novo conselho tutelar"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome do Conselho</Label>
              <Input
                id="nome"
                name="nome"
                placeholder="Nome do conselho tutelar"
                value={formData.nome}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cep">CEP</Label>
                <div className="flex gap-2">
                  <Input
                    id="cep"
                    name="cep"
                    placeholder="00000000"
                    value={formData.cep}
                    onChange={handleChange}
                    maxLength={8}
                    disabled={isSubmitting}
                  />
                  <Button type="button" onClick={buscarCep} disabled={isSubmitting} size="sm">
                    Buscar
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                name="endereco"
                placeholder="Endereço completo"
                value={formData.endereco}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  placeholder="(00) 0000-0000"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="coordenador">Coordenador(a)</Label>
                <Input
                  id="coordenador"
                  name="coordenador"
                  placeholder="Nome do coordenador"
                  value={formData.coordenador}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="municipio">Município</Label>
                <Input
                  id="municipio"
                  name="municipio"
                  placeholder="Nome do município"
                  value={formData.municipio}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="regiao">Região</Label>
                <Select
                  value={formData.regiao}
                  onValueChange={(value) => handleSelectChange("regiao", value)}
                  disabled={isSubmitting}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a região" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Norte">Norte</SelectItem>
                    <SelectItem value="Sul">Sul</SelectItem>
                    <SelectItem value="Leste">Leste</SelectItem>
                    <SelectItem value="Oeste">Oeste</SelectItem>
                    <SelectItem value="Central">Central</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  placeholder="Ex: -27.5969"
                  value={formData.latitude}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  placeholder="Ex: -48.5495"
                  value={formData.longitude}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email de Acesso</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@conselho.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">
                Este email será usado para acessar o sistema como perfil de conselho tutelar
              </p>
            </div>

            {!conselho && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="senha">Senha</Label>
                    <Input
                      id="senha"
                      name="senha"
                      type="password"
                      value={formData.senha}
                      onChange={handleChange}
                      required={!conselho}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                    <Input
                      id="confirmarSenha"
                      name="confirmarSenha"
                      type="password"
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                      required={!conselho}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </>
            )}
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
              ) : conselho ? (
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
