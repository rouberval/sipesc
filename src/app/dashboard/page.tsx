"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { DashboardEscola } from "@/components/dashboard/dashboard-escola"
import { DashboardConselho } from "@/components/dashboard/dashboard-conselho"
import { DashboardMP } from "@/components/dashboard/dashboard-mp"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, FileBarChart, BarChart3 } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Redirecionamento para login se não estiver autenticado
  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login")
    }
  }, [user, router, isLoading])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Renderiza o dashboard específico com base no perfil do usuário
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Dashboard SIPESC</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/ocorrencias">
              <FileText className="h-4 w-4 mr-1" />
              Ocorrências
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/frequencia">
              <Calendar className="h-4 w-4 mr-1" />
              Frequência
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/encaminhamentos">
              <FileBarChart className="h-4 w-4 mr-1" />
              Encaminhamentos
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/relatorios">
              <BarChart3 className="h-4 w-4 mr-1" />
              Relatórios
            </Link>
          </Button>
        </div>
      </div>
      {user.role === "escola" && <DashboardEscola />}
      {user.role === "conselheiro" && <DashboardConselho />}
      {(user.role === "mp" || user.role === "admin") && <DashboardMP />}
    </div>
  )
}
