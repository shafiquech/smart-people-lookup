"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Code, Play, CheckCircle, XCircle } from "lucide-react"

export function ApiTester() {
  const [testName, setTestName] = useState("John Smith")
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    setTestResults([])

    const tests = [
      {
        name: "Get Person Info",
        endpoint: "/person-info",
        method: "POST",
        body: { name: testName },
      },
      {
        name: "Send Message Test",
        endpoint: "/send-message",
        method: "POST",
        body: {
          profileId: "test123",
          email: "test@example.com",
          phone: "+1-555-0123",
          message: "Test message from API tester",
        },
      },
      {
        name: "Get Reports",
        endpoint: "/reports",
        method: "GET",
      },
    ]

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.srv839663.hstgr.cloud/api"

    for (const test of tests) {
      try {
        const startTime = Date.now()
        const response = await fetch(`${apiBaseUrl}${test.endpoint}`, {
          method: test.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: test.body ? JSON.stringify(test.body) : undefined,
        })

        const endTime = Date.now()
        const responseData = await response.json()

        setTestResults((prev) => [
          ...prev,
          {
            ...test,
            success: response.ok,
            status: response.status,
            responseTime: endTime - startTime,
            data: responseData,
          },
        ])
      } catch (error) {
        setTestResults((prev) => [
          ...prev,
          {
            ...test,
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
          },
        ])
      }
    }

    setIsRunning(false)
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Code className="h-5 w-5 text-purple-600" />
          API Tester
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Test name for search"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="flex-1"
          />
          <Button onClick={runTests} disabled={isRunning} className="bg-purple-600 hover:bg-purple-700">
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? "Running..." : "Test API"}
          </Button>
        </div>

        {testResults.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Test Results:</h4>
            {testResults.map((result, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{result.name}</span>
                  <div className="flex items-center gap-2">
                    {result.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <Badge className={result.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                      {result.status || "Error"}
                    </Badge>
                    {result.responseTime && <Badge variant="outline">{result.responseTime}ms</Badge>}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {result.method} {result.endpoint}
                </div>
                {result.error && (
                  <div className="text-sm text-red-600 bg-red-50 p-2 rounded">Error: {result.error}</div>
                )}
                {result.data && (
                  <Textarea
                    value={JSON.stringify(result.data, null, 2)}
                    readOnly
                    rows={4}
                    className="text-xs font-mono"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
