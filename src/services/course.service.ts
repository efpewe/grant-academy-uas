import api from '../utils/api';

// 1. Export Interface 'Lesson' (Wajib ada export)
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

export const courseService = {
  // Get All Courses
  async getAllCourses() {
    const response = await api.get('/courses');
    return response.data; 
  },

  // Get Single Course by Slug
  async getCourseBySlug(slug: string) {
    const response = await api.get(`/courses/${slug}`);
    return response.data;
  },
  async createCourse(formData: FormData) {
    const response = await api.post('/courses', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Wajib untuk upload file
      },
    });
    return response.data;
  },
};