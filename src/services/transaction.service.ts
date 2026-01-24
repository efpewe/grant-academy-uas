import api from "../utils/api";

export const transactionService = {
  async checkout(courseId: string) {
    const response = await api.post("/transactions", { courseId });
    return response.data;
  },

  async getMyTransactions() {
    const response = await api.get("/transactions/my-transactions");
    return response.data;
  },

  async getTransactionDetail(transactionId: string) {
    const response = await api.get(`/transactions/${transactionId}`);
    return response.data;
  },
};
