import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ChatUI } from "@/components/chat-ui"
import { Footer } from "@/components/footer"
import { UIProvider } from "@/components/ui-provider"

export default function Home() {
  return (
    <UIProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main>
          <HeroSection />
          <ChatUI />
        </main>
        <Footer />
      </div>
    </UIProvider>
  )
}
