import { apiGet, apiPost, apiPut, apiDelete, type Course, type ApiResponse } from "./api"

export interface CreateCourseData {
  crn: string
  title: string
  credits: number
  instructor: string
  maxEnrollment: number
  prerequisites?: string[]
  corequisites?: string[]
  price: string
  description: string
  status?: "Active" | "Inactive"
}

export interface UpdateCourseData extends Partial<CreateCourseData> {
  status?: "Active" | "Inactive"
}

export interface CourseStats {
  TotalCourse: number
  TotalInactiveCourses: number
  TotalAllCourses: number
  TotalRegisteredStudent: number
  TotalActiveRegistrations: number
  TotalPendingRegistrations: number
  TotalInactiveRegistrations: number
  fullCourses: number
  nearlyFullCourses: number
  coursesNeedingAttention: number
}

// Get all courses
export async function getAllCourses(params?: { status?: string; search?: string }): Promise<Course[]> {
  let endpoint = "/courses"

  if (params) {
    const searchParams = new URLSearchParams()
    if (params.status) searchParams.append("status", params.status)
    if (params.search) searchParams.append("search", params.search)

    if (searchParams.toString()) {
      endpoint += `?${searchParams.toString()}`
    }
  }

  const response = await apiGet<Course[]>(endpoint)
  return response || []
}

// Get course statistics
export async function getCourseStats(): Promise<CourseStats> {
  return await apiGet<CourseStats>("/courses/stats")
}

// Get course by ID
export async function getCourseById(id: string): Promise<Course> {
  const response = await apiGet<Course>(`/courses/${id}`)
  return response
}

// Create new course (Admin only)
export async function createCourse(courseData: CreateCourseData): Promise<Course> {
  const response = await apiPost<Course>("/courses", courseData)
  return response
}

// Update course (Admin only)
export async function updateCourse(id: string, courseData: UpdateCourseData): Promise<Course> {
  const response = await apiPut<ApiResponse<Course>>(`/courses/${id}`, courseData)
  if (!response.data) {
    throw new Error("Failed to update course")
  }
  return response.data
}

// Delete course (Admin only)
export async function deleteCourse(id: string): Promise<void> {
  await apiDelete(`/courses/${id}`)
}

// Get active courses
export async function getActiveCourses(): Promise<Course[]> {
  return await getAllCourses({ status: "Active" })
}
