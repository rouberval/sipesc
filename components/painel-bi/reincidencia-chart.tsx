"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import type { ReincidenciaData } from "@/services/bi-service"

interface ReincidenciaChartProps {
  data?: ReincidenciaData[]
}

export function ReincidenciaChart({ data }: ReincidenciaChartProps) {
  // Dados padrão caso não sejam fornecidos
  const defaultData = [
    { escola: "Escola Municipal 1", quantidade: 15 },
    { escola: "Escola Municipal 2", quantidade: 8 },
    { escola: "Escola Municipal 3", quantidade: 22 },
    { escola: "Escola Municipal 4", quantidade: 12 },
    { escola: "Escola Municipal 5", quantidade: 18 },
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
        <XAxis dataKey="escola" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value}`, "Quantidade"]} />
        <Legend />
        <Bar dataKey="quantidade" name="Reincidências" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  )
}
