"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import type { TempoRespostaData } from "@/services/bi-service"

interface TempoRespostaChartProps {
  data?: TempoRespostaData[]
}

export function TempoRespostaChart({ data }: TempoRespostaChartProps) {
  // Dados padrão caso não sejam fornecidos
  const defaultData = [
    { conselho: "Conselho Norte", tempo: 5.2 },
    { conselho: "Conselho Sul", tempo: 7.8 },
    { conselho: "Conselho Leste", tempo: 4.3 },
    { conselho: "Conselho Oeste", tempo: 8.5 },
    { conselho: "Conselho Centro", tempo: 6.1 },
  ]

  const chartData = data || defaultData

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="conselho" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value} dias`, "Tempo médio"]} />
        <Legend />
        <Bar dataKey="tempo" name="Tempo de Resposta (dias)" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  )
}
