import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MedicacaoLista } from "@/components/medicacoes/medicacao-lista"
import { MedicacaoForm } from "@/components/medicacoes/medicacao-form"
import { MedicacaoHistorico } from "@/components/medicacoes/medicacao-historico"

export default function MedicacoesPage() {
  return (
    <Tabs defaultValue="lista" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="lista">Lista de Medicações</TabsTrigger>
        <TabsTrigger value="nova">Nova Medicação</TabsTrigger>
        <TabsTrigger value="historico">Histórico</TabsTrigger>
      </TabsList>
      <TabsContent value="lista">
        <MedicacaoLista />
      </TabsContent>
      <TabsContent value="nova">
        <MedicacaoForm />
      </TabsContent>
      <TabsContent value="historico" className="space-y-4">
        <MedicacaoHistorico />
      </TabsContent>
    </Tabs>
  )
}
