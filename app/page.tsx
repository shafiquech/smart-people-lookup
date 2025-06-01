"use client"

import { useState, useEffect } from "react"
import { SearchSection } from "@/components/search-section"
import { ProfileDisplay } from "@/components/profile-display"
import { AnalyticsSection } from "@/components/analytics-section"
import { searchPerson, sendMessage, getAnalytics, type Profile, type MessageRequest } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { ConnectionStatus } from "@/components/connection-status"

// Add this after the existing imports
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.srv839663.hstgr.cloud/api"

export default function Home() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [searchCount, setSearchCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [analytics, setAnalytics] = useState({ totalSearches: 0, successRate: 0 })
  const { toast } = useToast()

  // Load analytics on component mount
  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      const data = await getAnalytics()
      setAnalytics({
        totalSearches: data.totalSearches,
        successRate: data.successRate,
      })
      setSearchCount(data.totalSearches)
    } catch (error) {
      console.error("Failed to load analytics:", error)
    }
  }

  const handleSearch = async (name: string) => {
    setIsLoading(true)

    try {
      const result = await searchPerson(name)

      if (result.success && result.data) {
        setSelectedProfile(result.data)
        setSearchCount((prev) => prev + 1)
        toast({
          title: "Profile Found",
          description: `Successfully found profile for ${result.data.name}`,
        })
        // Refresh analytics after successful search
        loadAnalytics()
      } else {
        toast({
          title: "Search Failed",
          description: result.error || "Could not find profile for this person",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Search Error",
        description: "An unexpected error occurred during search",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (profile: Profile, message: string, email: string, phone: string) => {
    try {
      const messageData: MessageRequest = {
        profileId: profile.id,
        email,
        phone,
        message,
      }

      const result = await sendMessage(messageData)

      if (result.success) {
        toast({
          title: "Message Sent",
          description: `Your message has been sent to ${profile.name}`,
        })
      } else {
        toast({
          title: "Failed to Send",
          description: result.error || "Could not send message",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Send Error",
        description: "An unexpected error occurred while sending message",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Smart People Lookup Tool</h1>
          <p className="text-lg text-gray-600">Find and connect with professionals instantly</p>
        </div>

        {/* Connection Status */}
        <ConnectionStatus apiBaseUrl={API_BASE_URL} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search and Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            <SearchSection onSearch={handleSearch} isLoading={isLoading} />

            {selectedProfile && <ProfileDisplay profile={selectedProfile} onSendMessage={handleSendMessage} />}
          </div>

          {/* Analytics Section */}
          <div className="lg:col-span-1">
            <AnalyticsSection searchCount={searchCount} analytics={analytics} onRefresh={loadAnalytics} />
          </div>
        </div>
      </div>
    </div>
  )
}
