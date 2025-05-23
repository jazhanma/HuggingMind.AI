"use client"

import { useState } from "react"
import { Bell, Moon, Sun, User, SettingsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { NotificationsDropdown } from "@/components/dashboard/notifications-dropdown"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const { setTheme, theme } = useTheme()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md transition-colors duration-200">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-yellow-500 dark:bg-yellow-600 text-white">
                  3
                </Badge>
              </Button>
              <NotificationsDropdown open={notificationsOpen} onOpenChange={setNotificationsOpen} />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Avatar className="h-9 w-9 ring-2 ring-gray-100 dark:ring-gray-800">
                    <AvatarImage 
                      src="/images/guest-avatar.jpg" 
                      alt="Guest User"
                      className="object-cover object-center"
                      loading="eager"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white dark:from-yellow-600 dark:to-yellow-800">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block font-medium text-gray-900 dark:text-gray-100">Guest User</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-start gap-3 p-3">
                  <Avatar className="h-12 w-12 ring-2 ring-gray-100 dark:ring-gray-800">
                    <AvatarImage 
                      src="/images/guest-avatar.jpg" 
                      alt="Guest User"
                      className="object-cover object-center"
                      loading="eager"
                    />
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">Guest User</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">guest@example.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                  <span>Toggle {theme === "dark" ? "Light" : "Dark"} Mode</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
