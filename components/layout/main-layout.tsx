"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  X,
  Home,
  Users,
  FileText,
  Bell,
  MessageSquare,
  School,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  User,
  Calendar,
  Activity,
  FileBarChart,
  Scale,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  role: string[]
  module?: string
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, logout, isModuleEnabled } = useAuth()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  // Fechar o menu ao mudar de rota em dispositivos móveis
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  if (!user) {
    return <>{children}
        <footer className="mt-8 border-t pt-4 text-sm text-center text-muted-foreground">
          <a href="/manual" className="mx-4 hover:underline">📘 Manual do Usuário</a>
          <a href="/documentacao" className="mx-4 hover:underline">📄 Documentação Técnica</a>
        </footer>
        </>
  }

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: user?.role === "admin" ? "/admin/dashboard" : "/dashboard",
      icon: <Home className="h-5 w-5" />,
      role: ["admin", "mp", "escola", "conselheiro", "professor"],
      module: "dashboard",
    },
    {
      label: "Painel BI",
      href: "/painel-bi",
      icon: <BarChart3 className="h-5 w-5" />,
      role: ["admin", "mp"],
      module: "painel_bi",
    },
    {
      label: "Alunos",
      href: "/alunos",
      icon: <Users className="h-5 w-5" />,
      role: ["admin", "mp", "escola", "professor"],
      module: "alunos",
    },
    {
      label: "Alunos em Risco",
      href: "/alunos-risco",
      icon: <Activity className="h-5 w-5" />,
      role: ["admin", "mp", "conselheiro"],
      module: "alunos_risco",
    },
    {
      label: "Ocorrências",
      href: "/ocorrencias",
      icon: <FileText className="h-5 w-5" />,
      role: ["admin", "mp", "escola", "conselheiro", "professor"],
      module: "ocorrencias",
    },
    {
      label: "Frequência",
      href: "/frequencia",
      icon: <Calendar className="h-5 w-5" />,
      role: ["admin", "mp", "escola", "professor"],
      module: "frequencia",
    },
    {
      label: "Encaminhamentos",
      href: "/encaminhamentos",
      icon: <FileBarChart className="h-5 w-5" />,
      role: ["admin", "mp", "escola", "conselheiro"],
      module: "encaminhamentos",
    },
    {
      label: "Escolas",
      href: "/escolas",
      icon: <School className="h-5 w-5" />,
      role: ["admin", "mp"],
      module: "escolas",
    },
    {
      label: "Escolas Vinculadas",
      href: "/escolas-vinculadas",
      icon: <School className="h-5 w-5" />,
      role: ["conselheiro"],
      module: "escolas_vinculadas",
    },
    {
      label: "Conselhos Tutelares",
      href: "/conselhos",
      icon: <BookOpen className="h-5 w-5" />,
      role: ["admin", "mp"],
      module: "conselhos",
    },
    {
      label: "Mensagens",
      href: "/mensagens",
      icon: <MessageSquare className="h-5 w-5" />,
      role: ["admin", "mp", "escola", "conselheiro", "professor"],
      module: "mensagens",
    },
    {
      label: "Alertas",
      href: "/alertas",
      icon: <Bell className="h-5 w-5" />,
      role: ["admin", "mp"],
      module: "alertas",
    },
    {
      label: "Relatórios",
      href: "/relatorios",
      icon: <FileText className="h-5 w-5" />,
      role: ["admin", "mp", "escola", "conselheiro"],
      module: "relatorios",
    },
    {
      label: "Medicações",
      href: "/medicacoes",
      icon: <Activity className="h-5 w-5" />,
      role: ["admin", "mp", "escola"],
      module: "medicacoes",
    },
    // Itens administrativos
    {
      label: "Escolas Cadastradas",
      href: "/admin/escolas",
      icon: <School className="h-5 w-5" />,
      role: ["admin", "mp"],
      module: "escolas_cadastradas",
    },
    {
      label: "Conselhos Cadastrados",
      href: "/admin/conselhos",
      icon: <BookOpen className="h-5 w-5" />,
      role: ["admin", "mp"],
      module: "conselhos_cadastrados",
    },
    {
      label: "Órgãos",
      href: "/admin/orgaos",
      icon: <BookOpen className="h-5 w-5" />,
      role: ["admin"],
      module: "orgaos",
    },
    {
      label: "Usuários",
      href: "/admin/usuarios",
      icon: <Users className="h-5 w-5" />,
      role: ["admin"],
    },
    {
      label: "Permissões",
      href: "/admin/permissoes",
      icon: <Settings className="h-5 w-5" />,
      role: ["admin"],
    },
    {
      label: "Configurações",
      href: "/admin/configuracoes",
      icon: <Settings className="h-5 w-5" />,
      role: ["admin"],
    },
  ]

  // Filtrar itens de navegação com base no papel do usuário e módulos habilitados
  const filteredNavItems = navItems.filter((item) => {
    // Verificar se o usuário tem o papel necessário
    const hasRole = item.role.includes(user.role)

    // Se não tiver módulo específico, apenas verificar o papel
    if (!item.module) return hasRole

    // Verificar se o módulo está habilitado para o usuário
    return hasRole && isModuleEnabled(item.module as any)
  })

  const renderNavItems = () => (
    <div className="space-y-1">
      {filteredNavItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start items-center ${isActive ? "bg-secondary" : ""}`}
            >
              {item.icon}
              <span className="ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
                {item.label || item.href.split("/").pop()?.replace("-", " ") || "Menu"}
              </span>
            </Button>
          </Link>
        )
      })}
    </div>
  )

  return (
    <div className="flex min-h-screen">
      {/* Sidebar para desktop */}
      {!isMobile && (
        <div className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
          <div className="flex items-center justify-between mb-8">
            <Link href={user?.role === "admin" ? "/admin/dashboard" : "/dashboard"}>
              <div className="flex items-center">
                {user?.role === "mp" && <Scale className="h-6 w-6 mr-2 text-primary" />}
                <div>
                  <h1 className="text-xl font-bold">
                    SIPESC {user?.role === "mp" && <span className="text-primary">MP</span>}
                  </h1>
                  {user?.role === "mp" && (
                    <p className="text-xs text-muted-foreground">Sistema Integrado - Ministério Público</p>
                  )}
                </div>
              </div>
            </Link>
          </div>
          <div className="flex-1 overflow-auto">{renderNavItems()}</div>
          <div className="mt-auto pt-4 border-t">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="flex flex-1 flex-col">
        {/* Header para mobile */}
        {isMobile && (
          <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-background px-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="default"
                  className="mr-2 border-primary bg-background/80 backdrop-blur-sm shadow-sm hover:bg-accent hover:text-accent-foreground active:scale-95 transition-all top-3 left-3"
                  onClick={() => setIsOpen(true)}
                  aria-label="Abrir menu de navegação"
                  title="Menu"
                >
                  <Menu className="h-5 w-5 text-primary" />
                  <span className="sr-only">Abrir Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 z-50">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b">
                    <Link href={user?.role === "admin" ? "/admin/dashboard" : "/dashboard"}>
                      <div className="flex items-center">
                        {user?.role === "mp" && <Scale className="h-5 w-5 mr-2 text-primary" />}
                        <div>
                          <h1 className="text-xl font-bold">
                            SIPESC {user?.role === "mp" && <span className="text-primary">MP</span>}
                          </h1>
                          {user?.role === "mp" && <p className="text-xs text-muted-foreground">Ministério Público</p>}
                        </div>
                      </div>
                    </Link>
                    <Button variant="destructive" size="sm" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">Fechar Menu</span>
                    </Button>
                  </div>
                  <div className="flex-1 overflow-auto p-4">{renderNavItems()}</div>
                  <div className="mt-auto p-4 border-t">
                    <div className="flex items-center mb-4">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full justify-start" onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center">
              <Link href={user?.role === "admin" ? "/admin/dashboard" : "/dashboard"}>
                <h1 className="text-xl font-bold">SIPESC</h1>
              </Link>
              <Link href={user?.role === "admin" ? "/admin/dashboard" : "/dashboard"} className="ml-2">
                <Button variant="ghost" size="sm" className="text-xs px-2 py-1">
                  Dashboard
                </Button>
              </Link>
            </div>
          </header>
        )}

        {/* Conteúdo da página */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
