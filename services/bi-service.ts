export interface BiDataFilters {
  regiao?: string
  municipio?: string
  escola?: string
  conselho?: string
  dataInicio?: string
  dataFim?: string
}

export interface OcorrenciaData {
  tipo: string
  quantidade: number
  percentual: number
}

export interface EncaminhamentoData {
  destino: string
  quantidade: number
  percentual: number
}

export interface FrequenciaData {
  mes: string
  percentual: number
}

export interface StatusEncaminhamentoData {
  status: string
  quantidade: number
  percentual: number
}

export interface GravidadeAlunoData {
  nivel: string
  quantidade: number
  percentual: number
}

export interface TempoRespostaData {
  conselho: string
  tempoMedio: number
}

export interface ReincidenciaData {
  tipo: string
  reincidencia: number
  percentual: number
}

export interface ConselhoOcorrenciaData {
  conselho: string
  ocorrencias: number
}

export interface BiData {
  ocorrencias: OcorrenciaData[]
  encaminhamentos: EncaminhamentoData[]
  frequencia: FrequenciaData[]
  statusEncaminhamentos: StatusEncaminhamentoData[]
  gravidadeAlunos: GravidadeAlunoData[]
  tempoResposta: TempoRespostaData[]
  reincidencia: ReincidenciaData[]
  conselhoOcorrencias: ConselhoOcorrenciaData[]
  totalAlunos: number
  totalEscolas: number
  totalConselhos: number
  totalOcorrencias: number
  totalEncaminhamentos: number
  alunosEmRisco: number
  percentualFrequencia: number
}

export interface DashboardMPData {
  totalEscolas: number
  totalConselhos: number
  casosNaoTratados: number
  casosPendentes: number
  casosResolvidos: number
  casosUrgentes: number
  casosNovos: number
  casosReincidentes: number
  regioesAtendidas: number
  escolasComAlerta: number
  conselhosComAlerta: number
  alunosEmRisco: number
  casosCriticos: { id: string; nome: string; tipo: string; status: string }[]
}

// Dados mockados para o BI
const mockBiData: BiData = {
  ocorrencias: [
    { tipo: "Comportamento", quantidade: 120, percentual: 40 },
    { tipo: "Acadêmico", quantidade: 90, percentual: 30 },
    { tipo: "Bullying", quantidade: 60, percentual: 20 },
    { tipo: "Outro", quantidade: 30, percentual: 10 },
  ],
  encaminhamentos: [
    { destino: "Conselho Tutelar", quantidade: 45, percentual: 50 },
    { destino: "CRAS", quantidade: 20, percentual: 22 },
    { destino: "CAPS", quantidade: 15, percentual: 17 },
    { destino: "Psicólogo", quantidade: 10, percentual: 11 },
  ],
  frequencia: [
    { mes: "Jan", percentual: 92 },
    { mes: "Fev", percentual: 94 },
    { mes: "Mar", percentual: 91 },
    { mes: "Abr", percentual: 88 },
    { mes: "Mai", percentual: 90 },
    { mes: "Jun", percentual: 89 },
  ],
  statusEncaminhamentos: [
    { status: "Pendente", quantidade: 35, percentual: 39 },
    { status: "Em Andamento", quantidade: 25, percentual: 28 },
    { status: "Concluído", quantidade: 30, percentual: 33 },
  ],
  gravidadeAlunos: [
    { gravidade: "Risco Alto", quantidade: 25, percentual: 10 },
    { gravidade: "Risco Médio", quantidade: 50, percentual: 20 },
    { gravidade: "Atenção", quantidade: 75, percentual: 30 },
    { gravidade: "Normal", quantidade: 100, percentual: 40 },
  ],
  tempoResposta: [
    { conselho: "Conselho Norte", tempoMedio: 5.2 },
    { conselho: "Conselho Sul", tempoMedio: 3.8 },
    { conselho: "Conselho Leste", tempoMedio: 7.1 },
    { conselho: "Conselho Oeste", tempoMedio: 4.5 },
    { conselho: "Conselho Central", tempoMedio: 2.9 },
  ],
  reincidencia: [
    { tipo: "Comportamento", reincidencia: 35, percentual: 29 },
    { tipo: "Acadêmico", reincidencia: 20, percentual: 22 },
    { tipo: "Bullying", reincidencia: 15, percentual: 25 },
    { tipo: "Outro", reincidencia: 5, percentual: 17 },
  ],
  conselhoOcorrencias: [
    { conselho: "Conselho Norte", ocorrencias: 45 },
    { conselho: "Conselho Sul", ocorrencias: 35 },
    { conselho: "Conselho Leste", ocorrencias: 30 },
    { conselho: "Conselho Oeste", ocorrencias: 25 },
    { conselho: "Conselho Central", ocorrencias: 40 },
  ],
  totalAlunos: 12500,
  totalEscolas: 25,
  totalConselhos: 5,
  totalOcorrencias: 300,
  totalEncaminhamentos: 90,
  alunosEmRisco: 150,
  percentualFrequencia: 90,
}

const mockDashboardMPData: DashboardMPData = {
  totalEscolas: 25,
  totalConselhos: 5,
  casosNaoTratados: 15,
  casosPendentes: 45,
  casosResolvidos: 300,
  casosUrgentes: 12,
  casosNovos: 50,
  casosReincidentes: 20,
  regioesAtendidas: 5,
  escolasComAlerta: 8,
  conselhosComAlerta: 2,
  alunosEmRisco: 150,
  casosCriticos: [
    { id: "1", nome: "Carlos Oliveira", tipo: "Evasão Escolar", status: "Pendente" },
    { id: "2", nome: "Ana Silva", tipo: "Violência", status: "Em Análise" },
    { id: "3", nome: "Pedro Santos", tipo: "Reincidência", status: "Resolvido" },
  ],
}

// Função para buscar dados do dashboard do MP
export async function fetchDashboardMPData(): Promise<DashboardMPData> {
  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Retornar dados mockados
  return mockDashboardMPData
}
