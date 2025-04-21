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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface FrequenciaFormProps {
  onClose: () => void
}

export function FrequenciaForm({ onClose }: FrequenciaFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    student: "",
    date: new Date().toISOString().split("T")[0],
    presence: "present",
    absenceReason: "",
    shift: "morning",
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
    if (!formData.student || !formData.date) {
      toast({
        title: "Erro ao registrar frequência",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would be an API call
    console.log("Registrando frequência:", formData)

    toast({
      title: "Frequência registrada",
      description: "A frequência foi registrada com sucesso",
    })

    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Frequência</DialogTitle>
          <DialogDescription>Preencha os dados para registrar a frequência do aluno</DialogDescription>
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

            <div className="grid gap-2">
              <Label htmlFor="date">Data</Label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="grid gap-2">
              <Label>Presença</Label>
              <RadioGroup value={formData.presence} onValueChange={(value) => handleSelectChange("presence", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="present" id="present" />
                  <Label htmlFor="present">Presente</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="absent" id="absent" />
                  <Label htmlFor="absent">Ausente</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.presence === "absent" && (
              <div className="grid gap-2">
                <Label htmlFor="absenceReason">Motivo da Falta</Label>
                <Textarea
                  id="absenceReason"
                  name="absenceReason"
                  placeholder="Descreva o motivo da falta"
                  value={formData.absenceReason}
                  onChange={handleChange}
                  rows={2}
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="shift">Turno</Label>
              <Select value={formData.shift} onValueChange={(value) => handleSelectChange("shift", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o turno" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Matutino</SelectItem>
                  <SelectItem value="afternoon">Vespertino</SelectItem>
                  <SelectItem value="night">Noturno</SelectItem>
                </SelectContent>
              </Select>
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
