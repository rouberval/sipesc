"use client"

import { MainLayout } from "@/components/layout/main-layout"

export default function DocumentacaoPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Documentação Técnica do Sistema SIPESC</h1>
        <iframe
          src="/README_SIPESC.pdf"
          title="Documentação SIPESC"
          className="w-full h-[80vh] border rounded-md shadow"
        />
      </div>
    </MainLayout>
  )
}
