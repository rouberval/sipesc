"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import type { FrequenciaData } from "@/services/bi-service"

interface FrequenciaChartProps {
  data?: FrequenciaData[]
}

export function FrequenciaChart({ data }: FrequenciaChartProps) {
  // Dados padrão caso não sejam fornecidos
  const defaultData = [
    { mes: "Jan", frequencia: 92, meta: 95 },
    { mes: "Fev", frequencia: 90, meta: 95 },
    { mes: "Mar", frequencia: 88, meta: 95 },
    { mes: "Abr", frequencia: 85, meta: 95 },
    { mes: "Mai", frequencia: 87, meta: 95 },
    { mes: "Jun", frequencia: 89, meta: 95 },
  ]

  const chartData = data || defaultData

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis domain={[0, 100]} />
        <Tooltip formatter={(value) => [`${value}%`, ""]} />
        <Legend />
        <Line type="monotone" dataKey="frequencia" name="Frequência" stroke="#3b82f6" strokeWidth={2} />
        <Line type="monotone" dataKey="meta" name="Meta" stroke="#ef4444" strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  )
}
