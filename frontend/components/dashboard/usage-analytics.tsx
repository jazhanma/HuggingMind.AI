"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Legend,
} from "recharts"

export function UsageAnalytics() {
  const [selectedModel, setSelectedModel] = useState("all")

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

  const dailyQueriesByModel = {
    all: dailyQueriesAll,
    llama: [
      { day: "Mon", queries: 70 },
      { day: "Tue", queries: 110 },
      { day: "Wed", queries: 90 },
      { day: "Thu", queries: 130 },
      { day: "Fri", queries: 120 },
      { day: "Sat", queries: 50 },
      { day: "Sun", queries: 40 },
    ],
    mistral: [
      { day: "Mon", queries: 30 },
      { day: "Tue", queries: 40 },
      { day: "Wed", queries: 35 },
      { day: "Thu", queries: 50 },
      { day: "Fri", queries: 45 },
      { day: "Sat", queries: 20 },
      { day: "Sun", queries: 15 },
    ],
    gemma: [
      { day: "Mon", queries: 10 },
      { day: "Tue", queries: 15 },
      { day: "Wed", queries: 12 },
      { day: "Thu", queries: 18 },
      { day: "Fri", queries: 15 },
      { day: "Sat", queries: 5 },
      { day: "Sun", queries: 8 },
    ],
    phi: [
      { day: "Mon", queries: 5 },
      { day: "Tue", queries: 8 },
      { day: "Wed", queries: 7 },
      { day: "Thu", queries: 6 },
      { day: "Fri", queries: 5 },
      { day: "Sat", queries: 3 },
      { day: "Sun", queries: 4 },
    ],
    tinyllama: [
      { day: "Mon", queries: 5 },
      { day: "Tue", queries: 7 },
      { day: "Wed", queries: 6 },
      { day: "Thu", queries: 6 },
      { day: "Fri", queries: 5 },
      { day: "Sat", queries: 2 },
      { day: "Sun", queries: 3 },
    ],
  }

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

  const hourlyActivityByModel = {
    all: hourlyActivityAll,
    llama: hourlyActivityAll.map((item) => ({ ...item, queries: Math.floor(item.queries * 0.6) })),
    mistral: hourlyActivityAll.map((item) => ({ ...item, queries: Math.floor(item.queries * 0.25) })),
    gemma: hourlyActivityAll.map((item) => ({ ...item, queries: Math.floor(item.queries * 0.08) })),
    phi: hourlyActivityAll.map((item) => ({ ...item, queries: Math.floor(item.queries * 0.04) })),
    tinyllama: hourlyActivityAll.map((item) => ({ ...item, queries: Math.floor(item.queries * 0.03) })),
  }

  const memoryUsageAll = [
    { time: "00:00", usage: 2.1 },
    { time: "04:00", usage: 2.3 },
    { time: "08:00", usage: 3.2 },
    { time: "12:00", usage: 4.1 },
    { time: "16:00", usage: 3.8 },
    { time: "20:00", usage: 3.2 },
    { time: "24:00", usage: 2.8 },
  ]

  const memoryUsageByModel = {
    all: memoryUsageAll,
    llama: memoryUsageAll.map((item) => ({ ...item, usage: item.usage * 0.7 })),
    mistral: memoryUsageAll.map((item) => ({ ...item, usage: item.usage * 0.6 })),
    gemma: memoryUsageAll.map((item) => ({ ...item, usage: item.usage * 0.5 })),
    phi: memoryUsageAll.map((item) => ({ ...item, usage: item.usage * 0.3 })),
    tinyllama: memoryUsageAll.map((item) => ({ ...item, usage: item.usage * 0.25 })),
  }

  // Model comparison data
  const modelComparisonData = [
    { name: "LLaMA 2 7B", queries: 600, tokens: 1200000, avgResponseTime: 2.1 },
    { name: "Mistral 7B", queries: 250, tokens: 500000, avgResponseTime: 1.8 },
    { name: "Gemma 7B", queries: 80, tokens: 160000, avgResponseTime: 1.9 },
    { name: "Phi-2", queries: 40, tokens: 80000, avgResponseTime: 1.2 },
    { name: "TinyLlama", queries: 30, tokens: 60000, avgResponseTime: 0.9 },
  ]

  const getCurrentData = (dataType) => {
    switch (dataType) {
      case "daily":
        return dailyQueriesByModel[selectedModel] || dailyQueriesByModel.all
      case "hourly":
        return hourlyActivityByModel[selectedModel] || hourlyActivityByModel.all
      case "memory":
        return memoryUsageByModel[selectedModel] || memoryUsageByModel.all
      default:
        return dailyQueriesByModel.all
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Usage Analytics</CardTitle>
          <CardDescription>Monitor your system's usage patterns and performance metrics.</CardDescription>
        </div>
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Models</SelectItem>
            <SelectItem value="llama">LLaMA 2 7B</SelectItem>
            <SelectItem value="mistral">Mistral 7B</SelectItem>
            <SelectItem value="gemma">Gemma 7B</SelectItem>
            <SelectItem value="phi">Phi-2</SelectItem>
            <SelectItem value="tinyllama">TinyLlama 3B</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="daily">Daily Queries</TabsTrigger>
            <TabsTrigger value="hourly">Peak Activity</TabsTrigger>
            <TabsTrigger value="memory">Memory Usage</TabsTrigger>
            <TabsTrigger value="comparison">Model Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="mt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getCurrentData("daily")} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

          <TabsContent value="hourly" className="mt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getCurrentData("hourly")} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

          <TabsContent value="memory" className="mt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getCurrentData("memory")} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

          <TabsContent value="comparison" className="mt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={modelComparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barSize={20}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  />
                  <Legend />
                  <Bar dataKey="queries" name="Total Queries" fill="#facc15" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="avgResponseTime" name="Avg. Response Time (s)" fill="#94a3b8" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>This chart compares the usage and performance metrics across different models.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
