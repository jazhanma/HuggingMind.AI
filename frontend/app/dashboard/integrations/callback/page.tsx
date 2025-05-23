"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"

export default function IntegrationCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [integration, setIntegration] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    // Get the authorization code from the URL
    const code = searchParams.get("code")
    const error = searchParams.get("error")
    const state = searchParams.get("state")

    // In a real application, you would:
    // 1. Extract the integration name from the state parameter
    // 2. Exchange the code for an access token with your backend
    // 3. Store the access token securely

    // For this demo, we'll simulate the process
    setTimeout(() => {
      if (error) {
        setStatus("error")
        setErrorMessage(error)
      } else if (code) {
        setStatus("success")
        // Extract integration from state or just use a placeholder
        setIntegration(state || "the service")
      } else {
        setStatus("error")
        setErrorMessage("No authorization code received")
      }
    }, 1500)
  }, [searchParams])

  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardHeader>
          <CardTitle>Integration Connection</CardTitle>
          <CardDescription>
            {status === "loading" && "Processing your authorization..."}
            {status === "success" && "Integration successfully connected!"}
            {status === "error" && "Connection failed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-black animate-spin"></div>
              <p className="text-sm text-muted-foreground">Establishing connection...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <div className="text-center">
                <p className="font-medium">Connection Successful</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your HuggingMind AI account is now connected to {integration}.
                </p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-4">
              <XCircle className="h-16 w-16 text-red-500" />
              <div className="text-center">
                <p className="font-medium">Connection Failed</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {errorMessage || "There was an error connecting your account. Please try again."}
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => router.push("/dashboard/integrations")}
            className="bg-black text-white hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Integrations
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
