import { apiGet, apiPost, apiPut, apiDelete, type RegistrationWindow, type ApiResponse } from "./api"

export interface CreateRegistrationWindowData {
  startDate: string
  endDate: string
  isOpen?: boolean
  description?: string
}

export interface UpdateRegistrationWindowData extends Partial<CreateRegistrationWindowData> {}

// Get current registration window
export async function getCurrentRegistrationWindow(): Promise<RegistrationWindow | null> {
  try {
    const response = await apiGet<RegistrationWindow>("/registration-windows/current")
    return response
  } catch (error) {
    // Return null if no current window found
    return null
  }
}

// Get all registration windows (admin only)
export async function getAllRegistrationWindows(): Promise<RegistrationWindow[]> {
  const response = await apiGet<RegistrationWindow[]>("/registration-windows")
  return response || []
}

// Create registration window (admin only)
export async function createRegistrationWindow(windowData: CreateRegistrationWindowData): Promise<RegistrationWindow> {
  const response = await apiPost<ApiResponse<RegistrationWindow>>("/registration-windows", windowData)
  if (!response.data) {
    throw new Error(response.message || "Failed to create registration window")
  }
  return response.data
}

// Update registration window (admin only)
export async function updateRegistrationWindow(
  id: string,
  windowData: UpdateRegistrationWindowData,
): Promise<RegistrationWindow> {
  const response = await apiPut<ApiResponse<RegistrationWindow>>(`/registration-windows/${id}`, windowData)
  if (!response.data) {
    throw new Error(response.message || "Failed to update registration window")
  }
  return response.data
}

// Delete registration window (admin only)
export async function deleteRegistrationWindow(id: string): Promise<void> {
  await apiDelete(`/registration-windows/${id}`)
}
