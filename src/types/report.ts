export interface ReportType {
  title: string
  description: string
  type: "table" | "bar" | "line" | "pie" | "error"
  lastUpdated: string
  columns?: string[]
  labels?: string[]
  data: any
}
