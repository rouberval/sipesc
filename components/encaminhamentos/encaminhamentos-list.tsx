"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, MessageSquare } from "lucide-react"
import { useState } from "react"
import { EncaminhamentoDetails } from "./encaminhamento-details"
import { EncaminhamentoResponse } from "./encaminhamento-response"
import { useMobile } from "@/hooks/use-mobile"

// Mock data for referrals
const mockEncaminhamentos = [
  {
    id: 1,
    student: "Lucas Mendes",
    destination: "Conselho Tutelar",
    type: "Abandono Escolar",
    date: "2023-03-28",
    status: "Pendente",
    description:
      "Aluno com mais de 30 faltas consecutivas sem justificativa. Tentativas de contato com a família sem sucesso.",
    responsible: "Maria Santos",
    response: null,
    responseDate: null,
  },
  {
    id: 2,
    student: "Juliana Ferreira",
    destination: "CRAS",
    type: "Vulnerabilidade Social",
    date: "2023-03-25",
    status: "Pendente",
    description: "Aluna apresenta sinais de vulnerabilidade social. Família em situação de risco.",
    responsible: "João Pereira",
    response: null,
    responseDate: null,
  },
  {
    id: 3,
    student: "Rafael Almeida",
    destination: "Psicólogo",
    type: "Comportamento Agressivo",
    date: "2023-03-22",
    status: "Pendente",
    description: "Aluno com comportamento agressivo recorrente. Necessita de acompanhamento psicológico.",
    responsible: "Ana Oliveira",
    response: null,
    responseDate: null,
  },
  {
    id: 4,
    student: "Camila Rodrigues",
    destination: "Conselho Tutelar",
    type: "Faltas Excessivas",
    date: "2023-03-20",
    status: "Pendente",
    description: "Aluna com mais de 25% de faltas no bimestre. Família não comparece às convocações da escola.",
    responsible: "Carlos Silva",
    response: null,
    responseDate: null,
  },
  {
    id: 5,
    student: "Pedro Santos",
    destination: "CAPS",
    type: "Saúde Mental",
    date: "2023-03-15",
    status: "Concluído",
    description: "Aluno apresenta sinais de depressão e ansiedade. Necessita de acompanhamento especializado.",
    responsible: "Fernanda Lima",
    response: "Aluno acolhido e em acompanhamento semanal. Relatório enviado à escola.",
    responseDate: "2023-03-30",
  },
  {
    id: 6,
    student: "Ana Silva",
    destination: "Conselho Tutelar",
    type: "Suspeita de Maus-Tratos",
    date: "2023-03-10",
    status: "Concluído",
    description: "Aluna apresenta sinais físicos e comportamentais que sugerem maus-tratos.",
    responsible: "Roberto Alves",
    response: "Caso investigado. Família em acompanhamento pelo Conselho Tutelar.",
    responseDate: "2023-03-25",
  },
]

export function EncaminhamentosList() {
  const [selectedEncaminhamento, setSelectedEncaminhamento] = useState<any | null>(null)
  const [responseFormOpen, setResponseFormOpen] = useState<any | null>(null)
  const isMobile = useMobile()

  // Renderização responsiva para dispositivos móveis
  if (isMobile) {
    return (
      <div className="space-y-4">
        {mockEncaminhamentos.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">Nenhum encaminhamento encontrado.</Card>
        ) : (
          mockEncaminhamentos.map((encaminhamento) => (
            <Card key={encaminhamento.id} className="p-4">
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{encaminhamento.student}</h3>
                  <Badge variant={encaminhamento.status === "Pendente" ? "outline" : "secondary"}>
                    {encaminhamento.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm">{encaminhamento.type}</p>
                  <p className="text-sm font-medium">{encaminhamento.destination}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(encaminhamento.date).toLocaleDateString("pt-BR")}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedEncaminhamento(encaminhamento)}
                  >
                    <Eye className="h-4 w-4 mr-2" /> Detalhes
                  </Button>
                  {encaminhamento.status === "Pendente" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1"
                      onClick={() => setResponseFormOpen(encaminhamento)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" /> Responder
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}

        {selectedEncaminhamento && (
          <EncaminhamentoDetails
            encaminhamento={selectedEncaminhamento}
            onClose={() => setSelectedEncaminhamento(null)}
          />
        )}

        {responseFormOpen && (
          <EncaminhamentoResponse encaminhamento={responseFormOpen} onClose={() => setResponseFormOpen(null)} />
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
            <TableHead>Destino</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockEncaminhamentos.map((encaminhamento) => (
            <TableRow key={encaminhamento.id}>
              <TableCell className="font-medium">{encaminhamento.student}</TableCell>
              <TableCell>{encaminhamento.destination}</TableCell>
              <TableCell>{encaminhamento.type}</TableCell>
              <TableCell>{new Date(encaminhamento.date).toLocaleDateString("pt-BR")}</TableCell>
              <TableCell>
                <Badge variant={encaminhamento.status === "Pendente" ? "outline" : "secondary"}>
                  {encaminhamento.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedEncaminhamento(encaminhamento)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  {encaminhamento.status === "Pendente" && (
                    <Button variant="ghost" size="icon" onClick={() => setResponseFormOpen(encaminhamento)}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {mockEncaminhamentos.length === 0 && (
        <Card className="p-6 text-center text-muted-foreground mt-4">Nenhum encaminhamento encontrado.</Card>
      )}

      {selectedEncaminhamento && (
        <EncaminhamentoDetails
          encaminhamento={selectedEncaminhamento}
          onClose={() => setSelectedEncaminhamento(null)}
        />
      )}

      {responseFormOpen && (
        <EncaminhamentoResponse encaminhamento={responseFormOpen} onClose={() => setResponseFormOpen(null)} />
      )}
    </div>
  )
}
