"use client"

import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"

interface ReportVisualizationProps {
  data: any
}

export function ReportVisualization({ data }: ReportVisualizationProps) {
  if (!data) {
    return <div>Nenhum dado disponível</div>
  }

  // Renderizar diferentes tipos de visualizações com base no tipo de relatório
  switch (data.type) {
    case "table":
      return (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {data.columns.map((column: string, index: number) => (
                  <TableHead key={index}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((row: any[], rowIndex: number) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )

    case "bar":
      return (
        <Card className="p-4">
          <BarChart
            data={{
              labels: data.labels,
              datasets: [
                {
                  label: data.title,
                  data: data.data,
                  backgroundColor: "rgba(59, 130, 246, 0.5)",
                  borderColor: "rgb(59, 130, 246)",
                  borderWidth: 1,
                },
              ],
            }}
            height={300}
          />
        </Card>
      )

    case "line":
      return (
        <Card className="p-4">
          <LineChart
            data={{
              labels: data.labels,
              datasets: [
                {
                  label: data.title,
                  data: data.data,
                  fill: false,
                  backgroundColor: "rgb(59, 130, 246)",
                  borderColor: "rgba(59, 130, 246, 0.8)",
                  tension: 0.1,
                },
              ],
            }}
            height={300}
          />
        </Card>
      )

    case "pie":
      return (
        <Card className="p-4">
          <PieChart
            data={{
              labels: data.labels,
              datasets: [
                {
                  label: data.title,
                  data: data.data,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.7)",
                    "rgba(54, 162, 235, 0.7)",
                    "rgba(255, 206, 86, 0.7)",
                    "rgba(75, 192, 192, 0.7)",
                    "rgba(153, 102, 255, 0.7)",
                    "rgba(255, 159, 64, 0.7)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            height={300}
          />
        </Card>
      )

    case "error":
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-red-500 font-medium mb-2">Erro ao carregar o relatório</p>
          <p className="text-muted-foreground">O relatório solicitado não foi encontrado ou não está disponível.</p>
        </div>
      )

    default:
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-muted-foreground">Tipo de visualização não suportado.</p>
        </div>
      )
  }
}
