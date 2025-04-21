"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { EncaminhamentosList } from "@/components/encaminhamentos/encaminhamentos-list"
import { EncaminhamentoForm } from "@/components/encaminhamentos/encaminhamento-form"

export default function EncaminhamentosPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Encaminhamentos</h1>
          <Button onClick={() => setIsFormOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Encaminhamento
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Encaminhamentos Registrados</CardTitle>
            <CardDescription>Lista de todos os encaminhamentos registrados no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <EncaminhamentosList />
          </CardContent>
        </Card>

        {isFormOpen && <EncaminhamentoForm onClose={() => setIsFormOpen(false)} />}
      </div>
    </MainLayout>
  )
}
