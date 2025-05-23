"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Clock, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function SavedSessions() {
  const router = useRouter()

  // Sample saved sessions
  const savedSessions = [
    {
      id: "session-1",
      title: "Quantum Computing Explanation",
      preview: "How does quantum computing work?",
      timestamp: "May 15, 2023 • 2:32 PM",
      messages: 8,
    },
    {
      id: "session-2",
      title: "React Best Practices",
      preview: "What are the best practices for React?",
      timestamp: "May 15, 2023 • 11:05 AM",
      messages: 12,
    },
    {
      id: "session-3",
      title: "AI History Summary",
      preview: "Summarize the history of artificial intelligence",
      timestamp: "May 14, 2023 • 7:45 PM",
      messages: 5,
    },
  ]

  const loadSession = (sessionId: string) => {
    // In a real app, this would load the session data
    console.log("Loading session:", sessionId)
    router.push("/dashboard/chat")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Sessions</CardTitle>
        <CardDescription>Continue your previous conversations with HuggingMind AI.</CardDescription>
      </CardHeader>
      <CardContent>
        {savedSessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-yellow-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No saved sessions</h3>
            <p className="text-gray-500 max-w-md">
              Start chatting with HuggingMind AI and save your conversations for future reference.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-start justify-between p-4 rounded-lg border border-gray-100 hover:border-yellow-200 hover:bg-yellow-50/30 transition-colors cursor-pointer"
                onClick={() => loadSession(session.id)}
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{session.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{session.preview}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{session.timestamp}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs bg-gray-100 px-2 py-1 rounded-full">{session.messages} messages</div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-4">
              <Button variant="outline" className="text-sm">
                View All Sessions
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
