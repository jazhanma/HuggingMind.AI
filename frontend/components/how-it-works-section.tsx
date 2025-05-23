import { ArrowRight, Download, MessageSquare, Sparkles } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting started with HuggingMind AI is simple and straightforward. Follow these steps to begin your AI
            conversation journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Download className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Load Model</h3>
              <p className="text-muted-foreground">
                Our optimized AI model loads quickly and efficiently on your device.
              </p>
            </div>

            {/* Connector 1 */}
            <div className="hidden md:block absolute left-1/3 top-8 w-1/3 h-0.5 bg-primary/20">
              <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 text-primary" />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Chatting</h3>
              <p className="text-muted-foreground">Ask questions, get creative, or have a conversation with our AI.</p>
            </div>

            {/* Connector 2 */}
            <div className="hidden md:block absolute left-2/3 top-8 w-1/3 h-0.5 bg-primary/20">
              <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 text-primary" />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Instant Replies</h3>
              <p className="text-muted-foreground">Receive intelligent, contextual responses in real-time.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
