import api from '../utils/api';

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