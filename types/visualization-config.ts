export type VisualizationModule =
  | "dashboard"
  | "alunos"
  | "ocorrencias"
  | "frequencia"
  | "encaminhamentos"
  | "escolas"
  | "conselhos"
  | "mensagens"
  | "relatorios"
  | "medicacoes"
  | "painel_bi"
  | "alunos_risco"

export type ProfileVisualizationConfig = {
  [key in VisualizationModule]: boolean
}

// Configurações padrão de visualização por perfil
export const defaultVisualizationConfig: Record<string, ProfileVisualizationConfig> = {
  escola: {
    dashboard: true,
    alunos: true,
    ocorrencias: true,
    frequencia: true,
    encaminhamentos: true,
    escolas: false,
    conselhos: false,
    mensagens: true,
    relatorios: true,
    medicacoes: true,
    painel_bi: false,
    alunos_risco: false,
  },
  conselheiro: {
    dashboard: true,
    alunos: true,
    ocorrencias: true,
    frequencia: true,
    encaminhamentos: true,
    escolas: true,
    conselhos: false,
    mensagens: true,
    relatorios: true,
    medicacoes: false,
    painel_bi: false,
    alunos_risco: true,
  },
  mp: {
    dashboard: true,
    alunos: true,
    ocorrencias: true,
    frequencia: true,
    encaminhamentos: true,
    escolas: true,
    conselhos: true,
    mensagens: true,
    relatorios: true,
    medicacoes: true,
    painel_bi: true,
    alunos_risco: true,
  },
  admin: {
    dashboard: true,
    alunos: true,
    ocorrencias: true,
    frequencia: true,
    encaminhamentos: true,
    escolas: true,
    conselhos: true,
    mensagens: true,
    relatorios: true,
    medicacoes: true,
    painel_bi: true,
    alunos_risco: true,
  },
}
