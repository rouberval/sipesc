"use client"

import type { ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"
import type { PermissionModule, PermissionAction } from "@/types/permissions"

interface PermissionGuardProps {
  module: PermissionModule
  action: PermissionAction
  children: ReactNode
  fallback?: ReactNode
}

export function PermissionGuard({ module, action, children, fallback = null }: PermissionGuardProps) {
  const { hasPermission } = useAuth()

  // Verificar se o usuário tem a permissão necessária
  const hasAccess = hasPermission(module, action)

  // Se não tiver acesso e houver um fallback, mostrar o fallback
  if (!hasAccess) {
    return fallback
  }

  // Se tiver acesso, mostrar o conteúdo normal
  return <>{children}</>
}
