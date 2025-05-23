"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Copy, Save, Zap } from "lucide-react"
import { templateData } from "@/lib/template-data"
import { useToast } from "@/hooks/use-toast"

export default function TemplatePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [template, setTemplate] = useState<any>(null)
  const [customContent, setCustomContent] = useState("")
  const [generatedResponse, setGeneratedResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedExample, setSelectedExample] = useState<number | null>(null)

  useEffect(() => {
    if (params.id) {
      const id = Number.parseInt(params.id as string)
      const foundTemplate = templateData.find((t) => t.id === id)
      if (foundTemplate) {
        setTemplate(foundTemplate)
        setCustomContent(foundTemplate.content)
      }
    }
  }, [params.id])

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(customContent)
    toast({
      title: "Template copied",
      description: "Template content has been copied to clipboard",
    })
  }

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(generatedResponse)
    toast({
      title: "Response copied",
      description: "Generated response has been copied to clipboard",
    })
  }

  const handleSaveTemplate = () => {
    // In a real app, this would save to a database
    toast({
      title: "Template saved",
      description: "Your customized template has been saved",
    })
  }

  const handleGenerateResponse = () => {
    setIsGenerating(true)

    // Simulate API call to generate response
    setTimeout(() => {
      // For demo purposes, we'll use the example response if an example is selected
      // or generate a placeholder response
      if (selectedExample !== null && template?.examples[selectedExample]) {
        setGeneratedResponse(template.examples[selectedExample].response)
      } else {
        setGeneratedResponse(`# Generated Response

Based on your template input, here's a generated response that would typically come from an AI model.

This is a placeholder response for demonstration purposes. In a real implementation, this would be the result of sending your template to an AI model API.

The response would be formatted according to the template structure and would contain relevant information based on the input provided.`)
      }

      setIsGenerating(false)
    }, 1500)
  }

  const handleUseExample = (index: number) => {
    if (template?.examples[index]) {
      setSelectedExample(index)
      setCustomContent(template.content.replace("[Paste your content here]", template.examples[index].prompt))
    }
  }

  if (!template) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Template not found</h1>
        </div>
      </div>
    )
  }

  const Icon = template.icon

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.push("/dashboard/templates")} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Templates
        </Button>
        <h1 className="text-2xl font-bold">{template.name}</h1>
        {Icon && <Icon className="ml-2 h-5 w-5 text-muted-foreground" />}
      </div>

      <p className="text-muted-foreground mb-6">{template.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customize Template</CardTitle>
              <CardDescription>Edit the template below to fit your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={customContent}
                onChange={(e) => setCustomContent(e.target.value)}
                className="min-h-[400px] font-mono"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleCopyTemplate}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleSaveTemplate}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleGenerateResponse} disabled={isGenerating}>
                  <Zap className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating..." : "Generate"}
                </Button>
              </div>
            </CardFooter>
          </Card>

          {template.examples && template.examples.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Example Prompts</CardTitle>
                <CardDescription>Select an example to see how this template can be used</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {template.examples.map((example: any, index: number) => (
                    <div key={index} className="p-4 border rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{example.title}</h3>
                        <Button variant="secondary" size="sm" onClick={() => handleUseExample(index)}>
                          Use Example
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {example.prompt.length > 150 ? `${example.prompt.substring(0, 150)}...` : example.prompt}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Generated Response</CardTitle>
              <CardDescription>The response will appear here after generation</CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-[400px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-4 text-muted-foreground">Generating response...</p>
                </div>
              ) : generatedResponse ? (
                <div className="prose prose-sm max-w-none dark:prose-invert min-h-[400px] overflow-auto p-4 border rounded-md">
                  <div className="whitespace-pre-line">{generatedResponse}</div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-center text-muted-foreground">
                  <Zap className="h-12 w-12 mb-4 opacity-20" />
                  <p>Click the Generate button to create a response based on your template</p>
                </div>
              )}
            </CardContent>
            {generatedResponse && (
              <CardFooter className="flex justify-end">
                <Button variant="outline" onClick={handleCopyResponse}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Response
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
