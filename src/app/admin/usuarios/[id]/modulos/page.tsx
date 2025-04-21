"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { UserModulePermissions } from "@/components/admin/user-module-permissions"
import { useParams } from "next/navigation"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Tipo para representar um usuário
interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function UserModulesPage() {
  const params = useParams()
  const userId = params.id as string
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulação de carregamento de dados do usuário
    const fetchUser = async () => {
      setIsLoading(true)
      try {
        // Em uma aplicação real, isso seria uma chamada de API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Dados mockados para simulação
        const mockUser = {
          id: userId,
          name: "Ministério Público",
          email: "mp@sipesc.com",
          role: "mp",
        }

        setUser(mockUser)
      } catch (error) {
        console.error("Erro ao carregar usuário:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  if (isLoading) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <MainLayout>
          <div className="flex items-center justify-center h-[70vh]">
            <LoadingSpinner size="lg" />
          </div>
        </MainLayout>
      </ProtectedRoute>
    )
  }

  if (!user) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <MainLayout>
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <h2 className="text-xl font-semibold mb-2">Usuário não encontrado</h2>
            <p className="text-muted-foreground mb-4">O usuário solicitado não foi encontrado no sistema.</p>
            <Link href="/admin/usuarios">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para lista de usuários
              </Button>
            </Link>
          </div>
        </MainLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Configuração de Módulos</h1>
              <p className="text-muted-foreground">Gerencie os módulos que o usuário {user.name} pode acessar</p>
            </div>
            <Link href="/admin/usuarios">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
          </div>

          <UserModulePermissions userId={user.id} userName={user.name} userRole={user.role} />
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
