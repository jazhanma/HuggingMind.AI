import { ChatInterface } from "@/components/dashboard/chat-interface"

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Chat</h1>
        <p className="text-muted-foreground">Have a conversation with HuggingMind AI.</p>
      </div>

      <ChatInterface />
    </div>
  )
}
