"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"

// Dados simulados de escolas
const escolasData = [
  { id: 1, nome: "Escola Municipal João da Silva", lat: -27.59, lng: -48.54, alunos: 450, ocorrencias: 12 },
  { id: 2, nome: "Escola Estadual Maria Oliveira", lat: -27.58, lng: -48.52, alunos: 620, ocorrencias: 8 },
  { id: 3, nome: "Colégio Aplicação", lat: -27.6, lng: -48.53, alunos: 830, ocorrencias: 15 },
  { id: 4, nome: "Escola Básica Pedro Alves", lat: -27.57, lng: -48.55, alunos: 380, ocorrencias: 5 },
  { id: 5, nome: "Instituto Educacional Santa Catarina", lat: -27.61, lng: -48.51, alunos: 720, ocorrencias: 10 },
]

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState<(typeof escolasData)[0] | null>(null)
  const mapInstanceRef = useRef<any>(null)

  // Função para carregar o script do Leaflet
  useEffect(() => {
    if (typeof window !== "undefined" && !window.L) {
      const linkElement = document.createElement("link")
      linkElement.rel = "stylesheet"
      linkElement.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(linkElement)

      const scriptElement = document.createElement("script")
      scriptElement.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      scriptElement.async = true
      scriptElement.onload = () => setIsScriptLoaded(true)
      document.body.appendChild(scriptElement)

      return () => {
        document.head.removeChild(linkElement)
        document.body.removeChild(scriptElement)
      }
    } else if (typeof window !== "undefined" && window.L) {
      setIsScriptLoaded(true)
    }
  }, [])

  // Inicializar o mapa quando o script estiver carregado
  useEffect(() => {
    if (isScriptLoaded && mapRef.current && !mapInstanceRef.current) {
      try {
        // Inicializar o mapa
        const L = window.L
        const map = L.map(mapRef.current).setView([-27.59, -48.54], 13)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        // Adicionar marcadores para as escolas
        escolasData.forEach((escola) => {
          const marker = L.marker([escola.lat, escola.lng]).addTo(map)
          marker.bindPopup(`<b>${escola.nome}</b><br>Alunos: ${escola.alunos}<br>Ocorrências: ${escola.ocorrencias}`)
          marker.on("click", () => {
            setSelectedSchool(escola)
          })
        })

        mapInstanceRef.current = map
        setIsLoaded(true)
      } catch (error) {
        console.error("Erro ao inicializar o mapa:", error)
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [isScriptLoaded])

  return (
    <div className="relative h-full w-full bg-gray-100 rounded-lg overflow-hidden">
      {!isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-sm text-gray-500">Carregando mapa em tempo real...</p>
          </div>
        </div>
      ) : null}

      <div ref={mapRef} className="h-full w-full z-0"></div>

      {/* Informações da escola selecionada */}
      {selectedSchool && (
        <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-md shadow-md z-20">
          <h3 className="font-semibold text-sm">{selectedSchool.nome}</h3>
          <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
            <div>
              <span className="text-gray-500">Alunos:</span> {selectedSchool.alunos}
            </div>
            <div>
              <span className="text-gray-500">Ocorrências:</span> {selectedSchool.ocorrencias}
            </div>
          </div>
          <button className="mt-2 text-xs text-blue-600 hover:underline" onClick={() => setSelectedSchool(null)}>
            Fechar
          </button>
        </div>
      )}
    </div>
  )
}

// Adicionar tipagem para a biblioteca Leaflet no objeto window
declare global {
  interface Window {
    L: any
  }
}
