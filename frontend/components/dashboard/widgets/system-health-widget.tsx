"use client"

import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data
const cpuData = [
  { time: "00:00", usage: 25 },
  { time: "01:00", usage: 20 },
  { time: "02:00", usage: 15 },
  { time: "03:00", usage: 18 },
  { time: "04:00", usage: 22 },
  { time: "05:00", usage: 28 },
  { time: "06:00", usage: 35 },
  { time: "07:00", usage: 40 },
  { time: "08:00", usage: 45 },
  { time: "09:00", usage: 50 },
  { time: "10:00", usage: 48 },
  { time: "11:00", usage: 42 },
]

const memoryData = [
  { time: "00:00", usage: 45 },
  { time: "01:00", usage: 48 },
  { time: "02:00", usage: 50 },
  { time: "03:00", usage: 52 },
  { time: "04:00", usage: 55 },
  { time: "05:00", usage: 58 },
  { time: "06:00", usage: 60 },
  { time: "07:00", usage: 65 },
  { time: "08:00", usage: 70 },
  { time: "09:00", usage: 75 },
  { time: "10:00", usage: 72 },
  { time: "11:00", usage: 68 },
]

const diskData = [
  { time: "00:00", usage: 62 },
  { time: "01:00", usage: 62 },
  { time: "02:00", usage: 63 },
  { time: "03:00", usage: 63 },
  { time: "04:00", usage: 64 },
  { time: "05:00", usage: 64 },
  { time: "06:00", usage: 65 },
  { time: "07:00", usage: 65 },
  { time: "08:00", usage: 66 },
  { time: "09:00", usage: 66 },
  { time: "10:00", usage: 67 },
  { time: "11:00", usage: 67 },
]

export function SystemHealthWidget() {
  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">CPU</span>
            <span>32%</span>
          </div>
          <Progress value={32} className="h-1" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Memory</span>
            <span>68%</span>
          </div>
          <Progress value={68} className="h-1" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Disk</span>
            <span>67%</span>
          </div>
          <Progress value={67} className="h-1" />
        </div>
      </div>

      <Tabs defaultValue="cpu" className="flex-1">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cpu">CPU</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="disk">Disk</TabsTrigger>
        </TabsList>

        <TabsContent value="cpu" className="flex-1 mt-4">
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cpuData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  formatter={(value) => [`${value}%`, "CPU Usage"]}
                />
                <Line type="monotone" dataKey="usage" stroke="#facc15" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="memory" className="flex-1 mt-4">
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={memoryData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  formatter={(value) => [`${value}%`, "Memory Usage"]}
                />
                <Line type="monotone" dataKey="usage" stroke="#facc15" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="disk" className="flex-1 mt-4">
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={diskData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  formatter={(value) => [`${value}%`, "Disk Usage"]}
                />
                <Line type="monotone" dataKey="usage" stroke="#facc15" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
