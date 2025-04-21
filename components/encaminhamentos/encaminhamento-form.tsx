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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface EncaminhamentoFormProps {
  onClose: () => void
}

export function EncaminhamentoForm({ onClose }: EncaminhamentoFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    student: "",
    destination: "",
    type: "",
    description: "",
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
    if (!formData.student || !formData.destination || !formData.type || !formData.description) {
      toast({
        title: "Erro ao registrar encaminhamento",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would be an API call
    console.log("Registrando encaminhamento:", formData)

    toast({
      title: "Encaminhamento registrado",
      description: "O encaminhamento foi registrado com sucesso",
    })

    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Novo Encaminhamento</DialogTitle>
          <DialogDescription>Preencha os dados para registrar um novo encaminhamento</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="student">Aluno</Label>
              <Input
                id="student"
                name="student"
                placeholder="Nome do aluno"
                value={formData.student}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="destination">Órgão de Destino</Label>
                <Select onValueChange={(value) => handleSelectChange("destination", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o destino" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Conselho Tutelar">Conselho Tutelar</SelectItem>
                    <SelectItem value="CRAS">CRAS</SelectItem>
                    <SelectItem value="CAPS">CAPS</SelectItem>
                    <SelectItem value="Psicólogo">Psicólogo</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Tipo</Label>
                <Select onValueChange={(value) => handleSelectChange("type", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Abandono Escolar">Abandono Escolar</SelectItem>
                    <SelectItem value="Faltas Excessivas">Faltas Excessivas</SelectItem>
                    <SelectItem value="Comportamento Agressivo">Comportamento Agressivo</SelectItem>
                    <SelectItem value="Vulnerabilidade Social">Vulnerabilidade Social</SelectItem>
                    <SelectItem value="Saúde Mental">Saúde Mental</SelectItem>
                    <SelectItem value="Suspeita de Maus-Tratos">Suspeita de Maus-Tratos</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Descreva o motivo do encaminhamento"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Registrar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
