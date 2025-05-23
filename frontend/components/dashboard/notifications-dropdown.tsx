import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react"

interface NotificationsDropdownProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationsDropdown({ open, onOpenChange }: NotificationsDropdownProps) {
  const notifications = [
    {
      id: 1,
      title: "Model Updated",
      description: "LLaMA 2 7B Chat model has been updated to the latest version.",
      timestamp: "10 minutes ago",
      type: "info",
    },
    {
      id: 2,
      title: "High Memory Usage Detected",
      description: "Your system is experiencing high memory usage (85%).",
      timestamp: "1 hour ago",
      type: "warning",
    },
    {
      id: 3,
      title: "Weekly Report Generated",
      description: "Your weekly usage report is now available.",
      timestamp: "5 hours ago",
      type: "success",
    },
  ]

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <div className="h-0 w-0 overflow-hidden"></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80" sideOffset={30}>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
            Mark all as read
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
            <div className="flex w-full gap-2">
              <div className="mt-0.5">
                {notification.type === "warning" && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                {notification.type === "info" && <RefreshCw className="h-5 w-5 text-blue-500" />}
                {notification.type === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between w-full">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                </div>
                <p className="text-xs text-muted-foreground">{notification.description}</p>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-sm text-muted-foreground">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
