"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

// Sample activity data
const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: "chat",
    query: "How does quantum computing work?",
    timestamp: "10 minutes ago",
    status: "completed",
  },
  {
    id: 2,
    type: "chat",
    query: "Explain the theory of relativity",
    timestamp: "25 minutes ago",
    status: "completed",
  },
  {
    id: 3,
    type: "upload",
    filename: "research-paper.pdf",
    timestamp: "1 hour ago",
    status: "completed",
  },
  {
    id: 4,
    type: "integration",
    service: "Notion",
    action: "connected",
    timestamp: "2 hours ago",
    status: "completed",
  },
  {
    id: 5,
    type: "chat",
    query: "What are the best practices for React?",
    timestamp: "3 hours ago",
    status: "completed",
  },
  {
    id: 6,
    type: "model",
    model: "LLaMA 2 13B",
    action: "loaded",
    timestamp: "4 hours ago",
    status: "completed",
  },
  {
    id: 7,
    type: "chat",
    query: "How to implement a binary search tree?",
    timestamp: "5 hours ago",
    status: "completed",
  },
]

export function RecentActivityWidget() {
  const [filter, setFilter] = useState("")

  const filteredActivities = RECENT_ACTIVITIES.filter((activity) => {
    if (!filter) return true

    if (activity.type === "chat" && activity.query.toLowerCase().includes(filter.toLowerCase())) {
      return true
    }

    if (activity.type === "upload" && activity.filename.toLowerCase().includes(filter.toLowerCase())) {
      return true
    }

    if (activity.type === "integration" && activity.service.toLowerCase().includes(filter.toLowerCase())) {
      return true
    }

    if (activity.type === "model" && activity.model.toLowerCase().includes(filter.toLowerCase())) {
      return true
    }

    return false
  })

  return (
    <div className="h-full flex flex-col">
      <div className="relative mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="search"
          placeholder="Search activities..."
          className="w-full rounded-md border border-input bg-white pl-8 pr-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 border-b pb-3">
              <Avatar className="h-8 w-8">
                {activity.type === "chat" && <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Chat" />}
                {activity.type === "upload" && <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Upload" />}
                {activity.type === "integration" && (
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Integration" />
                )}
                {activity.type === "model" && <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Model" />}
                <AvatarFallback>
                  {activity.type === "chat" && "💬"}
                  {activity.type === "upload" && "📄"}
                  {activity.type === "integration" && "🔌"}
                  {activity.type === "model" && "🧠"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    {activity.type === "chat" && "Chat Query"}
                    {activity.type === "upload" && "File Upload"}
                    {activity.type === "integration" && "Integration"}
                    {activity.type === "model" && "Model Change"}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {activity.timestamp}
                  </Badge>
                </div>

                <p className="text-sm text-gray-700 line-clamp-2">
                  {activity.type === "chat" && activity.query}
                  {activity.type === "upload" && `Uploaded ${activity.filename}`}
                  {activity.type === "integration" && `${activity.service} ${activity.action}`}
                  {activity.type === "model" && `${activity.model} ${activity.action}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-4 pt-2 border-t">
        <Button variant="outline" size="sm" className="w-full">
          View All Activity
        </Button>
      </div>
    </div>
  )
}
