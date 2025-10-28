import { mockApi } from '../mockData';

export const walletService = {
  async getBalance(userId: string) {
    try {
      return await mockApi.getBalance(userId);
    } catch (error) {
      throw error;
    }
  },

  async updateBalance(userId: string, amount: number) {
    try {
      return await mockApi.updateBalance(userId, amount);
    } catch (error) {
      throw error;
    }
  },

  async sendMoney(senderId: string, recipientId: string, amount: number, description: string) {
    try {
      const result = await mockApi.sendMoney(senderId, recipientId, amount, description);
      return result.success;
    } catch (error) {
      throw error;
    }
  },

  async depositMoney(userId: string, amount: number, method: string) {
    try {
      const result = await mockApi.depositMoney(userId, amount, method);
      return result.success;
    } catch (error) {
      throw error;
    }
  },

  async withdrawMoney(userId: string, amount: number, method: string) {
    try {
      const result = await mockApi.withdrawMoney(userId, amount, method);
      return result.success;
    } catch (error) {
      throw error;
    }
  },

  async getTransactionHistory(userId: string) {
    try {
      const transactions = await mockApi.getTransactionHistory(userId);
      return transactions.map(txn => ({
        id: txn.id,
        type: txn.type,
        amount: txn.amount,
        description: txn.description,
        date: txn.timestamp,
        recipient: txn.recipientId,
        sender: txn.senderId,
      }));
    } catch (error) {
      throw error;
    }
  },
};
