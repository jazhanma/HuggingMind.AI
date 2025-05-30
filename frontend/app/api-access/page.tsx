"use client"

import { Code2 } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function ApiAccessPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            API Access
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Access HuggingMind AI programmatically through our REST API.
          </p>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">API Keys</h2>
            <Button variant="outline" className="cursor-not-allowed opacity-50" disabled>
              Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 