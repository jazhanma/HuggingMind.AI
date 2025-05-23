"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Copy, Star, MessageSquare, Bookmark } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { templateData } from "@/lib/template-data"

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const categories = [
    { id: "all", name: "All Templates" },
    { id: "writing", name: "Writing" },
    { id: "coding", name: "Coding" },
    { id: "business", name: "Business" },
    { id: "creative", name: "Creative" },
  ]

  const handleCopy = (templateId: number) => {
    const template = templateData.find((t) => t.id === templateId)
    if (template && template.content) {
      navigator.clipboard.writeText(template.content)
      toast({
        title: "Template copied",
        description: "Template content has been copied to clipboard",
      })
    }
  }

  const filteredTemplates = (category: string) => {
    return templateData
      .filter((template) => (category === "all" ? true : template.category === category))
      .filter(
        (template) =>
          template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Prompt Templates</h1>
        <p className="text-muted-foreground">Browse and use pre-built prompt templates for various use cases.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="pl-8 focus-visible:ring-yellow-400/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="gap-2 bg-black text-white hover:bg-gray-800">
          <Star className="h-4 w-4 text-yellow-400" />
          My Saved Templates
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start overflow-auto py-1 h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex-shrink-0">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates(category.id).map((template) => (
                <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-md bg-yellow-100">
                          <template.icon className="h-4 w-4 text-yellow-600" />
                        </div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {template.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3" />
                      <span>{template.uses.toLocaleString()} uses</span>
                      {template.isFeatured && (
                        <>
                          <Star className="h-3 w-3 text-yellow-500 ml-2" />
                          <span className="text-yellow-600">Featured</span>
                        </>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" size="sm" className="gap-1" onClick={() => handleCopy(template.id)}>
                      <Copy className="h-3 w-3" />
                      Copy
                    </Button>
                    <Link href={`/dashboard/templates/${template.id}`}>
                      <Button size="sm" className="gap-1 bg-black text-white hover:bg-gray-800">
                        Use Template
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredTemplates(category.id).length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No templates found</h3>
                <p className="text-gray-500 max-w-md">
                  We couldn't find any templates matching your search. Try different keywords or browse all templates.
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
