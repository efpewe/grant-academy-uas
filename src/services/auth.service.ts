import api from '../utils/api';

export const authService = {
  async login(payload: any) {
    const response = await api.post('/auth/login', payload);
    return response.data; 
  },

  async register(payload: any) {
    const response = await api.post('/auth/register', payload);
    return response.data;
  },

  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  }
};