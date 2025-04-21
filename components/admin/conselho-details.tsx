"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, User, Building } from "lucide-react"

interface ConselhoDetailsProps {
  conselho: any
  onClose: () => void
}

// Mock data para escolas vinculadas
const mockEscolasVinculadas = [
  { id: "1", nome: "Escola Municipal João da Silva", alunos: 450, ocorrencias: 12 },
  { id: "2", nome: "Escola Estadual Maria Oliveira", alunos: 320, ocorrencias: 8 },
  { id: "3", nome: "Colégio Pedro Alves", alunos: 280, ocorrencias: 5 },
]

// Mock data para conselheiros
const mockConselheiros = [
  { id: "1", nome: "Ana Oliveira", email: "ana.oliveira@conselho.com", telefone: "(48) 99999-1111" },
  { id: "2", nome: "Carlos Silva", email: "carlos.silva@conselho.com", telefone: "(48) 99999-2222" },
  { id: "3", nome: "Mariana Costa", email: "mariana.costa@conselho.com", telefone: "(48) 99999-3333" },
]

export function ConselhoDetails({ conselho, onClose }: ConselhoDetailsProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Conselho Tutelar</DialogTitle>
          <DialogDescription>Informações detalhadas sobre o conselho tutelar</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="escolas">Escolas</TabsTrigger>
            <TabsTrigger value="conselheiros">Conselheiros</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{conselho.nome}</h3>
              <Badge
                className={
                  conselho.status === "ativo"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : "bg-red-100 text-red-800 hover:bg-red-100"
                }
              >
                {conselho.status === "ativo" ? "Ativo" : "Inativo"}
              </Badge>
            </div>

            <div className="grid gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>
                  {conselho.endereco}, {conselho.municipio} - Região {conselho.regiao}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{conselho.telefone}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Coordenador(a): {conselho.coordenador}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{conselho.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>Escolas vinculadas: {conselho.escolasVinculadas}</span>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ocorrências</p>
                    <p className="text-2xl font-bold">45</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Encaminhamentos</p>
                    <p className="text-2xl font-bold">28</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Alunos em Risco</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Alertas Ativos</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="escolas" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Escolas Vinculadas</CardTitle>
                <CardDescription>Escolas sob responsabilidade deste conselho tutelar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEscolasVinculadas.map((escola) => (
                    <div key={escola.id} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">{escola.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          {escola.alunos} alunos | {escola.ocorrencias} ocorrências
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => onClose()}>
                        Visualizar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conselheiros" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Conselheiros</CardTitle>
                <CardDescription>Membros do conselho tutelar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockConselheiros.map((conselheiro) => (
                    <div key={conselheiro.id} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">{conselheiro.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          {conselheiro.email} | {conselheiro.telefone}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => onClose()}>
                        Visualizar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
