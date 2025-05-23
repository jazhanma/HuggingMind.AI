"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2048)
  const [systemPrompt, setSystemPrompt] = useState(
    "You are HuggingMind AI, a helpful, harmless, and honest AI assistant.",
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure your HuggingMind AI experience.</p>
      </div>

      <Tabs defaultValue="model" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="model">Model</TabsTrigger>
          <TabsTrigger value="prompts">Prompts</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="model" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Model Settings</CardTitle>
              <CardDescription>Configure which model to use and its parameters.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select defaultValue="llama2-7b">
                  <SelectTrigger id="model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="llama2-7b">LLaMA 2 7B Chat</SelectItem>
                    <SelectItem value="llama2-13b">LLaMA 2 13B Chat</SelectItem>
                    <SelectItem value="mistral-7b">Mistral 7B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantization">Quantization</Label>
                <Select defaultValue="q4_k_m">
                  <SelectTrigger id="quantization">
                    <SelectValue placeholder="Select quantization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="q4_k_m">Q4_K_M (4-bit)</SelectItem>
                    <SelectItem value="q5_k_m">Q5_K_M (5-bit)</SelectItem>
                    <SelectItem value="q8_0">Q8_0 (8-bit)</SelectItem>
                    <SelectItem value="f16">F16 (16-bit)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="max-tokens">Max Tokens: {maxTokens}</Label>
                    <span className="text-sm text-muted-foreground">{maxTokens}</span>
                  </div>
                  <Slider
                    id="max-tokens"
                    min={256}
                    max={4096}
                    step={256}
                    value={[maxTokens]}
                    onValueChange={(value) => setMaxTokens(value[0])}
                    className="[&>span:first-child]:bg-yellow-500"
                  />
                  <p className="text-sm text-muted-foreground">Maximum number of tokens to generate in the response.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-black text-white hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(250,204,21,0.3)] transition-shadow">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="prompts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Prompts</CardTitle>
              <CardDescription>Configure the system prompts that define how the AI behaves.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="system-prompt">Default System Prompt</Label>
                <Textarea
                  id="system-prompt"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={6}
                  className="resize-none focus-visible:ring-yellow-400/50"
                />
                <p className="text-sm text-muted-foreground">
                  This prompt sets the behavior and personality of the AI assistant.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Preset Prompts</h3>
                <div className="grid gap-2">
                  <Button
                    variant="outline"
                    className="justify-start text-left hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-200"
                  >
                    Helpful Assistant
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start text-left hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-200"
                  >
                    Code Expert
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start text-left hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-200"
                  >
                    Creative Writer
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-black text-white hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(250,204,21,0.3)] transition-shadow">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced settings for HuggingMind AI.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="streaming">Streaming Responses</Label>
                  <p className="text-sm text-muted-foreground">Show responses as they are generated.</p>
                </div>
                <Switch id="streaming" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="history">Save Chat History</Label>
                  <p className="text-sm text-muted-foreground">Save your chat history for future reference.</p>
                </div>
                <Switch id="history" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="gpu">Use GPU Acceleration</Label>
                  <p className="text-sm text-muted-foreground">Use GPU for faster inference if available.</p>
                </div>
                <Switch id="gpu" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="context-window">Context Window Size</Label>
                <Input
                  id="context-window"
                  type="number"
                  defaultValue={4096}
                  className="focus-visible:ring-yellow-400/50"
                />
                <p className="text-sm text-muted-foreground">Maximum number of tokens to use for context.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-black text-white hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(250,204,21,0.3)] transition-shadow">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
