import api from '../utils/api';

export const transactionService = {
  async checkout(courseId: string) {
    const response = await api.post('/transactions/checkout', { courseId });
    return response.data;
  },

  async getMyTransactions() {
    const response = await api.get('/transactions/my-transactions');
    return response.data;
  },
  
  // (Opsional) Untuk mengambil detail transaksi di halaman payment nanti
  async getTransactionDetail(transactionId: string) {
    const response = await api.get(`/transactions/${transactionId}`);
    return response.data;
  }
};