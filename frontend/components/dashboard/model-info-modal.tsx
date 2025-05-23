import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface ModelInfoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  section: string | null
}

export function ModelInfoModal({ open, onOpenChange, section }: ModelInfoModalProps) {
  const getInitialTab = () => {
    if (section === "model") return "overview"
    if (section === "quantization") return "performance"
    if (section === "memory") return "resources"
    return "overview"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>LLaMA 2 7B Chat</DialogTitle>
          <DialogDescription>Detailed information about your currently loaded model</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={getInitialTab()} className="mt-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Model Name</p>
                <p className="text-sm">LLaMA 2 7B Chat</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Version</p>
                <p className="text-sm">2.1.0</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Parameters</p>
                <p className="text-sm">7 Billion</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Status</p>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm">May 15, 2023</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">License</p>
                <p className="text-sm">Meta AI License</p>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground">
                LLaMA 2 7B Chat is an optimized chat model from Meta AI. It's fine-tuned for dialogue use cases and
                provides a good balance between performance and resource requirements. This model is suitable for a wide
                range of conversational AI applications.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Quantization</p>
                <p className="text-sm">Q4_K_M (4-bit)</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Context Length</p>
                <p className="text-sm">4096 tokens</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Avg. Response Time</p>
                <p className="text-sm">1.2 seconds</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Tokens/Second</p>
                <p className="text-sm">~25 tokens/s</p>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <p className="text-sm font-medium">Performance Notes</p>
              <p className="text-sm text-muted-foreground">
                The Q4_K_M quantization provides a good balance between model quality and performance. It reduces the
                memory footprint by approximately 75% compared to the full precision model, with minimal impact on
                output quality. For higher quality at the cost of more memory, consider using the 8-bit quantization.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Memory Usage</p>
                <p className="text-sm">4.2 GB / 16 GB</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">CPU Utilization</p>
                <p className="text-sm">32%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">GPU Memory</p>
                <p className="text-sm">N/A (CPU Only)</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Disk Space</p>
                <p className="text-sm">3.8 GB</p>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <p className="text-sm font-medium">System Requirements</p>
              <p className="text-sm text-muted-foreground">
                Minimum: 8GB RAM, 4-core CPU
                <br />
                Recommended: 16GB RAM, 8-core CPU or CUDA-compatible GPU
              </p>
            </div>

            <div className="space-y-2 mt-4">
              <p className="text-sm font-medium">Recent Logs</p>
              <pre className="text-xs bg-gray-100 p-2 rounded-md overflow-auto max-h-32">
                [2023-05-15 15:00:00] INFO: Model loaded successfully [2023-05-15 14:59:45] INFO: Loading model: LLaMA 2
                7B Chat [2023-05-15 14:58:30] WARN: Low memory warning: 15% available
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
