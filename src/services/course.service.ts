import api from "../utils/api";

export interface Lesson {
  _id: string;
  title: string;
  slug: string;
  videoUrl?: string;
  content: string;
  isFree: boolean;
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  thumbnail: string;

  mentor: {
    _id: string;
    fullName: string;
    profession: string;
    profilePicture?: string;
  };

  lessons: Lesson[];
}

interface ApiResponse<T> {
  message: string;
  data: T;
}

export const courseService = {
  async getAllCourses(): Promise<ApiResponse<Course[]>> {
    const response = await api.get("/courses");
    return response.data;
  },

  async getCourseBySlug(slug: string): Promise<ApiResponse<Course>> {
    const response = await api.get(`/courses/${slug}`);
    return response.data;
  },

  async createCourse(formData: FormData): Promise<ApiResponse<Course>> {
    const response = await api.post("/courses", formData);
    return response.data;
  },

  async addLesson(
    courseId: string,
    data: { title: string; content: string; videoUrl: string; isFree: boolean },
  ): Promise<ApiResponse<Lesson>> {
    const response = await api.post(`/courses/${courseId}/lessons`, data);
    return response.data;
  },

  async updateCourse(
    courseId: string,
    formData: FormData,
  ): Promise<ApiResponse<Course>> {
    const response = await api.put(`/courses/${courseId}`, formData);
    return response.data;
  },

  async deleteCourse(courseId: string): Promise<ApiResponse<void>> {
    const response = await api.delete(`/courses/${courseId}`);
    return response.data;
  },

  async getMentorStats(): Promise<
    ApiResponse<{ totalStudents: number; totalRevenue: number }>
  > {
    const response = await api.get("/mentor/stats");
    return response.data;
  },
};
