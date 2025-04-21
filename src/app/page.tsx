
import { useEffect } from "react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800 font-sans">
      <header className="bg-blue-900 text-white py-8 px-4 text-center sticky top-0 z-50 shadow-md">
        <h1 className="text-4xl font-bold">SIPESC</h1>
        <p className="text-xl mt-2">Sistema Integrado de Prevenção Escolar</p>
        <p className="mt-2 text-sm italic">Tecnologia a serviço da proteção escolar</p>
        <div className="mt-4">
          <a href="/login" className="bg-white text-blue-900 px-6 py-2 rounded shadow hover:bg-gray-100 transition">
            Acessar o Sistema
          </a>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        <section className="reveal" id="sobre">
          <h2 className="text-2xl font-bold mb-2">✨ Sobre o Projeto</h2>
          <p>O SIPESC é uma plataforma de gestão educacional com foco na prevenção de riscos escolares, integrando escolas, conselhos tutelares e o Ministério Público em uma rede de proteção à infância e adolescência.</p>
        </section>
      </main>
    </div>
  )
}
