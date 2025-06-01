"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Mail, Phone, RefreshCw, Calendar, User } from "lucide-react"
import { getCommunicationStats, type CommunicationRecord } from "@/lib/api"

interface CommunicationStatsProps {
  onRefresh?: () => void
}

export function CommunicationStats({ onRefresh }: CommunicationStatsProps) {
  const [communications, setCommunications] = useState<CommunicationRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const loadCommunications = async () => {
    setIsLoading(true)
    try {
      const data = await getCommunicationStats()
      setCommunications(data)
      if (onRefresh) {
        onRefresh()
      }
    } catch (error) {
      console.error("Failed to load communications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (mounted) {
      loadCommunications()
    }
  }, [mounted])

  const totalMessages = communications.length
  const uniqueContacts = new Set(communications.map((c) => c.email)).size
  const recentMessages = communications.slice(-3).reverse()

  if (!mounted) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Communication Stats
          </CardTitle>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="text-sm text-gray-500">Loading...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          Communication Stats
        </CardTitle>
        <Button variant="outline" size="sm" onClick={loadCommunications} disabled={isLoading} className="h-8 w-8 p-0">
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">{totalMessages}</div>
            <div className="text-xs text-gray-600">Total Messages</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">{uniqueContacts}</div>
            <div className="text-xs text-gray-600">Unique Contacts</div>
          </div>
        </div>

        {/* Recent Communications */}
        {communications.length > 0 ? (
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-600" />
              Recent Communications
            </h4>
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {recentMessages.map((comm) => (
                  <div key={comm.id} className="border rounded-lg p-3 bg-gray-50/50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-gray-500" />
                        <span className="text-xs font-medium text-gray-700">{comm.name || "Unknown"}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        ID: {comm.id}
                      </Badge>
                    </div>

                    <div className="space-y-1 mb-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{comm.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Phone className="h-3 w-3" />
                        <span>{comm.phone}</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-700 bg-white p-2 rounded border">
                      <span className="font-medium">Message: </span>
                      <span className="line-clamp-2">{comm.message}</span>
                    </div>

                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                      <span>Mode: {comm.mode || "N/A"}</span>
                      <span>Sent: {comm.sentAt || "Pending"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {communications.length > 3 && (
              <div className="text-center mt-2">
                <Badge variant="secondary" className="text-xs">
                  Showing {Math.min(3, communications.length)} of {communications.length} messages
                </Badge>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <div className="text-sm text-gray-500">No communications yet</div>
            <div className="text-xs text-gray-400">Messages will appear here once sent</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
