import { ProtectedRoute } from "@/components/auth/protected-route"
import { UsuariosAdminList } from "@/components/admin/usuarios-admin-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminUsuariosPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Usuários</h1>
          <p className="text-muted-foreground">Gerencie todos os usuários do sistema, suas permissões e acesso.</p>
        </div>

        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="todos">Todos Usuários</TabsTrigger>
            <TabsTrigger value="ativos">Ativos</TabsTrigger>
            <TabsTrigger value="inativos">Inativos</TabsTrigger>
          </TabsList>
          <TabsContent value="todos" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Todos os Usuários</CardTitle>
                <CardDescription>Lista completa de todos os usuários cadastrados no sistema.</CardDescription>
              </CardHeader>
              <CardContent>
                <UsuariosAdminList filter="todos" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ativos" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Usuários Ativos</CardTitle>
                <CardDescription>Usuários com acesso ativo ao sistema.</CardDescription>
              </CardHeader>
              <CardContent>
                <UsuariosAdminList filter="ativos" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="inativos" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Usuários Inativos</CardTitle>
                <CardDescription>Usuários com acesso desativado ao sistema.</CardDescription>
              </CardHeader>
              <CardContent>
                <UsuariosAdminList filter="inativos" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}
