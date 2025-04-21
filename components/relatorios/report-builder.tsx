"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Filter, SortAsc, SortDesc, BarChart3, PieChart, LineChart, Table2, Map } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { ReportConfig, ReportField } from "@/app/relatorios/personalizar/page"

// Lista de campos disponíveis para relatórios
const availableFields: ReportField[] = [
  // Campos de Alunos
  { id: "aluno.nome", name: "Nome do Aluno", category: "Alunos", type: "text" },
  { id: "aluno.idade", name: "Idade", category: "Alunos", type: "number" },
  { id: "aluno.turma", name: "Turma", category: "Alunos", type: "text" },
  { id: "aluno.escola", name: "Escola", category: "Alunos", type: "text" },
  { id: "aluno.responsavel", name: "Responsável", category: "Alunos", type: "text" },
  { id: "aluno.status", name: "Status de Risco", category: "Alunos", type: "text" },
  { id: "aluno.dataNascimento", name: "Data de Nascimento", category: "Alunos", type: "date" },
  { id: "aluno.genero", name: "Gênero", category: "Alunos", type: "text" },
  { id: "aluno.endereco", name: "Endereço", category: "Alunos", type: "text" },
  { id: "aluno.bairro", name: "Bairro", category: "Alunos", type: "text" },
  { id: "aluno.cidade", name: "Cidade", category: "Alunos", type: "text" },

  // Campos de Ocorrências
  { id: "ocorrencia.tipo", name: "Tipo de Ocorrência", category: "Ocorrências", type: "text" },
  { id: "ocorrencia.data", name: "Data da Ocorrência", category: "Ocorrências", type: "date" },
  { id: "ocorrencia.gravidade", name: "Gravidade", category: "Ocorrências", type: "text" },
  { id: "ocorrencia.descricao", name: "Descrição", category: "Ocorrências", type: "text" },
  { id: "ocorrencia.medidas", name: "Medidas Aplicadas", category: "Ocorrências", type: "text" },
  { id: "ocorrencia.responsavel", name: "Responsável pelo Registro", category: "Ocorrências", type: "text" },
  { id: "ocorrencia.reincidencia", name: "É Reincidência", category: "Ocorrências", type: "boolean" },
  { id: "ocorrencia.local", name: "Local da Ocorrência", category: "Ocorrências", type: "text" },

  // Campos de Frequência
  { id: "frequencia.faltas", name: "Número de Faltas", category: "Frequência", type: "number" },
  { id: "frequencia.percentual", name: "Percentual de Presença", category: "Frequência", type: "number" },
  { id: "frequencia.justificadas", name: "Faltas Justificadas", category: "Frequência", type: "number" },
  { id: "frequencia.consecutivas", name: "Faltas Consecutivas", category: "Frequência", type: "number" },
  { id: "frequencia.periodo", name: "Período", category: "Frequência", type: "text" },
  { id: "frequencia.ultimaPresenca", name: "Data da Última Presença", category: "Frequência", type: "date" },
  { id: "frequencia.status", name: "Status de Frequência", category: "Frequência", type: "text" },

  // Campos de Encaminhamentos
  { id: "encaminhamento.destino", name: "Órgão de Destino", category: "Encaminhamentos", type: "text" },
  { id: "encaminhamento.data", name: "Data do Encaminhamento", category: "Encaminhamentos", type: "date" },
  { id: "encaminhamento.tipo", name: "Tipo de Encaminhamento", category: "Encaminhamentos", type: "text" },
  { id: "encaminhamento.status", name: "Status", category: "Encaminhamentos", type: "text" },
  { id: "encaminhamento.resposta", name: "Resposta", category: "Encaminhamentos", type: "text" },
  { id: "encaminhamento.dataResposta", name: "Data da Resposta", category: "Encaminhamentos", type: "date" },
  { id: "encaminhamento.tempoResposta", name: "Tempo de Resposta (dias)", category: "Encaminhamentos", type: "number" },
  {
    id: "encaminhamento.responsavel",
    name: "Responsável pelo Encaminhamento",
    category: "Encaminhamentos",
    type: "text",
  },

  // Campos de Escolas
  { id: "escola.nome", name: "Nome da Escola", category: "Escolas", type: "text" },
  { id: "escola.regiao", name: "Região", category: "Escolas", type: "text" },
  { id: "escola.municipio", name: "Município", category: "Escolas", type: "text" },
  { id: "escola.diretor", name: "Diretor", category: "Escolas", type: "text" },
  { id: "escola.totalAlunos", name: "Total de Alunos", category: "Escolas", type: "number" },
  { id: "escola.telefone", name: "Telefone", category: "Escolas", type: "text" },
  { id: "escola.endereco", name: "Endereço", category: "Escolas", type: "text" },
  { id: "escola.tipoEscola", name: "Tipo de Escola", category: "Escolas", type: "text" },

  // Campos de Conselhos Tutelares
  { id: "conselho.nome", name: "Nome do Conselho", category: "Conselhos", type: "text" },
  { id: "conselho.regiao", name: "Região", category: "Conselhos", type: "text" },
  { id: "conselho.municipio", name: "Município", category: "Conselhos", type: "text" },
  { id: "conselho.coordenador", name: "Coordenador", category: "Conselhos", type: "text" },
  { id: "conselho.tempoResposta", name: "Tempo Médio de Resposta", category: "Conselhos", type: "number" },
  { id: "conselho.casosAtivos", name: "Casos Ativos", category: "Conselhos", type: "number" },
  { id: "conselho.casosPendentes", name: "Casos Pendentes", category: "Conselhos", type: "number" },
  { id: "conselho.escolasVinculadas", name: "Escolas Vinculadas", category: "Conselhos", type: "number" },
]

