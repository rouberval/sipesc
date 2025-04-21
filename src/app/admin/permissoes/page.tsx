import type { Metadata } from "next"
import { PermissionsManager } from "@/components/admin/permissions-manager"

export const metadata: Metadata = {
  title: "Gerenciamento de Permissões | SIPESC",
  description: "Gerenciamento de permissões de usuários no sistema",
}

export default function PermissoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Permissões</h1>
        <p className="text-muted-foreground">
          Configure as permissões de acesso dos usuários aos diferentes módulos do sistema.
        </p>
      </div>
      <PermissionsManager />
    </div>
  )
}
