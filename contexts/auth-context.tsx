"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Tipos para os perfis de usuários
type UserRole = "escola" | "conselheiro" | "mp" | "admin" | "professor"

// Lista de módulos do sistema
export type SystemModule =
  | "dashboard"
  | "painel_bi"
  | "alunos"
  | "alunos_risco"
  | "ocorrencias"
  | "frequencia"
  | "encaminhamentos"
  | "escolas"
  | "escolas_vinculadas"
  | "conselhos"
  | "mensagens"
  | "alertas"
  | "relatorios"
  | "medicacoes"
  | "escolas_cadastradas"
  | "conselhos_cadastrados"
  | "alertas_mp"
  | "orgaos"

type User = {
  id: string
  name: string
  email: string
  role: UserRole
  escolaId?: string
  conselhoId?: string
  regiaoId?: string
  // Vinculações para controle de acesso
  vinculacoes?: {
    escolas?: string[]
    regioes?: string[]
    conselhos?: string[]
  }
  // Permissões específicas do usuário
  permissions?: string[]
  // Módulos habilitados
  enabledModules?: SystemModule[]
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  // Funções auxiliares para verificação de permissões
  canAccessEscola: (escolaId: string) => boolean
  canAccessRegiao: (regiaoId: string) => boolean
  canAccessBI: () => boolean
  canAccessConselho: (conselhoId: string) => boolean
  // Função para verificar acesso total
  hasFullAccess: () => boolean
  // Função para verificar se é administrador
  isAdmin: () => boolean
  // Função para verificar permissões específicas
  hasPermission: (permission: string) => boolean
  // Função para verificar se um módulo do sistema está habilitado
  isModuleEnabled: (module: SystemModule) => boolean
  // Função para atualizar módulos habilitados
  updateEnabledModules: (modules: SystemModule[]) => void
}