// Agrupar campos por categoria
const fieldsByCategory = availableFields.reduce(
  (acc, field) => {
    if (!acc[field.category]) {
      acc[field.category] = []
    }
    acc[field.category].push(field)
    return acc
  },
  {} as Record<string, ReportField[]>,
)

// Operadores disponíveis para filtros
const filterOperators = [
  { value: "equals", label: "Igual a" },
  { value: "contains", label: "Contém" },
  { value: "greaterThan", label: "Maior que" },
  { value: "lessThan", label: "Menor que" },
  { value: "between", label: "Entre" },
  { value: "in", label: "Em" },
]

// Opções de visualização
const visualizationOptions = [
  { value: "table", label: "Tabela", icon: Table2 },
  { value: "bar", label: "Gráfico de Barras", icon: BarChart3 },
  { value: "line", label: "Gráfico de Linhas", icon: LineChart },
  { value: "pie", label: "Gráfico de Pizza", icon: PieChart },
  { value: "map", label: "Mapa", icon: Map },
]

// Funções de agregação
const aggregationFunctions = [
  { value: "count", label: "Contagem" },
  { value: "sum", label: "Soma" },
  { value: "avg", label: "Média" },
  { value: "min", label: "Mínimo" },
  { value: "max", label: "Máximo" },
]

type ReportVisualization = "table" | "bar" | "line" | "pie" | "map" | "heatmap" | "radar"

interface ReportBuilderProps {
  config: ReportConfig
  onChange: (config: ReportConfig) => void
}

