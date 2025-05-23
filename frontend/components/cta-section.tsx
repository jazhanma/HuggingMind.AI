"use client"

import { Button } from "@/components/ui/button"

export function CtaSection() {
  const scrollToChat = () => {
    const chatElement = document.getElementById("chat")
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Ready to Experience the Future?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who are already enjoying faster, more private, and more intelligent AI conversations
            with HuggingMind AI.
          </p>
          <div className="pt-4">
            <Button size="lg" onClick={scrollToChat}>
              Try Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
