"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Paperclip, Reply } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for messages
const mockMensagens = [
  {
    id: "1",
    remetente: "Escola Municipal João da Silva",
    remetenteId: "1",
    destinatario: "Conselho Tutelar Norte",
    destinatarioId: "1",
    assunto: "Aluno com faltas consecutivas",
    data: "2023-04-10T10:30:00",
    lida: true,
    tipo: "escola-para-conselho",
    conteudo:
      "Prezados,\n\nVimos informar que o aluno João Pedro da Silva, matrícula 12345, tem apresentado faltas consecutivas nos últimos 15 dias. Já tentamos contato com os responsáveis pelos telefones cadastrados, mas não obtivemos sucesso.\n\nSolicitamos a intervenção do Conselho Tutelar para verificar a situação.\n\nAtenciosamente,\nDireção Escolar",
    anexos: [
      { id: "1", nome: "Registro_Frequencia.pdf", tamanho: "245 KB" },
      { id: "2", nome: "Tentativas_Contato.pdf", tamanho: "120 KB" },
    ],
  },
  {
    id: "2",
    remetente: "Conselho Tutelar Norte",
    remetenteId: "1",
    destinatario: "Escola Municipal João da Silva",
    destinatarioId: "1",
    assunto: "Resposta: Aluno com faltas consecutivas",
    data: "2023-04-11T14:15:00",
    lida: false,
    tipo: "conselho-para-escola",
    conteudo:
      "Prezada Direção,\n\nRecebemos a informação sobre o aluno João Pedro da Silva. Informamos que uma visita domiciliar foi agendada para o dia 12/04/2023.\n\nRetornaremos com informações após a visita.\n\nAtenciosamente,\nConselho Tutelar Norte",
    anexos: [],
  },
  {
    id: "3",
    remetente: "Escola Estadual Maria Oliveira",
    remetenteId: "2",
    destinatario: "Conselho Tutelar Norte",
    destinatarioId: "1",
    assunto: "Suspeita de maus-tratos",
    data: "2023-04-12T09:45:00",
    lida: false,
    tipo: "escola-para-conselho",
    conteudo:
      "Prezados Conselheiros,\n\nSolicitamos atenção para o caso da aluna Maria Oliveira, 10 anos, que tem apresentado sinais preocupantes que podem indicar maus-tratos.\n\nA aluna tem chegado à escola com hematomas e mudanças comportamentais significativas nas últimas semanas.\n\nSolicitamos verificação urgente.\n\nAtenciosamente,\nCoordenação Pedagógica",
    anexos: [{ id: "3", nome: "Relatorio_Observacoes.pdf", tamanho: "310 KB" }],
  },
  {
    id: "4",
    remetente: "Escola Municipal João da Silva",
    remetenteId: "1",
    destinatario: "Conselho Tutelar Norte",
    destinatarioId: "1",
    assunto: "Solicitação de intervenção",
    data: "2023-04-15T11:20:00",
    lida: true,
    tipo: "escola-para-conselho",
    conteudo:
      "Prezados,\n\nSolicitamos intervenção no caso do aluno Pedro Henrique, 14 anos, que tem apresentado comportamento agressivo e uso de substâncias ilícitas nas dependências da escola.\n\nJá realizamos reuniões com os responsáveis, mas não houve melhora na situação.\n\nAtenciosamente,\nDireção Escolar",
    anexos: [
      { id: "4", nome: "Ocorrencias_Registradas.pdf", tamanho: "420 KB" },
      { id: "5", nome: "Atas_Reunioes.pdf", tamanho: "280 KB" },
    ],
  },
  {
    id: "5",
    remetente: "Conselho Tutelar Norte",
    remetenteId: "1",
    destinatario: "Escola Municipal João da Silva",
    destinatarioId: "1",
    assunto: "Agendamento de visita",
    data: "2023-04-16T09:00:00",
    lida: false,
    tipo: "conselho-para-escola",
    conteudo:
      "Prezada Direção,\n\nInformamos que realizaremos uma visita à escola no dia 20/04/2023, às 14h, para discutir os casos recentes encaminhados e alinhar procedimentos.\n\nSolicitamos a presença da equipe pedagógica e direção.\n\nAtenciosamente,\nConselho Tutelar Norte",
    anexos: [],
  },
]

export default function MensagemDetalhesPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [mensagem, setMensagem] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento da mensagem
    const msg = mockMensagens.find((m) => m.id === params.id)

    if (msg) {
      // Marcar como lida
      msg.lida = true
      setMensagem(msg)
    }

    setLoading(false)
  }, [params.id])

  const handleVoltar = () => {
    router.back()
  }

  const handleResponder = () => {
    router.push(`/mensagens/nova?resposta=${params.id}`)
  }

  const handleDownloadAnexo = (anexoId: string) => {
    // Simulação de download
    alert(`Download do anexo ${anexoId} iniciado`)
  }

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["escola", "conselheiro", "admin"]}>
        <MainLayout>
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </MainLayout>
      </ProtectedRoute>
    )
  }

  if (!mensagem) {
    return (
      <ProtectedRoute allowedRoles={["escola", "conselheiro", "admin"]}>
        <MainLayout>
          <div className="space-y-6">
            <Button variant="ghost" onClick={handleVoltar} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>

            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <h2 className="text-xl font-semibold mb-2">Mensagem não encontrada</h2>
                <p className="text-muted-foreground">A mensagem solicitada não existe ou foi removida.</p>
                <Button onClick={handleVoltar} className="mt-4">
                  Voltar para mensagens
                </Button>
              </CardContent>
            </Card>
          </div>
        </MainLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["escola", "conselheiro", "admin"]}>
      <MainLayout>
        <div className="space-y-6">
          <Button variant="ghost" onClick={handleVoltar} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para mensagens
          </Button>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{mensagem.assunto}</CardTitle>
                  <CardDescription className="mt-2">
                    {new Date(mensagem.data).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </CardDescription>
                </div>
                <Badge variant={mensagem.tipo === "escola-para-conselho" ? "default" : "secondary"}>
                  {mensagem.tipo === "escola-para-conselho" ? "Escola → Conselho" : "Conselho → Escola"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`/abstract-geometric-shapes.png?height=40&width=40&query=${mensagem.remetente}`} />
                  <AvatarFallback>{mensagem.remetente.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">De: {mensagem.remetente}</h3>
                  <p className="text-sm text-muted-foreground">Para: {mensagem.destinatario}</p>
                </div>
              </div>

              <Separator />

              <div className="whitespace-pre-wrap">{mensagem.conteudo}</div>

              {mensagem.anexos && mensagem.anexos.length > 0 && (
                <div className="pt-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Anexos ({mensagem.anexos.length})
                  </h3>
                  <div className="space-y-2">
                    {mensagem.anexos.map((anexo: any) => (
                      <div key={anexo.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center">
                          <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{anexo.nome}</span>
                          <span className="text-xs text-muted-foreground ml-2">({anexo.tamanho})</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleDownloadAnexo(anexo.id)}>
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button onClick={handleResponder}>
                <Reply className="mr-2 h-4 w-4" />
                Responder
              </Button>
            </CardFooter>
          </Card>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
