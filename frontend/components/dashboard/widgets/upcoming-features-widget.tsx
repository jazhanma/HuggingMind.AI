"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThumbsUp } from "lucide-react"
import { useState } from "react"

// Sample data
const UPCOMING_FEATURES = [
  {
    id: 1,
    title: "Multi-modal Support",
    description: "Support for image and audio inputs alongside text",
    status: "in-progress",
    eta: "Q3 2023",
    votes: 245,
    category: "core",
  },
  {
    id: 2,
    title: "Custom Fine-tuning UI",
    description: "User interface for fine-tuning models on your own data",
    status: "planned",
    eta: "Q4 2023",
    votes: 189,
    category: "core",
  },
  {
    id: 3,
    title: "Advanced Prompt Templates",
    description: "Create and share advanced prompt templates with variables",
    status: "in-progress",
    eta: "Q3 2023",
    votes: 156,
    category: "tools",
  },
  {
    id: 4,
    title: "Team Collaboration",
    description: "Collaborate with team members on projects and share resources",
    status: "planned",
    eta: "Q4 2023",
    votes: 132,
    category: "tools",
  },
  {
    id: 5,
    title: "API Rate Limiting Controls",
    description: "Set custom rate limits for API usage and monitoring",
    status: "under-review",
    eta: "Q1 2024",
    votes: 98,
    category: "api",
  },
]

export function UpcomingFeaturesWidget() {
  const [features, setFeatures] = useState(UPCOMING_FEATURES)
  const [activeTab, setActiveTab] = useState("all")

  const filteredFeatures = features.filter((feature) => activeTab === "all" || feature.category === activeTab)

  const voteForFeature = (id: number) => {
    setFeatures(features.map((feature) => (feature.id === id ? { ...feature, votes: feature.votes + 1 } : feature)))
  }

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="core">Core</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="flex-1 mt-4">
          <ScrollArea className="h-[calc(100%-40px)] pr-4">
            <div className="space-y-4">
              {filteredFeatures.map((feature) => (
                <div key={feature.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    <Badge
                      variant="outline"
                      className={
                        feature.status === "in-progress"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          : feature.status === "planned"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-purple-100 text-purple-800 hover:bg-purple-100"
                      }
                    >
                      {feature.status === "in-progress" && "In Progress"}
                      {feature.status === "planned" && "Planned"}
                      {feature.status === "under-review" && "Under Review"}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-700">{feature.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">Expected: {feature.eta}</div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 gap-1 text-xs"
                      onClick={() => voteForFeature(feature.id)}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>{feature.votes}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="mt-4 pt-2 border-t">
        <Button variant="outline" size="sm" className="w-full">
          Suggest Feature
        </Button>
      </div>
    </div>
  )
}
