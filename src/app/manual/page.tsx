"use client"

import { MainLayout } from "@/components/layout/main-layout"

export default function ManualUsuarioPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Manual do Usuário - SIPESC</h1>
        <iframe
          src="/MANUAL_USUARIO_SIPESC.pdf"
          title="Manual do Usuário SIPESC"
          className="w-full h-[80vh] border rounded-md shadow"
        />
      </div>
    </MainLayout>
  )
}