export function ReportBuilder({ config, onChange }: ReportBuilderProps) {
  const [activeTab, setActiveTab] = useState("fields")
  const [searchTerm, setSearchTerm] = useState("")

  const handleFieldToggle = (fieldId: string) => {
    const newFields = config.fields.includes(fieldId)
      ? config.fields.filter((id) => id !== fieldId)
      : [...config.fields, fieldId]

    onChange({ ...config, fields: newFields })
  }

  const handleAddFilter = () => {
    onChange({
      ...config,
      filters: [...config.filters, { field: availableFields[0].id, operator: "equals", value: "" }],
    })
  }

  const handleRemoveFilter = (index: number) => {
    const newFilters = [...config.filters]
    newFilters.splice(index, 1)
    onChange({ ...config, filters: newFilters })
  }

  const handleFilterChange = (index: number, field: string, value: any) => {
    const newFilters = [...config.filters]
    newFilters[index] = { ...newFilters[index], [field]: value }
    onChange({ ...config, filters: newFilters })
  }

  const handleVisualizationChange = (visualization: string) => {
    onChange({ ...config, visualization: visualization as ReportVisualization })
  }

  const handleAddSortBy = () => {
    const sortBy = config.sortBy || []
    const availableField = config.fields.find((f) => !sortBy.some((s) => s.field === f)) || config.fields[0]

    if (availableField) {
      onChange({
        ...config,
        sortBy: [...sortBy, { field: availableField, direction: "asc" }],
      })
    }
  }

  const handleRemoveSortBy = (index: number) => {
    const newSortBy = [...(config.sortBy || [])]
    newSortBy.splice(index, 1)
    onChange({ ...config, sortBy: newSortBy.length > 0 ? newSortBy : undefined })
  }

  const handleSortByChange = (index: number, field: string, value: any) => {
    const newSortBy = [...(config.sortBy || [])]
    newSortBy[index] = { ...newSortBy[index], [field]: value }
    onChange({ ...config, sortBy: newSortBy })
  }

  const handleAggregationChange = (func: string, field?: string) => {
    onChange({
      ...config,
      aggregation: {
        function: func as "count" | "sum" | "avg" | "min" | "max",
        field,
      },
    })
  }

  // Filtrar campos com base no termo de busca
  const filterFields = (fields: ReportField[]) => {
    if (!searchTerm) return fields
    return fields.filter(
      (field) =>
        field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="report-name">Nome do Relatório</Label>
          <Input
            id="report-name"
            value={config.name}
            onChange={(e) => onChange({ ...config, name: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="report-description">Descrição</Label>
          <Input
            id="report-description"
            value={config.description}
            onChange={(e) => onChange({ ...config, description: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fields">Campos</TabsTrigger>
          <TabsTrigger value="filters">Filtros</TabsTrigger>
          <TabsTrigger value="sort">Ordenação</TabsTrigger>
          <TabsTrigger value="visualization">Visualização</TabsTrigger>
        </TabsList>

        <TabsContent value="fields" className="pt-4">
          <div className="space-y-4">
            <Input
              placeholder="Buscar campos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />

            <div className="flex flex-wrap gap-2 mb-4">
              {config.fields.map((fieldId) => {
                const field = availableFields.find((f) => f.id === fieldId)
                if (!field) return null
                return (
                  <Badge key={fieldId} variant="secondary" className="px-2 py-1">
                    {field.name}
                    <button
                      className="ml-2 text-muted-foreground hover:text-foreground"
                      onClick={() => handleFieldToggle(fieldId)}
                    >
                      ×
                    </button>
                  </Badge>
                )
              })}
              {config.fields.length === 0 && (
                <div className="text-sm text-muted-foreground">Nenhum campo selecionado</div>
              )}
            </div>

            <Accordion type="multiple" defaultValue={Object.keys(fieldsByCategory)}>
              {Object.entries(fieldsByCategory).map(([category, fields]) => (
                <AccordionItem key={category} value={category}>
                  <AccordionTrigger>{category}</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2">
                      {filterFields(fields).map((field) => (
                        <div key={field.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={field.id}
                            checked={config.fields.includes(field.id)}
                            onCheckedChange={() => handleFieldToggle(field.id)}
                          />
                          <Label htmlFor={field.id} className="text-sm">
                            {field.name}
                          </Label>
                        </div>
                      ))}
                      {filterFields(fields).length === 0 && (
                        <div className="col-span-2 text-sm text-muted-foreground py-2">
                          Nenhum campo encontrado para "{searchTerm}"
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </TabsContent>

        <TabsContent value="filters" className="pt-4">
          <div className="space-y-4">
            {config.filters.length > 0 ? (
              config.filters.map((filter, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtro {index + 1}
                      </h3>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveFilter(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`filter-field-${index}`}>Campo</Label>
                        <Select
                          value={filter.field}
                          onValueChange={(value) => handleFilterChange(index, "field", value)}
                        >
                          <SelectTrigger id={`filter-field-${index}`}>
                            <SelectValue placeholder="Selecione um campo" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableFields.map((field) => (
                              <SelectItem key={field.id} value={field.id}>
                                {field.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`filter-operator-${index}`}>Operador</Label>
                        <Select
                          value={filter.operator}
                          onValueChange={(value) => handleFilterChange(index, "operator", value)}
                        >
                          <SelectTrigger id={`filter-operator-${index}`}>
                            <SelectValue placeholder="Selecione um operador" />
                          </SelectTrigger>
                          <SelectContent>
                            {filterOperators.map((op) => (
                              <SelectItem key={op.value} value={op.value}>
                                {op.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`filter-value-${index}`}>Valor</Label>
                        <Input
                          id={`filter-value-${index}`}
                          value={filter.value}
                          onChange={(e) => handleFilterChange(index, "value", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground border rounded-md">
                Nenhum filtro adicionado. Clique no botão abaixo para adicionar um filtro.
              </div>
            )}
            <Button onClick={handleAddFilter} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Filtro
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="sort" className="pt-4">
          <div className="space-y-4">
            {config.sortBy && config.sortBy.length > 0 ? (
              config.sortBy.map((sort, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium flex items-center">
                        {sort.direction === "asc" ? (
                          <SortAsc className="h-4 w-4 mr-2" />
                        ) : (
                          <SortDesc className="h-4 w-4 mr-2" />
                        )}
                        Ordenação {index + 1}
                      </h3>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveSortBy(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`sort-field-${index}`}>Campo</Label>
                        <Select value={sort.field} onValueChange={(value) => handleSortByChange(index, "field", value)}>
                          <SelectTrigger id={`sort-field-${index}`}>
                            <SelectValue placeholder="Selecione um campo" />
                          </SelectTrigger>
                          <SelectContent>
                            {config.fields.map((fieldId) => {
                              const field = availableFields.find((f) => f.id === fieldId)
                              return field ? (
                                <SelectItem key={fieldId} value={fieldId}>
                                  {field.name}
                                </SelectItem>
                              ) : null
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`sort-direction-${index}`}>Direção</Label>
                        <Select
                          value={sort.direction}
                          onValueChange={(value) => handleSortByChange(index, "direction", value as "asc" | "desc")}
                        >
                          <SelectTrigger id={`sort-direction-${index}`}>
                            <SelectValue placeholder="Selecione a direção" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asc">Crescente</SelectItem>
                            <SelectItem value="desc">Decrescente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground border rounded-md">
                Nenhuma ordenação adicionada. Clique no botão abaixo para adicionar uma ordenação.
              </div>
            )}
            <Button onClick={handleAddSortBy} className="w-full" disabled={config.fields.length === 0}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Ordenação
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="visualization" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="visualization-type">Tipo de Visualização</Label>
                  <div className="grid grid-cols-5 gap-4 mt-2">
                    {visualizationOptions.map((option) => {
                      const Icon = option.icon
                      return (
                        <Button
                          key={option.value}
                          type="button"
                          variant={config.visualization === option.value ? "default" : "outline"}
                          className="flex flex-col h-24 items-center justify-center gap-2"
                          onClick={() => handleVisualizationChange(option.value)}
                        >
                          <Icon className="h-8 w-8" />
                          <span>{option.label}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {(config.visualization === "bar" ||
                  config.visualization === "line" ||
                  config.visualization === "pie") && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="group-by">Agrupar por</Label>
                      <Select
                        value={config.groupBy?.[0] || ""}
                        onValueChange={(value) => onChange({ ...config, groupBy: [value] })}
                      >
                        <SelectTrigger id="group-by">
                          <SelectValue placeholder="Selecione um campo para agrupar" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableFields
                            .filter((field) => config.fields.includes(field.id))
                            .map((field) => (
                              <SelectItem key={field.id} value={field.id}>
                                {field.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="aggregation-function">Função de Agregação</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <Select
                          value={config.aggregation?.function || "count"}
                          onValueChange={(value) => handleAggregationChange(value, config.aggregation?.field)}
                        >
                          <SelectTrigger id="aggregation-function">
                            <SelectValue placeholder="Selecione uma função" />
                          </SelectTrigger>
                          <SelectContent>
                            {aggregationFunctions.map((func) => (
                              <SelectItem key={func.value} value={func.value}>
                                {func.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {config.aggregation?.function !== "count" && (
                          <Select
                            value={config.aggregation?.field || ""}
                            onValueChange={(value) =>
                              handleAggregationChange(config.aggregation?.function || "count", value)
                            }
                          >
                            <SelectTrigger id="aggregation-field">
                              <SelectValue placeholder="Selecione um campo" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableFields
                                .filter((field) => config.fields.includes(field.id) && field.type === "number")
                                .map((field) => (
                                  <SelectItem key={field.id} value={field.id}>
                                    {field.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Label>Período de Dados</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="date-start" className="text-xs">
                        Data Inicial
                      </Label>
                      <Input
                        id="date-start"
                        type="date"
                        value={config.dateRange?.start || ""}
                        onChange={(e) =>
                          onChange({
                            ...config,
                            dateRange: {
                              ...(config.dateRange || {}),
                              start: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="date-end" className="text-xs">
                        Data Final
                      </Label>
                      <Input
                        id="date-end"
                        type="date"
                        value={config.dateRange?.end || ""}
                        onChange={(e) =>
                          onChange({
                            ...config,
                            dateRange: {
                              ...(config.dateRange || {}),
                              end: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
