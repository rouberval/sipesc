"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useResponsive } from "@/hooks/use-responsive"

// Mock data for pending referrals
const pendingReferrals = [
  {
    id: 1,
    student: "Lucas Mendes",
    destination: "Conselho Tutelar",
    type: "Abandono Escolar",
    date: "2023-03-28",
    status: "Pendente",
  },
  {
    id: 2,
    student: "Juliana Ferreira",
    destination: "CRAS",
    type: "Vulnerabilidade Social",
    date: "2023-03-25",
    status: "Pendente",
  },
  {
    id: 3,
    student: "Rafael Almeida",
    destination: "Psicólogo",
    type: "Comportamento Agressivo",
    date: "2023-03-22",
    status: "Pendente",
  },
  {
    id: 4,
    student: "Camila Rodrigues",
    destination: "Conselho Tutelar",
    type: "Faltas Excessivas",
    date: "2023-03-20",
    status: "Pendente",
  },
]

export function PendingReferrals() {
  const { breakpoint } = useResponsive()

  return (
    <Card>
      <CardHeader className="pb-2 px-4 pt-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">Encaminhamentos Pendentes</CardTitle>
        <CardDescription>Encaminhamentos aguardando resposta</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6">
        <div className="space-y-3 sm:space-y-4">
          {pendingReferrals.map((referral) => (
            <div key={referral.id} className="flex flex-col sm:flex-row items-start gap-3 p-3 rounded-lg border">
              <div className="flex-1 w-full">
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
                  <h4 className="font-medium text-sm sm:text-base">{referral.student}</h4>
                  <Badge variant="outline" className="w-fit text-xs">
                    {referral.destination}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{referral.type}</p>
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mt-2 gap-1">
                  <span className="text-xs text-muted-foreground">
                    Enviado em: {new Date(referral.date).toLocaleDateString("pt-BR")}
                  </span>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {referral.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
