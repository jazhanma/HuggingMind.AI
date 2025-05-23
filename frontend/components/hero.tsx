"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Hero() {
  const [showChat, setShowChat] = useState(false)

  const scrollToChat = () => {
    setShowChat(true)
    const chatElement = document.getElementById("chat-section")
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-24 md:py-32 lg:py-40 container text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Experience the Future of AI Conversations
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          HuggingMind AI delivers intelligent, context-aware responses for natural and meaningful interactions.
        </p>
        <div className="pt-6">
          <Button size="lg" onClick={scrollToChat}>
            Chat Now
          </Button>
        </div>
      </div>
    </section>
  )
}
