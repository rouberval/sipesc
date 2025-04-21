"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import type { EncaminhamentoData } from "@/services/bi-service"

interface EncaminhamentosChartProps {
  data?: EncaminhamentoData[]
}

export function EncaminhamentosChart({ data }: EncaminhamentosChartProps) {
  // Dados padrão caso não sejam fornecidos
  const defaultData = [
    { destino: "Conselho Tutelar", quantidade: 65, percentual: 40.6 },
    { destino: "Psicólogo", quantidade: 42, percentual: 26.3 },
    { destino: "Assistente Social", quantidade: 28, percentual: 17.5 },
    { destino: "Ministério Público", quantidade: 15, percentual: 9.4 },
    { destino: "Outros", quantidade: 10, percentual: 6.2 },
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
        <XAxis dataKey="destino" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value}`, "Quantidade"]} />
        <Legend />
        <Bar dataKey="quantidade" name="Quantidade" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}
