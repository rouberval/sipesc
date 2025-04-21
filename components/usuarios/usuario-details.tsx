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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X } from "lucide-react"

interface UsuarioDetailsProps {
  usuario: any
  onClose: () => void
}

export function UsuarioDetails({ usuario, onClose }: UsuarioDetailsProps) {
  // Mock data para histórico de atividades
  const mockAtividades = [
    { id: 1, data: "2023-05-15 14:30", acao: "Login no sistema", ip: "192.168.1.1" },
    { id: 2, data: "2023-05-14 10:15", acao: "Alteração de senha", ip: "192.168.1.1" },
    { id: 3, data: "2023-05-10 09:45", acao: "Cadastro de aluno", ip: "192.168.1.1" },
    { id: 4, data: "2023-05-08 16:20", acao: "Registro de ocorrência", ip: "192.168.1.1" },
  ]

  // Mock data para permissões
  const mockPermissoes = {
    alunos: true,
    ocorrencias: true,
    encaminhamentos: false,
    relatorios: true,
    configuracoes: false,
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do Usuário</DialogTitle>
          <DialogDescription>Informações completas sobre o usuário</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="permissoes">Permissões</TabsTrigger>
            <TabsTrigger value="atividades">Atividades</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{usuario.name}</h3>
              <Badge variant={usuario.status === "ativo" ? "success" : "secondary"} className="capitalize">
                {usuario.status || "Ativo"}
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Email:</p>
              <p className="text-sm">{usuario.email}</p>
            </div>

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Papel:</p>
              <Badge variant="outline" className="capitalize">
                {usuario.role}
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Escola:</p>
              <p className="text-sm">{usuario.school}</p>
            </div>
          </TabsContent>

          <TabsContent value="permissoes" className="space-y-4 py-4">
            <h3 className="font-medium text-sm mb-2">Acesso aos módulos:</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Gerenciamento de Alunos</span>
                {mockPermissoes.alunos ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Registro de Ocorrências</span>
                {mockPermissoes.ocorrencias ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Encaminhamentos</span>
                {mockPermissoes.encaminhamentos ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Relatórios</span>
                {mockPermissoes.relatorios ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Configurações do Sistema</span>
                {mockPermissoes.configuracoes ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="atividades" className="space-y-4 py-4">
            <h3 className="font-medium text-sm mb-2">Histórico de atividades recentes:</h3>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {mockAtividades.map((atividade) => (
                    <div key={atividade.id} className="py-2 px-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{atividade.acao}</span>
                        <span className="text-xs text-muted-foreground">{atividade.data}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">IP: {atividade.ip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
