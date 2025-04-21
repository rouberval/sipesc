"use client"

import { mockConselhos } from "@/lib/mocks/conselhos"
import { ConselhoType } from "@/types/conselho"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Pencil, Trash2, Eye } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { redirect } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ConselhoForm } from "@/components/admin/conselho-form"
import { ConselhoDetails } from "@/components/admin/conselho-details"
import { useToast } from "@/hooks/use-toast"

export default function AdminConselhosPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedConselho, setSelectedConselho] = useState<ConselhoType | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { user, isAdmin } = useAuth()
  const { toast } = useToast()

  // Verificar se o usuário é administrador
  if (!isAdmin()) {
    redirect("/dashboard")
  }

  const handleDelete = (id: string) => {
    // Em uma aplicação real, isso seria uma chamada de API
    console.log("Deletando conselho:", id)

    toast({
      title: "Conselho excluído",
      description: "O conselho tutelar foi excluído com sucesso",
    })
  }

  // Filtrar conselhos com base no termo de busca
  const conselhosFiltrados = mockConselhos.filter(
    (conselho) =>
      conselho.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conselho.municipio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conselho.regiao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gerenciar Conselhos Tutelares</h1>
          <div className="flex gap-4">
            <div className="w-64">
              <Input
                placeholder="Buscar conselhos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => setIsFormOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Conselho
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Conselhos Tutelares Cadastrados</CardTitle>
            <CardDescription>Gerencie os conselhos tutelares cadastrados no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Região</TableHead>
                  <TableHead>Município</TableHead>
                  <TableHead>Coordenador</TableHead>
                  <TableHead>Escolas Vinculadas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conselhosFiltrados.map((conselho) => (
                  <TableRow key={conselho.id}>
                    <TableCell className="font-medium">{conselho.nome}</TableCell>
                    <TableCell>{conselho.regiao}</TableCell>
                    <TableCell>{conselho.municipio}</TableCell>
                    <TableCell>{conselho.coordenador}</TableCell>
                    <TableCell>{conselho.escolasVinculadas}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          conselho.status === "ativo"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {conselho.status === "ativo" ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setSelectedConselho(conselho)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(conselho.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {conselhosFiltrados.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">Nenhum conselho tutelar encontrado</div>
            )}
          </CardContent>
        </Card>

        {isFormOpen && <ConselhoForm onClose={() => setIsFormOpen(false)} />}
        {selectedConselho && <ConselhoDetails conselho={selectedConselho} onClose={() => setSelectedConselho(null)} />}
      </div>
    </MainLayout>
  )
}
