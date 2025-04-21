"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: string[]
  redirectTo?: string
}

export function ProtectedRoute({ children, allowedRoles, redirectTo = "/dashboard" }: ProtectedRouteProps) {
  const { user, isLoading, hasFullAccess } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login")
        return
      }

      // Se o usuário não tem acesso total (MP ou Admin) e não está em um papel permitido
      if (!hasFullAccess() && !allowedRoles.includes(user.role)) {
        router.push(redirectTo)
      }
    }
  }, [user, isLoading, allowedRoles, redirectTo, router, hasFullAccess])

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>
  }

  if (!user) {
    return null
  }

  // MP e Admin têm acesso a todas as rotas protegidas
  if (hasFullAccess()) {
    return <>{children}</>
  }

  // Para outros perfis, verificar se o papel está na lista de permitidos
  if (!allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
