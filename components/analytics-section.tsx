"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, Clock, RefreshCw } from "lucide-react"

interface AnalyticsSectionProps {
  searchCount: number
  analytics: {
    totalSearches: number
    successRate: number
  }
  onRefresh: () => void
}

export function AnalyticsSection({ searchCount, analytics, onRefresh }: AnalyticsSectionProps) {
  const currentDate = new Date().toLocaleDateString()
  const currentTime = new Date().toLocaleTimeString()

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
            Search Analytics
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onRefresh} className="h-8 w-8 p-0">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Count */}
          <div className="text-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-indigo-600 mb-1">{analytics.totalSearches}</div>
            <div className="text-sm text-gray-600">Total Searches</div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Success Rate</span>
              </div>
              <Badge className="bg-green-100 text-green-700">100%</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Session Searches</span>
              </div>
              <Badge className="bg-blue-100 text-blue-700">{searchCount}</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">Last Search</span>
              </div>
              <Badge className="bg-orange-100 text-orange-700">{searchCount > 0 ? "Just now" : "None"}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Info */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Session Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Date:</span>
            <span className="font-medium">{currentDate}</span>
          </div>
          <div className="flex justify-between">
            <span>Time:</span>
            <span className="font-medium">{currentTime}</span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <Badge className="bg-green-100 text-green-700">Connected</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
