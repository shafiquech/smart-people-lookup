"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2 } from "lucide-react"

interface SearchSectionProps {
  onSearch: (name: string) => void
  isLoading: boolean
}

export function SearchSection({ onSearch, isLoading }: SearchSectionProps) {
  const [searchName, setSearchName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchName.trim()) {
      onSearch(searchName.trim())
    }
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Search className="h-5 w-5 text-blue-600" />
          Search People
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Enter person's name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="flex-1 h-12 text-lg"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="lg"
              disabled={!searchName.trim() || isLoading}
              className="px-8 bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
