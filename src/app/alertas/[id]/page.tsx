"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { AlertTriangle, ArrowLeft, Bell, BellOff, Calendar, FileText, School, User } from "lucide-react"

// Mock data for a single alert
const getMockAlerta = (id: string) => {
  const alertas = [
    {
      id: "1",
      tipo: "Evasão Escolar",
      escola: "Escola Municipal João da Silva",
      escolaId: "1",
      conselho: "Conselho Tutelar Norte",
      conselhoId: "1",
      aluno: "Carlos Oliveira",
      alunoId: "1",
      data: "2023-04-05",
      status: "pendente",
      diasSemResposta: 15,
      descricao: "Aluno com mais de 30 faltas consecutivas sem justificativa",
      detalhes:
        "O aluno Carlos Oliveira está há mais de 30 dias sem comparecer às aulas. Tentativas de contato com a família não tiveram sucesso. A escola já realizou 3 tentativas de contato por telefone e enviou 2 comunicados por escrito.",
      historico: [
        { data: "2023-03-01", descricao: "Primeira falta registrada" },
        { data: "2023-03-15", descricao: "Contato telefônico sem sucesso" },
        { data: "2023-03-20", descricao: "Envio de comunicado escrito" },
        { data: "2023-03-30", descricao: "Segunda tentativa de contato telefônico" },
        { data: "2023-04-05", descricao: "Encaminhamento ao Conselho Tutelar" },
      ],
      acoes: [
        { data: "2023-04-06", responsavel: "Maria Silva (CT)", descricao: "Visita domiciliar agendada" },
        { data: "2023-04-10", responsavel: "João Santos (CT)", descricao: "Tentativa de contato com familiares" },
      ],
    },
    {
      id: "2",
      tipo: "Violência",
      escola: "Escola Estadual Maria Oliveira",
      escolaId: "2",
      conselho: "Conselho Tutelar Sul",
      conselhoId: "2",
      aluno: "Pedro Santos",
      alunoId: "3",
      data: "2023-04-02",
      status: "pendente",
      diasSemResposta: 18,
      descricao: "Aluno com sinais de violência física",
      detalhes:
        "O aluno Pedro Santos apresentou hematomas nos braços e costas. Quando questionado, demonstrou nervosismo e disse que caiu da bicicleta. A professora notou comportamento retraído e medo.",
      historico: [
        { data: "2023-03-25", descricao: "Primeiro registro de comportamento alterado" },
        { data: "2023-03-30", descricao: "Observação de hematomas" },
        { data: "2023-04-01", descricao: "Conversa com o aluno pela psicóloga escolar" },
        { data: "2023-04-02", descricao: "Encaminhamento ao Conselho Tutelar" },
      ],
      acoes: [
        { data: "2023-04-03", responsavel: "Ana Pereira (CT)", descricao: "Visita domiciliar realizada" },
        { data: "2023-04-05", responsavel: "Carlos Mendes (CT)", descricao: "Entrevista com os pais" },
      ],
    },
    {
      id: "3",
      tipo: "Reincidência",
      escola: "Colégio Pedro Alves",
      escolaId: "3",
      conselho: "Conselho Tutelar Leste",
      conselhoId: "3",
      aluno: "Lucas Mendes",
      alunoId: "5",
      data: "2023-03-28",
      status: "em_andamento",
      diasSemResposta: 22,
      descricao: "Aluno reincidente em ocorrências graves",
      detalhes:
        "O aluno Lucas Mendes já foi encaminhado 3 vezes ao Conselho Tutelar por comportamento agressivo com colegas. Recentemente, envolveu-se em uma briga que resultou em ferimentos leves em outro estudante.",
      historico: [
        { data: "2022-10-15", descricao: "Primeiro encaminhamento por agressão" },
        { data: "2023-01-20", descricao: "Segundo encaminhamento por comportamento agressivo" },
        { data: "2023-03-25", descricao: "Briga com colega de classe" },
        { data: "2023-03-28", descricao: "Terceiro encaminhamento ao Conselho Tutelar" },
      ],
      acoes: [
        { data: "2023-03-29", responsavel: "Roberto Alves (CT)", descricao: "Reunião com a família" },
        {
          data: "2023-04-02",
          responsavel: "Márcia Souza (CT)",
          descricao: "Encaminhamento para atendimento psicológico",
        },
      ],
    },
    {
      id: "4",
      tipo: "Abandono",
      escola: "Escola Municipal João da Silva",
      escolaId: "1",
      conselho: "Conselho Tutelar Norte",
      conselhoId: "1",
      aluno: "Ana Silva",
      alunoId: "2",
      data: "2023-03-25",
      status: "resolvido",
      diasSemResposta: 0,
      descricao: "Aluna com sinais de abandono familiar",
      detalhes:
        "A aluna Ana Silva compareceu à escola por vários dias sem material escolar, uniforme inadequado e sem alimentação adequada. Relatou que estava sozinha em casa por longos períodos.",
      historico: [
        { data: "2023-03-10", descricao: "Primeiro registro de negligência" },
        { data: "2023-03-15", descricao: "Conversa com a aluna pela orientadora" },
        { data: "2023-03-20", descricao: "Tentativa de contato com responsáveis" },
        { data: "2023-03-25", descricao: "Encaminhamento ao Conselho Tutelar" },
      ],
      acoes: [
        { data: "2023-03-26", responsavel: "Juliana Costa (CT)", descricao: "Visita domiciliar" },
        { data: "2023-03-30", responsavel: "Paulo Ribeiro (CT)", descricao: "Acompanhamento familiar iniciado" },
        {
          data: "2023-04-10",
          responsavel: "Juliana Costa (CT)",
          descricao: "Caso resolvido - Família recebendo apoio social",
        },
      ],
    },
  ]

  return alertas.find((alerta) => alerta.id === id) || alertas[0]
}

