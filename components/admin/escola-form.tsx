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

interface EscolaFormProps {
  onClose: () => void
  escola?: any
}

// Mock data para conselhos tutelares
const mockConselhos = [
  { id: "1", nome: "Conselho Tutelar Norte", regiao: "Norte" },
  { id: "2", nome: "Conselho Tutelar Sul", regiao: "Sul" },
  { id: "3", nome: "Conselho Tutelar Leste", regiao: "Leste" },
  { id: "4", nome: "Conselho Tutelar Oeste", regiao: "Oeste" },
  { id: "5", nome: "Conselho Tutelar Central", regiao: "Central" },
]

export function EscolaForm({ onClose, escola }: EscolaFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nome: escola?.nome || "",
    endereco: escola?.endereco || "",
    telefone: escola?.telefone || "",
    diretor: escola?.diretor || "",
    municipio: escola?.municipio || "",
    regiao: escola?.regiao || "",
    conselhoId: escola?.conselhoId || "",
    email: escola?.email || "",
    senha: "",
    confirmarSenha: "",
    cep: escola?.cep || "",
    latitude: escola?.latitude || "",
    longitude: escola?.longitude || "",
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
      !formData.diretor ||
      !formData.municipio ||
      !formData.regiao ||
      !formData.conselhoId ||
      !formData.email
    ) {
      toast({
        title: "Erro ao cadastrar escola",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    // Se for um novo cadastro, validar senha
    if (!escola && (!formData.senha || formData.senha !== formData.confirmarSenha)) {
      toast({
        title: "Erro ao cadastrar escola",
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
      console.log("Cadastrando/atualizando escola:", formData)

      toast({
        title: escola ? "Escola atualizada" : "Escola cadastrada",
        description: escola
          ? "A escola foi atualizada com sucesso"
          : "A escola foi cadastrada com sucesso e vinculada ao conselho tutelar",
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
          <DialogTitle>{escola ? "Editar Escola" : "Cadastrar Nova Escola"}</DialogTitle>
          <DialogDescription>
            {escola
              ? "Atualize os dados da escola"
              : "Preencha os dados para cadastrar uma nova escola e vinculá-la a um conselho tutelar"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome da Escola</Label>
              <Input
                id="nome"
                name="nome"
                placeholder="Nome completo da escola"
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
                <Label htmlFor="diretor">Diretor(a)</Label>
                <Input
                  id="diretor"
                  name="diretor"
                  placeholder="Nome do diretor"
                  value={formData.diretor}
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

            <div className="grid gap-2">
              <Label htmlFor="conselhoId">Conselho Tutelar</Label>
              <Select
                value={formData.conselhoId}
                onValueChange={(value) => handleSelectChange("conselhoId", value)}
                disabled={isSubmitting}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o conselho tutelar" />
                </SelectTrigger>
                <SelectContent>
                  {mockConselhos.map((conselho) => (
                    <SelectItem key={conselho.id} value={conselho.id}>
                      {conselho.nome} - Região {conselho.regiao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                placeholder="email@escola.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">
                Este email será usado para acessar o sistema como perfil de escola
              </p>
            </div>

            {!escola && (
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
                      required={!escola}
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
                      required={!escola}
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
              ) : escola ? (
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
