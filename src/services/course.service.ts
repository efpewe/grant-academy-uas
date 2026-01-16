import api from '../utils/api';

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  thumbnail: string;
  mentor: {
    fullName: string;
    profession: string;
  };
}

export const courseService = {
  async getAllCourses() {
    const response = await api.get('/courses');
    return response.data;
  },

  async getCourseBySlug(slug: string) {
    const response = await api.get(`/courses/${slug}`);
    return response.data;
  }
};