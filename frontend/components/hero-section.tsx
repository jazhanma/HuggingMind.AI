"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import "@/styles/animations.css"

export function HeroSection() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push("/dashboard")
  }

  return (
    <section className="min-h-[85vh] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="container mx-auto px-4 text-center relative">
        <div className="max-w-[1440px] mx-auto space-y-10">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 relative">
              <span className="inline-block animate-fade-in opacity-0 [animation-delay:200ms]">More than chat.</span>{" "}
              <span className="relative inline-block animate-fade-in opacity-0 [animation-delay:400ms]">
                It's your AI infrastructure.
                <span className="absolute -z-10 bottom-0 left-0 w-full h-3 bg-yellow-200/50 rounded-full transform origin-left animate-scale-x"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto animate-fade-in opacity-0 [animation-delay:600ms] leading-relaxed">
              HuggingMind AI powers intelligent tools, assistants, automation, and seamless integrations — all in one platform.
            </p>
          </div>
          <div className="pt-8 animate-fade-in opacity-0 [animation-delay:800ms]">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-black text-white hover:bg-gray-800 relative overflow-hidden group px-8 py-6 text-lg"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-20 transition-all duration-500"></span>
              <span className="absolute -inset-3 -z-10 bg-yellow-400/20 scale-0 rounded-full group-hover:scale-100 transition-transform duration-500"></span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
