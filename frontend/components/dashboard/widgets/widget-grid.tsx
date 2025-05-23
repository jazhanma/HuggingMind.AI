"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  PlusCircle,
  Settings,
  X,
  Maximize2,
  Minimize2,
  MoveHorizontal,
  MessageSquare,
  FileText,
  LayoutGrid,
  Cpu,
  Clock,
  Activity,
  BarChart3,
  History,
  Brain,
  Heart,
  MessageCircle,
  FileEdit,
  Rocket,
  Plug,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { UsageAnalytics } from "@/components/dashboard/usage-analytics"
import { ModelStatusCard } from "@/components/dashboard/model-status-card"
import { SavedSessions } from "@/components/dashboard/saved-sessions"
import { SummaryCard } from "@/components/dashboard/summary-card"

// Widget components
function UsageAnalyticsWidget() {
  return <UsageAnalytics />
}

function ModelStatusWidget() {
  return <ModelStatusCard />
}

function SavedSessionsWidget() {
  return <SavedSessions />
}

function RecentActivityWidget() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recent Activity</h3>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-3 border-b pb-3">
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">Chat Session #{i}</p>
              <p className="text-sm text-muted-foreground">
                {i * 2} messages • {30 - i * 5} minutes ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SystemHealthWidget() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">System Health</h3>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <span>CPU Usage</span>
          <span className="font-medium">32%</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div className="bg-green-500 h-full rounded-full" style={{ width: "32%" }}></div>
        </div>

        <div className="flex items-center justify-between">
          <span>Memory Usage</span>
          <span className="font-medium">64%</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div className="bg-yellow-500 h-full rounded-full" style={{ width: "64%" }}></div>
        </div>

        <div className="flex items-center justify-between">
          <span>API Response Time</span>
          <span className="font-medium">120ms</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div className="bg-green-500 h-full rounded-full" style={{ width: "20%" }}></div>
        </div>
      </div>
    </div>
  )
}

function CustomReportWidget() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Custom Report</h3>
      <div className="flex flex-col items-center justify-center h-[200px] border-2 border-dashed rounded-lg">
        <FileText className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No custom reports configured</p>
        <Button variant="outline" size="sm" className="mt-4">
          Create Report
        </Button>
      </div>
    </div>
  )
}

