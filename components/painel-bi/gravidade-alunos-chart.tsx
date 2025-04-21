"use client"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import type { GravidadeAlunoData } from "@/services/bi-service"

interface GravidadeAlunosChartProps {
  data?: GravidadeAlunoData[]
}

export function GravidadeAlunosChart({ data }: GravidadeAlunosChartProps) {
  // Dados padrão caso não sejam fornecidos
  const defaultData = [
    { nivel: "Baixo", quantidade: 120, percentual: 48 },
    { nivel: "Médio", quantidade: 85, percentual: 34 },
    { nivel: "Alto", quantidade: 35, percentual: 14 },
    { nivel: "Crítico", quantidade: 10, percentual: 4 },
  ]

  const chartData = data || defaultData

  const COLORS = ["#10b981", "#f59e0b", "#fb923c", "#ef4444"]

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
          nameKey="nivel"
          label={({ nivel, percentual }) => `${nivel}: ${percentual}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name, props) => [`${value} (${props.payload.percentual}%)`, props.payload.nivel]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
