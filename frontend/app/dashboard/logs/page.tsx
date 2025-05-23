import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertCircle, CheckCircle, Search } from "lucide-react"

export default function LogsPage() {
  // Sample log data
  const chatLogs = [
    {
      id: 1,
      timestamp: "2023-05-15 14:32:45",
      user: "User123",
      query: "How does quantum computing work?",
      tokens: 1245,
      status: "completed",
    },
    {
      id: 2,
      timestamp: "2023-05-15 13:21:18",
      user: "User123",
      query: "Explain the theory of relativity",
      tokens: 1876,
      status: "completed",
    },
    {
      id: 3,
      timestamp: "2023-05-15 11:05:33",
      user: "User123",
      query: "What are the best practices for React?",
      tokens: 2103,
      status: "completed",
    },
    {
      id: 4,
      timestamp: "2023-05-14 22:17:09",
      user: "User123",
      query: "How to implement a binary search tree?",
      tokens: 1532,
      status: "completed",
    },
    {
      id: 5,
      timestamp: "2023-05-14 19:45:51",
      user: "User123",
      query: "Summarize the history of artificial intelligence",
      tokens: 3021,
      status: "completed",
    },
  ]

  const systemLogs = [
    { id: 1, timestamp: "2023-05-15 15:00:00", type: "info", message: "System startup completed" },
    { id: 2, timestamp: "2023-05-15 14:59:45", type: "info", message: "Loading model: LLaMA 2 7B Chat" },
    { id: 3, timestamp: "2023-05-15 14:58:30", type: "warning", message: "Low memory warning: 15% available" },
    { id: 4, timestamp: "2023-05-15 14:30:12", type: "error", message: "Failed to load custom plugin: image-analyzer" },
    { id: 5, timestamp: "2023-05-15 12:00:00", type: "info", message: "Scheduled maintenance completed" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Logs & History</h1>
        <p className="text-muted-foreground">View your chat history and system logs.</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search logs..."
            className="w-full rounded-md border border-input bg-white pl-8 pr-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Clock className="h-4 w-4" />
          <span>Last 7 Days</span>
        </Button>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat History</TabsTrigger>
          <TabsTrigger value="system">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Chat History</CardTitle>
              <CardDescription>View your recent conversations with HuggingMind AI.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Query</TableHead>
                    <TableHead className="text-right">Tokens</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chatLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                      <TableCell className="max-w-[300px] truncate">{log.query}</TableCell>
                      <TableCell className="text-right">{log.tokens}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Completed
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>View system events and error logs.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                      <TableCell>
                        {log.type === "error" && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Error
                          </Badge>
                        )}
                        {log.type === "warning" && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Warning
                          </Badge>
                        )}
                        {log.type === "info" && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Info
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{log.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
