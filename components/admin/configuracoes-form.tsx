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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import type { ProfileVisualizationConfig } from "@/types/visualization-config"

// Esquema de validação para as configurações gerais
const generalConfigSchema = z.object({
  systemName: z.string().min(2, {
    message: "O nome do sistema deve ter pelo menos 2 caracteres.",
  }),
  systemLogo: z.string().optional(),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Insira uma cor hexadecimal válida (ex: #FF0000).",
  }),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Insira uma cor hexadecimal válida (ex: #FF0000).",
  }),
  contactEmail: z.string().email({
    message: "Insira um endereço de e-mail válido.",
  }),
  supportPhone: z.string().optional(),
})

// Esquema de validação para as configurações de notificações
const notificationConfigSchema = z.object({
  enableEmailNotifications: z.boolean(),
  enablePushNotifications: z.boolean(),
  enableSmsNotifications: z.boolean(),
  notificationFrequency: z.enum(["immediate", "daily", "weekly"]),
  criticalAlertThreshold: z.coerce.number().min(1).max(100),
  emailTemplate: z.string().optional(),
})

// Esquema de validação para as configurações de segurança
const securityConfigSchema = z.object({
  sessionTimeout: z.coerce.number().min(5).max(1440),
  passwordExpiryDays: z.coerce.number().min(0).max(365),
  requireStrongPasswords: z.boolean(),
  enableTwoFactorAuth: z.boolean(),
  maxLoginAttempts: z.coerce.number().min(1).max(10),
  ipWhitelist: z.string().optional(),
})

// Esquema de validação para as configurações de integração
const integrationConfigSchema = z.object({
  enableApiAccess: z.boolean(),
  apiKey: z.string().optional(),
  webhookUrl: z.string().url().optional().or(z.literal("")),
  enableDataSharing: z.boolean(),
  dataExportFormat: z.enum(["csv", "json", "xml"]),
})

// Esquema de validação para as configurações de medicações
const medicationConfigSchema = z.object({
  requirePrescription: z.boolean(),
  allowParentAuthorization: z.boolean(),
  medicationReminderEnabled: z.boolean(),
  defaultReminderTime: z.string(),
  medicationLogRetentionDays: z.coerce.number().min(30).max(3650),
  allowedMedicationTypes: z.string(),
  requirePhotoEvidence: z.boolean(),
  notifyParentsOnAdministration: z.boolean(),
})

// Valores iniciais para o formulário
const defaultValues = {
  general: {
    systemName: "SIPESC",
    systemLogo: "",
    primaryColor: "#0f172a",
    secondaryColor: "#4f46e5",
    contactEmail: "contato@sipesc.gov.br",
    supportPhone: "(48) 3333-3333",
  },
  notifications: {
    enableEmailNotifications: true,
    enablePushNotifications: false,
    enableSmsNotifications: false,
    notificationFrequency: "daily",
    criticalAlertThreshold: 80,
    emailTemplate:
      "<p>Olá {{nome}},</p><p>Você tem novas notificações no sistema SIPESC.</p><p>Atenciosamente,<br>Equipe SIPESC</p>",
  },
  security: {
    sessionTimeout: 60,
    passwordExpiryDays: 90,
    requireStrongPasswords: true,
    enableTwoFactorAuth: false,
    maxLoginAttempts: 5,
    ipWhitelist: "",
  },
  integration: {
    enableApiAccess: false,
    apiKey: "",
    webhookUrl: "",
    enableDataSharing: false,
    dataExportFormat: "json",
  },
  medication: {
    requirePrescription: true,
    allowParentAuthorization: true,
    medicationReminderEnabled: true,
    defaultReminderTime: "08:00",
    medicationLogRetentionDays: 365,
    allowedMedicationTypes: "Analgésicos, Anti-térmicos, Anti-alérgicos, Antibióticos",
    requirePhotoEvidence: false,
    notifyParentsOnAdministration: true,
  },
}