function UpcomingFeaturesWidget() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Upcoming Features</h3>
      <div className="space-y-3">
        {[
          { title: "Advanced Analytics", date: "June 2025", status: "In Development" },
          { title: "Team Collaboration", date: "July 2025", status: "Planning" },
          { title: "Custom Workflows", date: "August 2025", status: "Research" },
        ].map((feature, i) => (
          <div key={i} className="flex items-start justify-between border-b pb-3">
            <div>
              <p className="font-medium">{feature.title}</p>
              <p className="text-sm text-muted-foreground">Expected: {feature.date}</p>
            </div>
            <Badge variant="outline">{feature.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

function IntegrationStatusWidget() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Integration Status</h3>
      <div className="space-y-3">
        {[
          { name: "Slack", status: "Connected", icon: "💬" },
          { name: "Google Docs", status: "Connected", icon: "📄" },
          { name: "Discord", status: "Disconnected", icon: "🎮" },
          { name: "GitHub", status: "Connected", icon: "💻" },
        ].map((integration, i) => (
          <div key={i} className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <div className="text-xl">{integration.icon}</div>
              <span>{integration.name}</span>
            </div>
            <Badge variant={integration.status === "Connected" ? "success" : "destructive"}>{integration.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

function SummaryCardsWidget() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <SummaryCard
        title="System Load"
        icon={<Cpu className="h-5 w-5 text-yellow-500" />}
        value="32%"
        description="CPU utilization"
        trend={{
          value: "12%",
          label: "from last hour",
          type: "decrease",
        }}
      />
      <SummaryCard
        title="Uptime"
        icon={<Clock className="h-5 w-5 text-yellow-500" />}
        value="3d 14h"
        description="Since last restart"
        trend={{
          value: "99.8%",
          label: "availability",
          type: "neutral",
        }}
      />
      <SummaryCard
        title="Usage"
        icon={<Activity className="h-5 w-5 text-yellow-500" />}
        value="1,248"
        description="Total queries"
        trend={{
          value: "24%",
          label: "from yesterday",
          type: "increase",
        }}
      />
    </div>
  )
}

// Define available widgets with their icons and components
const AVAILABLE_WIDGETS = [
  {
    id: "usage-analytics",
    title: "Usage Analytics",
    description: "Track your system's usage patterns and performance metrics",
    icon: <BarChart3 className="h-5 w-5" />,
    component: UsageAnalyticsWidget,
    defaultSize: "col-span-12 row-span-2",
    category: "analytics",
  },
  {
    id: "recent-activity",
    title: "Recent Activity",
    description: "View your most recent interactions and queries",
    icon: <History className="h-5 w-5" />,
    component: RecentActivityWidget,
    defaultSize: "col-span-6 row-span-2",
    category: "activity",
  },
  {
    id: "model-status",
    title: "Model Status",
    description: "Check the status of your AI models",
    icon: <Brain className="h-5 w-5" />,
    component: ModelStatusWidget,
    defaultSize: "col-span-12 row-span-1",
    category: "system",
  },
  {
    id: "system-health",
    title: "System Health",
    description: "Monitor your system's health and performance",
    icon: <Heart className="h-5 w-5" />,
    component: SystemHealthWidget,
    defaultSize: "col-span-6 row-span-2",
    category: "system",
  },
  {
    id: "saved-sessions",
    title: "Saved Sessions",
    description: "Access your saved chat sessions",
    icon: <MessageCircle className="h-5 w-5" />,
    component: SavedSessionsWidget,
    defaultSize: "col-span-6 row-span-2",
    category: "activity",
  },
  {
    id: "custom-report",
    title: "Custom Report",
    description: "View and customize your reports",
    icon: <FileEdit className="h-5 w-5" />,
    component: CustomReportWidget,
    defaultSize: "col-span-6 row-span-2",
    category: "analytics",
  },
  {
    id: "upcoming-features",
    title: "Upcoming Features",
    description: "Preview upcoming features and updates",
    icon: <Rocket className="h-5 w-5" />,
    component: UpcomingFeaturesWidget,
    defaultSize: "col-span-6 row-span-2",
    category: "system",
  },
  {
    id: "integration-status",
    title: "Integration Status",
    description: "Monitor the status of your connected integrations",
    icon: <Plug className="h-5 w-5" />,
    component: IntegrationStatusWidget,
    defaultSize: "col-span-6 row-span-2",
    category: "system",
  },
  {
    id: "summary-cards",
    title: "Summary Cards",
    description: "View key metrics at a glance",
    icon: <LayoutGrid className="h-5 w-5" />,
    component: SummaryCardsWidget,
    defaultSize: "col-span-12 row-span-1",
    category: "analytics",
  },
]

// Default widget configuration for new users
const DEFAULT_WIDGETS = [
  { id: "model-status", order: 1 },
  { id: "usage-analytics", order: 2 },
  { id: "recent-activity", order: 3 },
  { id: "saved-sessions", order: 4 },
]

export function WidgetGrid() {
  // State for widgets
  const [activeWidgets, setActiveWidgets] = useState<Array<{ id: string; order: number }>>([])
  const [isEditing, setIsEditing] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [widgetStates, setWidgetStates] = useState<Record<string, { minimized: boolean }>>({})
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null)
  const dragOverWidgetId = useRef<string | null>(null)

  // Load saved widgets from localStorage on component mount
  useEffect(() => {
    try {
      const savedActiveWidgets = localStorage.getItem("dashboard-active-widgets")
      const savedWidgetStates = localStorage.getItem("dashboard-widget-states")

      if (savedActiveWidgets) {
        setActiveWidgets(JSON.parse(savedActiveWidgets))
      } else {
        // If no saved widgets, use the default ones
        setActiveWidgets(DEFAULT_WIDGETS)
      }

      if (savedWidgetStates) {
        setWidgetStates(JSON.parse(savedWidgetStates))
      }
    } catch (error) {
      console.error("Error loading dashboard widgets:", error)
      setActiveWidgets(DEFAULT_WIDGETS)
    }
  }, [])

  // Save widgets to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("dashboard-active-widgets", JSON.stringify(activeWidgets))
      localStorage.setItem("dashboard-widget-states", JSON.stringify(widgetStates))
    } catch (error) {
      console.error("Error saving dashboard widgets:", error)
    }
  }, [activeWidgets, widgetStates])

  // Toggle widget visibility
  const toggleWidget = (widgetId: string) => {
    setActiveWidgets((prev) => {
      if (prev.some((w) => w.id === widgetId)) {
        return prev.filter((w) => w.id !== widgetId)
      } else {
        // When adding a widget, add it to the end of the list
        const maxOrder = prev.length > 0 ? Math.max(...prev.map((w) => w.order)) : 0
        return [...prev, { id: widgetId, order: maxOrder + 1 }]
      }
    })
  }

  // Reset to default layout
  const resetToDefault = () => {
    setActiveWidgets(DEFAULT_WIDGETS)
    setWidgetStates({})
    setIsSettingsOpen(false)
  }

  // Toggle widget minimized state
  const toggleMinimized = (widgetId: string) => {
    setWidgetStates((prev) => ({
      ...prev,
      [widgetId]: {
        ...prev[widgetId],
        minimized: !prev[widgetId]?.minimized,
      },
    }))
  }

  // Remove widget
  const removeWidget = (widgetId: string) => {
    setActiveWidgets((prev) => prev.filter((w) => w.id !== widgetId))
  }

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, widgetId: string) => {
    if (!isEditing) return
    setDraggedWidget(widgetId)
    e.dataTransfer.effectAllowed = "move"
    // Use a transparent image as drag ghost
    const img = new Image()
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    e.dataTransfer.setDragImage(img, 0, 0)
  }

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, widgetId: string) => {
    e.preventDefault()
    if (!isEditing || draggedWidget === widgetId) return
    dragOverWidgetId.current = widgetId
  }

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetWidgetId: string) => {
    e.preventDefault()
    if (!isEditing || !draggedWidget || draggedWidget === targetWidgetId) return

    setActiveWidgets((prev) => {
      const updatedWidgets = [...prev]
      const sourceWidget = updatedWidgets.find((w) => w.id === draggedWidget)
      const targetWidget = updatedWidgets.find((w) => w.id === targetWidgetId)

      if (sourceWidget && targetWidget) {
        // Swap the order of the widgets
        const sourceOrder = sourceWidget.order
        sourceWidget.order = targetWidget.order
        targetWidget.order = sourceOrder
      }

      // Sort by order
      return updatedWidgets.sort((a, b) => a.order - b.order)
    })

    setDraggedWidget(null)
    dragOverWidgetId.current = null
  }

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedWidget(null)
    dragOverWidgetId.current = null
  }

  // Sort widgets by order
  const sortedWidgets = [...activeWidgets].sort((a, b) => a.order - b.order)

  // Group widgets by category for the settings dialog
  const widgetsByCategory = {
    analytics: AVAILABLE_WIDGETS.filter((w) => w.category === "analytics"),
    activity: AVAILABLE_WIDGETS.filter((w) => w.category === "activity"),
    system: AVAILABLE_WIDGETS.filter((w) => w.category === "system"),
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsSettingsOpen(true)}>
            <PlusCircle className="h-4 w-4" />
            <span>Add Widgets</span>
          </Button>

          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            className="gap-2"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Settings className="h-4 w-4" />
            <span>{isEditing ? "Save Layout" : "Edit Layout"}</span>
          </Button>
        </div>
      </div>

      {isEditing && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-800 flex items-center">
          <div className="mr-2">🔄</div>
          <div>
            <strong>Edit Mode:</strong> Drag widgets to rearrange them. Click "Save Layout" when you're done.
          </div>
        </div>
      )}

      {/* Widget Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Dashboard Widgets</DialogTitle>
            <DialogDescription>Customize your dashboard by adding or removing widgets.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="all" className="mt-4">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[300px] pr-4">
              <TabsContent value="all" className="space-y-4 mt-0">
                {AVAILABLE_WIDGETS.map((widget) => (
                  <WidgetOption
                    key={widget.id}
                    widget={widget}
                    isActive={activeWidgets.some((w) => w.id === widget.id)}
                    onToggle={() => toggleWidget(widget.id)}
                  />
                ))}
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4 mt-0">
                {widgetsByCategory.analytics.map((widget) => (
                  <WidgetOption
                    key={widget.id}
                    widget={widget}
                    isActive={activeWidgets.some((w) => w.id === widget.id)}
                    onToggle={() => toggleWidget(widget.id)}
                  />
                ))}
              </TabsContent>

              <TabsContent value="activity" className="space-y-4 mt-0">
                {widgetsByCategory.activity.map((widget) => (
                  <WidgetOption
                    key={widget.id}
                    widget={widget}
                    isActive={activeWidgets.some((w) => w.id === widget.id)}
                    onToggle={() => toggleWidget(widget.id)}
                  />
                ))}
              </TabsContent>

              <TabsContent value="system" className="space-y-4 mt-0">
                {widgetsByCategory.system.map((widget) => (
                  <WidgetOption
                    key={widget.id}
                    widget={widget}
                    isActive={activeWidgets.some((w) => w.id === widget.id)}
                    onToggle={() => toggleWidget(widget.id)}
                  />
                ))}
              </TabsContent>
            </ScrollArea>
          </Tabs>

          <DialogFooter className="flex justify-between mt-4">
            <Button variant="outline" onClick={resetToDefault}>
              Reset to Default
            </Button>
            <Button onClick={() => setIsSettingsOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Widget Grid */}
      <div className="grid grid-cols-12 gap-4">
        {sortedWidgets.length === 0 ? (
          <div className="col-span-12 flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg">
            <LayoutGrid className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No widgets added yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Your dashboard is empty. Add widgets to customize your experience.
            </p>
            <Button onClick={() => setIsSettingsOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Widgets
            </Button>
          </div>
        ) : (
          sortedWidgets.map(({ id }) => {
            const widget = AVAILABLE_WIDGETS.find((w) => w.id === id)
            if (!widget) return null

            const isMinimized = widgetStates[id]?.minimized
            const WidgetComponent = widget.component
            const isDragging = draggedWidget === id
            const isOver = dragOverWidgetId.current === id

            return (
              <div
                key={id}
                className={cn(
                  widget.defaultSize,
                  "transition-all duration-200",
                  isDragging && "opacity-50",
                  isOver && "ring-2 ring-primary ring-offset-2",
                )}
                draggable={isEditing}
                onDragStart={(e) => handleDragStart(e, id)}
                onDragOver={(e) => handleDragOver(e, id)}
                onDrop={(e) => handleDrop(e, id)}
                onDragEnd={handleDragEnd}
              >
                <Card className="h-full overflow-hidden border-2 shadow-sm transition-all duration-200 hover:shadow-md">
                  <CardHeader
                    className={cn(
                      "flex flex-row items-center justify-between space-y-0 p-4",
                      isEditing && "bg-yellow-50 cursor-move",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {isEditing && <MoveHorizontal className="h-4 w-4 text-muted-foreground" />}
                      <div className="text-primary mr-2">{widget.icon}</div>
                      <CardTitle className="text-base font-medium">{widget.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleMinimized(id)}>
                        {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                      </Button>

                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeWidget(id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}

                      {!isEditing && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toggleMinimized(id)}>
                              {isMinimized ? "Maximize" : "Minimize"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>Refresh</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => removeWidget(id)} className="text-red-500">
                              Remove Widget
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent
                    className={cn(
                      "p-4 overflow-auto transition-all duration-200",
                      isMinimized ? "h-0 p-0" : "h-[calc(100%-60px)]",
                    )}
                  >
                    {!isMinimized && <WidgetComponent />}
                  </CardContent>
                </Card>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

// Widget option component for the settings dialog
function WidgetOption({
  widget,
  isActive,
  onToggle,
}: {
  widget: (typeof AVAILABLE_WIDGETS)[0]
  isActive: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary rounded-full p-2">{widget.icon}</div>
        <div>
          <h4 className="font-medium">{widget.title}</h4>
          <p className="text-sm text-muted-foreground">{widget.description}</p>
        </div>
      </div>
      <Switch checked={isActive} onCheckedChange={onToggle} />
    </div>
  )
}
