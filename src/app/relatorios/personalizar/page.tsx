"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportBuilder } from "@/components/relatorios/report-builder"
import { ReportPreview } from "@/components/relatorios/report-preview"
import { ReportTemplates } from "@/components/relatorios/report-templates"
import { SaveReportDialog } from "@/components/relatorios/save-report-dialog"
import { Save, FileText, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ProtectedRoute } from "@/components/auth/protected-route"

// Tipos para os relatórios
export type ReportField = {
  id: string
  name: string
  category: string
  type: "text" | "number" | "date" | "boolean"
}

export type ReportFilter = {
  field: string
  operator: "equals" | "contains" | "greaterThan" | "lessThan" | "between" | "in"
  value: any
}

export type ReportVisualization = "table" | "bar" | "line" | "pie" | "map" | "heatmap" | "radar"

export type ReportConfig = {
  id?: string
  name: string
  description: string
  fields: string[]
  filters: ReportFilter[]
  groupBy?: string[]
  sortBy?: { field: string; direction: "asc" | "desc" }[]
  visualization: ReportVisualization
  dateRange?: { start: string; end: string }
  aggregation?: { function: "count" | "sum" | "avg" | "min" | "max"; field?: string }
  permissions?: { roles: string[]; shared: boolean }
}

export default function PersonalizarRelatoriosPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<string>("templates")
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    name: "Novo Relatório",
    description: "Relatório personalizado",
    fields: [],
    filters: [],
    visualization: "table",
    permissions: { roles: ["mp", "escola", "conselheiro"], shared: false },
  })
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel" | "csv">("pdf")

  const handleSaveReport = (name: string, description: string, permissions: { roles: string[]; shared: boolean }) => {
    const updatedConfig = {
      ...reportConfig,
      id: `report-${Date.now()}`,
      name,
      description,
      permissions,
    }

    // Em uma aplicação real, isso seria salvo em um banco de dados
    const savedReports = JSON.parse(localStorage.getItem("sipesc-saved-reports") || "[]")
    savedReports.push(updatedConfig)
    localStorage.setItem("sipesc-saved-reports", JSON.stringify(savedReports))

    toast({
      title: "Relatório salvo",
      description: `O relatório "${name}" foi salvo com sucesso.`,
    })

    setIsSaveDialogOpen(false)
  }

  const handleLoadTemplate = (template: ReportConfig) => {
    setReportConfig(template)
    setActiveTab("builder")
  }

  const handleExport = (format: "pdf" | "excel" | "csv") => {
    setExportFormat(format)

    toast({
      title: "Exportando relatório",
      description: `O relatório está sendo exportado em formato ${format.toUpperCase()}.`,
    })

    // Em uma aplicação real, isso chamaria uma API para gerar o arquivo
    setTimeout(() => {
      toast({
        title: "Exportação concluída",
        description: `O relatório foi exportado com sucesso em formato ${format.toUpperCase()}.`,
      })
    }, 2000)
  }

  const handleShareReport = () => {
    toast({
      title: "Compartilhando relatório",
      description: "Configurando permissões de compartilhamento...",
    })

    // Em uma aplicação real, isso abriria um diálogo de compartilhamento
    setTimeout(() => {
      toast({
        title: "Relatório compartilhado",
        description: "O link para o relatório foi copiado para a área de transferência.",
      })
    }, 1500)
  }

  return (
    <ProtectedRoute allowedRoles={["mp", "escola", "conselheiro"]}>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Personalizar Relatórios</h1>
              <p className="text-muted-foreground mt-1">
                Crie, personalize e compartilhe relatórios com dados do sistema
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsSaveDialogOpen(true)}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Modelo
              </Button>
              <Button variant="outline" onClick={handleShareReport}>
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
              <Button onClick={() => handleExport("pdf")}>
                <FileText className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates">Modelos</TabsTrigger>
              <TabsTrigger value="builder">Construtor</TabsTrigger>
              <TabsTrigger value="preview">Visualização</TabsTrigger>
            </TabsList>

            <TabsContent value="templates">
              <Card>
                <CardHeader>
                  <CardTitle>Modelos de Relatórios</CardTitle>
                  <CardDescription>
                    Selecione um modelo pré-definido ou um relatório salvo anteriormente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportTemplates onSelectTemplate={handleLoadTemplate} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="builder">
              <Card>
                <CardHeader>
                  <CardTitle>Construtor de Relatórios</CardTitle>
                  <CardDescription>Configure os campos, filtros e visualizações do seu relatório</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportBuilder config={reportConfig} onChange={setReportConfig} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview">
              <Card>
                <CardHeader>
                  <CardTitle>Visualização do Relatório</CardTitle>
                  <CardDescription>Pré-visualização do relatório com os dados atuais</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ReportPreview config={reportConfig} />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    {reportConfig.fields.length} campos selecionados •
                    {reportConfig.filters.length > 0
                      ? ` ${reportConfig.filters.length} filtros aplicados`
                      : " Sem filtros"}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleExport("csv")}>
                      Exportar CSV
                    </Button>
                    <Button variant="outline" onClick={() => handleExport("excel")}>
                      Exportar Excel
                    </Button>
                    <Button onClick={() => handleExport("pdf")}>Exportar PDF</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          {isSaveDialogOpen && (
            <SaveReportDialog
              defaultName={reportConfig.name}
              defaultDescription={reportConfig.description}
              defaultPermissions={reportConfig.permissions || { roles: ["mp"], shared: false }}
              onSave={handleSaveReport}
              onCancel={() => setIsSaveDialogOpen(false)}
            />
          )}
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}
