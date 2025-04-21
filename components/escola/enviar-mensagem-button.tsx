"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

interface EnviarMensagemButtonProps {
  escolaId?: string
  conselhoId?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function EnviarMensagemButton({
  escolaId,
  conselhoId,
  variant = "default",
  size = "default",
  className,
}: EnviarMensagemButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    let url = "/mensagens/nova"

    if (escolaId) {
      url += `?escolaId=${escolaId}`
    } else if (conselhoId) {
      url += `?conselhoId=${conselhoId}`
    }

    router.push(url)
  }

  return (
    <Button variant={variant} size={size} onClick={handleClick} className={className}>
      <MessageSquare className={size === "icon" ? "h-4 w-4" : "mr-2 h-4 w-4"} />
      {size !== "icon" && "Enviar mensagem"}
    </Button>
  )
}
