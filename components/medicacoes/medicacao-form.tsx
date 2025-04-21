"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { Switch } from "@/components/ui/switch"
import { Save, Upload } from "lucide-react"

// Esquema de validação para medicação
const medicacaoSchema = z.object({
  nome: z.string().min(2, {
    message: "O nome do medicamento deve ter pelo menos 2 caracteres.",
  }),
  aluno: z.string().min(1, {
    message: "Selecione um aluno.",
  }),
  dosagem: z.string().min(1, {
    message: "Informe a dosagem do medicamento.",
  }),
  frequencia: z.string().min(1, {
    message: "Informe a frequência de administração.",
  }),
  dataInicio: z.date({
    required_error: "Informe a data de início.",
  }),
  dataFim: z
    .date({
      required_error: "Informe a data de término.",
    })
    .optional(),
  horarios: z.string().min(1, {
    message: "Informe os horários de administração.",
  }),
  observacoes: z.string().optional(),
  prescricaoMedica: z.boolean(),
  autorizacaoPais: z.boolean(),
  notificarPais: z.boolean(),
})

type MedicacaoFormValues = z.infer<typeof medicacaoSchema>

// Dados de exemplo para alunos
const alunos = [
  { id: "1", nome: "João Silva" },
  { id: "2", nome: "Maria Oliveira" },
  { id: "3", nome: "Pedro Santos" },
  { id: "4", nome: "Ana Souza" },
  { id: "5", nome: "Lucas Ferreira" },
]

export function MedicacaoForm() {
  const { toast } = useToast()
  const [prescricaoArquivo, setPrescricaoArquivo] = useState<File | null>(null)

  // Valores padrão para o formulário
  const defaultValues: Partial<MedicacaoFormValues> = {
    nome: "",
    aluno: "",
    dosagem: "",
    frequencia: "diaria",
    dataInicio: new Date(),
    horarios: "08:00",
    prescricaoMedica: true,
    autorizacaoPais: false,
    notificarPais: true,
  }

  const form = useForm<MedicacaoFormValues>({
    resolver: zodResolver(medicacaoSchema),
    defaultValues,
  })

  function onSubmit(data: MedicacaoFormValues) {
    console.log("Dados da medicação:", data)
    console.log("Arquivo de prescrição:", prescricaoArquivo)

    toast({
      title: "Medicação registrada",
      description: `A medicação ${data.nome} foi registrada com sucesso para o aluno.`,
    })

    // Resetar o formulário após o envio
    form.reset(defaultValues)
    setPrescricaoArquivo(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro de Medicação</CardTitle>
        <CardDescription>Registre uma nova medicação para um aluno.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="aluno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aluno</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um aluno" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {alunos.map((aluno) => (
                          <SelectItem key={aluno.id} value={aluno.id}>
                            {aluno.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Selecione o aluno que receberá a medicação.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Medicamento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Paracetamol" {...field} />
                    </FormControl>
                    <FormDescription>Nome do medicamento a ser administrado.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dosagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosagem</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 1 comprimido de 500mg" {...field} />
                    </FormControl>
                    <FormDescription>Quantidade e concentração do medicamento.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="frequencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequência</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a frequência" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="diaria">Diária</SelectItem>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="mensal">Mensal</SelectItem>
                        <SelectItem value="unica">Dose única</SelectItem>
                        <SelectItem value="se_necessario">Se necessário</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Com que frequência o medicamento deve ser administrado.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataInicio"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Início</FormLabel>
                    <DatePicker date={field.value} setDate={field.onChange} />
                    <FormDescription>Data de início da administração do medicamento.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataFim"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Término (opcional)</FormLabel>
                    <DatePicker date={field.value} setDate={field.onChange} />
                    <FormDescription>Data de término da administração do medicamento.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="horarios"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horários</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 08:00, 12:00, 18:00" {...field} />
                    </FormControl>
                    <FormDescription>Horários de administração (separados por vírgula).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="prescricaoMedica"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Prescrição Médica</FormLabel>
                        <FormDescription>Possui prescrição médica para este medicamento.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="autorizacaoPais"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Autorização dos Pais</FormLabel>
                        <FormDescription>Possui autorização dos pais para administração.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notificarPais"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Notificar Pais</FormLabel>
                        <FormDescription>Notificar os pais quando o medicamento for administrado.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Observações adicionais sobre a medicação..." {...field} />
                  </FormControl>
                  <FormDescription>Informações adicionais sobre a administração do medicamento.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Anexar Prescrição Médica</FormLabel>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("prescricao-upload")?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" /> Selecionar Arquivo
                </Button>
                <Input
                  id="prescricao-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null
                    setPrescricaoArquivo(file)
                  }}
                />
                {prescricaoArquivo && <span className="text-sm text-muted-foreground">{prescricaoArquivo.name}</span>}
              </div>
              <FormDescription>Anexe a prescrição médica em formato PDF, JPG ou PNG.</FormDescription>
            </div>

            <Button type="submit" className="mt-4">
              <Save className="mr-2 h-4 w-4" /> Registrar Medicação
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t p-4">
        <p className="text-sm text-muted-foreground">
          As medicações registradas serão exibidas no histórico médico do aluno.
        </p>
      </CardFooter>
    </Card>
  )
}
