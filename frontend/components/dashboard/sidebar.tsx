"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import {
  LayoutDashboard,
  MessageSquare,
  Upload,
  Clock,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Code,
  Sparkles,
  Layers,
  PuzzleIcon as PuzzlePiece,
  Zap,
} from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Chat",
      icon: MessageSquare,
      href: "/dashboard/chat",
      active: pathname === "/dashboard/chat",
    },
    {
      label: "Prompt Builder",
      icon: Sparkles,
      href: "/dashboard/prompt-builder",
      active: pathname === "/dashboard/prompt-builder",
    },
    {
      label: "Templates",
      icon: Layers,
      href: "/dashboard/templates",
      active: pathname === "/dashboard/templates",
    },
    {
      label: "Deploy",
      icon: Zap,
      href: "/dashboard/deploy",
      active: pathname === "/dashboard/deploy",
    },
    {
      label: "API Access",
      icon: Code,
      href: "/dashboard/api",
      active: pathname === "/dashboard/api",
    },
    {
      label: "Integrations",
      icon: PuzzlePiece,
      href: "/dashboard/integrations",
      active: pathname === "/dashboard/integrations",
    },
    {
      label: "Upload Center",
      icon: Upload,
      href: "/dashboard/upload",
      active: pathname === "/dashboard/upload",
    },
    {
      label: "Logs & History",
      icon: Clock,
      href: "/dashboard/logs",
      active: pathname === "/dashboard/logs",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <div
      className={cn(
        "relative h-screen border-r bg-white transition-all duration-300 flex flex-col sticky top-0",
        collapsed ? "w-[70px]" : "w-[240px]",
      )}
    >
      <div className="flex h-14 items-center border-b px-3 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          {!collapsed && <Logo className="h-6 w-6" />}
          {collapsed && <Logo className="h-6 w-6 mx-auto" />}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-3 h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                route.active ? "bg-black text-white" : "text-gray-500 hover:text-yellow-500 hover:bg-gray-100",
              )}
            >
              <route.icon className={cn("h-5 w-5", route.active ? "text-yellow-400" : "")} />
              {!collapsed && <span>{route.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-2">
        <div className="px-3 py-2">
          {!collapsed && (
            <div className="mb-2 px-1">
              <p className="text-xs font-medium text-gray-500">MODEL STATUS</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <p className="text-xs">LLaMA 2 7B Chat (Loaded)</p>
              </div>
            </div>
          )}
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-yellow-500 hover:bg-gray-100",
              collapsed && "justify-center",
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Exit to Home</span>}
          </Link>
        </div>
      </div>
    </div>
  )
}
