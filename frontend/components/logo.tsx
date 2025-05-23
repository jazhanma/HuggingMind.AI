import { Brain } from "lucide-react"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Brain
          className={`${className || "h-6 w-6"}`}
          style={{
            color: "#000",
            fill: "rgba(250, 204, 21, 0.9)",
            stroke: "#000",
            strokeWidth: "1.75px",
          }}
        />
        <div className="absolute inset-0 bg-yellow-400/50 blur-sm rounded-full -z-10"></div>
      </div>
      <span className="font-semibold text-xl">HuggingMind AI</span>
    </div>
  )
}
