"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserModulePermissions } from "@/components/admin/user-module-permissions"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { SystemModule } from "@/contexts/auth-context"

export default function MPModulosPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState("3") // ID do usuário MP
  const [userName, setUserName] = useState("Ministério Público")

  // Em um ambiente real, você buscaria os dados do usuário da API
  useEffect(() => {
    // Simulação de carregamento de dados
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleSaveModules = (modules: any[]) => {
    // Aqui você enviaria os dados para a API
    console.log("Módulos atualizados:", modules)

    // Verificar se o módulo "escolas_cadastradas" está desabilitado
    const escolasCadastradasModule = modules.find((m) => m.id === "escolas_cadastradas")
    if (escolasCadastradasModule && !escolasCadastradasModule.enabled) {
      toast({
        title: "Módulo desativado",
        description: "O módulo 'Escolas Cadastradas' foi desativado com sucesso para o MP.",
        variant: "success",
      })
    }

    // Atualizar o localStorage para simular a persistência
    const userDataStr = localStorage.getItem("sipesc-user")
    if (userDataStr) {
      const userData = JSON.parse(userDataStr)
      if (userData.id === "3") {
        // ID do MP
        const enabledModules = modules.filter((m) => m.enabled).map((m) => m.id) as SystemModule[]

        userData.enabledModules = enabledModules
        localStorage.setItem("sipesc-user", JSON.stringify(userData))
      }
    }
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Configuração de Módulos - Ministério Público</h1>
      </div>

      <UserModulePermissions userId={userId} userName={userName} userRole="mp" onSave={handleSaveModules} />

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
        <h3 className="font-medium text-amber-800">Dica para desativar "Escolas Cadastradas"</h3>
        <p className="text-amber-700 mt-1">
          Para desativar a aba "Escolas Cadastradas" para o MP, vá até a aba "Dashboards" e desative o módulo "Escolas
          Cadastradas". Depois clique em "Salvar alterações".
        </p>
      </div>
    </div>
  )
}
