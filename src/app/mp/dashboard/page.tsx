"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, FileText, AlertTriangle, School, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { OcorrenciasChart } from "@/components/painel-bi/ocorrencias-chart"
import { EncaminhamentosChart } from "@/components/painel-bi/encaminhamentos-chart"
import { FrequenciaChart } from "@/components/painel-bi/frequencia-chart"
import { StatusEncaminhamentosChart } from "@/components/painel-bi/status-encaminhamentos-chart"

export default function MPDashboardPage() {
  const router = useRouter()

  return (
    <ProtectedRoute allowedRoles={["mp"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Painel do Ministério Público</h1>
              <p className="text-muted-foreground">
                Visão geral do sistema de proteção escolar e acompanhamento de casos
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => router.push("/relatorios")}>
                <FileText className="mr-2 h-4 w-4" />
                Relatórios
              </Button>
              <Button variant="outline" onClick={() => router.push("/alertas")}>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Alertas
              </Button>
              <Button onClick={() => router.push("/painel-bi")}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Painel BI Completo
              </Button>
            </div>
          </div>

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Visão Geral</CardTitle>
                <CardDescription>Resumo dos principais indicadores do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="ocorrencias">
                  <TabsList className="mb-4">
                    <TabsTrigger value="ocorrencias">Ocorrências</TabsTrigger>
                    <TabsTrigger value="encaminhamentos">Encaminhamentos</TabsTrigger>
                    <TabsTrigger value="frequencia">Frequência</TabsTrigger>
                  </TabsList>
                  <TabsContent value="ocorrencias" className="h-[300px]">
                    <OcorrenciasChart />
                  </TabsContent>
                  <TabsContent value="encaminhamentos" className="h-[300px]">
                    <EncaminhamentosChart />
                  </TabsContent>
                  <TabsContent value="frequencia" className="h-[300px]">
                    <FrequenciaChart />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status de Encaminhamentos</CardTitle>
                <CardDescription>Distribuição por status</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <StatusEncaminhamentosChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <School className="mr-2 h-5 w-5 text-blue-600" />
                  Escolas
                </CardTitle>
                <CardDescription>Gerenciamento de escolas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Acesse informações detalhadas sobre escolas, alunos e ocorrências registradas.
                </p>
                <Button variant="outline" className="w-full" onClick={() => router.push("/escolas")}>
                  Ver Escolas
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-green-600" />
                  Conselhos Tutelares
                </CardTitle>
                <CardDescription>Acompanhamento de conselhos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Monitore a atuação dos conselhos tutelares e os casos em andamento.</p>
                <Button variant="outline" className="w-full" onClick={() => router.push("/conselhos")}>
                  Ver Conselhos
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-amber-600" />
                  Alunos em Risco
                </CardTitle>
                <CardDescription>Casos prioritários</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Visualize e acompanhe os alunos em situação de risco que necessitam de atenção.
                </p>
                <Button variant="outline" className="w-full" onClick={() => router.push("/alunos-risco")}>
                  Ver Alunos em Risco
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