// Export the context directly so it can be imported elsewhere
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("sipesc-token")
    const userData = localStorage.getItem("sipesc-user")

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error("Erro ao analisar dados do usuário:", error)
        // Se houver erro ao analisar os dados, limpar o localStorage
        localStorage.removeItem("sipesc-token")
        localStorage.removeItem("sipesc-user")
      }
    }

    setIsLoading(false)
  }, [])

  // Função de login corrigida
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Validação básica
      if (!email || !password) {
        throw new Error("Email e senha são obrigatórios")
      }

      // Usuários de demonstração
      const mockUsers = [
        {
          id: "1",
          name: "Escola Municipal",
          email: "escola@sipesc.com",
          role: "escola" as UserRole,
          escolaId: "1",
          vinculacoes: {
            escolas: ["1"],
          },
          enabledModules: [
            "dashboard",
            "alunos",
            "ocorrencias",
            "frequencia",
            "encaminhamentos",
            "mensagens",
            "medicacoes",
            "relatorios",
          ] as SystemModule[],
        },
        {
          id: "2",
          name: "Conselho Tutelar",
          email: "conselho@sipesc.com",
          role: "conselheiro" as UserRole,
          conselhoId: "1",
          regiaoId: "1",
          vinculacoes: {
            escolas: ["1", "2", "3"],
            regioes: ["1"],
            conselhos: ["1"],
          },
          enabledModules: [
            "dashboard",
            "escolas_vinculadas",
            "alunos_risco",
            "ocorrencias",
            "encaminhamentos",
            "mensagens",
            "relatorios",
          ] as SystemModule[],
        },
        {
          id: "3",
          name: "Ministério Público",
          email: "mp@sipesc.com",
          role: "mp" as UserRole,
          vinculacoes: {
            regioes: ["all"],
            escolas: ["all"],
            conselhos: ["all"],
          },
          enabledModules: [
            "dashboard",
            "painel_bi",
            "alunos",
            "alunos_risco",
            "ocorrencias",
            "frequencia",
            "encaminhamentos",
            "escolas",
            "escolas_vinculadas",
            "conselhos",
            "mensagens",
            "alertas",
            "relatorios",
            "medicacoes",
            "escolas_cadastradas",
            "conselhos_cadastrados",
            "alertas_mp",
          ] as SystemModule[],
        },
        {
          id: "4",
          name: "Administrador",
          email: "admin@sipesc.com",
          role: "admin" as UserRole,
          vinculacoes: {
            regioes: ["all"],
            escolas: ["all"],
            conselhos: ["all"],
          },
          enabledModules: [
            "dashboard",
            "painel_bi",
            "alunos",
            "alunos_risco",
            "ocorrencias",
            "frequencia",
            "encaminhamentos",
            "escolas",
            "escolas_vinculadas",
            "conselhos",
            "mensagens",
            "alertas",
            "relatorios",
            "medicacoes",
            "escolas_cadastradas",
            "conselhos_cadastrados",
            "alertas_mp",
            "orgaos",
          ] as SystemModule[],
        },
        {
          id: "5",
          name: "Professor",
          email: "professor@sipesc.com",
          role: "professor" as UserRole,
          escolaId: "1",
          vinculacoes: {
            escolas: ["1"],
          },
          enabledModules: ["dashboard", "alunos", "ocorrencias", "frequencia"] as SystemModule[],
        },
      ]

      console.log("Tentando login com:", email)
      const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

      if (!foundUser) {
        console.error("Usuário não encontrado")
        throw new Error("Credenciais inválidas")
      }

      // Para fins de demonstração, aceitamos qualquer senha
      const token = "mock-jwt-token"
      localStorage.setItem("sipesc-token", token)
      localStorage.setItem("sipesc-user", JSON.stringify(foundUser))
      setUser(foundUser as User)

      // Redirecionar com base no perfil
      if (foundUser.role === "mp") {
        router.push("/dashboard")
      } else if (foundUser.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Erro no login:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("sipesc-token")
    localStorage.removeItem("sipesc-user")
    setUser(null)
    router.push("/login")
  }

  // Função para verificar se o usuário tem acesso total (MP ou Admin)
  const hasFullAccess = () => {
    if (!user) return false
    return user.role === "mp" || user.role === "admin"
  }

  // Função para verificar se o usuário é administrador
  const isAdmin = () => {
    if (!user) return false
    return user.role === "admin"
  }

  // Função para verificar permissões específicas
  const hasPermission = (permission: string) => {
    if (!user) return false

    // Admin e MP têm todas as permissões
    if (user.role === "admin" || user.role === "mp") return true

    // Verificar permissões específicas do usuário
    return user.permissions?.includes(permission) || false
  }

  // Funções auxiliares para verificação de permissões
  const canAccessEscola = (escolaId: string) => {
    if (!user) return false

    // MP e Admin podem acessar todas as escolas
    if (user.role === "mp" || user.role === "admin") return true

    // Escola só pode acessar sua própria unidade
    if (user.role === "escola" || user.role === "professor") {
      return user.escolaId === escolaId
    }

    // Conselheiro pode acessar escolas vinculadas à sua região
    if (user.role === "conselheiro") {
      return user.vinculacoes?.escolas?.includes(escolaId) || false
    }

    return false
  }

  const canAccessRegiao = (regiaoId: string) => {
    if (!user) return false

    // MP e Admin podem acessar todas as regiões
    if (user.role === "mp" || user.role === "admin") return true

    // Conselheiro só pode acessar sua própria região
    if (user.role === "conselheiro") {
      return user.regiaoId === regiaoId
    }

    // Escola não acessa regiões diretamente
    return false
  }

  const canAccessBI = () => {
    if (!user) return false

    // MP e Admin têm acesso total ao BI
    if (user.role === "mp" || user.role === "admin") return true

    // Verificar se o módulo está habilitado para o usuário
    return isModuleEnabled("painel_bi")
  }

  const canAccessConselho = (conselhoId: string) => {
    if (!user) return false

    // MP e Admin podem acessar todos os conselhos
    if (user.role === "mp" || user.role === "admin") return true

    // Conselheiro só pode acessar seu próprio conselho
    if (user.role === "conselheiro") {
      return user.conselhoId === conselhoId
    }

    // Escola não acessa conselhos diretamente
    return false
  }

  // Função para verificar se um módulo do sistema está habilitado
  const isModuleEnabled = (module: SystemModule) => {
    if (!user) return false

    // Admin e MP sempre têm acesso a todos os módulos
    if (user.role === "admin" || user.role === "mp") return true

    // Verificar se o módulo está na lista de módulos habilitados
    return user.enabledModules?.includes(module) || false
  }

  // Função para atualizar módulos habilitados
  const updateEnabledModules = (modules: SystemModule[]) => {
    if (!user) return

    const updatedUser = {
      ...user,
      enabledModules: modules,
    }

    setUser(updatedUser)
    localStorage.setItem("sipesc-user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        canAccessEscola,
        canAccessRegiao,
        canAccessBI,
        canAccessConselho,
        hasFullAccess,
        isAdmin,
        hasPermission,
        isModuleEnabled,
        updateEnabledModules,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
