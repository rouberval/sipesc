"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface EncaminhamentoDetailsProps {
  encaminhamento: any
  onClose: () => void
}

export function EncaminhamentoDetails({ encaminhamento, onClose }: EncaminhamentoDetailsProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do Encaminhamento</DialogTitle>
          <DialogDescription>Informações completas sobre o encaminhamento registrado</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{encaminhamento.student}</h3>
            <Badge variant={encaminhamento.status === "Pendente" ? "outline" : "secondary"}>
              {encaminhamento.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Destino:</p>
              <p>{encaminhamento.destination}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Data:</p>
              <p>{new Date(encaminhamento.date).toLocaleDateString("pt-BR")}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Tipo:</p>
              <p>{encaminhamento.type}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Responsável:</p>
              <p>{encaminhamento.responsible}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Descrição:</p>
            <p className="text-sm">{encaminhamento.description}</p>
          </div>

          {encaminhamento.status === "Concluído" && (
            <>
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Resposta:</p>
                <p className="text-sm">{encaminhamento.response}</p>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Data da Resposta:</p>
                <p className="text-sm">{new Date(encaminhamento.responseDate).toLocaleDateString("pt-BR")}</p>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
