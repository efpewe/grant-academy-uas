import api from '../utils/api';

export const transactionService = {
  // Fungsi untuk membeli kelas (Gratis / Berbayar sama-sama lewat sini)
  async checkout(courseId: string) {
    // Kirim courseId ke backend
    const response = await api.post('/transactions/checkout', { courseId });
    return response.data;
  },

  async getMyTransactions() {
    const response = await api.get('/transactions/my-transactions');
    return response.data;
  }
};