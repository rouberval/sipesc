"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useResponsive } from "@/hooks/use-responsive"

// Mock data for recent incidents
const recentIncidents = [
  {
    id: 1,
    student: "Carlos Oliveira",
    type: "Comportamento",
    severity: "Grave",
    date: "2023-04-05",
    description: "Agressão verbal a outro aluno durante o intervalo",
  },
  {
    id: 2,
    student: "Ana Silva",
    type: "Acadêmico",
    severity: "Moderado",
    date: "2023-04-04",
    description: "Não entregou trabalho pela terceira vez consecutiva",
  },
  {
    id: 3,
    student: "Pedro Santos",
    type: "Comportamento",
    severity: "Leve",
    date: "2023-04-03",
    description: "Uso de celular durante a aula após advertência",
  },
  {
    id: 4,
    student: "Mariana Costa",
    type: "Comportamento",
    severity: "Moderado",
    date: "2023-04-02",
    description: "Saiu da sala sem autorização",
  },
]

export function RecentIncidents() {
  const { isMobile, isTablet } = useResponsive()

  return (
    <Card>
      <CardHeader className="pb-2 px-4 pt-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">Ocorrências Recentes</CardTitle>
        <CardDescription>Últimas ocorrências registradas no sistema</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6">
        <div className="space-y-3 sm:space-y-4">
          {recentIncidents.map((incident) => (
            <div key={incident.id} className="flex flex-col sm:flex-row items-start gap-3 p-3 rounded-lg border">
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h4 className="font-medium text-sm sm:text-base">{incident.student}</h4>
                  <Badge
                    className={cn(
                      "w-fit text-xs",
                      incident.severity === "Grave" && "bg-red-100 text-red-800 hover:bg-red-100",
                      incident.severity === "Moderado" && "bg-amber-100 text-amber-800 hover:bg-amber-100",
                      incident.severity === "Leve" && "bg-blue-100 text-blue-800 hover:bg-blue-100",
                    )}
                  >
                    {incident.severity}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{incident.description}</p>
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mt-2 gap-1">
                  <span className="text-xs text-muted-foreground">{incident.type}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(incident.date).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
