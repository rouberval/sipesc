"use client"

import { ResponsiveGrid } from "@/components/ui/responsive-grid"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, ArrowRightFromLine, Calendar, School } from "lucide-react"
import { useResponsive } from "@/hooks/use-responsive"

export function DashboardStats() {
  const { breakpoint } = useResponsive()

  // Determinar o número de colunas com base no breakpoint
  const getColumns = () => {
    switch (breakpoint) {
      case "xs":
        return 1
      case "sm":
        return 2
      default:
        return 4
    }
  }

  return (
    <ResponsiveGrid xs={1} sm={2} md={2} lg={4} gap="md">
      <Card>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 bg-blue-100 rounded-full">
              <School className="h-4 w-4 sm:h-5 sm:w-5 text-blue-700" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Escolas</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold">5</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 bg-amber-100 rounded-full">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-700" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Ocorrências</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold">87</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 bg-green-100 rounded-full">
              <ArrowRightFromLine className="h-4 w-4 sm:h-5 sm:w-5 text-green-700" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Encaminhamentos</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold">23</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 bg-red-100 rounded-full">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-red-700" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Alertas de Frequência</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold">42</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </ResponsiveGrid>
  )
}
