"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import type { OcorrenciaData } from "@/services/bi-service"

interface OcorrenciasChartProps {
  data?: OcorrenciaData[]
}

export function OcorrenciasChart({ data }: OcorrenciasChartProps) {
  // Dados padrão caso não sejam fornecidos
  const defaultData = [
    { tipo: "Bullying", quantidade: 45, percentual: 22.5 },
    { tipo: "Violência", quantidade: 32, percentual: 16 },
    { tipo: "Indisciplina", quantidade: 78, percentual: 39 },
    { tipo: "Absenteísmo", quantidade: 25, percentual: 12.5 },
    { tipo: "Outros", quantidade: 20, percentual: 10 },
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
        <XAxis dataKey="tipo" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value}`, "Quantidade"]} />
        <Legend />
        <Bar dataKey="quantidade" name="Quantidade" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  )
}
