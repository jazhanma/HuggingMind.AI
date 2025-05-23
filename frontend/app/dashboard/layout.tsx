import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { UIProvider } from "@/components/ui-provider"
import { DashboardHeader } from "@/components/dashboard/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UIProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <main className="container mx-auto py-6 px-4 md:px-6 max-w-[1440px]">{children}</main>
          </div>
        </div>
      </div>
    </UIProvider>
  )
}
