"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Palette,
  Settings,
  Zap,
  Cpu,
  Clock,
  MessageSquare,
  FileCode,
  Eye,
  PenToolIcon as Tool,
  HelpCircle,
  ExternalLink,
} from "lucide-react"

export default function DeployPage() {
  const [name, setName] = useState("My AI Assistant")
  const [description, setDescription] = useState("A helpful AI assistant powered by HuggingMind AI.")
  const [temperature, setTemperature] = useState(0.7)
  const [selectedModel, setSelectedModel] = useState("llama2-7b")

  // Model data
  const models = [
    {
      id: "llama2-7b",
      name: "LLaMA 2 7B Chat",
      description: "Meta's open-source chat model, good for general purpose use.",
      inferenceSpeed: "Medium",
      tokenLimit: "4,096 tokens",
      memoryRequirement: "~14 GB VRAM",
      capabilities: {
        code: true,
        vision: false,
        tools: true,
      },
      docsUrl: "https://huggingface.co/meta-llama/Llama-2-7b-chat-hf",
    },
    {
      id: "mistral-7b",
      name: "Mistral 7B",
      description: "High-performance model with strong reasoning capabilities.",
      inferenceSpeed: "Fast",
      tokenLimit: "8,192 tokens",
      memoryRequirement: "~14 GB VRAM",
      capabilities: {
        code: true,
        vision: false,
        tools: true,
      },
      docsUrl: "https://huggingface.co/mistralai/Mistral-7B-v0.1",
    },
    {
      id: "gemma-7b",
      name: "Gemma 7B",
      description: "Google's lightweight and efficient model.",
      inferenceSpeed: "Fast",
      tokenLimit: "8,192 tokens",
      memoryRequirement: "~14 GB VRAM",
      capabilities: {
        code: true,
        vision: false,
        tools: false,
      },
      docsUrl: "https://huggingface.co/google/gemma-7b",
    },
    {
      id: "phi-2",
      name: "Phi-2",
      description: "Microsoft's small but powerful model, excellent for code.",
      inferenceSpeed: "Very Fast",
      tokenLimit: "2,048 tokens",
      memoryRequirement: "~5 GB VRAM",
      capabilities: {
        code: true,
        vision: false,
        tools: false,
      },
      docsUrl: "https://huggingface.co/microsoft/phi-2",
    },
    {
      id: "tinyllama-3b",
      name: "TinyLlama 3B",
      description: "Extremely efficient model for resource-constrained environments.",
      inferenceSpeed: "Very Fast",
      tokenLimit: "2,048 tokens",
      memoryRequirement: "~6 GB VRAM",
      capabilities: {
        code: true,
        vision: false,
        tools: false,
      },
      docsUrl: "https://huggingface.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    },
    {
      id: "openchat-3.5",
      name: "OpenChat 3.5",
      description: "Open-source alternative to ChatGPT with strong performance.",
      inferenceSpeed: "Medium",
      tokenLimit: "4,096 tokens",
      memoryRequirement: "~14 GB VRAM",
      capabilities: {
        code: true,
        vision: false,
        tools: true,
      },
      docsUrl: "https://huggingface.co/openchat/openchat_3.5",
    },
    {
      id: "llava-7b",
      name: "LLaVA 7B",
      description: "Vision-language model that can understand images.",
      inferenceSpeed: "Medium",
      tokenLimit: "4,096 tokens",
      memoryRequirement: "~16 GB VRAM",
      capabilities: {
        code: true,
        vision: true,
        tools: false,
      },
      docsUrl: "https://huggingface.co/llava-hf/llava-1.5-7b-hf",
      comingSoon: true,
    },
  ]

  const selectedModelData = models.find((model) => model.id === selectedModel) || models[0]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Deploy Assistant</h1>
        <p className="text-muted-foreground">
          Create and deploy a customized AI assistant for your website or application.
        </p>
      </div>

      <div className="flex items-center justify-between bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <div className="flex items-start gap-2">
          <HelpCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800">Need help choosing a model?</h3>
            <p className="text-sm text-yellow-700">Compare specs and find the best model for your use case.</p>
          </div>
        </div>
        <Button variant="outline" className="border-yellow-300 text-yellow-800 hover:bg-yellow-100">
          Compare Models <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="code">
            <Code className="h-4 w-4 mr-2" />
            Integration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Assistant Settings</CardTitle>
              <CardDescription>Configure your AI assistant's behavior and capabilities.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Assistant Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="focus-visible:ring-yellow-400/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="resize-none focus-visible:ring-yellow-400/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger id="model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.id} value={model.id} disabled={model.comingSoon}>
                        {model.name} {model.comingSoon && "(Coming Soon)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-base">{selectedModelData.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedModelData.description}</p>
                      </div>
                      <Link href={selectedModelData.docsUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          Model Card <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{selectedModelData.memoryRequirement}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Speed: {selectedModelData.inferenceSpeed}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{selectedModelData.tokenLimit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">~2-3s response time</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedModelData.capabilities.code && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200"
                        >
                          <FileCode className="h-3 w-3" /> Code
                        </Badge>
                      )}
                      {selectedModelData.capabilities.vision && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-200"
                        >
                          <Eye className="h-3 w-3" /> Vision
                        </Badge>
                      )}
                      {selectedModelData.capabilities.tools && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200"
                        >
                          <Tool className="h-3 w-3" /> Tools
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="temperature">Temperature: {temperature}</Label>
                    <span className="text-sm text-muted-foreground">{temperature}</span>
                  </div>
                  <Slider
                    id="temperature"
                    min={0}
                    max={2}
                    step={0.1}
                    value={[temperature]}
                    onValueChange={(value) => setTemperature(value[0])}
                    className="[&>span:first-child]:bg-yellow-500"
                  />
                  <p className="text-sm text-muted-foreground">
                    Controls randomness: Lower values are more deterministic, higher values are more creative.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Capabilities</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="web-search">Web Search</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow the assistant to search the web for information.
                      </p>
                    </div>
                    <Switch id="web-search" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="file-access">File Access</Label>
                      <p className="text-sm text-muted-foreground">Allow the assistant to access and process files.</p>
                    </div>
                    <Switch id="file-access" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="code-execution">Code Execution</Label>
                      <p className="text-sm text-muted-foreground">Allow the assistant to execute code.</p>
                    </div>
                    <Switch id="code-execution" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how your AI assistant looks and feels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="light">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <Select defaultValue="yellow">
                  <SelectTrigger id="primary-color">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yellow">Yellow</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chat-position">Chat Position</Label>
                <Select defaultValue="bottom-right">
                  <SelectTrigger id="chat-position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="top-left">Top Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chat-width">Chat Width</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="chat-width">
                    <SelectValue placeholder="Select width" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (320px)</SelectItem>
                    <SelectItem value="medium">Medium (380px)</SelectItem>
                    <SelectItem value="large">Large (450px)</SelectItem>
                    <SelectItem value="full">Full Width</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-branding">Show HuggingMind Branding</Label>
                  <p className="text-sm text-muted-foreground">Display "Powered by HuggingMind AI" in the chat.</p>
                </div>
                <Switch id="show-branding" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Code</CardTitle>
              <CardDescription>Add this code to your website to integrate your AI assistant.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md bg-gray-950 p-4">
                  <pre className="text-sm text-gray-100 overflow-auto">
                    <code>{`<script>
  window.HuggingMindConfig = {
    assistantId: "asst_${Math.random().toString(36).substring(2, 10)}",
    name: "${name}",
    position: "bottom-right",
    theme: "light",
    primaryColor: "#facc15",
    model: "${selectedModel}"
  }
</script>
<script async src="https://cdn.huggingmind.ai/widget.js"></script>`}</code>
                  </pre>
                </div>

                <p className="text-sm text-muted-foreground">
                  Copy and paste this code into the{" "}
                  <code className="text-xs bg-gray-100 p-1 rounded">&lt;head&gt;</code> section of your HTML.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="allowed-domains">Allowed Domains</Label>
                  <Input
                    id="allowed-domains"
                    placeholder="example.com, app.example.com"
                    className="focus-visible:ring-yellow-400/50"
                  />
                  <p className="text-sm text-muted-foreground">
                    Comma-separated list of domains where this assistant can be embedded.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-black text-white hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(250,204,21,0.3)] transition-shadow">
                Deploy Assistant
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
