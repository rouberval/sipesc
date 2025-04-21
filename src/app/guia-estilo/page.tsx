"use client"

import { ResponsiveContainer } from "@/components/layout/responsive-container"
import { ResponsiveCard } from "@/components/ui/responsive-card"
import { ResponsiveGrid } from "@/components/ui/responsive-grid"
import { BreakpointIndicator } from "@/components/ui/breakpoint-indicator"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GuiaEstiloPage() {
  return (
    <ResponsiveContainer>
      <BreakpointIndicator showAlways />
      
      <div className="space-y-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Guia de Estilo Mobile-First</h1>
        
        <Tabs defaultValue="breakpoints">
          <TabsList className="w-full grid grid-cols-1 sm:grid-cols-4">
            <TabsTrigger value="breakpoints">Breakpoints</TabsTrigger>
            <TabsTrigger value="components">Componentes</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="examples">Exemplos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="breakpoints" className="mt-6">
            <ResponsiveCard
              title="Breakpoints do Sistema"
              description="Definição dos breakpoints utilizados no design mobile-first"
            >
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Nome</th>
                        <th className="text-left py-2 px-4">Tamanho</th>
                        <th className="text-left py-2 px-4">Descrição</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-medium">xs</td>
                        <td className="py-2 px-4">360px</td>
                        <td className="py-2 px-4">Smartphones pequenos</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-medium">sm</td>
                        <td className="py-2 px-4">640px</td>
                        <td className="py-2 px-4">Smartphones grandes</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-medium">md</td>
                        <td className="py-2 px-4">768px</td>
                        <td className="py-2 px-4">Tablets</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-medium">lg</td>
                        <td className="py-2 px-4">1024px</td>
                        <td className="py-2 px-4">Desktops pequenos</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-medium">xl</td>
                        <td className="py-2 px-4">1280px</td>
                        <td className="py-2 px-4">Desktops médios</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-medium">2xl</td>
                        <td className="py-2 px-4">1536px</td>
                        <td className="py-2 px-4">Desktops grandes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-medium mb-2">Como usar os breakpoints</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Utilize as classes responsivas do Tailwind CSS para aplicar estilos específicos em cada breakpoint:
                  </p>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    &lt;div className="<span className="text-blue-600">text-sm sm:text-base md:text-lg lg:text-xl</span>"&gt;
                      Texto responsivo
                    &lt;/div&gt;
                  </pre>
                </div>
              </div>
            </ResponsiveCard>
          </TabsContent>
          
          <TabsContent value="components" className="mt-6">
            <div className="space-y-6">
              <ResponsiveCard
                title="Componentes Responsivos"
                description="Componentes criados para facilitar o desenvolvimento mobile-first"
              >
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">ResponsiveContainer</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Container responsivo que centraliza o conteúdo e aplica padding adequado para cada breakpoint.
                    </p>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      &lt;ResponsiveContainer maxWidth="xl" padding="md"&gt;
                        {/* Conteúdo */}
                      &lt;/ResponsiveContainer&gt;
                    </pre>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">ResponsiveGrid</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Grid responsivo que permite definir o número de colunas para cada breakpoint.
                    </p>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      &lt;ResponsiveGrid xs={1} sm={2} md={3} lg={4} gap="md"&gt;
                        {/* Itens do grid */}
                      &lt;/ResponsiveGrid&gt;
                    </pre>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">ResponsiveCard</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Card responsivo com padding e espaçamento adequados para cada breakpoint.
                    </p>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      &lt;ResponsiveCard
                        title="Título"
                        description="Descrição"\
                        footer={&lt;Button&gt;Ação&lt;/Button&gt;}
                      &gt;
                        {/* Conteúdo */}
                      &lt;/ResponsiveCard&gt;
                    </pre>
                  </div>
                </div>
              </ResponsiveCard>
            </div>
          </TabsContent>
          
          <TabsContent value="layout" className="mt-6">
            <ResponsiveCard
              title="Princípios de Layout"
              description="Diretrizes para criar layouts responsivos mobile-first"
            >
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">1. Comece pelo mobile</h3>
                  <p className="text-sm text-muted-foreground">
                    Sempre comece o design pela menor tela (mobile) e expanda progressivamente para telas maiores.
                    Isso garante que o layout funcione bem em dispositivos menores e aproveite melhor o espaço em
                    dispositivos maiores.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">2. Empilhe em mobile, expanda em desktop</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Em telas pequenas, empilhe os elementos verticalmente. Em telas maiores, distribua-os horizontalmente.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2 p-4 bg-blue-100 rounded">Coluna 1</div>
                    <div className="w-full sm:w-1/2 p-4 bg-green-100 rounded">Coluna 2</div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">3. Ajuste o tamanho dos elementos</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ajuste o tamanho dos elementos (texto, botões, espaçamento) de acordo com o tamanho da tela.
                  </p>
                  <div className="space-y-4">
                    <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl">
                      Este texto muda de tamanho em cada breakpoint
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Button size="sm" className="text-xs">Pequeno</Button>
                      <Button className="text-sm">Médio</Button>
                      <Button size="lg" className="text-base">Grande</Button>
                    </div>
                  </div>
                </div>
              </div>
            </ResponsiveCard>
          </TabsContent>
          
          <TabsContent value="examples" className="mt-6">
            <div className="space-y-6">
              <ResponsiveCard
                title="Exemplos de Formulários Responsivos"
                description="Exemplos de formulários adaptados para diferentes tamanhos de tela"
              >
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-4">Formulário de Login</h3>
                    <div className="max-w-md mx-auto">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="seu@email.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Senha</Label>
                          <Input id="password" type="password" />
                        </div>
                        <div className="flex flex-col xs:flex-row gap-2 pt-2">
                          <Button className="w-full xs:w-auto">Entrar</Button>
                          <Button variant="outline" className="w-full xs:w-auto">Cancelar</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-4">Formulário de Cadastro</h3>
                    <div className="max-w-lg mx-auto">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">Nome</Label>
                            <Input id="firstName" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Sobrenome</Label>
                            <Input id="lastName" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email2">Email</Label>
                          <Input id="email2" type="email" />
                        </div>
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="password2">Senha</Label>
                            <Input id="password2" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                            <Input id="confirmPassword" type="password" />
                          </div>
                        </div>
                        <div className="flex flex-col xs:flex-row gap-2 pt-2">
                          <Button className="w-full xs:w-auto">Cadastrar</Button>
                          <Button variant="outline" className="w-full xs:w-auto">Cancelar</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ResponsiveCard>
              
              <ResponsiveCard
                title="Exemplos de Cards Responsivos"
                description="Exemplos de cards adaptados para diferentes tamanhos de tela"
              >
                <ResponsiveGrid xs={1} sm={2} md={3} gap="md">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card key={item}>
                      <CardContent className="p-4">
                        <div className="aspect-video bg-gray-200 rounded-md mb-3"></div>
                        <h3 className="font-medium mb-1">Card {item}</h3>
                        <p className="text-sm text-muted-foreground">
                          Este é um exemplo de card responsivo que se adapta a diferentes tamanhos de tela.
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </ResponsiveGrid>
              </ResponsiveCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ResponsiveContainer>
  )
}
