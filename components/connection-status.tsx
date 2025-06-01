"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wifi, WifiOff, RefreshCw } from "lucide-react"

interface ConnectionStatusProps {
  apiBaseUrl: string
}

export function ConnectionStatus({ apiBaseUrl }: ConnectionStatusProps) {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const checkConnection = async () => {
    setIsChecking(true)
    try {
      const response = await fetch(`${apiBaseUrl}/reports`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      setIsConnected(response.ok)
    } catch (error) {
      setIsConnected(false)
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    if (mounted) {
      checkConnection()
    }
  }, [mounted])

  if (!mounted) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin text-gray-500" />
              <span className="text-sm font-medium">Backend Status</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-gray-100 text-gray-700">Initializing...</Badge>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">API: {apiBaseUrl}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isConnected === null ? (
              <RefreshCw className="h-4 w-4 animate-spin text-gray-500" />
            ) : isConnected ? (
              <Wifi className="h-4 w-4 text-green-600" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-600" />
            )}
            <span className="text-sm font-medium">Backend Status</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className={
                isConnected === null
                  ? "bg-gray-100 text-gray-700"
                  : isConnected
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
              }
            >
              {isConnected === null ? "Checking..." : isConnected ? "Connected" : "Disconnected"}
            </Badge>
            <Button variant="outline" size="sm" onClick={checkConnection} disabled={isChecking} className="h-6 px-2">
              <RefreshCw className={`h-3 w-3 ${isChecking ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">API: {apiBaseUrl}</div>
      </CardContent>
    </Card>
  )
}
