import api from '../utils/api';

// 1. Export Interface
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
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  thumbnail: string;
  
  // Mentor object
  mentor: {
    _id: string;
    fullName: string;
    profession: string;
    profilePicture?: string;
  };

  // Array of Lesson
  lessons: Lesson[]; 
}

// Interface untuk Response API (Opsional, agar lebih rapi)
interface ApiResponse<T> {
    message: string;
    data: T;
}

export const courseService = {
  // Get All Courses
  async getAllCourses(): Promise<ApiResponse<Course[]>> {
    const response = await api.get('/courses');
    return response.data; 
  },

  // Get Single Course by Slug
  async getCourseBySlug(slug: string): Promise<ApiResponse<Course>> {
    const response = await api.get(`/courses/${slug}`);
    return response.data;
  },

  // Create Course (Upload File)
  async createCourse(formData: FormData): Promise<ApiResponse<Course>> {
    // ✅ PERBAIKAN: Hapus headers manual. Biarkan Axios mengaturnya otomatis.
    const response = await api.post('/courses', formData);
    return response.data;
  },

  // Add Lesson
  async addLesson(courseId: string, data: { title: string; content: string; videoUrl: string; isFree: boolean }): Promise<ApiResponse<Lesson>> {
    const response = await api.post(`/courses/${courseId}/lessons`, data);
    return response.data;
  },
};