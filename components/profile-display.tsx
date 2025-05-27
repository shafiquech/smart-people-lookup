"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User, Mail, Phone, Send, Sparkles, Building } from "lucide-react"

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

interface ProfileDisplayProps {
  profile: Profile
  onSendMessage: (profile: Profile, message: string) => void
}

export function ProfileDisplay({ profile, onSendMessage }: ProfileDisplayProps) {
  const [email, setEmail] = useState(profile.email)
  const [phone, setPhone] = useState(profile.phone)
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      const updatedProfile = { ...profile, email, phone }
      onSendMessage(updatedProfile, message)
      setMessage("")
    }
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <User className="h-5 w-5 text-green-600" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-start gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.profilePic || "/placeholder.svg"} alt={profile.name} />
            <AvatarFallback className="text-xl bg-blue-100 text-blue-600">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900">{profile.name}</h3>
            <p className="text-lg text-gray-600 mb-1">{profile.title}</p>
            <div className="flex items-center gap-2 text-gray-500">
              <Building className="h-4 w-4" />
              <span>{profile.company}</span>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Insights
          </h4>
          <div className="flex flex-wrap gap-2">
            {profile.aiInsights.map((insight, index) => (
              <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                {insight}
              </Badge>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Mail className="h-4 w-4 text-blue-600" />
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Phone className="h-4 w-4 text-green-600" />
              Phone
            </label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {/* Message Section */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <Send className="h-4 w-4 text-orange-600" />
            Message
          </label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={4}
            className="resize-none"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="mt-3 w-full bg-orange-600 hover:bg-orange-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
