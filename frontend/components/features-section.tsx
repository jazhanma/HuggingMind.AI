import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, Clock } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            HuggingMind AI combines cutting-edge technology with user-friendly design to deliver an exceptional AI
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Fast Local Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Experience lightning-fast responses with our optimized local processing engine. No waiting for server
                roundtrips means instant interactions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Full Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Your conversations never leave your device. With no cloud processing, your data remains completely
                private and secure.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Real-Time Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Get answers as you type with our real-time response system. Experience conversations that flow naturally
                without delays.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
