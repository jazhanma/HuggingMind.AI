"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Sample data
const modelUsageData = [
  { name: "LLaMA 2 7B", value: 65 },
  { name: "Mistral 7B", value: 25 },
  { name: "Gemma 7B", value: 10 },
]

const queryTypeData = [
  { name: "Text Generation", value: 45 },
  { name: "Question Answering", value: 30 },
  { name: "Summarization", value: 15 },
  { name: "Translation", value: 10 },
]

const weeklyUsageData = [
  { day: "Mon", queries: 120 },
  { day: "Tue", queries: 180 },
  { day: "Wed", queries: 150 },
  { day: "Thu", queries: 210 },
  { day: "Fri", queries: 190 },
  { day: "Sat", queries: 80 },
  { day: "Sun", queries: 70 },
]

const COLORS = ["#facc15", "#94a3b8", "#f97316", "#8b5cf6", "#10b981"]

export function CustomReportWidget() {
  const [reportType, setReportType] = useState("usage")
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Custom Report</h3>
        <div className="flex gap-2">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usage">Usage Report</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="models">Model Usage</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[100px] h-8 text-xs">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="chart" className="flex-1">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chart">Chart</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="flex-1 mt-4">
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyUsageData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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

        <TabsContent value="breakdown" className="flex-1 mt-4">
          <div className="grid grid-cols-2 h-full">
            <div className="h-full">
              <h4 className="text-xs font-medium mb-2 text-center">Model Usage</h4>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={modelUsageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {modelUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                    formatter={(value) => [`${value}%`, "Usage"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="h-full">
              <h4 className="text-xs font-medium mb-2 text-center">Query Types</h4>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={queryTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {queryTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                    formatter={(value) => [`${value}%`, "Usage"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-4 pt-2 border-t">
        <Button variant="outline" size="sm" className="w-full">
          Generate Full Report
        </Button>
      </div>
    </div>
  )
}