export function ConfiguracoesForm() {
  const [activeTab, setActiveTab] = useState("general")
  const { toast } = useToast()
  const { updateVisualizationConfig } = useAuth()
  const [mpVisualizationConfig, setMpVisualizationConfig] = useState<ProfileVisualizationConfig>({
    "painel-bi": true,
    escolas: true,
    conselhos: true,
    alertas: true,
    relatorios: true,
    "alunos-risco": true,
    estatisticas: true,
    mapa: true,
    "dados-sensiveis": true,
    historico: true,
  })

  // Formulário para configurações gerais
  const generalForm = useForm<z.infer<typeof generalConfigSchema>>({
    resolver: zodResolver(generalConfigSchema),
    defaultValues: defaultValues.general,
  })

  // Formulário para configurações de notificações
  const notificationForm = useForm<z.infer<typeof notificationConfigSchema>>({
    resolver: zodResolver(notificationConfigSchema),
    defaultValues: defaultValues.notifications,
  })

  // Formulário para configurações de segurança
  const securityForm = useForm<z.infer<typeof securityConfigSchema>>({
    resolver: zodResolver(securityConfigSchema),
    defaultValues: defaultValues.security,
  })

  // Formulário para configurações de integração
  const integrationForm = useForm<z.infer<typeof integrationConfigSchema>>({
    resolver: zodResolver(integrationConfigSchema),
    defaultValues: defaultValues.integration,
  })

  // Formulário para configurações de medicações
  const medicationForm = useForm<z.infer<typeof medicationConfigSchema>>({
    resolver: zodResolver(medicationConfigSchema),
    defaultValues: defaultValues.medication,
  })

  // Função para salvar as configurações gerais
  const onSubmitGeneral = (data: z.infer<typeof generalConfigSchema>) => {
    console.log("Configurações gerais:", data)
    toast({
      title: "Configurações atualizadas",
      description: "As configurações gerais foram salvas com sucesso.",
    })
  }

  // Função para salvar as configurações de notificações
  const onSubmitNotifications = (data: z.infer<typeof notificationConfigSchema>) => {
    console.log("Configurações de notificações:", data)
    toast({
      title: "Configurações atualizadas",
      description: "As configurações de notificações foram salvas com sucesso.",
    })
  }

  // Função para salvar as configurações de segurança
  const onSubmitSecurity = (data: z.infer<typeof securityConfigSchema>) => {
    console.log("Configurações de segurança:", data)
    toast({
      title: "Configurações atualizadas",
      description: "As configurações de segurança foram salvas com sucesso.",
    })
  }

  // Função para salvar as configurações de integração
  const onSubmitIntegration = (data: z.infer<typeof integrationConfigSchema>) => {
    console.log("Configurações de integração:", data)
    toast({
      title: "Configurações atualizadas",
      description: "As configurações de integração foram salvas com sucesso.",
    })
  }

  // Função para salvar as configurações de medicações
  const onSubmitMedication = (data: z.infer<typeof medicationConfigSchema>) => {
    console.log("Configurações de medicações:", data)
    toast({
      title: "Configurações atualizadas",
      description: "As configurações de medicações foram salvas com sucesso.",
    })
  }

  // Função para salvar as configurações de visualização
  const saveVisualizationConfig = () => {
    updateVisualizationConfig(mpVisualizationConfig)
    toast({
      title: "Configurações atualizadas",
      description: "As configurações de visualização foram salvas com sucesso.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Sistema</CardTitle>
        <CardDescription>Gerencie as configurações gerais do sistema SIPESC.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
            <TabsTrigger value="integration">Integração</TabsTrigger>
            <TabsTrigger value="medication">Medicações</TabsTrigger>
            <TabsTrigger value="visualizations">Visualizações</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Form {...generalForm}>
              <form onSubmit={generalForm.handleSubmit(onSubmitGeneral)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={generalForm.control}
                    name="systemName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Sistema</FormLabel>
                        <FormControl>
                          <Input placeholder="SIPESC" {...field} />
                        </FormControl>
                        <FormDescription>Nome exibido no cabeçalho e rodapé do sistema.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="systemLogo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL do Logo</FormLabel>
                        <FormControl>
                          <Input placeholder="https://exemplo.com/logo.png" {...field} />
                        </FormControl>
                        <FormDescription>URL da imagem do logo do sistema.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="primaryColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cor Primária</FormLabel>
                        <div className="flex items-center gap-2">
                          <Input type="color" className="w-12 h-10 p-1" {...field} />
                          <Input {...field} />
                        </div>
                        <FormDescription>Cor primária utilizada no tema do sistema.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="secondaryColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cor Secundária</FormLabel>
                        <div className="flex items-center gap-2">
                          <Input type="color" className="w-12 h-10 p-1" {...field} />
                          <Input {...field} />
                        </div>
                        <FormDescription>Cor secundária utilizada no tema do sistema.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email de Contato</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="contato@sipesc.gov.br" {...field} />
                        </FormControl>
                        <FormDescription>Email para contato exibido no sistema.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="supportPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone de Suporte</FormLabel>
                        <FormControl>
                          <Input placeholder="(48) 3333-3333" {...field} />
                        </FormControl>
                        <FormDescription>Telefone de suporte exibido no sistema.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="mt-4">
                  <Save className="mr-2 h-4 w-4" /> Salvar Configurações
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="notifications">
            <Form {...notificationForm}>
              <form onSubmit={notificationForm.handleSubmit(onSubmitNotifications)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={notificationForm.control}
                      name="enableEmailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Notificações por Email</FormLabel>
                            <FormDescription>Ativar envio de notificações por email.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="enablePushNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Notificações Push</FormLabel>
                            <FormDescription>Ativar notificações push no navegador.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="enableSmsNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Notificações SMS</FormLabel>
                            <FormDescription>Ativar envio de notificações por SMS.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={notificationForm.control}
                      name="notificationFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Frequência de Notificações</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a frequência" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="immediate">Imediata</SelectItem>
                              <SelectItem value="daily">Diária</SelectItem>
                              <SelectItem value="weekly">Semanal</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Com que frequência as notificações devem ser enviadas.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="criticalAlertThreshold"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Limite para Alertas Críticos (%)</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" max="100" {...field} />
                          </FormControl>
                          <FormDescription>
                            Percentual de faltas para considerar um alerta como crítico.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <FormField
                  control={notificationForm.control}
                  name="emailTemplate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Template de Email</FormLabel>
                      <FormControl>
                        <Textarea rows={6} {...field} />
                      </FormControl>
                      <FormDescription>
                        Template HTML para emails de notificação. Use &#123;&#123; nome &#125;&#125; para inserir o nome
                        do destinatário.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-4">
                  <Save className="mr-2 h-4 w-4" /> Salvar Configurações
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="security">
            <Form {...securityForm}>
              <form onSubmit={securityForm.handleSubmit(onSubmitSecurity)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={securityForm.control}
                    name="sessionTimeout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tempo de Sessão (minutos)</FormLabel>
                        <FormControl>
                          <Input type="number" min="5" max="1440" {...field} />
                        </FormControl>
                        <FormDescription>Tempo de inatividade até o logout automático.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="passwordExpiryDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiração de Senha (dias)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" max="365" {...field} />
                        </FormControl>
                        <FormDescription>Dias até a senha expirar (0 = nunca expira).</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="maxLoginAttempts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tentativas de Login</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" max="10" {...field} />
                        </FormControl>
                        <FormDescription>Número máximo de tentativas de login antes do bloqueio.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="ipWhitelist"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lista de IPs Permitidos</FormLabel>
                        <FormControl>
                          <Input placeholder="192.168.1.1, 10.0.0.1" {...field} />
                        </FormControl>
                        <FormDescription>Lista de IPs permitidos (separados por vírgula).</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="requireStrongPasswords"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Senhas Fortes</FormLabel>
                          <FormDescription>Exigir senhas fortes (letras, números e símbolos).</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="enableTwoFactorAuth"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Autenticação de Dois Fatores</FormLabel>
                          <FormDescription>Ativar autenticação de dois fatores para todos os usuários.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="mt-4">
                  <Save className="mr-2 h-4 w-4" /> Salvar Configurações
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="integration">
            <Form {...integrationForm}>
              <form onSubmit={integrationForm.handleSubmit(onSubmitIntegration)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={integrationForm.control}
                      name="enableApiAccess"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Acesso à API</FormLabel>
                            <FormDescription>Permitir acesso externo via API.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={integrationForm.control}
                      name="enableDataSharing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Compartilhamento de Dados</FormLabel>
                            <FormDescription>Permitir compartilhamento de dados com sistemas externos.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={integrationForm.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chave da API</FormLabel>
                          <FormControl>
                            <Input placeholder="Chave gerada automaticamente" {...field} />
                          </FormControl>
                          <FormDescription>Chave para autenticação na API.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={integrationForm.control}
                      name="webhookUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL de Webhook</FormLabel>
                          <FormControl>
                            <Input placeholder="https://exemplo.com/webhook" {...field} />
                          </FormControl>
                          <FormDescription>URL para envio de notificações via webhook.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={integrationForm.control}
                      name="dataExportFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Formato de Exportação</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o formato" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="json">JSON</SelectItem>
                              <SelectItem value="xml">XML</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Formato padrão para exportação de dados.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button type="submit" className="mt-4">
                  <Save className="mr-2 h-4 w-4" /> Salvar Configurações
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="medication">
            <Form {...medicationForm}>
              <form onSubmit={medicationForm.handleSubmit(onSubmitMedication)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={medicationForm.control}
                      name="requirePrescription"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Exigir Prescrição Médica</FormLabel>
                            <FormDescription>
                              Exigir prescrição médica para administração de medicamentos.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={medicationForm.control}
                      name="allowParentAuthorization"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Permitir Autorização dos Pais</FormLabel>
                            <FormDescription>
                              Permitir que os pais autorizem a administração de medicamentos.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={medicationForm.control}
                      name="medicationReminderEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Lembretes de Medicação</FormLabel>
                            <FormDescription>Ativar lembretes para administração de medicamentos.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={medicationForm.control}
                      name="requirePhotoEvidence"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Exigir Evidência Fotográfica</FormLabel>
                            <FormDescription>
                              Exigir foto como evidência da administração do medicamento.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={medicationForm.control}
                      name="defaultReminderTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horário Padrão para Lembretes</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormDescription>Horário padrão para envio de lembretes de medicação.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={medicationForm.control}
                      name="medicationLogRetentionDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Retenção de Registros (dias)</FormLabel>
                          <FormControl>
                            <Input type="number" min="30" max="3650" {...field} />
                          </FormControl>
                          <FormDescription>Período de retenção dos registros de medicação em dias.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={medicationForm.control}
                      name="notifyParentsOnAdministration"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Notificar Pais</FormLabel>
                            <FormDescription>Notificar os pais quando um medicamento for administrado.</FormDescription>
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
                  control={medicationForm.control}
                  name="allowedMedicationTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipos de Medicamentos Permitidos</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Analgésicos, Anti-térmicos, Anti-alérgicos, Antibióticos" {...field} />
                      </FormControl>
                      <FormDescription>
                        Lista de tipos de medicamentos permitidos (separados por vírgula).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-4">
                  <Save className="mr-2 h-4 w-4" /> Salvar Configurações
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="visualizations">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Configurações de Visualização por Perfil</h3>
                <Badge variant="outline" className="ml-2">
                  Administrador
                </Badge>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h4 className="font-medium">Ministério Público</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure quais visualizações estarão disponíveis para usuários com perfil de Ministério Público.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Painel BI</h5>
                        <p className="text-sm text-muted-foreground">Visualização de indicadores e gráficos</p>
                      </div>
                      <Switch
                        checked={mpVisualizationConfig["painel-bi"]}
                        onCheckedChange={(checked) =>
                          setMpVisualizationConfig((prev) => ({ ...prev, "painel-bi": checked }))
                        }
                      />
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Escolas Cadastradas</h5>
                        <p className="text-sm text-muted-foreground">Lista e detalhes de escolas</p>
                      </div>
                      <Switch
                        checked={mpVisualizationConfig.escolas}
                        onCheckedChange={(checked) =>
                          setMpVisualizationConfig((prev) => ({ ...prev, escolas: checked }))
                        }
                      />
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Conselhos Tutelares</h5>
                        <p className="text-sm text-muted-foreground">Lista e detalhes de conselhos</p>
                      </div>
                      <Switch
                        checked={mpVisualizationConfig.conselhos}
                        onCheckedChange={(checked) =>
                          setMpVisualizationConfig((prev) => ({ ...prev, conselhos: checked }))
                        }
                      />
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Alertas</h5>
                        <p className="text-sm text-muted-foreground">Notificações de casos críticos</p>
                      </div>
                      <Switch
                        checked={mpVisualizationConfig.alertas}
                        onCheckedChange={(checked) =>
                          setMpVisualizationConfig((prev) => ({ ...prev, alertas: checked }))
                        }
                      />
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Relatórios</h5>
                        <p className="text-sm text-muted-foreground">Geração e visualização de relatórios</p>
                      </div>
                      <Switch
                        checked={mpVisualizationConfig.relatorios}
                        onCheckedChange={(checked) =>
                          setMpVisualizationConfig((prev) => ({ ...prev, relatorios: checked }))
                        }
                      />
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Alunos em Risco</h5>
                        <p className="text-sm text-muted-foreground">Lista de alunos em situação crítica</p>
                      </div>
                      <Switch
                        checked={mpVisualizationConfig["alunos-risco"]}
                        onCheckedChange={(checked) =>
                          setMpVisualizationConfig((prev) => ({ ...prev, "alunos-risco": checked }))
                        }
                      />
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Estatísticas Detalhadas</h5>
                        <p className="text-sm text-muted-foreground">Dados estatísticos avançados</p>
                      </div>
                      <Switch
                        checked={mpVisualizationConfig.estatisticas}
                        onCheckedChange={(checked) =>
                          setMpVisualizationConfig((prev) => ({ ...prev, estatisticas: checked }))
                        }
                      />
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Mapa de Ocorrências</h5>
                        <p className="text-sm text-muted-foreground">Visualização geográfica</p>
                      </div>
                      <Switch
                        checked={mpVisualizationConfig.mapa}
                        onCheckedChange={(checked) => setMpVisualizationConfig((prev) => ({ ...prev, mapa: checked }))}
                      />
                    </div>
                  </Card>
                </div>

                <Separator className="my-4" />

                <h4 className="font-medium">Configurações Avançadas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Dados Sensíveis</h5>
                        <p className="text-sm text-muted-foreground">Informações pessoais dos alunos</p>
                      </div>
                      <Switch
                        checked={mpVisualizationConfig["dados-sensiveis"]}
                        onCheckedChange={(checked) =>
                          setMpVisualizationConfig((prev) => ({ ...prev, "dados-sensiveis": checked }))
                        }
                      />
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Histórico Completo</h5>
                        <p className="text-sm text-muted-foreground">Histórico detalhado de ocorrências</p>
                      </div>
                      <Switch
                        checked={mpVisualizationConfig.historico}
                        onCheckedChange={(checked) =>
                          setMpVisualizationConfig((prev) => ({ ...prev, historico: checked }))
                        }
                      />
                    </div>
                  </Card>
                </div>

                <Button className="mt-4" onClick={saveVisualizationConfig}>
                  <Save className="mr-2 h-4 w-4" /> Salvar Configurações de Visualização
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <p className="text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString()} às {new Date().toLocaleTimeString()}
        </p>
      </CardFooter>
    </Card>
  )
}
