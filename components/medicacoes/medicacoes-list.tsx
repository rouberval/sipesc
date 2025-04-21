"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, Edit, Eye, MoreHorizontal, Search, Trash2, X } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Dados de exemplo para medicações
const medicacoesData = [
  {
    id: "1",
    aluno: "João Silva",
    medicamento: "Paracetamol",
    dosagem: "1 comprimido de 500mg",
    frequencia: "Diária",
    dataInicio: new Date(2023, 4, 15),
    dataFim: new Date(2023, 4, 22),
    horarios: "08:00, 14:00, 20:00",
    status: "ativo",
    ultimaAdministracao: new Date(2023, 4, 16, 8, 0),
    proximaAdministracao: new Date(2023, 4, 16, 14, 0),
  },
  {
    id: "2",
    aluno: "Maria Oliveira",
    medicamento: "Ibuprofeno",
    dosagem: "1 comprimido de 200mg",
    frequencia: "Se necessário",
    dataInicio: new Date(2023, 4, 10),
    dataFim: null,
    horarios: "Se necessário",
    status: "ativo",
    ultimaAdministracao: new Date(2023, 4, 15, 10, 30),
    proximaAdministracao: null,
  },
  {
    id: "3",
    aluno: "Pedro Santos",
    medicamento: "Loratadina",
    dosagem: "10ml",
    frequencia: "Diária",
    dataInicio: new Date(2023, 4, 5),
    dataFim: new Date(2023, 5, 5),
    horarios: "08:00",
    status: "ativo",
    ultimaAdministracao: new Date(2023, 4, 16, 8, 0),
    proximaAdministracao: new Date(2023, 4, 17, 8, 0),
  },
  {
    id: "4",
    aluno: "Ana Souza",
    medicamento: "Amoxicilina",
    dosagem: "1 cápsula de 500mg",
    frequencia: "A cada 8 horas",
    dataInicio: new Date(2023, 4, 12),
    dataFim: new Date(2023, 4, 19),
    horarios: "06:00, 14:00, 22:00",
    status: "concluido",
    ultimaAdministracao: new Date(2023, 4, 19, 22, 0),
    proximaAdministracao: null,
  },
  {
    id: "5",
    aluno: "Lucas Ferreira",
    medicamento: "Dipirona",
    dosagem: "20 gotas",
    frequencia: "Se necessário",
    dataInicio: new Date(2023, 4, 14),
    dataFim: null,
    horarios: "Se necessário",
    status: "ativo",
    ultimaAdministracao: null,
    proximaAdministracao: null,
  },
]

export function MedicacoesList() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [medicacoes, setMedicacoes] = useState(medicacoesData)

  // Filtrar medicações com base no termo de pesquisa
  const filteredMedicacoes = medicacoes.filter(
    (medicacao) =>
      medicacao.aluno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicacao.medicamento.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Função para registrar administração de medicamento
  const registrarAdministracao = (id: string) => {
    setMedicacoes(
      medicacoes.map((med) => {
        if (med.id === id) {
          const now = new Date()
          // Calcular próxima administração (exemplo simples)
          let proxima = null
          if (med.horarios !== "Se necessário") {
            const horarios = med.horarios.split(", ")
            if (horarios.length > 0) {
              const [hours, minutes] = horarios[0].split(":").map(Number)
              proxima = new Date()
              proxima.setHours(hours, minutes, 0)
              proxima.setDate(proxima.getDate() + 1)
            }
          }

          return {
            ...med,
            ultimaAdministracao: now,
            proximaAdministracao: proxima,
          }
        }
        return med
      }),
    )

    toast({
      title: "Administração registrada",
      description: "A administração do medicamento foi registrada com sucesso.",
    })
  }

  // Função para concluir tratamento
  const concluirTratamento = (id: string) => {
    setMedicacoes(
      medicacoes.map((med) => {
        if (med.id === id) {
          return {
            ...med,
            status: "concluido",
            dataFim: new Date(),
            proximaAdministracao: null,
          }
        }
        return med
      }),
    )

    toast({
      title: "Tratamento concluído",
      description: "O tratamento foi marcado como concluído.",
    })
  }

  // Função para excluir medicação
  const excluirMedicacao = (id: string) => {
    setMedicacoes(medicacoes.filter((med) => med.id !== id))

    toast({
      title: "Medicação excluída",
      description: "A medicação foi excluída com sucesso.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Medicações</CardTitle>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por aluno ou medicamento"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-[300px]"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Medicamento</TableHead>
                <TableHead>Dosagem</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Próxima Administração</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedicacoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Nenhuma medicação encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMedicacoes.map((medicacao) => (
                  <TableRow key={medicacao.id}>
                    <TableCell className="font-medium">{medicacao.aluno}</TableCell>
                    <TableCell>{medicacao.medicamento}</TableCell>
                    <TableCell>{medicacao.dosagem}</TableCell>
                    <TableCell>{medicacao.frequencia}</TableCell>
                    <TableCell>
                      {medicacao.status === "ativo" ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Check className="mr-1 h-3 w-3" /> Ativo
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          <Check className="mr-1 h-3 w-3" /> Concluído
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {medicacao.proximaAdministracao ? (
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3 text-amber-500" />
                          {format(medicacao.proximaAdministracao, "dd/MM/yyyy HH:mm", { locale: ptBR })}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Não agendado</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => registrarAdministracao(medicacao.id)}>
                            <Check className="mr-2 h-4 w-4" /> Registrar administração
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => concluirTratamento(medicacao.id)}>
                            <X className="mr-2 h-4 w-4" /> Concluir tratamento
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => excluirMedicacao(medicacao.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
