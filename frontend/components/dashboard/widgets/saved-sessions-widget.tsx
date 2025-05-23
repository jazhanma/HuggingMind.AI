"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Star, Clock, MessageSquare, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample saved sessions data
const SAVED_SESSIONS = [
  {
    id: 1,
    title: "Quantum Computing Basics",
    preview: "A discussion about quantum computing fundamentals and applications",
    date: "May 15, 2023",
    starred: true,
    messages: 24,
  },
  {
    id: 2,
    title: "Machine Learning Project Plan",
    preview: "Planning session for implementing a recommendation system",
    date: "May 12, 2023",
    starred: true,
    messages: 18,
  },
  {
    id: 3,
    title: "React Component Architecture",
    preview: "Best practices for structuring React applications",
    date: "May 10, 2023",
    starred: false,
    messages: 32,
  },
  {
    id: 4,
    title: "Database Optimization Strategies",
    preview: "Techniques for improving database performance",
    date: "May 8, 2023",
    starred: false,
    messages: 15,
  },
  {
    id: 5,
    title: "AI Ethics Discussion",
    preview: "Exploring ethical considerations in artificial intelligence",
    date: "May 5, 2023",
    starred: false,
    messages: 27,
  },
]

export function SavedSessionsWidget() {
  const [filter, setFilter] = useState("")
  const [sessions, setSessions] = useState(SAVED_SESSIONS)

  const filteredSessions = sessions.filter((session) => {
    if (!filter) return true
    return (
      session.title.toLowerCase().includes(filter.toLowerCase()) ||
      session.preview.toLowerCase().includes(filter.toLowerCase())
    )
  })

  const toggleStar = (id: number) => {
    setSessions(sessions.map((session) => (session.id === id ? { ...session, starred: !session.starred } : session)))
  }

  return (
    <div className="h-full flex flex-col">
      <div className="relative mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="search"
          placeholder="Search saved sessions..."
          className="w-full rounded-md border border-input bg-white pl-8 pr-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <div key={session.id} className="flex items-start gap-3 border-b pb-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Session" />
                <AvatarFallback>{session.title.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{session.title}</p>
                    {session.starred && <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toggleStar(session.id)}>
                        {session.starred ? "Remove Star" : "Star Session"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-sm text-gray-700 line-clamp-2">{session.preview}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{session.date}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{session.messages} messages</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-4 pt-2 border-t">
        <Button variant="outline" size="sm" className="w-full">
          View All Sessions
        </Button>
      </div>
    </div>
  )
}
