"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Eye } from "lucide-react"
import { useState } from "react"
import { OcorrenciaDetails } from "./ocorrencia-details"
import { useMobile } from "@/hooks/use-mobile"

// Mock data for incidents
const mockOcorrencias = [
  {
    id: 1,
    student: "Carlos Oliveira",
    type: "Comportamento",
    severity: "Grave",
    date: "2023-04-05",
    description: "Agressão verbal a outro aluno durante o intervalo",
    measures: "Conversa com os pais e suspensão de 2 dias",
    responsible: "Maria Santos",
  },
  {
    id: 2,
    student: "Ana Silva",
    type: "Acadêmico",
    severity: "Moderado",
    date: "2023-04-04",
    description: "Não entregou trabalho pela terceira vez consecutiva",
    measures: "Notificação aos pais e oportunidade de recuperação",
    responsible: "João Pereira",
  },
  {
    id: 3,
    student: "Pedro Santos",
    type: "Comportamento",
    severity: "Leve",
    date: "2023-04-03",
    description: "Uso de celular durante a aula após advertência",
    measures: "Advertência verbal e anotação na agenda",
    responsible: "Ana Oliveira",
  },
  {
    id: 4,
    student: "Mariana Costa",
    type: "Comportamento",
    severity: "Moderado",
    date: "2023-04-02",
    description: "Saiu da sala sem autorização",
    measures: "Conversa com o aluno e notificação aos pais",
    responsible: "Carlos Silva",
  },
  {
    id: 5,
    student: "Lucas Mendes",
    type: "Acadêmico",
    severity: "Leve",
    date: "2023-04-01",
    description: "Não trouxe o material pela segunda vez na semana",
    measures: "Anotação na agenda",
    responsible: "Fernanda Lima",
  },
  {
    id: 6,
    student: "Juliana Ferreira",
    type: "Comportamento",
    severity: "Grave",
    date: "2023-03-31",
    description: "Dano ao patrimônio escolar (quebrou uma cadeira)",
    measures: "Conversa com os pais e ressarcimento do dano",
    responsible: "Roberto Alves",
  },
]

interface OcorrenciasListProps {
  severity?: string
}

export function OcorrenciasList({ severity }: OcorrenciasListProps) {
  const [selectedOcorrencia, setSelectedOcorrencia] = useState<any | null>(null)
  const isMobile = useMobile()

  // Filter by severity if provided
  const filteredOcorrencias = severity ? mockOcorrencias.filter((o) => o.severity === severity) : mockOcorrencias

  // Renderização responsiva para dispositivos móveis
  if (isMobile) {
    return (
      <div className="space-y-4">
        {filteredOcorrencias.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">Nenhuma ocorrência encontrada.</Card>
        ) : (
          filteredOcorrencias.map((ocorrencia) => (
            <Card key={ocorrencia.id} className="p-4">
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{ocorrencia.student}</h3>
                  <Badge
                    className={cn(
                      ocorrencia.severity === "Grave" && "bg-red-100 text-red-800 hover:bg-red-100",
                      ocorrencia.severity === "Moderado" && "bg-amber-100 text-amber-800 hover:bg-amber-100",
                      ocorrencia.severity === "Leve" && "bg-blue-100 text-blue-800 hover:bg-blue-100",
                    )}
                  >
                    {ocorrencia.severity}
                  </Badge>
                </div>
                <p className="text-sm">{ocorrencia.type}</p>
                <p className="text-xs text-muted-foreground">{new Date(ocorrencia.date).toLocaleDateString("pt-BR")}</p>
                <Button variant="ghost" size="sm" className="w-full" onClick={() => setSelectedOcorrencia(ocorrencia)}>
                  <Eye className="h-4 w-4 mr-2" /> Ver detalhes
                </Button>
              </div>
            </Card>
          ))
        )}

        {selectedOcorrencia && (
          <OcorrenciaDetails ocorrencia={selectedOcorrencia} onClose={() => setSelectedOcorrencia(null)} />
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
            <TableHead>Tipo</TableHead>
            <TableHead>Gravidade</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOcorrencias.map((ocorrencia) => (
            <TableRow key={ocorrencia.id}>
              <TableCell className="font-medium">{ocorrencia.student}</TableCell>
              <TableCell>{ocorrencia.type}</TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    ocorrencia.severity === "Grave" && "bg-red-100 text-red-800 hover:bg-red-100",
                    ocorrencia.severity === "Moderado" && "bg-amber-100 text-amber-800 hover:bg-amber-100",
                    ocorrencia.severity === "Leve" && "bg-blue-100 text-blue-800 hover:bg-blue-100",
                  )}
                >
                  {ocorrencia.severity}
                </Badge>
              </TableCell>
              <TableCell>{new Date(ocorrencia.date).toLocaleDateString("pt-BR")}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => setSelectedOcorrencia(ocorrencia)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredOcorrencias.length === 0 && (
        <Card className="p-6 text-center text-muted-foreground mt-4">Nenhuma ocorrência encontrada.</Card>
      )}

      {selectedOcorrencia && (
        <OcorrenciaDetails ocorrencia={selectedOcorrencia} onClose={() => setSelectedOcorrencia(null)} />
      )}
    </div>
  )
}
