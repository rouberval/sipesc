"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import type { ConselhoOcorrenciaData } from "@/services/bi-service"

interface ConselhoOcorrenciasChartProps {
  data?: ConselhoOcorrenciaData[]
}

export function ConselhoOcorrenciasChart({ data }: ConselhoOcorrenciasChartProps) {
  // Dados padrão caso não sejam fornecidos
  const defaultData = [
    { conselho: "Conselho Norte", resolvidas: 85, pendentes: 15, total: 100 },
    { conselho: "Conselho Sul", resolvidas: 72, pendentes: 28, total: 100 },
    { conselho: "Conselho Leste", resolvidas: 93, pendentes: 7, total: 100 },
    { conselho: "Conselho Oeste", resolvidas: 68, pendentes: 32, total: 100 },
    { conselho: "Conselho Centro", resolvidas: 79, pendentes: 21, total: 100 },
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
        <Tooltip />
        <Legend />
        <Bar dataKey="resolvidas" name="Resolvidas" stackId="a" fill="#10b981" />
        <Bar dataKey="pendentes" name="Pendentes" stackId="a" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  )
}
