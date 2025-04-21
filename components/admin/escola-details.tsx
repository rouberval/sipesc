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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, User, Shield } from "lucide-react"

interface EscolaDetailsProps {
  escola: any
  onClose: () => void
}

export function EscolaDetails({ escola, onClose }: EscolaDetailsProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes da Escola</DialogTitle>
          <DialogDescription>Informações detalhadas sobre a escola</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="vinculacoes">Vinculações</TabsTrigger>
            <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{escola.nome}</h3>
              <Badge
                className={
                  escola.status === "ativo"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : "bg-red-100 text-red-800 hover:bg-red-100"
                }
              >
                {escola.status === "ativo" ? "Ativo" : "Inativo"}
              </Badge>
            </div>

            <div className="grid gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>
                  {escola.endereco}, {escola.municipio} - Região {escola.regiao}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{escola.telefone}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Diretor(a): {escola.diretor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{escola.email || "email@escola.com"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>Vinculado ao {escola.conselhoNome}</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vinculacoes" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Professores Vinculados</CardTitle>
                <CardDescription>Professores cadastrados nesta escola</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Ana Silva</span>
                    <Badge>Ativo</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Carlos Oliveira</span>
                    <Badge>Ativo</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Mariana Costa</span>
                    <Badge>Ativo</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Roberto Santos</span>
                    <Badge variant="outline">Inativo</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="estatisticas" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">450</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Ocorrências</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Encaminhamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Alertas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
