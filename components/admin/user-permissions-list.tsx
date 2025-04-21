"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface UserPermissionsListProps {
  users: User[]
  selectedUserId: string | null
  onSelectUser: (userId: string) => void
}

export function UserPermissionsList({ users, selectedUserId, onSelectUser }: UserPermissionsListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar usuários com base no termo de pesquisa
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Função para formatar o nome do papel do usuário
  const formatRole = (role: string): string => {
    const roleMap: Record<string, string> = {
      escola: "Escola",
      conselheiro: "Conselheiro Tutelar",
      mp: "Ministério Público",
      admin: "Administrador",
      professor: "Professor",
    }

    return roleMap[role] || role
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle>Usuários</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar usuário..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full">
          <div className="px-4 py-2">
            {filteredUsers.length > 0 ? (
              <div className="space-y-1">
                {filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => onSelectUser(user.id)}
                    className={cn(
                      "w-full flex flex-col items-start gap-0.5 rounded-md px-3 py-2 text-left text-sm transition-colors",
                      selectedUserId === user.id ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                  >
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs opacity-80">{user.email}</div>
                    <div className="text-xs opacity-70 capitalize">{formatRole(user.role)}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">Nenhum usuário encontrado.</div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
