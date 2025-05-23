"use client"

import { Key, Lock, Construction } from "lucide-react"
import { motion } from "framer-motion"

export default function AccessApiKeyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          {/* Icon Group */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 mx-auto">
            <div className="absolute inset-0 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl rotate-6" />
            <div className="absolute inset-0 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl -rotate-3" />
            <div className="relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <Key className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Access API Key
          </h1>

          {/* Description */}
          <div className="space-y-4">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              This feature is temporarily unavailable.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              API key access is coming soon. Stay tuned!
            </p>
          </div>

          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/10 rounded-full">
            <Construction className="w-4 h-4 text-yellow-600 dark:text-yellow-500 animate-pulse" />
            <span className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
              Under Development
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 