"use client"

import { ResponsiveContainer } from "@/components/layout/responsive-container"
import { ResponsiveCard } from "@/components/ui/responsive-card"
import { ResponsiveGrid } from "@/components/ui/responsive-grid"
import { BreakpointIndicator } from "@/components/ui/breakpoint-indicator"
import { useResponsive } from "@/hooks/use-responsive"
import { Card, CardContent } from "@/components/ui/card"

export default function TesteResponsivoPage() {
  const { breakpoint, width, isMobile, isTablet, isDesktop } = useResponsive()

  return (
    <ResponsiveContainer>
      <BreakpointIndicator showAlways />

      <div className="space-y-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Teste de Responsividade</h1>

        <ResponsiveCard
          title="Informações do Dispositivo"
          description="Detalhes sobre o dispositivo atual e breakpoints"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Breakpoint Atual</p>
                <p className="text-lg font-bold">{breakpoint}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Largura da Tela</p>
                <p className="text-lg font-bold">{width}px</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tipo de Dispositivo</p>
                <p className="text-lg font-bold">{isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop"}</p>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">Teste de Grid Responsivo</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-2">
                1 coluna (xs) → 2 colunas (sm) → 3 colunas (md) → 4 colunas (lg)
              </h3>
              <ResponsiveGrid xs={1} sm={2} md={3} lg={4} gap="md">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <Card key={item}>
                    <CardContent className="p-4 h-24 flex items-center justify-center">
                      <span className="text-2xl font-bold">{item}</span>
                    </CardContent>
                  </Card>
                ))}
              </ResponsiveGrid>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">2 colunas (xs) → 3 colunas (md) → 6 colunas (xl)</h3>
              <ResponsiveGrid xs={2} md={3} xl={6} gap="sm">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                  <Card key={item}>
                    <CardContent className="p-2 h-16 flex items-center justify-center">
                      <span className="text-lg font-bold">{item}</span>
                    </CardContent>
                  </Card>
                ))}
              </ResponsiveGrid>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">Classes Responsivas do Tailwind</h2>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
                Este texto muda de tamanho em cada breakpoint
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2 p-4 bg-blue-100 rounded">Coluna 1</div>
                <div className="w-full sm:w-1/2 p-4 bg-green-100 rounded">Coluna 2</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="hidden xs:block sm:hidden">
                <p className="font-bold">Visível apenas em XS (360px - 639px)</p>
              </div>
              <div className="hidden sm:block md:hidden">
                <p className="font-bold">Visível apenas em SM (640px - 767px)</p>
              </div>
              <div className="hidden md:block lg:hidden">
                <p className="font-bold">Visível apenas em MD (768px - 1023px)</p>
              </div>
              <div className="hidden lg:block xl:hidden">
                <p className="font-bold">Visível apenas em LG (1024px - 1279px)</p>
              </div>
              <div className="hidden xl:block 2xl:hidden">
                <p className="font-bold">Visível apenas em XL (1280px - 1535px)</p>
              </div>
              <div className="hidden 2xl:block">
                <p className="font-bold">Visível apenas em 2XL (1536px e acima)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}
