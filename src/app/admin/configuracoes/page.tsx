import type { Metadata } from "next"
import { ConfiguracoesForm } from "@/components/admin/configuracoes-form"

export const metadata: Metadata = {
  title: "Configurações do Sistema | SIPESC",
  description: "Configurações gerais do sistema SIPESC",
}

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações do Sistema</h1>
        <p className="text-muted-foreground">Configure os parâmetros gerais do sistema SIPESC.</p>
      </div>
      <ConfiguracoesForm />
    </div>
  )
}
