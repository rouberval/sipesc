"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

interface ReportFiltersProps {
  reportType?: string
}

export function ReportFilters({ reportType }: ReportFiltersProps) {
  const [dateRange, setDateRange] = useState<{ start: Date | undefined; end: Date | undefined }>({
    start: undefined,
    end: undefined,
  })

  // Renderizar filtros específicos com base no tipo de relatório
  const renderSpecificFilters = () => {
    switch (reportType) {
      case "table":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="search">Buscar</Label>
              <Input id="search" placeholder="Buscar nos dados..." />
            </div>
            <div className="space-y-2">
              <Label>Colunas visíveis</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="col1" defaultChecked />
                  <label htmlFor="col1" className="text-sm">
                    Nome
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="col2" defaultChecked />
                  <label htmlFor="col2" className="text-sm">
                    Idade
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="col3" defaultChecked />
                  <label htmlFor="col3" className="text-sm">
                    Escola
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="col4" defaultChecked />
                  <label htmlFor="col4" className="text-sm">
                    Status
                  </label>
                </div>
              </div>
            </div>
          </>
        )

      case "bar":
      case "line":
        return (
          <>
            <div className="space-y-2">
              <Label>Limite de dados</Label>
              <Slider defaultValue={[10]} max={20} step={1} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sort">Ordenação</Label>
              <Select defaultValue="desc">
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Selecione a ordenação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Crescente</SelectItem>
                  <SelectItem value="desc">Decrescente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )

      case "pie":
        return (
          <>
            <div className="space-y-2">
              <Label>Mostrar legenda</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="showLegend" defaultChecked />
                <label htmlFor="showLegend" className="text-sm">
                  Exibir legenda
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Mostrar percentuais</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="showPercentage" defaultChecked />
                <label htmlFor="showPercentage" className="text-sm">
                  Exibir percentuais
                </label>
              </div>
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Data inicial</Label>
          <DatePicker
            date={dateRange.start}
            setDate={(date) => setDateRange({ ...dateRange, start: date })}
            placeholder="Selecione a data inicial"
          />
        </div>
        <div className="space-y-2">
          <Label>Data final</Label>
          <DatePicker
            date={dateRange.end}
            setDate={(date) => setDateRange({ ...dateRange, end: date })}
            placeholder="Selecione a data final"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select defaultValue="all">
          <SelectTrigger id="status">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="pending">Pendentes</SelectItem>
            <SelectItem value="completed">Concluídos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {renderSpecificFilters()}

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline">Limpar Filtros</Button>
        <Button>Aplicar Filtros</Button>
      </div>
    </div>
  )
}
