"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { WidgetGrid } from "@/components/dashboard/widgets/widget-grid"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to HuggingMind AI
          </h1>
          <p className="text-muted-foreground">Here's your customizable dashboard</p>
        </div>
        <Link href="/dashboard/deploy">
          <Button className="bg-black text-white hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(250,204,21,0.3)] transition-shadow">
            Deploy Assistant
          </Button>
        </Link>
      </div>

      <WidgetGrid />
    </div>
  )
}
