"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { UsuariosList } from "@/components/usuarios/usuarios-list"
import { UsuarioForm } from "@/components/usuarios/usuario-form"
import { useAuth } from "@/contexts/auth-context"
import { redirect } from "next/navigation"

export default function UsuariosPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { user } = useAuth()

  // Only secretaria and gestor can access this page
  if (user && user.role !== "secretaria" && user.role !== "gestor" && user.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Usuários</h1>
          <Button onClick={() => setIsFormOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usuários Cadastrados</CardTitle>
            <CardDescription>Lista de todos os usuários cadastrados no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <UsuariosList
              onEdit={(userId) => {
                // Implementar edição de usuário
                console.log("Editar usuário:", userId)
                setIsFormOpen(true)
              }}
            />
          </CardContent>
        </Card>

        {isFormOpen && <UsuarioForm onClose={() => setIsFormOpen(false)} />}
      </div>
    </MainLayout>
  )
}
