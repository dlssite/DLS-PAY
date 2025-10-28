// Mock data for testing the E-Wallet app before implementing authentication and database

export interface MockUser {
  id: string;
  email: string;
  phone: string;
  name: string;
  balance: number;
  walletId: string;
  createdAt: string;
}

export interface MockTransaction {
  id: string;
  userId: string;
  type: 'send' | 'receive' | 'deposit' | 'withdraw';
  amount: number;
  description: string;
  recipientId?: string;
  senderId?: string;
  method?: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

// Mock Users
export const mockUsers: MockUser[] = [
  {
    id: 'user1',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    name: 'John Doe',
    balance: 1250.50,
    walletId: 'WAL123456789',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'user2',
    email: 'jane.smith@example.com',
    phone: '+1234567891',
    name: 'Jane Smith',
    balance: 890.75,
    walletId: 'WAL987654321',
    createdAt: '2024-02-20T14:15:00Z',
  },
  {
    id: 'user3',
    email: 'bob.wilson@example.com',
    phone: '+1234567892',
    name: 'Bob Wilson',
    balance: 2100.00,
    walletId: 'WAL456789123',
    createdAt: '2024-03-10T09:45:00Z',
  },
];

// Mock Transactions
export const mockTransactions: MockTransaction[] = [
  {
    id: 'txn1',
    userId: 'user1',
    type: 'deposit',
    amount: 500.00,
    description: 'Deposit via Bank Transfer',
    method: 'bank',
    timestamp: '2024-10-25T10:00:00Z',
    status: 'completed',
  },
  {
    id: 'txn2',
    userId: 'user1',
    type: 'send',
    amount: 150.00,
    description: 'Payment for dinner',
    recipientId: 'user2',
    timestamp: '2024-10-24T18:30:00Z',
    status: 'completed',
  },
  {
    id: 'txn3',
    userId: 'user1',
    type: 'receive',
    amount: 200.00,
    description: 'Refund for cancelled order',
    senderId: 'user3',
    timestamp: '2024-10-23T14:20:00Z',
    status: 'completed',
  },
  {
    id: 'txn4',
    userId: 'user1',
    type: 'withdraw',
    amount: 100.00,
    description: 'ATM Withdrawal',
    method: 'atm',
    timestamp: '2024-10-22T12:15:00Z',
    status: 'completed',
  },
  {
    id: 'txn5',
    userId: 'user2',
    type: 'deposit',
    amount: 300.00,
    description: 'Deposit via Credit Card',
    method: 'card',
    timestamp: '2024-10-25T09:00:00Z',
    status: 'completed',
  },
  {
    id: 'txn6',
    userId: 'user2',
    type: 'send',
    amount: 75.50,
    description: 'Coffee and pastries',
    recipientId: 'user1',
    timestamp: '2024-10-24T08:45:00Z',
    status: 'completed',
  },
  {
    id: 'txn7',
    userId: 'user3',
    type: 'receive',
    amount: 500.00,
    description: 'Salary deposit',
    senderId: 'external',
    timestamp: '2024-10-25T08:00:00Z',
    status: 'completed',
  },
];

// Mock API functions
export const mockApi = {
  // Auth functions
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password123') {
      return { success: true, user };
    }
    throw new Error('Invalid credentials');
  },

  register: async (email: string, phone: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (mockUsers.find(u => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser: MockUser = {
      id: `user${mockUsers.length + 1}`,
      email,
      phone,
      name: email.split('@')[0],
      balance: 0,
      walletId: `WAL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);
    return { success: true, user: newUser };
  },

  // Wallet functions
  getBalance: async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = mockUsers.find(u => u.id === userId);
    return user?.balance || 0;
  },

  updateBalance: async (userId: string, amount: number) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      user.balance += amount;
      return user.balance;
    }
    throw new Error('User not found');
  },

  sendMoney: async (senderId: string, recipientId: string, amount: number, description: string) => {
    await new Promise(resolve => setTimeout(resolve, 1200));

    const sender = mockUsers.find(u => u.id === senderId);
    const recipient = mockUsers.find(u => u.id === recipientId || u.walletId === recipientId || u.phone === recipientId);

    if (!sender) throw new Error('Sender not found');
    if (!recipient) throw new Error('Recipient not found');
    if (sender.balance < amount) throw new Error('Insufficient balance');

    // Update balances
    sender.balance -= amount;
    recipient.balance += amount;

    // Create transactions
    const sendTxn: MockTransaction = {
      id: `txn${mockTransactions.length + 1}`,
      userId: senderId,
      type: 'send',
      amount,
      description,
      recipientId: recipient.id,
      timestamp: new Date().toISOString(),
      status: 'completed',
    };

    const receiveTxn: MockTransaction = {
      id: `txn${mockTransactions.length + 2}`,
      userId: recipient.id,
      type: 'receive',
      amount,
      description,
      senderId: senderId,
      timestamp: new Date().toISOString(),
      status: 'completed',
    };

    mockTransactions.unshift(sendTxn, receiveTxn);
    return { success: true, transaction: sendTxn };
  },

  depositMoney: async (userId: string, amount: number, method: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    user.balance += amount;

    const transaction: MockTransaction = {
      id: `txn${mockTransactions.length + 1}`,
      userId,
      type: 'deposit',
      amount,
      description: `Deposit via ${method}`,
      method,
      timestamp: new Date().toISOString(),
      status: 'completed',
    };

    mockTransactions.unshift(transaction);
    return { success: true, transaction };
  },

  withdrawMoney: async (userId: string, amount: number, method: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    if (user.balance < amount) throw new Error('Insufficient balance');

    user.balance -= amount;

    const transaction: MockTransaction = {
      id: `txn${mockTransactions.length + 1}`,
      userId,
      type: 'withdraw',
      amount,
      description: `Withdrawal via ${method}`,
      method,
      timestamp: new Date().toISOString(),
      status: 'completed',
    };

    mockTransactions.unshift(transaction);
    return { success: true, transaction };
  },

  getTransactionHistory: async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockTransactions.filter(txn =>
      txn.userId === userId ||
      txn.recipientId === userId ||
      txn.senderId === userId
    );
  },

  // Utility functions
  findUserByWalletId: (walletId: string) => {
    return mockUsers.find(u => u.walletId === walletId);
  },

  findUserByPhone: (phone: string) => {
    return mockUsers.find(u => u.phone === phone);
  },

  getAllUsers: () => mockUsers,
  getAllTransactions: () => mockTransactions,
};
