"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { ReportConfig } from "@/app/relatorios/personalizar/page"
import { FileText, BarChart, PieChart, Map, Table2, LineChart, Search, Clock, Star } from "lucide-react"

// Modelos pré-definidos de relatórios
const predefinedTemplates: ReportConfig[] = [
  {
    id: "template-1",
    name: "Ocorrências por Escola",
    description: "Relatório de ocorrências agrupadas por escola",
    fields: ["escola.nome", "ocorrencia.tipo", "ocorrencia.gravidade", "ocorrencia.data"],
    filters: [],
    groupBy: ["escola.nome"],
    visualization: "bar",
    permissions: { roles: ["mp", "conselheiro", "escola"], shared: true },
  },
  {
    id: "template-2",
    name: "Alunos em Situação de Risco",
    description: "Lista de alunos classificados como em situação de risco",
    fields: ["aluno.nome", "aluno.idade", "aluno.escola", "aluno.status", "frequencia.faltas", "ocorrencia.gravidade"],
    filters: [{ field: "aluno.status", operator: "equals", value: "risco" }],
    visualization: "table",
    permissions: { roles: ["mp", "conselheiro"], shared: false },
  },
  {
    id: "template-3",
    name: "Tempo de Resposta dos Conselhos",
    description: "Análise do tempo médio de resposta dos conselhos tutelares",
    fields: ["conselho.nome", "conselho.regiao", "conselho.tempoResposta"],
    filters: [],
    groupBy: ["conselho.nome"],
    visualization: "bar",
    permissions: { roles: ["mp"], shared: false },
  },
  {
    id: "template-4",
    name: "Distribuição de Encaminhamentos",
    description: "Distribuição de encaminhamentos por tipo e destino",
    fields: ["encaminhamento.destino", "encaminhamento.tipo", "encaminhamento.status"],
    filters: [],
    groupBy: ["encaminhamento.destino"],
    visualization: "pie",
    permissions: { roles: ["mp", "conselheiro"], shared: true },
  },
  {
    id: "template-5",
    name: "Mapa de Escolas por Região",
    description: "Visualização geográfica das escolas por região",
    fields: ["escola.nome", "escola.regiao", "escola.municipio", "escola.totalAlunos"],
    filters: [],
    visualization: "map",
    permissions: { roles: ["mp"], shared: false },
  },
  {
    id: "template-6",
    name: "Frequência Mensal por Escola",
    description: "Análise da frequência dos alunos por escola ao longo do tempo",
    fields: ["escola.nome", "frequencia.percentual", "frequencia.periodo"],
    filters: [],
    groupBy: ["escola.nome"],
    visualization: "line",
    permissions: { roles: ["mp", "escola"], shared: true },
  },
  {
    id: "template-7",
    name: "Reincidência de Ocorrências",
    description: "Análise de alunos com ocorrências reincidentes",
    fields: ["aluno.nome", "aluno.escola", "ocorrencia.tipo", "ocorrencia.gravidade", "ocorrencia.reincidencia"],
    filters: [{ field: "ocorrencia.reincidencia", operator: "equals", value: "true" }],
    visualization: "table",
    permissions: { roles: ["mp", "conselheiro", "escola"], shared: false },
  },
  {
    id: "template-8",
    name: "Eficiência dos Conselhos Tutelares",
    description: "Análise comparativa da eficiência dos conselhos tutelares",
    fields: ["conselho.nome", "conselho.tempoResposta", "conselho.casosAtivos", "conselho.casosPendentes"],
    filters: [],
    visualization: "table",
    permissions: { roles: ["mp"], shared: false },
  },
]

interface ReportTemplatesProps {
  onSelectTemplate: (template: ReportConfig) => void
}

export function ReportTemplates({ onSelectTemplate }: ReportTemplatesProps) {
  const [savedReports, setSavedReports] = useState<ReportConfig[]>([])
  const [activeTab, setActiveTab] = useState("predefined")
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Carregar relatórios salvos do localStorage
    const saved = JSON.parse(localStorage.getItem("sipesc-saved-reports") || "[]")
    setSavedReports(saved)

    // Carregar favoritos do localStorage
    const favs = JSON.parse(localStorage.getItem("sipesc-report-favorites") || "[]")
    setFavorites(favs)
  }, [])

  const toggleFavorite = (templateId: string) => {
    const newFavorites = favorites.includes(templateId)
      ? favorites.filter((id) => id !== templateId)
      : [...favorites, templateId]

    setFavorites(newFavorites)
    localStorage.setItem("sipesc-report-favorites", JSON.stringify(newFavorites))
  }

  const getTemplateIcon = (visualization: string) => {
    switch (visualization) {
      case "bar":
        return <BarChart className="h-6 w-6" />
      case "pie":
        return <PieChart className="h-6 w-6" />
      case "map":
        return <Map className="h-6 w-6" />
      case "table":
        return <Table2 className="h-6 w-6" />
      case "line":
        return <LineChart className="h-6 w-6" />
      default:
        return <FileText className="h-6 w-6" />
    }
  }

  const filterTemplates = (templates: ReportConfig[]) => {
    if (!searchTerm) return templates

    return templates.filter(
      (template) =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  const renderTemplateCard = (template: ReportConfig) => (
    <Card key={template.id} className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-md text-blue-700">{getTemplateIcon(template.visualization)}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{template.name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(template.id || "")
                }}
                className="text-muted-foreground hover:text-amber-500"
              >
                <Star
                  className={`h-4 w-4 ${favorites.includes(template.id || "") ? "fill-amber-500 text-amber-500" : ""}`}
                />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {template.fields.slice(0, 3).map((field) => (
                <Badge key={field} variant="outline" className="text-xs">
                  {field.split(".")[0]}
                </Badge>
              ))}
              {template.fields.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{template.fields.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          Atualizado recentemente
        </div>
        <Button variant="outline" onClick={() => onSelectTemplate(template)}>
          Usar
        </Button>
      </CardFooter>
    </Card>
  )

  const favoriteTemplates = [...predefinedTemplates, ...savedReports].filter((template) =>
    favorites.includes(template.id || ""),
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar modelos de relatórios..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="predefined">Pré-definidos</TabsTrigger>
          <TabsTrigger value="saved">Meus Relatórios</TabsTrigger>
          <TabsTrigger value="favorites">Favoritos</TabsTrigger>
        </TabsList>

        <TabsContent value="predefined" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filterTemplates(predefinedTemplates).map(renderTemplateCard)}
            {filterTemplates(predefinedTemplates).length === 0 && (
              <div className="col-span-2 text-center py-8 text-muted-foreground">
                Nenhum modelo encontrado para "{searchTerm}"
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="pt-4">
          {savedReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterTemplates(savedReports).map(renderTemplateCard)}
              {filterTemplates(savedReports).length === 0 && (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  Nenhum modelo encontrado para "{searchTerm}"
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground border rounded-md">
              Você ainda não salvou nenhum modelo de relatório.
              <br />
              Crie um relatório personalizado e salve-o para acessá-lo aqui.
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="pt-4">
          {favoriteTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filterTemplates(favoriteTemplates).map(renderTemplateCard)}
              {filterTemplates(favoriteTemplates).length === 0 && (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  Nenhum modelo encontrado para "{searchTerm}"
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground border rounded-md">
              Você ainda não adicionou nenhum relatório aos favoritos.
              <br />
              Clique no ícone de estrela para adicionar relatórios aos seus favoritos.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
