"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Info } from "lucide-react"
import type { ReportConfig } from "@/app/relatorios/personalizar/page"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

// Dados de exemplo para visualização
const mockData = [
  {
    "aluno.nome": "Carlos Oliveira",
    "aluno.idade": 14,
    "aluno.turma": "9º Ano A",
    "aluno.escola": "Escola Municipal João da Silva",
    "aluno.responsavel": "Maria Oliveira",
    "aluno.status": "risco",
    "aluno.dataNascimento": "2009-05-15",
    "aluno.genero": "Masculino",
    "aluno.endereco": "Rua das Flores, 123",
    "aluno.bairro": "Centro",
    "aluno.cidade": "Florianópolis",
    "ocorrencia.tipo": "Comportamento",
    "ocorrencia.data": "2023-04-05",
    "ocorrencia.gravidade": "Grave",
    "ocorrencia.descricao": "Agressão verbal a outro aluno durante o intervalo",
    "ocorrencia.medidas": "Conversa com os pais e suspensão de 2 dias",
    "ocorrencia.responsavel": "João Silva",
    "ocorrencia.reincidencia": true,
    "ocorrencia.local": "Pátio da escola",
    "frequencia.faltas": 25,
    "frequencia.percentual": 75,
    "frequencia.justificadas": 5,
    "frequencia.consecutivas": 3,
    "frequencia.periodo": "1º Bimestre",
    "frequencia.ultimaPresenca": "2023-03-28",
    "frequencia.status": "Crítica",
    "encaminhamento.destino": "Conselho Tutelar",
    "encaminhamento.data": "2023-04-10",
    "encaminhamento.tipo": "Abandono Escolar",
    "encaminhamento.status": "Pendente",
    "encaminhamento.resposta": null,
    "encaminhamento.dataResposta": null,
    "encaminhamento.tempoResposta": null,
    "encaminhamento.responsavel": "Maria Santos",
    "escola.nome": "Escola Municipal João da Silva",
    "escola.regiao": "Norte",
    "escola.municipio": "Florianópolis",
    "escola.diretor": "Maria Santos",
    "escola.totalAlunos": 450,
    "escola.telefone": "(48) 3333-1111",
    "escola.endereco": "Rua das Flores, 123",
    "escola.tipoEscola": "Municipal",
    "conselho.nome": "Conselho Tutelar Norte",
    "conselho.regiao": "Norte",
    "conselho.municipio": "Florianópolis",
    "conselho.coordenador": "Roberto Alves",
    "conselho.tempoResposta": 2.3,
    "conselho.casosAtivos": 45,
    "conselho.casosPendentes": 12,
    "conselho.escolasVinculadas": 8,
  },
  {
    "aluno.nome": "Ana Silva",
    "aluno.idade": 12,
    "aluno.turma": "7º Ano B",
    "aluno.escola": "Escola Municipal João da Silva",
    "aluno.responsavel": "João Silva",
    "aluno.status": "atencao",
    "aluno.dataNascimento": "2011-08-22",
    "aluno.genero": "Feminino",
    "aluno.endereco": "Av. Principal, 456",
    "aluno.bairro": "Trindade",
    "aluno.cidade": "Florianópolis",
    "ocorrencia.tipo": "Acadêmico",
    "ocorrencia.data": "2023-04-04",
    "ocorrencia.gravidade": "Moderado",
    "ocorrencia.descricao": "Não entregou trabalho pela terceira vez consecutiva",
    "ocorrencia.medidas": "Notificação aos pais e oportunidade de recuperação",
    "ocorrencia.responsavel": "Ana Oliveira",
    "ocorrencia.reincidencia": false,
    "ocorrencia.local": "Sala de aula",
    "frequencia.faltas": 15,
    "frequencia.percentual": 85,
    "frequencia.justificadas": 10,
    "frequencia.consecutivas": 0,
    "frequencia.periodo": "1º Bimestre",
    "frequencia.ultimaPresenca": "2023-04-01",
    "frequencia.status": "Regular",
    "encaminhamento.destino": "CRAS",
    "encaminhamento.data": "2023-03-25",
    "encaminhamento.tipo": "Vulnerabilidade Social",
    "encaminhamento.status": "Pendente",
    "encaminhamento.resposta": null,
    "encaminhamento.dataResposta": null,
    "encaminhamento.tempoResposta": null,
    "encaminhamento.responsavel": "João Pereira",
    "escola.nome": "Escola Municipal João da Silva",
    "escola.regiao": "Norte",
    "escola.municipio": "Florianópolis",
    "escola.diretor": "Maria Santos",
    "escola.totalAlunos": 450,
    "escola.telefone": "(48) 3333-1111",
    "escola.endereco": "Rua das Flores, 123",
    "escola.tipoEscola": "Municipal",
    "conselho.nome": "Conselho Tutelar Norte",
    "conselho.regiao": "Norte",
    "conselho.municipio": "Florianópolis",
    "conselho.coordenador": "Roberto Alves",
    "conselho.tempoResposta": 2.3,
    "conselho.casosAtivos": 45,
    "conselho.casosPendentes": 12,
    "conselho.escolasVinculadas": 8,
  },
  {
    "aluno.nome": "Pedro Santos",
    "aluno.idade": 15,
    "aluno.turma": "1º Ano EM",
    "aluno.escola": "Escola Estadual Maria Oliveira",
    "aluno.responsavel": "Carla Santos",
    "aluno.status": "risco",
    "aluno.dataNascimento": "2008-03-10",
    "aluno.genero": "Masculino",
    "aluno.endereco": "Rua Secundária, 789",
    "aluno.bairro": "Córrego Grande",
    "aluno.cidade": "São José",
    "ocorrencia.tipo": "Comportamento",
    "ocorrencia.data": "2023-04-03",
    "ocorrencia.gravidade": "Leve",
    "ocorrencia.descricao": "Uso de celular durante a aula após advertência",
    "ocorrencia.medidas": "Advertência verbal e anotação na agenda",
    "ocorrencia.responsavel": "Carlos Silva",
    "ocorrencia.reincidencia": true,
    "ocorrencia.local": "Sala de aula",
    "frequencia.faltas": 30,
    "frequencia.percentual": 70,
    "frequencia.justificadas": 8,
    "frequencia.consecutivas": 5,
    "frequencia.periodo": "1º Bimestre",
    "frequencia.ultimaPresenca": "2023-03-25",
    "frequencia.status": "Crítica",
    "encaminhamento.destino": "Psicólogo",
    "encaminhamento.data": "2023-03-22",
    "encaminhamento.tipo": "Comportamento Agressivo",
    "encaminhamento.status": "Pendente",
    "encaminhamento.resposta": null,
    "encaminhamento.dataResposta": null,
    "encaminhamento.tempoResposta": null,
    "encaminhamento.responsavel": "Ana Oliveira",
    "escola.nome": "Escola Estadual Maria Oliveira",
    "escola.regiao": "Sul",
    "escola.municipio": "São José",
    "escola.diretor": "João Pereira",
    "escola.totalAlunos": 320,
    "escola.telefone": "(48) 3333-2222",
    "escola.endereco": "Av. Principal, 456",
    "escola.tipoEscola": "Estadual",
    "conselho.nome": "Conselho Tutelar Sul",
    "conselho.regiao": "Sul",
    "conselho.municipio": "São José",
    "conselho.coordenador": "Carla Santos",
    "conselho.tempoResposta": 1.5,
    "conselho.casosAtivos": 38,
    "conselho.casosPendentes": 15,
    "conselho.escolasVinculadas": 6,
  },
  {
    "aluno.nome": "Mariana Costa",
    "aluno.idade": 13,
    "aluno.turma": "8º Ano C",
    "aluno.escola": "Colégio Pedro Alves",
    "aluno.responsavel": "Roberto Costa",
    "aluno.status": "normal",
    "aluno.dataNascimento": "2010-11-05",
    "aluno.genero": "Feminino",
    "aluno.endereco": "Av. Central, 321",
    "aluno.bairro": "Itacorubi",
    "aluno.cidade": "Palhoça",
    "ocorrencia.tipo": "Comportamento",
    "ocorrencia.data": "2023-04-02",
    "ocorrencia.gravidade": "Moderado",
    "ocorrencia.descricao": "Saiu da sala sem autorização",
    "ocorrencia.medidas": "Conversa com o aluno e notificação aos pais",
    "ocorrencia.responsavel": "Fernanda Lima",
    "ocorrencia.reincidencia": false,
    "ocorrencia.local": "Sala de aula",
    "frequencia.faltas": 8,
    "frequencia.percentual": 92,
    "frequencia.justificadas": 6,
    "frequencia.consecutivas": 0,
    "frequencia.periodo": "1º Bimestre",
    "frequencia.ultimaPresenca": "2023-04-01",
    "frequencia.status": "Boa",
    "encaminhamento.destino": "Conselho Tutelar",
    "encaminhamento.data": "2023-03-20",
    "encaminhamento.tipo": "Faltas Excessivas",
    "encaminhamento.status": "Pendente",
    "encaminhamento.resposta": null,
    "encaminhamento.dataResposta": null,
    "encaminhamento.tempoResposta": null,
    "encaminhamento.responsavel": "Carlos Silva",
    "escola.nome": "Colégio Pedro Alves",
    "escola.regiao": "Leste",
    "escola.municipio": "Palhoça",
    "escola.diretor": "Ana Oliveira",
    "escola.totalAlunos": 280,
    "escola.telefone": "(48) 3333-3333",
    "escola.endereco": "Rua Secundária, 789",
    "escola.tipoEscola": "Particular",
    "conselho.nome": "Conselho Tutelar Leste",
    "conselho.regiao": "Leste",
    "conselho.municipio": "Palhoça",
    "conselho.coordenador": "Paulo Oliveira",
    "conselho.tempoResposta": 3.7,
    "conselho.casosAtivos": 52,
    "conselho.casosPendentes": 8,
    "conselho.escolasVinculadas": 5,
  },
  {
    "aluno.nome": "Lucas Mendes",
    "aluno.idade": 16,
    "aluno.turma": "2º Ano EM",
    "aluno.escola": "Escola Estadual Maria Oliveira",
    "aluno.responsavel": "Fernanda Mendes",
    "aluno.status": "atencao",
    "aluno.dataNascimento": "2007-07-20",
    "aluno.genero": "Masculino",
    "aluno.endereco": "Praça da Cidade, 100",
    "aluno.bairro": "Centro",
    "aluno.cidade": "São José",
    "ocorrencia.tipo": "Acadêmico",
    "ocorrencia.data": "2023-04-01",
    "ocorrencia.gravidade": "Leve",
    "ocorrencia.descricao": "Não trouxe o material pela segunda vez na semana",
    "ocorrencia.medidas": "Anotação na agenda",
    "ocorrencia.responsavel": "Roberto Alves",
    "ocorrencia.reincidencia": false,
    "ocorrencia.local": "Sala de aula",
    "frequencia.faltas": 12,
    "frequencia.percentual": 88,
    "frequencia.justificadas": 4,
    "frequencia.consecutivas": 0,
    "frequencia.periodo": "1º Bimestre",
    "frequencia.ultimaPresenca": "2023-03-30",
    "frequencia.status": "Regular",
    "encaminhamento.destino": "CAPS",
    "encaminhamento.data": "2023-03-15",
    "encaminhamento.tipo": "Saúde Mental",
    "encaminhamento.status": "Concluído",
    "encaminhamento.resposta": "Aluno acolhido e em acompanhamento semanal. Relatório enviado à escola.",
    "encaminhamento.dataResposta": "2023-03-30",
    "encaminhamento.tempoResposta": 15,
    "encaminhamento.responsavel": "Fernanda Lima",
    "escola.nome": "Escola Estadual Maria Oliveira",
    "escola.regiao": "Sul",
    "escola.municipio": "São José",
    "escola.diretor": "João Pereira",
    "escola.totalAlunos": 320,
    "escola.telefone": "(48) 3333-2222",
    "escola.endereco": "Av. Principal, 456",
    "escola.tipoEscola": "Estadual",
    "conselho.nome": "Conselho Tutelar Sul",
    "conselho.regiao": "Sul",
    "conselho.municipio": "São José",
    "conselho.coordenador": "Carla Santos",
    "conselho.tempoResposta": 1.5,
    "conselho.casosAtivos": 38,
    "conselho.casosPendentes": 15,
    "conselho.escolasVinculadas": 6,
  },
]

