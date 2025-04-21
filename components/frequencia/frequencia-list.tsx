"use client"

import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"

// Mock data for attendance
const mockFrequencia = [
  {
    id: 1,
    student: "Carlos Oliveira",
    presenceDays: 18,
    absenceDays: 2,
    totalDays: 20,
    percentage: 90,
  },
  {
    id: 2,
    student: "Ana Silva",
    presenceDays: 15,
    absenceDays: 5,
    totalDays: 20,
    percentage: 75,
  },
  {
    id: 3,
    student: "Pedro Santos",
    presenceDays: 20,
    absenceDays: 0,
    totalDays: 20,
    percentage: 100,
  },
  {
    id: 4,
    student: "Mariana Costa",
    presenceDays: 12,
    absenceDays: 8,
    totalDays: 20,
    percentage: 60,
  },
  {
    id: 5,
    student: "Lucas Mendes",
    presenceDays: 10,
    absenceDays: 10,
    totalDays: 20,
    percentage: 50,
  },
  {
    id: 6,
    student: "Juliana Ferreira",
    presenceDays: 17,
    absenceDays: 3,
    totalDays: 20,
    percentage: 85,
  },
]

export function FrequenciaList() {
  const isMobile = useMobile()

  const getStatusBadge = (percentage: number) => {
    if (percentage >= 90) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ótima</Badge>
    } else if (percentage >= 75) {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Regular</Badge>
    } else if (percentage >= 60) {
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Alerta</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Crítica</Badge>
    }
  }

  // Renderização responsiva para dispositivos móveis
  if (isMobile) {
    return (
      <div className="space-y-4">
        {mockFrequencia.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">Nenhum registro de frequência encontrado.</Card>
        ) : (
          mockFrequencia.map((frequencia) => (
            <Card key={frequencia.id} className="p-4">
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{frequencia.student}</h3>
                  {getStatusBadge(frequencia.percentage)}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Presenças:</p>
                    <p>{frequencia.presenceDays}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Faltas:</p>
                    <p>{frequencia.absenceDays}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total:</p>
                    <p>{frequencia.totalDays}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Percentual:</p>
                    <p>{frequencia.percentage}%</p>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    )
  }

  // Renderização para desktop
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Aluno</TableHead>
            <TableHead>Presenças</TableHead>
            <TableHead>Faltas</TableHead>
            <TableHead>Total de Dias</TableHead>
            <TableHead>Percentual</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockFrequencia.map((frequencia) => (
            <TableRow key={frequencia.id}>
              <TableCell className="font-medium">{frequencia.student}</TableCell>
              <TableCell>{frequencia.presenceDays}</TableCell>
              <TableCell>{frequencia.absenceDays}</TableCell>
              <TableCell>{frequencia.totalDays}</TableCell>
              <TableCell>{frequencia.percentage}%</TableCell>
              <TableCell>{getStatusBadge(frequencia.percentage)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {mockFrequencia.length === 0 && (
        <Card className="p-6 text-center text-muted-foreground mt-4">Nenhum registro de frequência encontrado.</Card>
      )}
    </div>
  )
}
