"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { FrequenciaList } from "@/components/frequencia/frequencia-list"
import { FrequenciaForm } from "@/components/frequencia/frequencia-form"
import { FrequenciaAlertas } from "@/components/frequencia/frequencia-alertas"

export default function FrequenciaPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Frequência</h1>
          <Button onClick={() => setIsFormOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Registrar Frequência
          </Button>
        </div>

        <Tabs defaultValue="frequencia" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="frequencia">Frequência Mensal</TabsTrigger>
            <TabsTrigger value="alertas">Alertas</TabsTrigger>
          </TabsList>
          <TabsContent value="frequencia">
            <Card>
              <CardHeader>
                <CardTitle>Frequência Mensal</CardTitle>
                <CardDescription>Registro de frequência dos alunos no mês atual</CardDescription>
              </CardHeader>
              <CardContent>
                <FrequenciaList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="alertas">
            <Card>
              <CardHeader>
                <CardTitle>Alertas de Frequência</CardTitle>
                <CardDescription>Alunos com problemas de frequência</CardDescription>
              </CardHeader>
              <CardContent>
                <FrequenciaAlertas />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {isFormOpen && <FrequenciaForm onClose={() => setIsFormOpen(false)} />}
      </div>
    </MainLayout>
  )
}
