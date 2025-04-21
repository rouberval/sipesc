"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import { OcorrenciasList } from "@/components/ocorrencias/ocorrencias-list"
import { OcorrenciaForm } from "@/components/ocorrencias/ocorrencia-form"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"

export default function OcorrenciasPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { user } = useAuth()

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Ocorrências</h1>
          {/* Apenas escolas podem registrar novas ocorrências */}
          {user?.role === "escola" && (
            <Button onClick={() => setIsFormOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Ocorrência
            </Button>
          )}
        </div>

        <Tabs defaultValue="todas" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="leves">Leves</TabsTrigger>
            <TabsTrigger value="moderadas">Moderadas</TabsTrigger>
            <TabsTrigger value="graves">Graves</TabsTrigger>
          </TabsList>
          <TabsContent value="todas">
            <Card>
              <CardHeader>
                <CardTitle>Todas as Ocorrências</CardTitle>
                <CardDescription>Lista de todas as ocorrências registradas no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <OcorrenciasList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="leves">
            <Card>
              <CardHeader>
                <CardTitle>Ocorrências Leves</CardTitle>
                <CardDescription>Lista de ocorrências de gravidade leve</CardDescription>
              </CardHeader>
              <CardContent>
                <OcorrenciasList severity="Leve" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="moderadas">
            <Card>
              <CardHeader>
                <CardTitle>Ocorrências Moderadas</CardTitle>
                <CardDescription>Lista de ocorrências de gravidade moderada</CardDescription>
              </CardHeader>
              <CardContent>
                <OcorrenciasList severity="Moderado" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="graves">
            <Card>
              <CardHeader>
                <CardTitle>Ocorrências Graves</CardTitle>
                <CardDescription>Lista de ocorrências de gravidade grave</CardDescription>
              </CardHeader>
              <CardContent>
                <OcorrenciasList severity="Grave" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {isFormOpen && <OcorrenciaForm onClose={() => setIsFormOpen(false)} />}
      </div>
    </MainLayout>
  )
}
