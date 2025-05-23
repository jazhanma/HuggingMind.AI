import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react"

interface SummaryCardProps {
  title: string
  icon: React.ReactNode
  value: string
  description: string
  trend?: {
    value: string
    label: string
    type: "increase" | "decrease" | "neutral"
  }
}

export function SummaryCard({ title, icon, value, description, trend }: SummaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="mt-2 flex items-center gap-1 text-xs">
            {trend.type === "increase" && <ArrowUp className="h-3 w-3 text-green-500" />}
            {trend.type === "decrease" && <ArrowDown className="h-3 w-3 text-red-500" />}
            {trend.type === "neutral" && <ArrowRight className="h-3 w-3 text-gray-500" />}
            <span
              className={
                trend.type === "increase"
                  ? "text-green-500"
                  : trend.type === "decrease"
                    ? "text-red-500"
                    : "text-gray-500"
              }
            >
              {trend.value}
            </span>
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
