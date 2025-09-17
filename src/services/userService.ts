import { apiGet, apiPut, apiDelete, type User, type ApiResponse } from "./api"

export interface UpdateUserData {
  firstName?: string
  lastName?: string
  email?: string
  role?: "student" | "admin"
  password?: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
}

// Get all users
export async function getAllUsers(): Promise<User[]> {
  const response = await apiGet<ApiResponse<User[]>>("/users")
  return response.data || []
}

// Get user by ID
export async function getUserById(id: string): Promise<User> {
  const response = await apiGet<ApiResponse<User>>(`/users/${id}`)
  if (!response.data) {
    throw new Error("User not found")
  }
  return response.data
}

// Update user
export async function updateUser(id: string, userData: UpdateUserData): Promise<User> {
  const response = await apiPut<ApiResponse<User>>(`/users/${id}`, userData)
  if (!response.data) {
    throw new Error("Failed to update user")
  }
  return response.data
}

// Get user profile
export async function getUserProfile(): Promise<User> {
  const response = await apiGet<User>("/users/profile")
  return response
}

// Update profile
export async function updateProfile(userData: UpdateUserData): Promise<User> {
  const response = await apiPut<User>("/users/profile", userData)
  return response
}

// Change password
export async function changePassword(passwordData: ChangePasswordData): Promise<void> {
  await apiPut("/users/change-password", passwordData)
}

// Delete user
export async function deleteUser(id: string): Promise<void> {
  await apiDelete(`/users/${id}`)
}

// Get students
export async function getStudents(): Promise<User[]> {
  const response = await apiGet<ApiResponse<User[]>>("/users?role=student")
  return response.data || []
}

// Get admins
export async function getAdmins(): Promise<User[]> {
  const response = await apiGet<ApiResponse<User[]>>("/users?role=admin")
  return response.data || []
}

// Promote to admin
export async function promoteToAdmin(id: string): Promise<User> {
  const response = await apiPut<ApiResponse<User>>(`/users/${id}/promote`, { role: "admin" })
  if (!response.data) {
    throw new Error("Failed to promote user")
  }
  return response.data
}

// Demote from admin
export async function demoteFromAdmin(id: string): Promise<User> {
  const response = await apiPut<ApiResponse<User>>(`/users/${id}/demote`, { role: "student" })
  if (!response.data) {
    throw new Error("Failed to demote user")
  }
  return response.data
}
