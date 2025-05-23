"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Zap, Server } from "lucide-react"
import { ModelInfoModal } from "@/components/dashboard/model-info-modal"

export function ModelStatusCard() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const openModal = (section: string) => {
    setSelectedSection(section)
    setModalOpen(true)
  }

  return (
    <>
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Model Information</CardTitle>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
          </div>
          <CardDescription>Current model status and information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div
              className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              onClick={() => openModal("model")}
            >
              <div className="rounded-full p-2 bg-yellow-100">
                <Cpu className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Model</p>
                <p className="text-sm text-muted-foreground">LLaMA 2 7B Chat</p>
              </div>
            </div>
            <div
              className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              onClick={() => openModal("quantization")}
            >
              <div className="rounded-full p-2 bg-yellow-100">
                <Zap className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Quantization</p>
                <p className="text-sm text-muted-foreground">Q4_K_M (4-bit)</p>
              </div>
            </div>
            <div
              className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
              onClick={() => openModal("memory")}
            >
              <div className="rounded-full p-2 bg-yellow-100">
                <Server className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Memory Usage</p>
                <p className="text-sm text-muted-foreground">4.2 GB / 16 GB</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ModelInfoModal open={modalOpen} onOpenChange={setModalOpen} section={selectedSection} />
    </>
  )
}
