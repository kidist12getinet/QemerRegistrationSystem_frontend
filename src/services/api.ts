// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL 
// Types matching your backend
export interface ApiResponse<T> {
  success?: boolean
  message?: string
  data?: T
  count?: number
}

export interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: "student" | "admin"
  isAdmin: boolean
}

export interface Course {
  _id: string
  crn: string
  title: string
  credits: number
  instructor: string
  maxEnrollment: number
  currentEnrollment: number
  prerequisites?: string[]
  corequisites?: string[]
  price: string
  status: "Active" | "Inactive"
  description: string
  createdAt: string
  updatedAt: string
}

export interface Registration {
  _id: string
  student: User
  course: Course
  phone: string
  gender: "Male" | "Female"
  registrationDate: string
  status: "Pending" | "Active" | "Inactive"
  schedule: "Weekdays" | "Evenings" | "Weekends"
  mode: "Online" | "In-Person"
  location: string
  referral?: string
  hasPcDesktop: "Yes" | "No"
  dropReason?: string
  dropDate?: string
  approvedBy?: User
  approvalDate?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface RegistrationWindow {
  _id: string
  startDate: string
  endDate: string
  isOpen: boolean
  description?: string
  createdBy?: string
  updatedBy?: string
  createdAt: string
  updatedAt: string
}

// Helper function to get auth token from session/context
let authToken: string | null = null

export const setAuthToken = (token: string | null) => {
  authToken = token
}

export const getAuthToken = (): string | null => {
  return authToken
}

// Helper function to create headers
const createHeaders = (includeAuth = false): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (includeAuth) {
    const token = getAuthToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  return headers
}
// Generic fetch wrapper
export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...createHeaders(false),
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error)
    throw error
  }
}

// Authenticated request wrapper
export async function authenticatedRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    headers: {
      ...createHeaders(true),
      ...options.headers,
    },
  })
}

// API functions for consistent usage\
export const apiGet = <T>(endpoint: string) => authenticatedRequest<T>(endpoint, { method: 'GET' })

export const apiPost = <T>(endpoint: string, data?: any) => authenticatedRequest<T>(endpoint, {
  method: 'POST',
  body: data ? JSON.stringify(data) : undefined
})

export const apiPut = <T>(endpoint: string, data?: any) => authenticatedRequest<T>(endpoint, {
  method: 'PUT',
  body: data ? JSON.stringify(data) : undefined
})

export const apiDelete = <T>(endpoint: string, data?: any) => authenticatedRequest<T>(endpoint, {
  method: 'DELETE',
  body: data ? JSON.stringify(data) : undefined
})
