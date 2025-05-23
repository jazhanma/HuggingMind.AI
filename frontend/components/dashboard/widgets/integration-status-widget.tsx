"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"

// Sample data
const INTEGRATIONS = [
  {
    id: "notion",
    name: "Notion",
    status: "connected",
    lastSync: "10 minutes ago",
    icon: "/images/notion-logo.png",
  },
  {
    id: "slack",
    name: "Slack",
    status: "connected",
    lastSync: "25 minutes ago",
    icon: "/images/slack-logo.png",
  },
  {
    id: "discord",
    name: "Discord",
    status: "error",
    lastSync: "1 hour ago",
    icon: "/images/discord-logo.png",
    error: "Authentication token expired",
  },
  {
    id: "google-docs",
    name: "Google Docs",
    status: "connected",
    lastSync: "2 hours ago",
    icon: "/images/google-docs-logo.png",
  },
  {
    id: "github",
    name: "GitHub",
    status: "pending",
    lastSync: "Never",
    icon: "/images/github-logo.png",
  },
  {
    id: "zapier",
    name: "Zapier",
    status: "disconnected",
    lastSync: "Never",
    icon: "/images/zapier-logo.png",
  },
  {
    id: "wordpress",
    name: "WordPress",
    status: "disconnected",
    lastSync: "Never",
    icon: "/images/wordpress-logo.png",
  },
  {
    id: "make",
    name: "Make",
    status: "disconnected",
    lastSync: "Never",
    icon: "/images/make-logo.png",
  },
]

export function IntegrationStatusWidget() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredIntegrations = INTEGRATIONS.filter((integration) => {
    if (activeTab === "all") return true
    if (activeTab === "connected" && integration.status === "connected") return true
    if (activeTab === "issues" && (integration.status === "error" || integration.status === "pending")) return true
    if (activeTab === "disconnected" && integration.status === "disconnected") return true
    return false
  })

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="disconnected">Disconnected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="flex-1 mt-4">
          <ScrollArea className="h-[calc(100%-40px)] pr-4">
            <div className="space-y-3">
              {filteredIntegrations.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between border rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md overflow-hidden flex items-center justify-center bg-gray-100">
                      <img
                        src={integration.icon || "/placeholder.svg"}
                        alt={integration.name}
                        className="h-6 w-6 object-contain"
                      />
                    </div>

                    <div>
                      <h4 className="text-sm font-medium">{integration.name}</h4>
                      <p className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        integration.status === "connected"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1"
                          : integration.status === "error"
                            ? "bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1"
                            : integration.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 flex items-center gap-1"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100 flex items-center gap-1"
                      }
                    >
                      {integration.status === "connected" && <CheckCircle2 className="h-3 w-3" />}
                      {integration.status === "error" && <XCircle className="h-3 w-3" />}
                      {integration.status === "pending" && <AlertCircle className="h-3 w-3" />}
                      <span className="ml-1">
                        {integration.status === "connected" && "Connected"}
                        {integration.status === "error" && "Error"}
                        {integration.status === "pending" && "Pending"}
                        {integration.status === "disconnected" && "Disconnected"}
                      </span>
                    </Badge>

                    {integration.status === "connected" && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Sync
                      </Button>
                    )}

                    {integration.status === "error" && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Fix
                      </Button>
                    )}

                    {integration.status === "pending" && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Complete
                      </Button>
                    )}

                    {integration.status === "disconnected" && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="mt-4 pt-2 border-t">
        <Button variant="outline" size="sm" className="w-full">
          Manage Integrations
        </Button>
      </div>
    </div>
  )
}