// Cores para gráficos
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658", "#8dd1e1"]

interface ReportPreviewProps {
  config: ReportConfig
}

// Defina availableFields aqui ou importe de outro lugar
const availableFields = [
  { id: "aluno.nome", name: "Nome do Aluno" },
  { id: "aluno.idade", name: "Idade do Aluno" },
  { id: "aluno.turma", name: "Turma do Aluno" },
  { id: "aluno.escola", name: "Escola do Aluno" },
  { id: "aluno.responsavel", name: "Responsável do Aluno" },
  { id: "aluno.status", name: "Status do Aluno" },
  { id: "aluno.dataNascimento", name: "Data de Nascimento" },
  { id: "aluno.genero", name: "Gênero" },
  { id: "aluno.endereco", name: "Endereço" },
  { id: "aluno.bairro", name: "Bairro" },
  { id: "aluno.cidade", name: "Cidade" },
  { id: "ocorrencia.tipo", name: "Tipo de Ocorrência" },
  { id: "ocorrencia.data", name: "Data da Ocorrência" },
  { id: "ocorrencia.gravidade", name: "Gravidade da Ocorrência" },
  { id: "ocorrencia.descricao", name: "Descrição da Ocorrência" },
  { id: "ocorrencia.medidas", name: "Medidas da Ocorrência" },
  { id: "ocorrencia.responsavel", name: "Responsável pelo Registro" },
  { id: "ocorrencia.reincidencia", name: "É Reincidência" },
  { id: "ocorrencia.local", name: "Local da Ocorrência" },
  { id: "frequencia.faltas", name: "Faltas" },
  { id: "frequencia.percentual", name: "Percentual de Frequência" },
  { id: "frequencia.justificadas", name: "Faltas Justificadas" },
  { id: "frequencia.consecutivas", name: "Faltas Consecutivas" },
  { id: "frequencia.periodo", name: "Período" },
  { id: "frequencia.ultimaPresenca", name: "Data da Última Presença" },
  { id: "frequencia.status", name: "Status de Frequência" },
  { id: "encaminhamento.destino", name: "Órgão de Destino" },
  { id: "encaminhamento.data", name: "Data do Encaminhamento" },
  { id: "encaminhamento.tipo", name: "Tipo de Encaminhamento" },
  { id: "encaminhamento.status", name: "Status do Encaminhamento" },
  { id: "encaminhamento.resposta", name: "Resposta do Encaminhamento" },
  { id: "encaminhamento.dataResposta", name: "Data da Resposta" },
  { id: "encaminhamento.tempoResposta", name: "Tempo de Resposta (dias)" },
  { id: "encaminhamento.responsavel", name: "Responsável pelo Encaminhamento" },
  { id: "escola.nome", name: "Nome da Escola" },
  { id: "escola.regiao", name: "Região da Escola" },
  { id: "escola.municipio", name: "Município da Escola" },
  { id: "escola.diretor", name: "Diretor da Escola" },
  { id: "escola.totalAlunos", name: "Total de Alunos da Escola" },
  { id: "escola.telefone", name: "Telefone da Escola" },
  { id: "escola.endereco", name: "Endereço da Escola" },
  { id: "escola.tipoEscola", name: "Tipo de Escola" },
  { id: "conselho.nome", name: "Nome do Conselho Tutelar" },
  { id: "conselho.regiao", name: "Região do Conselho Tutelar" },
  { id: "conselho.municipio", name: "Município do Conselho Tutelar" },
  { id: "conselho.coordenador", name: "Coordenador do Conselho Tutelar" },
  { id: "conselho.tempoResposta", name: "Tempo de Resposta do Conselho Tutelar" },
  { id: "conselho.casosAtivos", name: "Casos Ativos do Conselho Tutelar" },
  { id: "conselho.casosPendentes", name: "Casos Pendentes do Conselho Tutelar" },
  { id: "conselho.escolasVinculadas", name: "Escolas Vinculadas ao Conselho Tutelar" },
]

