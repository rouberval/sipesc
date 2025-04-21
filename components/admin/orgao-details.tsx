"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Info, Users } from "lucide-react"

interface OrgaoDetailsProps {
  orgao: any
  onClose: () => void
}

export function OrgaoDetails({ orgao, onClose }: OrgaoDetailsProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Órgão</DialogTitle>
          <DialogDescription>Informações detalhadas sobre o órgão</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{orgao.nome}</h3>
            <Badge
              className={
                orgao.status === "ativo"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : "bg-red-100 text-red-800 hover:bg-red-100"
              }
            >
              {orgao.status === "ativo" ? "Ativo" : "Inativo"}
            </Badge>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span>{orgao.descricao}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Data de criação: {orgao.dataCriacao}</span>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-2 mb-2">
                <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="font-medium">Módulos de acesso:</span>
              </div>
              <div className="flex flex-wrap gap-2 ml-6">
                {orgao.permissoes.map((permissao: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {permissao}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="font-medium mb-2">Estatísticas</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Usuários Vinculados</p>
                  <p className="text-lg font-medium">12</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Escolas Vinculadas</p>
                  <p className="text-lg font-medium">5</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Alunos Monitorados</p>
                  <p className="text-lg font-medium">145</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Último Acesso</p>
                  <p className="text-lg font-medium">Hoje, 10:45</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
