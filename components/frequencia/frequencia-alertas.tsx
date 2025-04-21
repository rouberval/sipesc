"use client"

import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRightFromLine } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { EncaminhamentoForm } from "@/components/encaminhamentos/encaminhamento-form"

// Mock data for attendance alerts
const mockAlertas = [
  {
    id: 1,
    student: "Mariana Costa",
    absenceDays: 8,
    percentage: 60,
    consecutiveDays: 0,
    status: "Alerta",
  },
  {
    id: 2,
    student: "Lucas Mendes",
    absenceDays: 10,
    percentage: 50,
    consecutiveDays: 3,
    status: "Crítico",
  },
  {
    id: 3,
    student: "Rafael Almeida",
    absenceDays: 12,
    percentage: 40,
    consecutiveDays: 5,
    status: "Crítico",
  },
  {
    id: 4,
    student: "Camila Rodrigues",
    absenceDays: 7,
    percentage: 65,
    consecutiveDays: 0,
    status: "Alerta",
  },
]

export function FrequenciaAlertas() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState("")

  const handleEncaminhamento = (student: string) => {
    setSelectedStudent(student)
    setIsFormOpen(true)
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Aluno</TableHead>
            <TableHead>Faltas</TableHead>
            <TableHead>Percentual</TableHead>
            <TableHead>Faltas Consecutivas</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAlertas.map((alerta) => (
            <TableRow key={alerta.id}>
              <TableCell className="font-medium">{alerta.student}</TableCell>
              <TableCell>{alerta.absenceDays}</TableCell>
              <TableCell>{alerta.percentage}%</TableCell>
              <TableCell>{alerta.consecutiveDays}</TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    alerta.status === "Crítico" && "bg-red-100 text-red-800 hover:bg-red-100",
                    alerta.status === "Alerta" && "bg-amber-100 text-amber-800 hover:bg-amber-100",
                  )}
                >
                  {alerta.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => handleEncaminhamento(alerta.student)}>
                  <ArrowRightFromLine className="mr-2 h-4 w-4" />
                  Encaminhar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {mockAlertas.length === 0 && (
        <Card className="p-6 text-center text-muted-foreground mt-4">Nenhum alerta de frequência encontrado.</Card>
      )}

      {isFormOpen && <EncaminhamentoForm onClose={() => setIsFormOpen(false)} />}
    </div>
  )
}
