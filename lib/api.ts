// API configuration and helper functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.srv839663.hstgr.cloud/api"
export interface Profile {
  id: string
  name: string
  profilePic: string
  aiInsights: string[]
  email: string
  phone: string
  title: string
  company: string
  linkedin?: string
  location?: string
}

export interface SearchResponse {
  success: boolean
  data?: Profile
  error?: string
}

export interface MessageRequest {
  profileId: string
  email: string
  phone: string
  message: string
}

export interface MessageResponse {
  success: boolean
  messageId?: string
  error?: string
}

export interface AnalyticsResponse {
  totalSearches: number
  successRate: number
  lastSearchTime?: string
}

export interface CommunicationRecord {
  id: number
  name: string | null
  email: string
  phone: string
  message: string
  mode: string | null
  sentAt: string | null
}

// Add request logging for debugging
const logRequest = (method: string, url: string, data?: any) => {
  console.log(`🔄 API ${method} ${url}`, data ? { data } : "")
}

const logResponse = (method: string, url: string, response: any) => {
  console.log(`✅ API ${method} ${url} Response:`, response)
}

const logError = (method: string, url: string, error: any) => {
  console.error(`❌ API ${method} ${url} Error:`, error)
}

// Search for a person by name
export async function searchPerson(name: string): Promise<SearchResponse> {
  const url = `${API_BASE_URL}/person-info`
  const requestData = { name }

  logRequest("POST", url, requestData)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add authentication headers if needed
        // 'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(requestData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    logResponse("POST", url, data)
    return data
  } catch (error) {
    logError("POST", url, error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Search failed",
    }
  }
}

// Send message to a person
export async function sendMessage(messageData: MessageRequest): Promise<MessageResponse> {
  const url = `${API_BASE_URL}/send-message`

  logRequest("POST", url, messageData)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add authentication headers if needed
        // 'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(messageData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    logResponse("POST", url, data)
    return data
  } catch (error) {
    logError("POST", url, error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send message",
    }
  }
}

// Get analytics data
export async function getAnalytics(): Promise<AnalyticsResponse> {
  const url = `${API_BASE_URL}/analytics`

  logRequest("GET", url)

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add authentication headers if needed
        // 'Authorization': `Bearer ${getAuthToken()}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    logResponse("GET", url, data)
    return data
  } catch (error) {
    logError("GET", url, error)
    return {
      totalSearches: 0,
      successRate: 0,
    }
  }
}

// Get communication records
export async function getCommunicationStats(): Promise<CommunicationRecord[]> {
  const url = `${API_BASE_URL}/reports`

  logRequest("GET", url)

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add authentication headers if needed
        // 'Authorization': `Bearer ${getAuthToken()}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    logResponse("GET", url, data)
    return Array.isArray(data) ? data : []
  } catch (error) {
    logError("GET", url, error)
    return []
  }
}

// Helper function to get auth token (implement based on your auth system)
// function getAuthToken(): string | null {
//   return localStorage.getItem('authToken') || null
// }
