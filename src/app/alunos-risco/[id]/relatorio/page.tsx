"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Download, Printer } from "lucide-react"
import { useState, useEffect } from "react"

// Mock data for students at risk
const mockAlunos = [
  {
    id: "1",
    nome: "Carlos Oliveira",
    idade: 14,
    dataNascimento: "2009-05-15",
    escola: "Escola Municipal João da Silva",
    escolaId: "1",
    turma: "9º Ano A",
    nivel: "vermelho",
    ocorrencias: 8,
    faltas: 25,
    ultimaOcorrencia: "2023-04-05",
    reincidente: true,
    responsavel: "Maria Oliveira",
    telefoneResponsavel: "(48) 99999-1234",
    endereco: "Rua das Flores, 123 - Centro",
  },
  {
    id: "2",
    nome: "Ana Silva",
    idade: 12,
    dataNascimento: "2011-08-20",
    escola: "Escola Municipal João da Silva",
    escolaId: "1",
    turma: "7º Ano B",
    nivel: "amarelo",
    ocorrencias: 4,
    faltas: 15,
    ultimaOcorrencia: "2023-04-02",
    reincidente: false,
    responsavel: "João Silva",
    telefoneResponsavel: "(48) 99999-5678",
    endereco: "Av. Principal, 456 - Bairro Novo",
  },
  {
    id: "3",
    nome: "Pedro Santos",
    idade: 15,
    dataNascimento: "2008-02-10",
    escola: "Escola Estadual Maria Oliveira",
    escolaId: "2",
    turma: "1º Ano EM",
    nivel: "vermelho",
    ocorrencias: 6,
    faltas: 30,
    ultimaOcorrencia: "2023-04-01",
    reincidente: true,
    responsavel: "Antônio Santos",
    telefoneResponsavel: "(48) 99999-9012",
    endereco: "Rua dos Pinheiros, 789 - Jardim",
  },
  {
    id: "4",
    nome: "Mariana Costa",
    idade: 13,
    dataNascimento: "2010-11-05",
    escola: "Colégio Pedro Alves",
    escolaId: "3",
    turma: "8º Ano C",
    nivel: "azul",
    ocorrencias: 2,
    faltas: 8,
    ultimaOcorrencia: "2023-03-28",
    reincidente: false,
    responsavel: "Carla Costa",
    telefoneResponsavel: "(48) 99999-3456",
    endereco: "Av. Central, 321 - Centro",
  },
  {
    id: "5",
    nome: "Lucas Mendes",
    idade: 16,
    dataNascimento: "2007-07-25",
    escola: "Escola Estadual Maria Oliveira",
    escolaId: "2",
    turma: "2º Ano EM",
    nivel: "amarelo",
    ocorrencias: 3,
    faltas: 12,
    ultimaOcorrencia: "2023-03-25",
    reincidente: true,
    responsavel: "Paulo Mendes",
    telefoneResponsavel: "(48) 99999-7890",
    endereco: "Rua das Palmeiras, 654 - Jardim",
  },
]

export default function AlunoRiscoRelatorioPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [loading, setLoading] = useState(true)
  const [aluno, setAluno] = useState<any>(null)

  useEffect(() => {
    // Simulando carregamento de dados
    const timer = setTimeout(() => {
      const foundAluno = mockAlunos.find((a) => a.id === id)
      setAluno(foundAluno)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [id])

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Simulação de download
    alert("Relatório baixado com sucesso!")
  }

  if (loading || !aluno) {
    return (
      <ProtectedRoute allowedRoles={["conselheiro", "mp"]}>
        <MainLayout>
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mb-4" />
            <p className="text-muted-foreground">Carregando relatório...</p>
          </div>
        </MainLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["conselheiro", "mp"]}>
      <MainLayout>
        <div className="space-y-6 print:p-6">
          <div className="flex justify-between items-center print:hidden">
            <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Voltar</span>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrint} className="flex items-center gap-1">
                <Printer className="h-4 w-4 mr-1" />
                <span>Imprimir</span>
              </Button>
              <Button variant="outline" onClick={handleDownload} className="flex items-center gap-1">
                <Download className="h-4 w-4 mr-1" />
                <span>Baixar PDF</span>
              </Button>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Relatório de Acompanhamento</h1>
            <p className="text-muted-foreground">Aluno em Situação de Risco</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informações do Aluno</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Nome Completo</h3>
                  <p className="text-base font-medium">{aluno.nome}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Data de Nascimento</h3>
                  <p className="text-base">{new Date(aluno.dataNascimento).toLocaleDateString("pt-BR")}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Idade</h3>
                  <p className="text-base">{aluno.idade} anos</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Escola</h3>
                  <p className="text-base">{aluno.escola}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Turma</h3>
                  <p className="text-base">{aluno.turma}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Responsável</h3>
                  <p className="text-base">{aluno.responsavel}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Telefone</h3>
                  <p className="text-base">{aluno.telefoneResponsavel}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Endereço</h3>
                  <p className="text-base">{aluno.endereco}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Indicadores de Risco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border rounded-md p-4 text-center">
                  <h3 className="text-lg font-medium mb-2">Ocorrências</h3>
                  <p className="text-3xl font-bold text-red-600">{aluno.ocorrencias}</p>
                  <p className="text-sm text-muted-foreground mt-1">Registradas no sistema</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <h3 className="text-lg font-medium mb-2">Faltas</h3>
                  <p className="text-3xl font-bold text-amber-600">{aluno.faltas}</p>
                  <p className="text-sm text-muted-foreground mt-1">Dias letivos</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <h3 className="text-lg font-medium mb-2">Reincidência</h3>
                  <p className="text-3xl font-bold text-blue-600">{aluno.reincidente ? "Sim" : "Não"}</p>
                  <p className="text-sm text-muted-foreground mt-1">Histórico anterior</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Análise de Risco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Nível de Risco</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        aluno.nivel === "vermelho"
                          ? "bg-red-500 w-full"
                          : aluno.nivel === "amarelo"
                            ? "bg-amber-500 w-2/3"
                            : "bg-blue-500 w-1/3"
                      }`}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Baixo</span>
                    <span>Médio</span>
                    <span>Alto</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Observações</h3>
                  <p className="text-base">
                    {aluno.nivel === "vermelho"
                      ? `O aluno ${aluno.nome} apresenta um alto nível de risco devido ao número elevado de ocorrências disciplinares (${aluno.ocorrencias}) e faltas não justificadas (${aluno.faltas}). Recomenda-se intervenção imediata do Conselho Tutelar e acompanhamento psicossocial.`
                      : aluno.nivel === "amarelo"
                        ? `O aluno ${aluno.nome} apresenta um nível médio de risco com ${aluno.ocorrencias} ocorrências e ${aluno.faltas} faltas. Recomenda-se acompanhamento regular pela equipe pedagógica e contato com os responsáveis.`
                        : `O aluno ${aluno.nome} apresenta um nível baixo de risco, porém deve ser monitorado devido às ${aluno.ocorrencias} ocorrências e ${aluno.faltas} faltas registradas no período.`}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Recomendações</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {aluno.nivel === "vermelho" ? (
                      <>
                        <li>Notificação imediata ao Conselho Tutelar</li>
                        <li>Reunião com os responsáveis em caráter de urgência</li>
                        <li>Encaminhamento para acompanhamento psicológico</li>
                        <li>Elaboração de plano de intervenção individualizado</li>
                        <li>Monitoramento diário de frequência e comportamento</li>
                      </>
                    ) : aluno.nivel === "amarelo" ? (
                      <>
                        <li>Contato com os responsáveis para reunião</li>
                        <li>Acompanhamento semanal pela equipe pedagógica</li>
                        <li>Avaliação para possível encaminhamento psicológico</li>
                        <li>Monitoramento de frequência</li>
                      </>
                    ) : (
                      <>
                        <li>Monitoramento regular pela equipe pedagógica</li>
                        <li>Contato preventivo com os responsáveis</li>
                        <li>Inclusão em atividades extracurriculares</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 border-t pt-6 print:mt-20">
            <div className="flex flex-col items-center">
              <div className="w-64 border-b border-black mb-2"></div>
              <p>Assinatura do Responsável pelo Relatório</p>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
