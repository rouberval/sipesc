export const mockReports: Record<string, any> = {
  "alunos-risco": {
    title: "Alunos em Situação de Risco",
    description: "Relatório detalhado de alunos identificados em situação de risco",
    type: "table",
    lastUpdated: "15/11/2023",
    columns: ["Nome", "Idade", "Escola", "Risco", "Ocorrências", "Faltas"],
    data: [
      ["Ana Silva", 14, "Escola Municipal Centro", "Alto", 3, 12],
      ["Carlos Oliveira", 15, "Escola Municipal Norte", "Médio", 2, 8],
      ["Mariana Santos", 13, "Escola Municipal Sul", "Alto", 4, 15],
      ["Pedro Costa", 16, "Escola Municipal Leste", "Médio", 1, 7],
      ["Juliana Lima", 12, "Escola Municipal Oeste", "Alto", 3, 10],
    ],
  },
  "ocorrencias-tipo": {
    title: "Ocorrências por Tipo",
    description: "Análise das ocorrências registradas classificadas por tipo",
    type: "bar",
    lastUpdated: "12/11/2023",
    labels: ["Bullying", "Violência", "Indisciplina", "Danos ao patrimônio", "Outros"],
    data: [42, 28, 65, 19, 33],
  }
  // ... (demais relatórios podem ser inseridos aqui)
}
