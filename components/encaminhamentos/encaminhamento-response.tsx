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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface EncaminhamentoResponseProps {
  encaminhamento: any
  onClose: () => void
}

export function EncaminhamentoResponse({ encaminhamento, onClose }: EncaminhamentoResponseProps) {
  const { toast } = useToast()
  const [response, setResponse] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!response) {
      toast({
        title: "Erro ao registrar resposta",
        description: "Preencha o campo de resposta",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would be an API call
    console.log("Registrando resposta:", { id: encaminhamento.id, response })

    toast({
      title: "Resposta registrada",
      description: "A resposta foi registrada com sucesso",
    })

    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Resposta do Encaminhamento</DialogTitle>
          <DialogDescription>Registre a resposta recebida do órgão de destino</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Aluno:</span> {encaminhamento.student}
              </div>
              <div className="text-sm">
                <span className="font-medium">Destino:</span> {encaminhamento.destination}
              </div>
              <div className="text-sm">
                <span className="font-medium">Tipo:</span> {encaminhamento.type}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="response">Resposta</Label>
              <Textarea
                id="response"
                placeholder="Digite a resposta recebida"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                required
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Registrar Resposta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
