
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

// Mock Promotions
export const activePromotions = [
  {
    title: 'Legend of Elements',
    description: 'Receive an extra 5% Bonus in all your purchases.',
    endsIn: { days: 0, hours: 11, minutes: 36, seconds: 45 },
    image: require('../assets/adaptive-icon.png'), // Placeholder image
  },
  {
    title: 'Space Voyager',
    description: 'Get a 10% discount on all in-app items.',
    endsIn: { days: 1, hours: 8, minutes: 15, seconds: 30 },
    image: require('../assets/splash-icon.png'), // Placeholder image
  },
  {
    title: 'Mystic Gems',
    description: 'Unlock a free treasure chest with any purchase over $20.',
    endsIn: { days: 2, hours: 4, minutes: 55, seconds: 10 },
    image: require('../assets/adaptive-icon.png'), // Placeholder image
  },
  {
    title: 'Cybernetic Heroes',
    description: 'Double your XP for the next 24 hours.',
    endsIn: { days: 0, hours: 23, minutes: 59, seconds: 59 },
    image: require('../assets/splash-icon.png'), // Placeholder image
  },
  {
    title: 'Galactic Empires',
    description: 'Special offer: Buy one starship, get one 50% off.',
    endsIn: { days: 5, hours: 12, minutes: 0, seconds: 0 },
    image: require('../assets/adaptive-icon.png'), // Placeholder image
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

export interface CompatibleGame {
  title: string;
  category: string;
  bannerUrl: string;
  iconUrl: string;
}

export const compatibleGames: CompatibleGame[] = [
  {
    title: 'Legend of Elements',
    category: 'Role Playing',
    bannerUrl: 'https://cdn.discordapp.com/attachments/1254101929383559168/1258529210795298836/d_catation_d_une_illustration_de_jeu_mobile_pour_un_jeu_fant_f2747385-5d3c-42b7-9571-08197f884393.png?ex=66886364&is=668711e4&hm=4a703d1469e71e7552fa10e75551936c53e0294b8e8316c39b7de2683935293d&',
    iconUrl: 'https://cdn.discordapp.com/attachments/1254101929383559168/1258529555708842065/d_catation_d_une_illustration_de_jeu_mobile_pour_un_jeu_fant_33e215f7-6f02-4299-8742-3e536c4b9d03.png?ex=668863b7&is=66871237&hm=c1092a4078500c28373b5e408544a496f332c9431e6191c06f3b5849925e59b5&',
  },
  {
    title: 'Space Voyager',
    category: 'Sci-Fi',
    bannerUrl: 'https://cdn.discordapp.com/attachments/1254101929383559168/1258529209568923769/d_catation_d_une_illustration_de_jeu_mobile_pour_un_jeu_fant_d758f331-5079-4556-9a56-2e92a23363ad.png?ex=66886364&is=668711e4&hm=214088998246d1b7617b0d91253a6e97495bca5c5ec94a3a60c868d4a9f997c4&',
    iconUrl: 'https://cdn.discordapp.com/attachments/1254101929383559168/1258529554366664744/d_catation_d_une_illustration_de_jeu_mobile_pour_un_jeu_fant_91c782b6-a4f6-4a46-8883-9d2c12513476.png?ex=668863b6&is=66871236&hm=53c13b137d532a2f91a566f12537a70ce238b68832a875a36371c66289045768&',
  },
    {
    title: 'Mystic Gems',
    category: 'Puzzle',
    bannerUrl: 'https://cdn.discordapp.com/attachments/1254101929383559168/1258529208398843914/d_catation_d_une_illustration_de_jeu_mobile_pour_un_jeu_fant_01b44c6c-0027-448f-9556-5511a2f602b9.png?ex=66886363&is=668711e3&hm=9a45e99880f8364962947f60759ce4e3f42c4b8b809a74421d2146fec3238c35&',
    iconUrl: 'https://cdn.discordapp.com/attachments/1254101929383559168/1258529553099980830/d_catation_d_une_illustration_de_jeu_mobile_pour_un_jeu_fant_c7b74f07-a36c-486d-92d1-0865e9d2f2dc.png?ex=668863b6&is=66871236&hm=80a068a41785ee634b07f2b96c738e658e4d2a1383794b62f75a7b8e1f574d53&',
  },
];
