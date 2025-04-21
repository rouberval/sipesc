"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, FileText, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"

// Dados de exemplo para o histórico de administração
const historicoData = [
  {
    id: "1",
    aluno: "João Silva",
    medicamento: "Paracetamol",
    dosagem: "1 comprimido de 500mg",
    dataHora: new Date(2023, 4, 15, 8, 0),
    administradoPor: "Maria Enfermeira",
    observacoes: "Administrado sem intercorrências",
  },
  {
    id: "2",
    aluno: "João Silva",
    medicamento: "Paracetamol",
    dosagem: "1 comprimido de 500mg",
    dataHora: new Date(2023, 4, 15, 14, 0),
    administradoPor: "Carlos Enfermeiro",
    observacoes: "Paciente relatou melhora da dor",
  },
  {
    id: "3",
    aluno: "Maria Oliveira",
    medicamento: "Ibuprofeno",
    dosagem: "1 comprimido de 200mg",
    dataHora: new Date(2023, 4, 15, 10, 30),
    administradoPor: "Maria Enfermeira",
    observacoes: "Administrado devido a dor de cabeça",
  },
  {
    id: "4",
    aluno: "Pedro Santos",
    medicamento: "Loratadina",
    dosagem: "10ml",
    dataHora: new Date(2023, 4, 15, 8, 0),
    administradoPor: "Carlos Enfermeiro",
    observacoes: "Administrado conforme prescrição",
  },
  {
    id: "5",
    aluno: "Pedro Santos",
    medicamento: "Loratadina",
    dosagem: "10ml",
    dataHora: new Date(2023, 4, 16, 8, 0),
    administradoPor: "Maria Enfermeira",
    observacoes: "Paciente apresentou melhora dos sintomas alérgicos",
  },
]

export function MedicacaoHistorico() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroAluno, setFiltroAluno] = useState("")
  const [filtroDataInicio, setFiltroDataInicio] = useState<Date | undefined>(undefined)
  const [filtroDataFim, setFiltroDataFim] = useState<Date | undefined>(undefined)

  // Lista de alunos únicos para o filtro
  const alunos = Array.from(new Set(historicoData.map((item) => item.aluno)))

  // Filtrar histórico com base nos filtros
  const filteredHistorico = historicoData.filter((item) => {
    // Filtro por termo de pesquisa
    const matchesSearch =
      item.aluno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.medicamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.administradoPor.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro por aluno
    const matchesAluno = filtroAluno ? item.aluno === filtroAluno : true

    // Filtro por data de início
    const matchesDataInicio = filtroDataInicio ? item.dataHora >= filtroDataInicio : true

    // Filtro por data de fim
    const matchesDataFim = filtroDataFim ? item.dataHora <= filtroDataFim : true

    return matchesSearch && matchesAluno && matchesDataInicio && matchesDataFim
  })

  // Função para exportar o histórico
  const exportarHistorico = () => {
    alert("Exportando histórico...")
    // Implementação real de exportação seria feita aqui
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Administração</CardTitle>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar no histórico"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-[250px]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={filtroAluno} onValueChange={setFiltroAluno}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por aluno" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os alunos</SelectItem>
                {alunos.map((aluno) => (
                  <SelectItem key={aluno} value={aluno}>
                    {aluno}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <DatePicker date={filtroDataInicio} setDate={setFiltroDataInicio} placeholder="Data inicial" />
          </div>

          <div className="flex items-center gap-2">
            <DatePicker date={filtroDataFim} setDate={setFiltroDataFim} placeholder="Data final" />
          </div>

          <Button variant="outline" onClick={exportarHistorico} className="ml-auto">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
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
                <TableHead>Data e Hora</TableHead>
                <TableHead>Administrado por</TableHead>
                <TableHead>Observações</TableHead>
                <TableHead className="text-right">Relatório</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistorico.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredHistorico.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.aluno}</TableCell>
                    <TableCell>{item.medicamento}</TableCell>
                    <TableCell>{item.dosagem}</TableCell>
                    <TableCell>{format(item.dataHora, "dd/MM/yyyy HH:mm", { locale: ptBR })}</TableCell>
                    <TableCell>{item.administradoPor}</TableCell>
                    <TableCell className="max-w-xs truncate" title={item.observacoes}>
                      {item.observacoes}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Ver relatório</span>
                      </Button>
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
