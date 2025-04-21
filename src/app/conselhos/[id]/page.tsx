"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ArrowLeft, Mail, Phone, MapPin, User, Calendar, Building } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ConselhoEscolasMap } from "@/components/conselhos/conselho-escolas-map"

// Tipo para o conselho tutelar
interface Conselho {
  id: string
  nome: string
  endereco: string
  telefone: string
  email: string
  regiao: string
  municipio: string
  coordenador: string
  escolasVinculadas: number
  status: "ativo" | "inativo"
  dataCriacao: string
}

export default function ConselhoDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const [conselho, setConselho] = useState<Conselho | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchConselho = async () => {
      try {
        // Simulação de chamada de API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Dados mockados
        const mockConselho: Conselho = {
          id,
          nome: "Conselho Tutelar Norte",
          endereco: "Rua das Flores, 123, Norte",
          telefone: "(48) 3333-1111",
          email: "conselho.norte@sipesc.com",
          regiao: "Norte",
          municipio: "Florianópolis",
          coordenador: "Maria Santos",
          escolasVinculadas: 8,
          status: "ativo",
          dataCriacao: "2023-01-15",
        }

        setConselho(mockConselho)
      } catch (error) {
        console.error("Erro ao carregar conselho:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchConselho()
  }, [id])

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <LoadingSpinner size="lg" />
        </div>
      </MainLayout>
    )
  }

  if (!conselho) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <h2 className="text-2xl font-bold mb-4">Conselho Tutelar não encontrado</h2>
          <p className="text-muted-foreground mb-6">O conselho tutelar solicitado não foi encontrado.</p>
          <Link href="/conselhos">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a lista
            </Button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/conselhos">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">{conselho.nome}</h1>
            <Badge
              className={
                conselho.status === "ativo"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : "bg-red-100 text-red-800 hover:bg-red-100"
              }
            >
              {conselho.status === "ativo" ? "Ativo" : "Inativo"}
            </Badge>
          </div>
          <div>
            <Link href={`/conselhos/${id}/relatorio`}>
              <Button>Gerar Relatório</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Informações do Conselho</CardTitle>
              <CardDescription>Detalhes do conselho tutelar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Endereço</p>
                  <p className="text-muted-foreground">{conselho.endereco}</p>
                  <p className="text-muted-foreground">
                    {conselho.municipio} - Região {conselho.regiao}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Telefone</p>
                  <p className="text-muted-foreground">{conselho.telefone}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{conselho.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Coordenador</p>
                  <p className="text-muted-foreground">{conselho.coordenador}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Escolas Vinculadas</p>
                  <p className="text-muted-foreground">{conselho.escolasVinculadas} escolas</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Data de Cadastro</p>
                  <p className="text-muted-foreground">{new Date(conselho.dataCriacao).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <Tabs defaultValue="escolas" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="escolas">Escolas</TabsTrigger>
                <TabsTrigger value="ocorrencias">Ocorrências</TabsTrigger>
                <TabsTrigger value="encaminhamentos">Encaminhamentos</TabsTrigger>
              </TabsList>

              <TabsContent value="escolas" className="mt-4">
                <ConselhoEscolasMap conselhoId={id} />
              </TabsContent>

              <TabsContent value="ocorrencias" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Ocorrências Recentes</CardTitle>
                    <CardDescription>Últimas ocorrências registradas nas escolas vinculadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">Nenhuma ocorrência recente para exibir</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="encaminhamentos" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Encaminhamentos</CardTitle>
                    <CardDescription>Encaminhamentos realizados pelo conselho</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">Nenhum encaminhamento para exibir</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
