"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Plus, Save, Play, Tag, X } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PromptBuilderPage() {
  const [promptName, setPromptName] = useState("My Custom Prompt")
  const [promptDescription, setPromptDescription] = useState("A helpful assistant that...")
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful, harmless, and honest AI assistant. You answer questions accurately and concisely.",
  )
  const [userPrompt, setUserPrompt] = useState("{{input}}")
  const [temperature, setTemperature] = useState(0.7)
  const [tags, setTags] = useState<string[]>(["General", "Assistant"])
  const [newTag, setNewTag] = useState("")
  const [savedPrompts, setSavedPrompts] = useState([
    {
      id: 1,
      name: "Customer Support Agent",
      description: "Helpful support agent for product inquiries",
      tags: ["Support", "Customer Service"],
    },
    {
      id: 2,
      name: "Technical Documentation Writer",
      description: "Creates clear technical documentation",
      tags: ["Technical", "Documentation"],
    },
  ])

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSavePrompt = () => {
    // In a real app, this would save to a database
    console.log("Saving prompt:", { promptName, promptDescription, systemPrompt, userPrompt, temperature, tags })
    // Add to saved prompts
    setSavedPrompts([
      ...savedPrompts,
      {
        id: savedPrompts.length + 1,
        name: promptName,
        description: promptDescription,
        tags,
      },
    ])
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Prompt Builder</h1>
        <p className="text-muted-foreground">Create and save custom prompts for your AI assistant.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Create New Prompt</CardTitle>
              <CardDescription>Design a custom prompt template for your specific use case.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt-name">Prompt Name</Label>
                  <Input
                    id="prompt-name"
                    value={promptName}
                    onChange={(e) => setPromptName(e.target.value)}
                    className="focus-visible:ring-yellow-400/50"
                  />
                </div>

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
                      <SelectItem value="claude-instant">Claude Instant</SelectItem>
                      <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt-description">Description</Label>
                <Textarea
                  id="prompt-description"
                  value={promptDescription}
                  onChange={(e) => setPromptDescription(e.target.value)}
                  rows={2}
                  className="resize-none focus-visible:ring-yellow-400/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="system-prompt">System Prompt</Label>
                <Textarea
                  id="system-prompt"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={4}
                  className="font-mono text-sm resize-none focus-visible:ring-yellow-400/50"
                />
                <p className="text-xs text-muted-foreground">
                  The system prompt sets the behavior and personality of the AI assistant.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-prompt">User Prompt Template</Label>
                <Textarea
                  id="user-prompt"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  rows={3}
                  className="font-mono text-sm resize-none focus-visible:ring-yellow-400/50"
                />
                <p className="text-xs text-muted-foreground">
                  Use <code className="bg-gray-100 px-1 rounded">{"{{input}}"}</code> as a placeholder for user input.
                </p>
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
                  <p className="text-xs text-muted-foreground">
                    Controls randomness: Lower values are more deterministic, higher values are more creative.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                      <Tag className="h-3 w-3" />
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="focus-visible:ring-yellow-400/50"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleAddTag}
                    disabled={!newTag || tags.includes(newTag)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public">Make Public</Label>
                  <p className="text-xs text-muted-foreground">Allow others to use this prompt template.</p>
                </div>
                <Switch id="public" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="gap-2">
                <Play className="h-4 w-4" />
                Test Prompt
              </Button>
              <Button className="gap-2 bg-black text-white hover:bg-gray-800" onClick={handleSavePrompt}>
                <Save className="h-4 w-4" />
                Save Prompt
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Saved Prompts</CardTitle>
              <CardDescription>Your custom prompt templates.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedPrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className="p-4 border rounded-lg hover:border-yellow-200 hover:bg-yellow-50/30 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{prompt.name}</h3>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{prompt.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {prompt.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  New Prompt
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tips</CardTitle>
              <CardDescription>How to write effective prompts.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Be specific about the task and desired output format.</span>
                </li>
                <li className="flex gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Provide examples of good responses when possible.</span>
                </li>
                <li className="flex gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Break complex tasks into smaller, clearer instructions.</span>
                </li>
                <li className="flex gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Use lower temperature (0.1-0.4) for factual, consistent outputs.</span>
                </li>
                <li className="flex gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Use higher temperature (0.7-1.0) for creative, varied responses.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