export function ReportPreview({ config }: ReportPreviewProps) {
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [chartData, setChartData] = useState<any[]>([])
  const [activeView, setActiveView] = useState<"preview" | "data" | "sql">("preview")

  useEffect(() => {
    // Aplicar filtros aos dados
    let data = [...mockData]

    // Aplicar filtro de data se especificado
    if (config.dateRange?.start || config.dateRange?.end) {
      data = data.filter((item) => {
        // Verificar se há algum campo de data que corresponda ao filtro
        const dateFields = ["ocorrencia.data", "encaminhamento.data", "frequencia.ultimaPresenca"]

        return dateFields.some((dateField) => {
          if (!item[dateField]) return false

          const itemDate = new Date(item[dateField])

          if (config.dateRange?.start) {
            const startDate = new Date(config.dateRange.start)
            if (itemDate < startDate) return false
          }

          if (config.dateRange?.end) {
            const endDate = new Date(config.dateRange.end)
            if (itemDate > endDate) return false
          }

          return true
        })
      })
    }

    // Aplicar filtros específicos
    if (config.filters && config.filters.length > 0) {
      data = data.filter((item) => {
        return config.filters.every((filter) => {
          const value = item[filter.field]

          switch (filter.operator) {
            case "equals":
              return String(value).toLowerCase() === String(filter.value).toLowerCase()
            case "contains":
              return String(value).toLowerCase().includes(String(filter.value).toLowerCase())
            case "greaterThan":
              return Number(value) > Number(filter.value)
            case "lessThan":
              return Number(value) < Number(filter.value)
            case "between":
              const [min, max] = String(filter.value).split(",").map(Number)
              return Number(value) >= min && Number(value) <= max
            case "in":
              const values = String(filter.value)
                .split(",")
                .map((v) => v.trim().toLowerCase())
              return values.includes(String(value).toLowerCase())
            default:
              return true
          }
        })
      })
    }

    // Aplicar ordenação
    if (config.sortBy && config.sortBy.length > 0) {
      data = [...data].sort((a, b) => {
        for (const sort of config.sortBy || []) {
          const valueA = a[sort.field]
          const valueB = b[sort.field]

          if (valueA === valueB) continue

          const direction = sort.direction === "asc" ? 1 : -1

          if (typeof valueA === "number" && typeof valueB === "number") {
            return (valueA - valueB) * direction
          }

          return String(valueA).localeCompare(String(valueB)) * direction
        }
        return 0
      })
    }

    setFilteredData(data)

    // Preparar dados para gráficos se necessário
    if (config.visualization !== "table" && config.groupBy && config.groupBy.length > 0) {
      const groupByField = config.groupBy[0]
      const aggregatedData: Record<string, any> = {}

      data.forEach((item) => {
        const groupValue = String(item[groupByField])
        if (!aggregatedData[groupValue]) {
          aggregatedData[groupValue] = {
            name: groupValue,
            count: 0,
          }

          // Adicionar campos numéricos para agregação
          config.fields.forEach((field) => {
            if (typeof item[field] === "number") {
              aggregatedData[groupValue][field] = 0
            }
          })
        }

        aggregatedData[groupValue].count++

        // Somar valores numéricos
        config.fields.forEach((field) => {
          if (typeof item[field] === "number") {
            aggregatedData[groupValue][field] += item[field]
          }
        })
      })

      // Aplicar função de agregação se especificada
      if (config.aggregation) {
        const { function: func, field } = config.aggregation

        Object.keys(aggregatedData).forEach((key) => {
          if (func === "count") {
            // Já temos a contagem
          } else if (field && func === "avg") {
            aggregatedData[key][field] = aggregatedData[key][field] / aggregatedData[key].count
          }
          // Outras funções de agregação já estão calculadas (sum, min, max)
        })
      }

      setChartData(Object.values(aggregatedData))
    }
  }, [config])

  // Gerar consulta SQL equivalente
  const generateSqlQuery = () => {
    const selectedFields = config.fields
      .map((field) => {
        const fieldName = availableFields.find((f) => f.id === field)?.name || field
        return `${field} AS "${fieldName}"`
      })
      .join(", ")

    let query = `SELECT ${selectedFields} FROM dados`

    // Adicionar cláusula WHERE para filtros
    if (config.filters && config.filters.length > 0) {
      const whereConditions = config.filters
        .map((filter) => {
          switch (filter.operator) {
            case "equals":
              return `${filter.field} = '${filter.value}'`
            case "contains":
              return `${filter.field} LIKE '%${filter.value}%'`
            case "greaterThan":
              return `${filter.field} > ${filter.value}`
            case "lessThan":
              return `${filter.field} < ${filter.value}`
            case "between":
              const [min, max] = String(filter.value).split(",")
              return `${filter.field} BETWEEN ${min} AND ${max}`
            case "in":
              const values = String(filter.value)
                .split(",")
                .map((v) => `'${v.trim()}'`)
                .join(", ")
              return `${filter.field} IN (${values})`
            default:
              return ""
          }
        })
        .filter(Boolean)
        .join(" AND ")

      if (whereConditions) {
        query += ` WHERE ${whereConditions}`
      }
    }

    // Adicionar cláusula GROUP BY
    if (config.groupBy && config.groupBy.length > 0 && config.visualization !== "table") {
      query += ` GROUP BY ${config.groupBy.join(", ")}`
    }

    // Adicionar cláusula ORDER BY
    if (config.sortBy && config.sortBy.length > 0) {
      const orderClauses = config.sortBy
        .map((sort) => `${sort.field} ${sort.direction === "asc" ? "ASC" : "DESC"}`)
        .join(", ")

      query += ` ORDER BY ${orderClauses}`
    }

    return query
  }

  // Renderizar tabela
  const renderTable = () => {
    return (
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {config.fields.map((fieldId) => {
                const fieldName = availableFields.find((f) => f.id === fieldId)?.name || fieldId
                return <TableHead key={fieldId}>{fieldName}</TableHead>
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={index}>
                {config.fields.map((fieldId) => (
                  <TableCell key={fieldId}>{item[fieldId] !== null ? item[fieldId] : "-"}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  // Renderizar gráfico de barras
  const renderBarChart = () => {
    if (!config.groupBy || chartData.length === 0) return <div>Selecione um campo para agrupar os dados</div>

    const dataKey =
      config.aggregation?.field || config.fields.find((f) => typeof mockData[0][f] === "number") || "count"
    const fieldName = availableFields.find((f) => f.id === dataKey)?.name || dataKey

    return (
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey} fill="#3b82f6" name={fieldName} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  // Renderizar gráfico de linhas
  const renderLineChart = () => {
    if (!config.groupBy || chartData.length === 0) return <div>Selecione um campo para agrupar os dados</div>

    const dataKey =
      config.aggregation?.field || config.fields.find((f) => typeof mockData[0][f] === "number") || "count"
    const fieldName = availableFields.find((f) => f.id === dataKey)?.name || dataKey

    return (
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={dataKey} stroke="#3b82f6" name={fieldName} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  // Renderizar gráfico de pizza
  const renderPieChart = () => {
    if (!config.groupBy || chartData.length === 0) return <div>Selecione um campo para agrupar os dados</div>

    const dataKey =
      config.aggregation?.field || config.fields.find((f) => typeof mockData[0][f] === "number") || "count"
    const fieldName = availableFields.find((f) => f.id === dataKey)?.name || dataKey

    return (
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}`, fieldName]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  // Renderizar mapa (simplificado)
  const renderMap = () => {
    return (
      <div className="h-96 w-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Visualização de mapa não disponível na prévia</p>
      </div>
    )
  }

  // Renderizar visualização com base na configuração
  const renderVisualization = () => {
    if (config.fields.length === 0) {
      return (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Nenhum campo selecionado</AlertTitle>
          <AlertDescription>Selecione campos na aba "Campos" para visualizar os dados</AlertDescription>
        </Alert>
      )
    }

    switch (config.visualization) {
      case "table":
        return renderTable()
      case "bar":
        return renderBarChart()
      case "line":
        return renderLineChart()
      case "pie":
        return renderPieChart()
      case "map":
        return renderMap()
      default:
        return renderTable()
    }
  }

  return (
    <div>
      <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="mb-4">
        <TabsList>
          <TabsTrigger value="preview">Visualização</TabsTrigger>
          <TabsTrigger value="data">Dados Brutos</TabsTrigger>
          <TabsTrigger value="sql">SQL</TabsTrigger>
        </TabsList>
      </Tabs>

      <TabsContent value="preview" className="mt-0">
        {filteredData.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Nenhum dado encontrado</AlertTitle>
            <AlertDescription>
              Nenhum dado encontrado para os filtros selecionados. Tente ajustar os filtros.
            </AlertDescription>
          </Alert>
        ) : (
          renderVisualization()
        )}
      </TabsContent>

      <TabsContent value="data" className="mt-0">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-2">{filteredData.length} registros encontrados</div>
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96 text-xs">
              {JSON.stringify(filteredData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="sql" className="mt-0">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Consulta SQL equivalente ao relatório atual</span>
            </div>
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96 text-xs">{generateSqlQuery()}</pre>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  )
}
