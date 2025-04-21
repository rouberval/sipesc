"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"

interface SaveReportDialogProps {
  defaultName: string
  defaultDescription: string
  defaultPermissions: { roles: string[]; shared: boolean }
  onSave: (name: string, description: string, permissions: { roles: string[]; shared: boolean }) => void
  onCancel: () => void
}

export function SaveReportDialog({
  defaultName,
  defaultDescription,
  defaultPermissions,
  onSave,
  onCancel,
}: SaveReportDialogProps) {
  const { user } = useAuth()
  const [name, setName] = useState(defaultName)
  const [description, setDescription] = useState(defaultDescription)
  const [permissions, setPermissions] = useState(defaultPermissions)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(name, description, permissions)
  }

  const toggleRole = (role: string) => {
    const newRoles = permissions.roles.includes(role)
      ? permissions.roles.filter((r) => r !== role)
      : [...permissions.roles, role]

    setPermissions({ ...permissions, roles: newRoles })
  }

  const toggleShared = () => {
    setPermissions({ ...permissions, shared: !permissions.shared })
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Salvar Modelo de Relatório</DialogTitle>
          <DialogDescription>Dê um nome e uma descrição para o seu modelo de relatório personalizado</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Relatório</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Relatório de Ocorrências por Escola"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o propósito deste relatório"
                rows={3}
              />
            </div>

            {/* Permissões - apenas visível para o MP */}
            {user?.role === "mp" && (
              <div className="grid gap-2 border-t pt-4 mt-2">
                <Label>Permissões de Acesso</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mp"
                      checked={permissions.roles.includes("mp")}
                      onCheckedChange={() => toggleRole("mp")}
                      disabled
                    />
                    <Label htmlFor="mp" className="text-sm">
                      Ministério Público
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="conselheiro"
                      checked={permissions.roles.includes("conselheiro")}
                      onCheckedChange={() => toggleRole("conselheiro")}
                    />
                    <Label htmlFor="conselheiro" className="text-sm">
                      Conselhos Tutelares
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="escola"
                      checked={permissions.roles.includes("escola")}
                      onCheckedChange={() => toggleRole("escola")}
                    />
                    <Label htmlFor="escola" className="text-sm">
                      Escolas
                    </Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox id="shared" checked={permissions.shared} onCheckedChange={toggleShared} />
                  <Label htmlFor="shared" className="text-sm">
                    Compartilhar com todos os usuários
                  </Label>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
