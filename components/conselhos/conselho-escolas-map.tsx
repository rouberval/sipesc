"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { List, Map } from "lucide-react"

interface Escola {
  id: string
  nome: string
  endereco: string
  telefone: string
  diretor: string
  municipio: string
  regiao: string
  latitude: number
  longitude: number
  status: "ativo" | "inativo"
}

interface ConselhoEscolasMapProps {
  conselhoId: string
}

export function ConselhoEscolasMap({ conselhoId }: ConselhoEscolasMapProps) {
  const [escolas, setEscolas] = useState<Escola[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])

  // Carregar dados das escolas
  useEffect(() => {
    const fetchEscolas = async () => {
      try {
        // Simulação de chamada de API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Dados mockados
        const mockEscolas: Escola[] = [
          {
            id: "1",
            nome: "Escola Municipal Centro",
            endereco: "Rua das Flores, 123, Centro",
            telefone: "(48) 3333-1111",
            diretor: "Maria Santos",
            municipio: "Florianópolis",
            regiao: "Central",
            latitude: -27.5969,
            longitude: -48.5495,
            status: "ativo",
          },
          {
            id: "2",
            nome: "Escola Estadual Norte",
            endereco: "Av. Principal, 456, Norte",
            telefone: "(48) 3333-2222",
            diretor: "João Pereira",
            municipio: "Florianópolis",
            regiao: "Norte",
            latitude: -27.5869,
            longitude: -48.5395,
            status: "ativo",
          },
          {
            id: "3",
            nome: "Escola Municipal Sul",
            endereco: "Rua Secundária, 789, Sul",
            telefone: "(48) 3333-3333",
            diretor: "Ana Oliveira",
            municipio: "Florianópolis",
            regiao: "Sul",
            latitude: -27.6069,
            longitude: -48.5595,
            status: "ativo",
          },
          {
            id: "4",
            nome: "Colégio Leste",
            endereco: "Av. Central, 321, Leste",
            telefone: "(48) 3333-4444",
            diretor: "Carlos Silva",
            municipio: "São José",
            regiao: "Leste",
            latitude: -27.5969,
            longitude: -48.5395,
            status: "inativo",
          },
          {
            id: "5",
            nome: "Instituto Educacional Oeste",
            endereco: "Praça da Cidade, 100, Oeste",
            telefone: "(48) 3333-5555",
            diretor: "Fernanda Lima",
            municipio: "Palhoça",
            regiao: "Oeste",
            latitude: -27.5869,
            longitude: -48.5595,
            status: "ativo",
          },
        ]

        setEscolas(mockEscolas)
      } catch (error) {
        console.error("Erro ao carregar escolas:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEscolas()
  }, [conselhoId])

  // Inicializar o mapa quando os dados estiverem carregados
  useEffect(() => {
    if (isLoading || mapLoaded || typeof window === "undefined") return

    // Carregar o Leaflet dinamicamente
    const loadLeaflet = async () => {
      try {
        // Verificar se o Leaflet já está carregado
        if (!window.L) {
          // Carregar CSS do Leaflet
          const linkElement = document.createElement("link")
          linkElement.rel = "stylesheet"
          linkElement.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          document.head.appendChild(linkElement)

          // Carregar JS do Leaflet
          const script = document.createElement("script")
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          script.async = true

          // Aguardar o carregamento do script
          await new Promise((resolve) => {
            script.onload = resolve
            document.body.appendChild(script)
          })
        }

        // Inicializar o mapa após o carregamento do Leaflet
        setTimeout(() => {
          initializeMap()
        }, 500)
      } catch (error) {
        console.error("Erro ao carregar Leaflet:", error)
      }
    }

    loadLeaflet()
  }, [isLoading, mapLoaded])

  // Inicializar o mapa
  const initializeMap = () => {
    if (!window.L || document.getElementById("map")?.hasChildNodes()) return

    try {
      // Criar o mapa
      const mapInstance = window.L.map("map").setView([-27.5969, -48.5495], 12)

      // Adicionar camada de tiles
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance)

      // Adicionar marcadores para cada escola
      const newMarkers = escolas.map((escola) => {
        const marker = window.L.marker([escola.latitude, escola.longitude]).addTo(mapInstance)

        // Adicionar popup com informações da escola
        marker.bindPopup(`
          <div>
            <h3 style="font-weight: bold; margin-bottom: 5px;">${escola.nome}</h3>
            <p><strong>Diretor:</strong> ${escola.diretor}</p>
            <p><strong>Endereço:</strong> ${escola.endereco}</p>
            <p><strong>Telefone:</strong> ${escola.telefone}</p>
            <p><strong>Status:</strong> ${escola.status === "ativo" ? "Ativo" : "Inativo"}</p>
          </div>
        `)

        return marker
      })

      setMap(mapInstance)
      setMarkers(newMarkers)
      setMapLoaded(true)
    } catch (error) {
      console.error("Erro ao inicializar o mapa:", error)
    }
  }

  // Limpar o mapa ao desmontar o componente
  useEffect(() => {
    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [map])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Escolas Vinculadas</CardTitle>
        <CardDescription>
          Visualize a distribuição geográfica das escolas vinculadas a este conselho tutelar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="map">
              <Map className="h-4 w-4 mr-2" />
              Mapa
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="h-4 w-4 mr-2" />
              Lista
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-[400px]">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <div id="map" className="h-[400px] w-full rounded-md border"></div>
            )}
          </TabsContent>

          <TabsContent value="list" className="mt-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-[400px]">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Diretor</TableHead>
                    <TableHead>Região</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {escolas.map((escola) => (
                    <TableRow key={escola.id}>
                      <TableCell className="font-medium">{escola.nome}</TableCell>
                      <TableCell>{escola.endereco}</TableCell>
                      <TableCell>{escola.diretor}</TableCell>
                      <TableCell>{escola.regiao}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            escola.status === "ativo"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {escola.status === "ativo" ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
