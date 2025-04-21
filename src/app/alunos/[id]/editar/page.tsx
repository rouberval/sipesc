"use client"

import type React from "react"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Mock data for a student
const mockAluno = {
  id: "1",
  nome: "Carlos Oliveira",
  idade: 14,
  dataNascimento: "2009-05-15",
  turma: "9º Ano A",
  responsavel: "Maria Oliveira",
  telefone: "(48) 99999-1111",
  email: "maria.oliveira@email.com",
  endereco: "Rua das Flores, 123, Centro, Florianópolis",
  observacoes: "Aluno com dificuldades de concentração. Encaminhado para avaliação psicopedagógica em 10/03/2023.",
  faltas: 25,
  ocorrencias: 8,
  status: "risco",
  historico: [
    {
      data: "2023-09-10",
      tipo: "ocorrencia",
      descricao: "Conflito com colegas durante o intervalo",
    },
    {
      data: "2023-08-25",
      tipo: "falta",
      descricao: "Ausente por 5 dias consecutivos",
    },
    {
      data: "2023-07-15",
      tipo: "encaminhamento",
      descricao: "Encaminhado para avaliação com psicólogo escolar",
    },
  ],
}

export default function EditarAlunoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    dataNascimento: "",
    turma: "",
    responsavel: "",
    telefone: "",
    email: "",
    endereco: "",
    observacoes: "",
  })

  // Simular carregamento dos dados do aluno
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormData({
        nome: mockAluno.nome,
        idade: mockAluno.idade.toString(),
        dataNascimento: mockAluno.dataNascimento,
        turma: mockAluno.turma,
        responsavel: mockAluno.responsavel,
        telefone: mockAluno.telefone,
        email: mockAluno.email,
        endereco: mockAluno.endereco,
        observacoes: mockAluno.observacoes,
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simular salvamento
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Aluno atualizado",
        description: "As informações do aluno foram atualizadas com sucesso.",
      })
      router.push(`/alunos`)
    }, 1500)
  }

  const handleCancel = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <ProtectedRoute allowedRoles={["escola", "admin"]}>
        <MainLayout>
          <div className="flex items-center justify-center h-[70vh]">
            <LoadingSpinner size="lg" />
          </div>
        </MainLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["escola", "admin"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Editar Aluno</h1>
              <p className="text-muted-foreground">Atualize as informações do aluno</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Alterações"
                )}
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informações do Aluno</CardTitle>
              <CardDescription>Edite os dados cadastrais do aluno</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="dados-pessoais">
                <TabsList className="mb-6">
                  <TabsTrigger value="dados-pessoais">Dados Pessoais</TabsTrigger>
                  <TabsTrigger value="contato">Contato</TabsTrigger>
                  <TabsTrigger value="academico">Acadêmico</TabsTrigger>
                </TabsList>

                <TabsContent value="dados-pessoais">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo</Label>
                        <Input
                          id="nome"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          placeholder="Nome completo do aluno"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="idade">Idade</Label>
                        <Input
                          id="idade"
                          name="idade"
                          type="number"
                          value={formData.idade}
                          onChange={handleChange}
                          placeholder="Idade do aluno"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                        <Input
                          id="dataNascimento"
                          name="dataNascimento"
                          type="date"
                          value={formData.dataNascimento}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="responsavel">Responsável</Label>
                        <Input
                          id="responsavel"
                          name="responsavel"
                          value={formData.responsavel}
                          onChange={handleChange}
                          placeholder="Nome do responsável"
                        />
                      </div>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="contato">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleChange}
                          placeholder="Telefone de contato"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="E-mail de contato"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="endereco">Endereço Completo</Label>
                        <Input
                          id="endereco"
                          name="endereco"
                          value={formData.endereco}
                          onChange={handleChange}
                          placeholder="Endereço completo"
                        />
                      </div>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="academico">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="turma">Turma</Label>
                        <Select value={formData.turma} onValueChange={(value) => handleSelectChange("turma", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a turma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6º Ano A">6º Ano A</SelectItem>
                            <SelectItem value="6º Ano B">6º Ano B</SelectItem>
                            <SelectItem value="7º Ano A">7º Ano A</SelectItem>
                            <SelectItem value="7º Ano B">7º Ano B</SelectItem>
                            <SelectItem value="8º Ano A">8º Ano A</SelectItem>
                            <SelectItem value="8º Ano B">8º Ano B</SelectItem>
                            <SelectItem value="9º Ano A">9º Ano A</SelectItem>
                            <SelectItem value="9º Ano B">9º Ano B</SelectItem>
                            <SelectItem value="1º Ano EM">1º Ano EM</SelectItem>
                            <SelectItem value="2º Ano EM">2º Ano EM</SelectItem>
                            <SelectItem value="3º Ano EM">3º Ano EM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="observacoes">Observações</Label>
                        <Textarea
                          id="observacoes"
                          name="observacoes"
                          value={formData.observacoes}
                          onChange={handleChange}
                          placeholder="Observações sobre o aluno"
                          rows={5}
                        />
                      </div>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
