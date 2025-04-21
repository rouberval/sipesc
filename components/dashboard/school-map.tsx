import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { School, MapPin, List } from "lucide-react"

// Importar o componente de mapa diretamente
import MapComponent from "./map-component"

// Dados simulados de escolas para a visualização em lista
const escolasListaData = [
  { id: 1, nome: "Escola Municipal João da Silva", endereco: "Rua das Flores, 123", alunos: 450, ocorrencias: 12 },
  { id: 2, nome: "Escola Estadual Maria Oliveira", endereco: "Av. Principal, 456", alunos: 620, ocorrencias: 8 },
  { id: 3, nome: "Colégio Aplicação", endereco: "Rua dos Estudantes, 789", alunos: 830, ocorrencias: 15 },
  { id: 4, nome: "Escola Básica Pedro Alves", endereco: "Praça Central, 321", alunos: 380, ocorrencias: 5 },
  {
    id: 5,
    nome: "Instituto Educacional Santa Catarina",
    endereco: "Rua da Educação, 654",
    alunos: 720,
    ocorrencias: 10,
  },
]

export function SchoolMap() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <School className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Localização das Escolas</CardTitle>
        </div>
        <CardDescription>Visualize a distribuição geográfica das escolas e suas informações</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mapa" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="mapa" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Mapa</span>
            </TabsTrigger>
            <TabsTrigger value="lista" className="flex items-center gap-1">
              <List className="h-4 w-4" />
              <span>Lista</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="mapa" className="mt-0">
            <div className="h-[400px] w-full">
              <MapComponent />
            </div>
          </TabsContent>
          <TabsContent value="lista" className="mt-0">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
                <div className="col-span-5">Nome</div>
                <div className="col-span-4">Endereço</div>
                <div className="col-span-1 text-center">Alunos</div>
                <div className="col-span-2 text-center">Ocorrências</div>
              </div>
              {escolasListaData.map((escola) => (
                <div key={escola.id} className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 hover:bg-muted/50">
                  <div className="col-span-5 font-medium">{escola.nome}</div>
                  <div className="col-span-4 text-muted-foreground">{escola.endereco}</div>
                  <div className="col-span-1 text-center">{escola.alunos}</div>
                  <div className="col-span-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        escola.ocorrencias > 10
                          ? "bg-red-100 text-red-800"
                          : escola.ocorrencias > 5
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {escola.ocorrencias}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
