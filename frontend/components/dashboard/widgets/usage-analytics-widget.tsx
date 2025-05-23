"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for charts
const dailyQueriesAll = [
  { day: "Mon", queries: 120 },
  { day: "Tue", queries: 180 },
  { day: "Wed", queries: 150 },
  { day: "Thu", queries: 210 },
  { day: "Fri", queries: 190 },
  { day: "Sat", queries: 80 },
  { day: "Sun", queries: 70 },
]

const hourlyActivityAll = [
  { hour: "00:00", queries: 10 },
  { hour: "02:00", queries: 5 },
  { hour: "04:00", queries: 3 },
  { hour: "06:00", queries: 8 },
  { hour: "08:00", queries: 30 },
  { hour: "10:00", queries: 75 },
  { hour: "12:00", queries: 90 },
  { hour: "14:00", queries: 85 },
  { hour: "16:00", queries: 70 },
  { hour: "18:00", queries: 45 },
  { hour: "20:00", queries: 30 },
  { hour: "22:00", queries: 15 },
]

const memoryUsageAll = [
  { time: "00:00", usage: 2.1 },
  { time: "04:00", usage: 2.3 },
  { time: "08:00", usage: 3.2 },
  { time: "12:00", usage: 4.1 },
  { time: "16:00", usage: 3.8 },
  { time: "20:00", usage: 3.2 },
  { time: "24:00", usage: 2.8 },
]

export function UsageAnalyticsWidget() {
  const [selectedModel, setSelectedModel] = useState("all")

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Usage Analytics</h3>
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-[180px] h-8 text-xs">
            <SelectValue placeholder="Filter by model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Models</SelectItem>
            <SelectItem value="llama">LLaMA 2 7B</SelectItem>
            <SelectItem value="mistral">Mistral 7B</SelectItem>
            <SelectItem value="gemma">Gemma 7B</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="daily" className="flex-1">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily Queries</TabsTrigger>
          <TabsTrigger value="hourly">Peak Activity</TabsTrigger>
          <TabsTrigger value="memory">Memory Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="flex-1 mt-4">
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyQueriesAll} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  formatter={(value) => [`${value} queries`, "Queries"]}
                />
                <Bar dataKey="queries" fill="#facc15" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="hourly" className="flex-1 mt-4">
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyActivityAll} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  formatter={(value) => [`${value} queries`, "Queries"]}
                />
                <Line type="monotone" dataKey="queries" stroke="#facc15" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="memory" className="flex-1 mt-4">
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={memoryUsageAll} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  formatter={(value) => [`${value} GB`, "Memory"]}
                />
                <Area type="monotone" dataKey="usage" stroke="#facc15" fill="#fef9c3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
