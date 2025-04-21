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
import { cn } from "@/lib/utils"

interface OcorrenciaDetailsProps {
  ocorrencia: any
  onClose: () => void
}

export function OcorrenciaDetails({ ocorrencia, onClose }: OcorrenciaDetailsProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes da Ocorrência</DialogTitle>
          <DialogDescription>Informações completas sobre a ocorrência registrada</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{ocorrencia.student}</h3>
            <Badge
              className={cn(
                ocorrencia.severity === "Grave" && "bg-red-100 text-red-800 hover:bg-red-100",
                ocorrencia.severity === "Moderado" && "bg-amber-100 text-amber-800 hover:bg-amber-100",
                ocorrencia.severity === "Leve" && "bg-blue-100 text-blue-800 hover:bg-blue-100",
              )}
            >
              {ocorrencia.severity}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Tipo:</p>
              <p>{ocorrencia.type}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Data:</p>
              <p>{new Date(ocorrencia.date).toLocaleDateString("pt-BR")}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Descrição:</p>
            <p className="text-sm">{ocorrencia.description}</p>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Medidas Aplicadas:</p>
            <p className="text-sm">{ocorrencia.measures}</p>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Responsável pelo Registro:</p>
            <p className="text-sm">{ocorrencia.responsible}</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
