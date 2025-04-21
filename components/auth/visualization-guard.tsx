"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import type { VisualizationModule } from "@/types/visualization-config"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface VisualizationGuardProps {
  module: VisualizationModule
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function VisualizationGuard({ module, children, fallback }: VisualizationGuardProps) {
  const { canViewModule, isLoading } = useAuth()
  const router = useRouter()

  const hasAccess = canViewModule(module)

  useEffect(() => {
    if (!isLoading && !hasAccess && !fallback) {
      router.push("/dashboard")
    }
  }, [hasAccess, isLoading, router, fallback])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>
  }

  if (!hasAccess) {
    return fallback ? <>{fallback}</> : null
  }

  return <>{children}</>
}
