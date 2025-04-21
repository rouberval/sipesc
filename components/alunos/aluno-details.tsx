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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Calendar } from "lucide-react"

interface AlunoDetailsProps {
  aluno: any
  onClose: () => void
}

export function AlunoDetails({ aluno, onClose }: AlunoDetailsProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "risco":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Risco</Badge>
      case "atencao":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Atenção</Badge>
      case "normal":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Normal</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  // Mock data for student details
  const ocorrencias = [
    {
      id: 1,
      data: "2023-04-05",
      tipo: "Comportamento",
      descricao: "Agressão verbal a outro aluno durante o intervalo",
      gravidade: "Grave",
    },
    {
      id: 2,
      data: "2023-03-20",
      tipo: "Acadêmico",
      descricao: "Não entregou trabalho pela terceira vez consecutiva",
      gravidade: "Moderado",
    },
    {
      id: 3,
      data: "2023-03-10",
      tipo: "Comportamento",
      descricao: "Uso de celular durante a aula após advertência",
      gravidade: "Leve",
    },
  ]

  const faltas = [
    { id: 1, data: "2023-04-10", justificada: false },
    { id: 2, data: "2023-04-05", justificada: false },
    { id: 3, data: "2023-03-28", justificada: true },
    { id: 4, data: "2023-03-22", justificada: false },
    { id: 5, data: "2023-03-15", justificada: false },
  ]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Aluno</DialogTitle>
          <DialogDescription>Informações completas sobre o aluno</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">{aluno.nome}</h3>
            {getStatusBadge(aluno.status)}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Idade:</p>
              <p>{aluno.idade} anos</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Turma:</p>
              <p>{aluno.turma}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Responsável:</p>
              <p>{aluno.responsavel}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Telefone:</p>
              <p>{aluno.telefone}</p>
            </div>
          </div>

          <Tabs defaultValue="ocorrencias" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ocorrencias">Ocorrências</TabsTrigger>
              <TabsTrigger value="faltas">Faltas</TabsTrigger>
            </TabsList>
            <TabsContent value="ocorrencias">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                    Ocorrências
                  </CardTitle>
                  <CardDescription>Histórico de ocorrências do aluno</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ocorrencias.map((ocorrencia) => (
                      <div key={ocorrencia.id} className="border rounded-md p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{ocorrencia.tipo}</span>
                          <Badge
                            className={
                              ocorrencia.gravidade === "Grave"
                                ? "bg-red-100 text-red-800"
                                : ocorrencia.gravidade === "Moderado"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                            }
                          >
                            {ocorrencia.gravidade}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{ocorrencia.descricao}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(ocorrencia.data).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="faltas">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-red-500" />
                    Faltas
                  </CardTitle>
                  <CardDescription>Histórico de faltas do aluno</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {faltas.map((falta) => (
                      <div key={falta.id} className="flex justify-between items-center border-b py-2">
                        <span>{new Date(falta.data).toLocaleDateString("pt-BR")}</span>
                        {falta.justificada ? (
                          <Badge className="bg-green-100 text-green-800">Justificada</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Não Justificada</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
