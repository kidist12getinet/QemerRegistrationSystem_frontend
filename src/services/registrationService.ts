import { apiGet, apiPost, apiPut, apiDelete, type Registration, type ApiResponse } from "./api"

export type { Registration } from "./api"

export interface CreateRegistrationData {
  courseCrn: string 
  phone: string
  gender: "Male" | "Female"
  schedule: "Weekdays" | "Evenings" | "Weekends"
  mode: "Online" | "In-Person"
  location: string
  referral: string
  hasPcDesktop: "Yes" | "No"
}

export interface StudentDashboardData {
  registrations: Registration[]
  statistics: {
    totalRegistrations: number
    activeRegistrations: number
    pendingRegistrations: number
    inactiveRegistrations: number
    totalCreditHours: number
  }
  registrationWindow?: {
    isOpen: boolean
    startDate: string
    endDate: string
    description?: string
  } | null
}

// Create new registration
export async function createRegistration(registrationData: CreateRegistrationData): Promise<Registration> {
  const response = await apiPost<ApiResponse<Registration>>("/registrations", registrationData)
  if (!response.data) {
    throw new Error(response.message || "Failed to create registration")
  }
  return response.data
}

// Get my registrations (student)
export async function getMyRegistrations(): Promise<ApiResponse<Registration[]>> {
  return await apiGet<ApiResponse<Registration[]>>("/registrations/my-registrations")
}

// Get student dashboard data
export async function getStudentDashboard(): Promise<ApiResponse<StudentDashboardData>> {
  return await apiGet<ApiResponse<StudentDashboardData>>("/registrations/dashboard")
}

// Get all registrations (admin only)
export async function getAllRegistrations(params?: {
  status?: string
  courseCrn?: string
  startDate?: string
  endDate?: string
  student?: string
}): Promise<ApiResponse<Registration[]>> {
  let endpoint = "/registrations"

  if (params) {
    const searchParams = new URLSearchParams()
    if (params.status) searchParams.append("status", params.status)
    if (params.courseCrn) searchParams.append("courseCrn", params.courseCrn)
    if (params.startDate) searchParams.append("startDate", params.startDate)
    if (params.endDate) searchParams.append("endDate", params.endDate)
    if (params.student) searchParams.append("student", params.student)

    if (searchParams.toString()) {
      endpoint += `?${searchParams.toString()}`
    }
  }

  return await apiGet<ApiResponse<Registration[]>>(endpoint)
}

// Get single registration
export async function getRegistration(id: string): Promise<ApiResponse<Registration>> {
  return await apiGet<ApiResponse<Registration>>(`/registrations/${id}`)
}

// Update registration status (admin only)
export async function updateRegistrationStatus(
  registrationId: string,
  status: string,
  notes?: string,
): Promise<Registration> {
  const response = await apiPut<ApiResponse<Registration>>(`/registrations/${registrationId}/status`, {
    status,
    notes,
  })
  if (!response.data) {
    throw new Error(response.message || "Failed to update registration status")
  }
  return response.data
}

// Drop a course (student)
export async function dropCourse(registrationId: string, dropReason?: string): Promise<void> {
  await apiPut(`/registrations/${registrationId}/drop`, { dropReason })
}

// Delete registration (admin only)
export async function deleteRegistration(registrationId: string): Promise<void> {
  await apiDelete(`/registrations/${registrationId}`)
}
