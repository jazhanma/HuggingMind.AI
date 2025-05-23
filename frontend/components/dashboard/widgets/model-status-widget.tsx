"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, MemoryStickIcon as Memory, Clock, AlertCircle } from "lucide-react"

export function ModelStatusWidget() {
  const [activeModel, setActiveModel] = useState("llama2-7b")

  const models = [
    {
      id: "llama2-7b",
      name: "LLaMA 2 7B Chat",
      status: "active",
      memory: 4.2,
      uptime: "3d 14h",
      quantization: "Q4_K_M (4-bit)",
      temperature: 0.7,
      maxTokens: 2048,
    },
    {
      id: "mistral-7b",
      name: "Mistral 7B",
      status: "loaded",
      memory: 3.8,
      uptime: "2d 8h",
      quantization: "Q4_K_M (4-bit)",
      temperature: 0.8,
      maxTokens: 2048,
    },
    {
      id: "gemma-7b",
      name: "Gemma 7B",
      status: "available",
      memory: 0,
      uptime: "-",
      quantization: "Q4_K_M (4-bit)",
      temperature: 0.7,
      maxTokens: 2048,
    },
  ]

  const activeModelData = models.find((m) => m.id === activeModel) || models[0]

  return (
    <div className="h-full">
      <Tabs defaultValue={activeModel} onValueChange={setActiveModel} className="h-full">
        <TabsList className="grid grid-cols-3">
          {models.map((model) => (
            <TabsTrigger key={model.id} value={model.id} className="text-xs">
              {model.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {models.map((model) => (
          <TabsContent key={model.id} value={model.id} className="h-[calc(100%-40px)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
              <div className="space-y-4 col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">{model.name}</h3>
                    <p className="text-xs text-muted-foreground">Current active model</p>
                  </div>

                  <Badge
                    variant={model.status === "active" ? "default" : "outline"}
                    className={
                      model.status === "active"
                        ? "bg-green-500"
                        : model.status === "loaded"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {model.status === "active" && "Active"}
                    {model.status === "loaded" && "Loaded"}
                    {model.status === "available" && "Available"}
                  </Badge>
                </div>

                {model.status !== "available" && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Memory Usage</span>
                        <span>{model.memory} GB</span>
                      </div>
                      <Progress value={model.memory / 0.08} className="h-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-xs">
                        <Cpu className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">Quantization:</span>
                        <span className="font-medium">{model.quantization}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <Memory className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">Max Tokens:</span>
                        <span className="font-medium">{model.maxTokens}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">Uptime:</span>
                        <span className="font-medium">{model.uptime}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">Temperature:</span>
                        <span className="font-medium">{model.temperature}</span>
                      </div>
                    </div>
                  </div>
                )}

                {model.status === "available" && (
                  <div className="flex items-center justify-center h-[80px] border rounded-md">
                    <Button size="sm">Load Model</Button>
                  </div>
                )}
              </div>

              <div className="hidden md:block border-l pl-4">
                <h4 className="text-xs font-medium mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  {model.status === "active" && (
                    <>
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        Unload Model
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        Restart Model
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        Change Parameters
                      </Button>
                    </>
                  )}

                  {model.status === "loaded" && (
                    <>
                      <Button variant="default" size="sm" className="w-full justify-start text-xs">
                        Activate Model
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        Unload Model
                      </Button>
                    </>
                  )}

                  {model.status === "available" && (
                    <Button variant="default" size="sm" className="w-full justify-start text-xs">
                      Load Model
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
