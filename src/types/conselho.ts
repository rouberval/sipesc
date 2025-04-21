export interface ConselhoType {
  id: string
  nome: string
  endereco: string
  telefone: string
  email: string
  regiao: string
  municipio: string
  coordenador: string
  escolasVinculadas: number
  status: "ativo" | "inativo"
}
