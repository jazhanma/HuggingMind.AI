"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Clock, AlertCircle, ThumbsUp, Send, ExternalLink } from "lucide-react"

export default function IntegrationsPage() {
  const [upvotes, setUpvotes] = useState({
    slack: 124,
    notion: 98,
    "google-docs": 76,
    discord: 112,
    zapier: 65,
    github: 87,
    wordpress: 54,
    make: 43,
  })

  const [upvoted, setUpvoted] = useState<Record<string, boolean>>({})
  const [newIntegration, setNewIntegration] = useState("")

  const handleUpvote = (id: string) => {
    if (!upvoted[id]) {
      setUpvotes((prev) => ({
        ...prev,
        [id]: prev[id] + 1,
      }))
      setUpvoted((prev) => ({
        ...prev,
        [id]: true,
      }))
    } else {
      setUpvotes((prev) => ({
        ...prev,
        [id]: prev[id] - 1,
      }))
      setUpvoted((prev) => ({
        ...prev,
        [id]: false,
      }))
    }
  }

  const integrations = [
    {
      id: "slack",
      name: "Slack",
      description: "Add HuggingMind AI to your Slack workspace for instant AI assistance.",
      icon: "/images/slack-logo.png",
      category: "communication",
      authUrl: "https://slack.com/oauth/v2/authorize",
      releaseDate: "Available now",
    },
    {
      id: "notion",
      name: "Notion",
      description: "Integrate with Notion to enhance your documents with AI capabilities.",
      icon: "/images/notion-logo.png",
      category: "productivity",
      authUrl: "https://api.notion.com/v1/oauth/authorize",
      releaseDate: "Available now",
    },
    {
      id: "google-docs",
      name: "Google Docs",
      description: "Use HuggingMind AI directly within your Google Docs.",
      icon: "/images/google-docs-logo.png",
      category: "productivity",
      authUrl: "https://accounts.google.com/signin",
      releaseDate: "Available now",
    },
    {
      id: "discord",
      name: "Discord",
      description: "Add a HuggingMind AI bot to your Discord server.",
      icon: "/images/discord-logo.png",
      category: "communication",
      authUrl: "https://discord.com/oauth2/authorize",
      releaseDate: "Available now",
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Connect HuggingMind AI to thousands of apps via Zapier.",
      icon: "/images/zapier-logo.png",
      category: "automation",
      authUrl: "https://zapier.com/dashboard/auth/oauth/return/App123CLIAPI/",
      releaseDate: "Available now",
    },
    {
      id: "github",
      name: "GitHub",
      description: "Enhance your development workflow with AI-powered code assistance.",
      icon: "/images/github-logo.png",
      category: "development",
      authUrl: "https://github.com/login/oauth/authorize",
      releaseDate: "Available now",
    },
    {
      id: "wordpress",
      name: "WordPress",
      description: "Add AI capabilities to your WordPress site.",
      icon: "/images/wordpress-logo.png",
      category: "web",
      authUrl: "https://wordpress.com/log-in",
      releaseDate: "Available now",
    },
    {
      id: "make",
      name: "Make (Integromat)",
      description: "Create complex automation workflows with HuggingMind AI.",
      icon: "/images/make-logo.png",
      category: "automation",
      authUrl: "https://www.make.com/en/login",
      releaseDate: "Available now",
    },
  ]

  const categories = [
    { id: "all", name: "All Integrations" },
    { id: "communication", name: "Communication" },
    { id: "productivity", name: "Productivity" },
    { id: "automation", name: "Automation" },
    { id: "development", name: "Development" },
    { id: "web", name: "Web" },
  ]

  const filteredIntegrations = (category: string) => {
    return integrations.filter((integration) => (category === "all" ? true : integration.category === category))
  }

  const handleSubmitSuggestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (newIntegration.trim()) {
      alert(`Thank you for suggesting "${newIntegration}"! We'll consider it for future development.`)
      setNewIntegration("")
    }
  }

  // Function to test and open URLs
  const handleConnect = (url: string) => {
    // In a real app, you might want to log this connection attempt
    console.log(`Connecting to: ${url}`)
    // Open the URL in a new tab
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">Connect HuggingMind AI with your favorite tools and services.</p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">All Integrations Available</h3>
            <div className="mt-1 text-sm text-blue-700">
              <p>Connect HuggingMind AI with your favorite platforms. Click the Connect button to get started.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border">
        <form onSubmit={handleSubmitSuggestion} className="flex gap-2">
          <Input
            placeholder="Suggest a new integration..."
            value={newIntegration}
            onChange={(e) => setNewIntegration(e.target.value)}
            className="focus-visible:ring-yellow-400/50"
          />
          <Button type="submit" className="bg-black text-white hover:bg-gray-800">
            <Send className="h-4 w-4 mr-2" />
            Submit
          </Button>
        </form>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start overflow-auto py-1 h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex-shrink-0">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations(category.id).map((integration) => (
                <Card key={integration.id} className="overflow-hidden flex flex-col">
                  <div className="relative bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center h-40 border-b">
                    <img
                      src={integration.icon || "/placeholder.svg"}
                      alt={integration.name}
                      className="w-20 h-20 object-contain"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="bg-green-500/90 text-white border-0">
                        Available
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div>
                      <CardTitle className="flex items-center gap-2">{integration.name}</CardTitle>
                      <CardDescription>{integration.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                      <Clock className="h-3 w-3" />
                      <span>{integration.releaseDate}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpvote(integration.id)}
                      className={upvoted[integration.id] ? "bg-yellow-50 border-yellow-200 text-yellow-700" : ""}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Upvote ({upvotes[integration.id as keyof typeof upvotes]})
                    </Button>
                    <Button
                      className="bg-black text-white hover:bg-gray-800"
                      size="sm"
                      onClick={() => handleConnect(integration.authUrl)}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
