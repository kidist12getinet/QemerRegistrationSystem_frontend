import { apiRequest, setAuthToken } from "./api"

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  role?: "student" | "admin"
}

export interface AuthResponse {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  isAdmin: boolean
  token: string
}

// Login function
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>("/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  })

  // Set token for future requests
  if (response.token) {
    setAuthToken(response.token)
  }

  return response
}

// Register function
export async function register(userData: RegisterData): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>("/users/register", {
    method: "POST",
    body: JSON.stringify(userData),
  })

  // Set token for future requests
  if (response.token) {
    setAuthToken(response.token)
  }

  return response
}

// Logout function
export function logout(): void {
  setAuthToken(null)
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!setAuthToken
}
