"use client"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import type { StatusEncaminhamentoData } from "@/services/bi-service"

interface StatusEncaminhamentosChartProps {
  data?: StatusEncaminhamentoData[]
}

export function StatusEncaminhamentosChart({ data }: StatusEncaminhamentosChartProps) {
  // Dados padrão caso não sejam fornecidos
  const defaultData = [
    { status: "Pendente", quantidade: 45, percentual: 28.1 },
    { status: "Em andamento", quantidade: 62, percentual: 38.8 },
    { status: "Concluído", quantidade: 48, percentual: 30 },
    { status: "Cancelado", quantidade: 5, percentual: 3.1 },
  ]

  const chartData = data || defaultData

  const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="quantidade"
          nameKey="status"
          label={({ status, percentual }) => `${status}: ${percentual}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name, props) => [`${value} (${props.payload.percentual}%)`, props.payload.status]}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
