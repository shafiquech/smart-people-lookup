"use client"

import { useState } from "react"
import { SearchSection } from "@/components/search-section"
import { ProfileDisplay } from "@/components/profile-display"
import { AnalyticsSection } from "@/components/analytics-section"

interface Profile {
  id: string
  name: string
  profilePic: string
  aiInsights: string[]
  email: string
  phone: string
  title: string
  company: string
}

export default function Home() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [searchCount, setSearchCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (name: string) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock profile data
    const mockProfile: Profile = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      profilePic: `/placeholder.svg?height=120&width=120`,
      aiInsights: [
        "Highly experienced in technology leadership",
        "Strong background in product development",
        "Active in professional networking",
        "Frequently speaks at industry conferences",
      ],
      email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      phone: "+1 (555) 123-4567",
      title: "Senior Product Manager",
      company: "Tech Innovations Inc.",
    }

    setSelectedProfile(mockProfile)
    setSearchCount((prev) => prev + 1)
    setIsLoading(false)
  }

  const handleSendMessage = (profile: Profile, message: string) => {
    // Mock send message functionality
    alert(`Message sent to ${profile.name}!\n\nMessage: ${message}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Smart People Lookup Tool</h1>
          <p className="text-lg text-gray-600">Find and connect with professionals instantly</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search and Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            <SearchSection onSearch={handleSearch} isLoading={isLoading} />

            {selectedProfile && <ProfileDisplay profile={selectedProfile} onSendMessage={handleSendMessage} />}
          </div>

          {/* Analytics Section */}
          <div className="lg:col-span-1">
            <AnalyticsSection searchCount={searchCount} />
          </div>
        </div>
      </div>
    </div>
  )
}
