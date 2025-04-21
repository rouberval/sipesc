export type Permission = {
  module: PermissionModule
  action: PermissionAction
}

export type PermissionModule =
  | "alunos"
  | "ocorrencias"
  | "encaminhamentos"
  | "relatorios"
  | "configuracoes"
  | "medicacoes"
  | "mensagens"
  | "dashboard"
  | "escolas"
  | "conselhos"
  | "painel-bi"
  | "alertas"
  | "usuarios"
  | "permissoes"
  | "visualizacoes"
  | "notificacoes"
  | "sistema"
  | "orgaos" // Novo módulo para cadastro de órgãos

export type PermissionAction =
  | "view"
  | "create"
  | "edit"
  | "delete"
  | "export"
  | "import"
  | "manage"
  | "approve"
  | "respond"
  | "customize"
  | "share"
  | "assign"
  | "revoke"
  | "configure"
  | "audit"

export interface UserPermissions {
  userId: string
  permissions: Permission[]
}

export const moduleLabels: Record<PermissionModule, string> = {
  alunos: "Alunos",
  ocorrencias: "Ocorrências",
  encaminhamentos: "Encaminhamentos",
  relatorios: "Relatórios",
  configuracoes: "Configurações",
  medicacoes: "Medicações",
  mensagens: "Mensagens",
  dashboard: "Dashboard",
  escolas: "Escolas",
  conselhos: "Conselhos",
  "painel-bi": "Painel BI",
  alertas: "Alertas",
  usuarios: "Usuários",
  permissoes: "Permissões",
  visualizacoes: "Visualizações",
  notificacoes: "Notificações",
  sistema: "Sistema",
  orgaos: "Órgãos", // Novo módulo para cadastro de órgãos
}

export const actionLabels: Record<PermissionAction, string> = {
  view: "Visualizar",
  create: "Criar",
  edit: "Editar",
  delete: "Excluir",
  export: "Exportar",
  import: "Importar",
  manage: "Gerenciar",
  approve: "Aprovar",
  respond: "Responder",
  customize: "Personalizar",
  share: "Compartilhar",
  assign: "Atribuir",
  revoke: "Revogar",
  configure: "Configurar",
  audit: "Auditar",
}

// Lista completa de todas as permissões possíveis
export const allPermissions: Permission[] = Object.keys(moduleLabels).flatMap((module) =>
  Object.keys(actionLabels).map((action) => ({
    module: module as PermissionModule,
    action: action as PermissionAction,
  })),
)

// Adicionar após a definição de allPermissions
console.log("Total de permissões possíveis:", allPermissions.length)
console.log("Módulos:", Object.keys(moduleLabels).length)
console.log("Ações:", Object.keys(actionLabels).length)
console.log("Cálculo esperado:", Object.keys(moduleLabels).length * Object.keys(actionLabels).length)

// Atualize as permissões padrão para cada perfil

export const defaultPermissionsByRole: Record<string, Permission[]> = {
  escola: [
    { module: "alunos", action: "view" },
    { module: "alunos", action: "create" },
    { module: "alunos", action: "edit" },
    { module: "ocorrencias", action: "create" },
    { module: "ocorrencias", action: "view" },
    { module: "ocorrencias", action: "edit" },
    { module: "encaminhamentos", action: "create" },
    { module: "encaminhamentos", action: "view" },
    { module: "relatorios", action: "view" },
    { module: "mensagens", action: "view" },
    { module: "mensagens", action: "create" },
    { module: "medicacoes", action: "view" },
    { module: "medicacoes", action: "create" },
    { module: "medicacoes", action: "edit" },
    { module: "dashboard", action: "view" },
  ],
  conselheiro: [
    { module: "alunos", action: "view" },
    { module: "ocorrencias", action: "view" },
    { module: "encaminhamentos", action: "view" },
    { module: "encaminhamentos", action: "respond" },
    { module: "encaminhamentos", action: "edit" },
    { module: "relatorios", action: "view" },
    { module: "relatorios", action: "create" },
    { module: "mensagens", action: "view" },
    { module: "mensagens", action: "create" },
    { module: "dashboard", action: "view" },
    { module: "escolas", action: "view" },
  ],
  mp: [
    { module: "alunos", action: "view" },
    { module: "ocorrencias", action: "view" },
    { module: "encaminhamentos", action: "view" },
    { module: "relatorios", action: "view" },
    { module: "relatorios", action: "export" },
    { module: "relatorios", action: "create" },
    { module: "configuracoes", action: "view" },
    { module: "painel-bi", action: "view" },
    { module: "escolas", action: "view" },
    { module: "conselhos", action: "view" },
    { module: "alertas", action: "view" },
    { module: "dashboard", action: "view" },
  ],
  admin: [
    // Admin tem todas as permissões
    ...allPermissions,
  ],
}
