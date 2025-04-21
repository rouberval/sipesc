"use client"

import type React from "react"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, Paperclip, Send } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

// Mock data
const mockDestinatarios = [
  { id: "1", nome: "Conselho Tutelar Norte", tipo: "conselho" },
  { id: "2", nome: "Conselho Tutelar Sul", tipo: "conselho" },
  { id: "3", nome: "Escola Municipal João da Silva", tipo: "escola" },
  { id: "4", nome: "Escola Estadual Maria Oliveira", tipo: "escola" },
  { id: "5", nome: "Colégio Pedro Alves", tipo: "escola" },
]

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
  },
]

export default function NovaMensagemPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const { toast } = useToast()

  const [destinatarioId, setDestinatarioId] = useState("")
  const [assunto, setAssunto] = useState("")
  const [conteudo, setConteudo] = useState("")
  const [anexos, setAnexos] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [destinatariosDisponiveis, setDestinatariosDisponiveis] = useState<any[]>([])

  // Parâmetros da URL
  const escolaIdParam = searchParams.get("escolaId")
  const respostaIdParam = searchParams.get("resposta")

  useEffect(() => {
    // Filtrar destinatários com base no papel do usuário
    if (user?.role === "escola") {
      // Escolas só podem enviar para conselhos
      setDestinatariosDisponiveis(mockDestinatarios.filter((d) => d.tipo === "conselho"))
    } else if (user?.role === "conselheiro") {
      // Conselhos só podem enviar para escolas
      setDestinatariosDisponiveis(mockDestinatarios.filter((d) => d.tipo === "escola"))
    } else {
      // Admin pode enviar para qualquer um
      setDestinatariosDisponiveis(mockDestinatarios)
    }

    // Se for uma resposta, preencher os campos
    if (respostaIdParam) {
      const mensagemOriginal = mockMensagens.find((m) => m.id === respostaIdParam)
      if (mensagemOriginal) {
        // Inverter remetente e destinatário
        setDestinatarioId(mensagemOriginal.remetenteId)
        setAssunto(`Re: ${mensagemOriginal.assunto}`)
        setConteudo(
          `\n\n\n---\nEm ${new Date(mensagemOriginal.data).toLocaleDateString("pt-BR")}, ${mensagemOriginal.remetente} escreveu:\n\n${mensagemOriginal.conteudo}`,
        )
      }
    }

    // Se for uma mensagem para uma escola específica
    if (escolaIdParam) {
      setDestinatarioId(escolaIdParam)
    }
  }, [user, escolaIdParam, respostaIdParam])

  const handleVoltar = () => {
    router.back()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setAnexos((prev) => [...prev, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    setAnexos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação
    if (!destinatarioId) {
      toast({
        title: "Erro",
        description: "Selecione um destinatário",
        variant: "destructive",
      })
      return
    }

    if (!assunto) {
      toast({
        title: "Erro",
        description: "Informe um assunto para a mensagem",
        variant: "destructive",
      })
      return
    }

    if (!conteudo) {
      toast({
        title: "Erro",
        description: "O conteúdo da mensagem não pode estar vazio",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulação de envio
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Mensagem enviada",
        description: "Sua mensagem foi enviada com sucesso",
      })

      router.push("/mensagens")
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar a mensagem. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Nova Mensagem</CardTitle>
                <CardDescription>Envie uma mensagem para escolas ou conselhos tutelares</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="destinatario">Destinatário</Label>
                  <Select value={destinatarioId} onValueChange={setDestinatarioId}>
                    <SelectTrigger id="destinatario">
                      <SelectValue placeholder="Selecione o destinatário" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinatariosDisponiveis.map((dest) => (
                        <SelectItem key={dest.id} value={dest.id}>
                          {dest.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assunto">Assunto</Label>
                  <Input
                    id="assunto"
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                    placeholder="Informe o assunto da mensagem"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conteudo">Mensagem</Label>
                  <Textarea
                    id="conteudo"
                    value={conteudo}
                    onChange={(e) => setConteudo(e.target.value)}
                    placeholder="Digite sua mensagem aqui..."
                    rows={8}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="anexos">Anexos</Label>
                  <div className="flex items-center gap-2">
                    <Input id="anexos" type="file" onChange={handleFileChange} className="hidden" multiple />
                    <Label
                      htmlFor="anexos"
                      className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted"
                    >
                      <Paperclip className="h-4 w-4" />
                      Adicionar anexos
                    </Label>
                  </div>

                  {anexos.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {anexos.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center">
                            <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{file.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              ({(file.size / 1024).toFixed(0)} KB)
                            </span>
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveFile(index)}>
                            Remover
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar mensagem
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
