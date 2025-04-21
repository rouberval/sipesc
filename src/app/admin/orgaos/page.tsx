"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Pencil, Trash2, Eye } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { redirect } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { OrgaoForm } from "@/components/admin/orgao-form"
import { OrgaoDetails } from "@/components/admin/orgao-details"
import { useToast } from "@/hooks/use-toast"

// Mock data para órgãos
const mockOrgaos = [
  {
    id: "1",
    nome: "Escola",
    descricao: "Instituições de ensino",
    status: "ativo",
    permissoes: ["alunos", "ocorrencias", "encaminhamentos", "frequencia"],
    dataCriacao: "2023-01-15",
  },
  {
    id: "2",
    nome: "Conselho Tutelar",
    descricao: "Órgãos de proteção dos direitos da criança e do adolescente",
    status: "ativo",
    permissoes: ["alunos", "ocorrencias", "encaminhamentos"],
    dataCriacao: "2023-01-15",
  },
  {
    id: "3",
    nome: "Ministério Público",
    descricao: "Órgão fiscalizador e defensor da ordem jurídica",
    status: "ativo",
    permissoes: ["alunos", "ocorrencias", "encaminhamentos", "escolas", "conselhos", "alertas"],
    dataCriacao: "2023-01-15",
  },
]

export default function AdminOrgaosPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedOrgao, setSelectedOrgao] = useState<any | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { user, isAdmin } = useAuth()
  const { toast } = useToast()

  // Verificar se o usuário é administrador
  if (!isAdmin()) {
    redirect("/dashboard")
  }

  const handleDelete = (id: string) => {
    // Em uma aplicação real, isso seria uma chamada de API
    console.log("Deletando órgão:", id)

    toast({
      title: "Órgão excluído",
      description: "O órgão foi excluído com sucesso",
    })
  }

  // Filtrar órgãos com base no termo de busca
  const orgaosFiltrados = mockOrgaos.filter(
    (orgao) =>
      orgao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orgao.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gerenciar Órgãos</h1>
          <div className="flex gap-4">
            <div className="w-64">
              <Input
                placeholder="Buscar órgãos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => setIsFormOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Órgão
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Órgãos Cadastrados</CardTitle>
            <CardDescription>Gerencie os órgãos cadastrados no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Permissões</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orgaosFiltrados.map((orgao) => (
                  <TableRow key={orgao.id}>
                    <TableCell className="font-medium">{orgao.nome}</TableCell>
                    <TableCell>{orgao.descricao}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {orgao.permissoes.slice(0, 3).map((permissao, index) => (
                          <Badge key={index} variant="outline">
                            {permissao}
                          </Badge>
                        ))}
                        {orgao.permissoes.length > 3 && <Badge variant="outline">+{orgao.permissoes.length - 3}</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          orgao.status === "ativo"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {orgao.status === "ativo" ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setSelectedOrgao(orgao)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(orgao.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {orgaosFiltrados.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">Nenhum órgão encontrado</div>
            )}
          </CardContent>
        </Card>

        {isFormOpen && <OrgaoForm onClose={() => setIsFormOpen(false)} />}
        {selectedOrgao && <OrgaoDetails orgao={selectedOrgao} onClose={() => setSelectedOrgao(null)} />}
      </div>
    </MainLayout>
  )
}