export default function AlertaDetalhesPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [alerta, setAlerta] = useState<any>(null)

  useEffect(() => {
    // Simular carregamento de dados
    setIsLoading(true)
    setTimeout(() => {
      const alertaData = getMockAlerta(params.id)
      setAlerta(alertaData)
      setIsLoading(false)
    }, 800)
  }, [params.id])

  const handleToggleStatus = () => {
    if (!alerta) return

    setIsLoading(true)
    // Simular uma chamada de API para atualizar o status
    setTimeout(() => {
      const newStatus = alerta.status === "resolvido" ? "pendente" : "resolvido"
      setAlerta({ ...alerta, status: newStatus })
      setIsLoading(false)

      toast({
        title: "Status atualizado",
        description: `Alerta marcado como ${newStatus === "resolvido" ? "resolvido" : "pendente"}`,
        variant: newStatus === "resolvido" ? "success" : "default",
      })
    }, 500)
  }

  const handleBack = () => {
    router.back()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Pendente</Badge>
      case "em_andamento":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Em Andamento</Badge>
      case "resolvido":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolvido</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <ProtectedRoute allowedRoles={["mp"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">Detalhes do Alerta</h1>
            </div>

            {alerta && (
              <Button
                variant={alerta.status === "resolvido" ? "outline" : "default"}
                onClick={handleToggleStatus}
                disabled={isLoading}
              >
                {alerta.status === "resolvido" ? (
                  <>
                    <BellOff className="mr-2 h-4 w-4" />
                    Marcar como Pendente
                  </>
                ) : (
                  <>
                    <Bell className="mr-2 h-4 w-4" />
                    Marcar como Resolvido
                  </>
                )}
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="flex flex-col items-center gap-2">
                <AlertTriangle className="h-10 w-10 text-amber-500 animate-pulse" />
                <p className="text-sm text-muted-foreground">Carregando detalhes do alerta...</p>
              </div>
            </div>
          ) : alerta ? (
            <>
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <CardTitle className="text-xl">{alerta.tipo}</CardTitle>
                      <CardDescription>{alerta.descricao}</CardDescription>
                    </div>
                    <div>{getStatusBadge(alerta.status)}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <School className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Escola</p>
                          <p className="text-sm text-muted-foreground">{alerta.escola}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Aluno</p>
                          <p className="text-sm text-muted-foreground">{alerta.aluno}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Conselho Tutelar</p>
                          <p className="text-sm text-muted-foreground">{alerta.conselho}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Data do Alerta</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(alerta.data).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>
                      {alerta.status !== "resolvido" && (
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Dias sem Resposta</p>
                            <p className="text-sm text-red-500">{alerta.diasSemResposta} dias</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Detalhes da Situação</h3>
                    <p className="text-sm text-muted-foreground">{alerta.detalhes}</p>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="historico">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="historico">Histórico</TabsTrigger>
                  <TabsTrigger value="acoes">Ações Realizadas</TabsTrigger>
                </TabsList>
                <TabsContent value="historico">
                  <Card>
                    <CardHeader>
                      <CardTitle>Histórico do Caso</CardTitle>
                      <CardDescription>Registro cronológico dos eventos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {alerta.historico.map((item: any, index: number) => (
                          <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                            <div className="min-w-[100px] text-sm">
                              {new Date(item.data).toLocaleDateString("pt-BR")}
                            </div>
                            <div>
                              <p className="text-sm">{item.descricao}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="acoes">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ações Realizadas</CardTitle>
                      <CardDescription>Intervenções e encaminhamentos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {alerta.acoes.map((item: any, index: number) => (
                          <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                            <div className="min-w-[100px] text-sm">
                              {new Date(item.data).toLocaleDateString("pt-BR")}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{item.responsavel}</p>
                              <p className="text-sm text-muted-foreground">{item.descricao}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Adicionar Nova Ação</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <AlertTriangle className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-lg font-medium">Alerta não encontrado</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  O alerta solicitado não foi encontrado ou não está mais disponível.
                </p>
                <Button onClick={handleBack}>Voltar para a lista de alertas</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
