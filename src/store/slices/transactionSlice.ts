import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'deposit' | 'withdraw';
  amount: number;
  description: string;
  date: string;
  recipient?: string;
  sender?: string;
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addTransaction, setTransactions, setLoading } = transactionSlice.actions;
export default transactionSlice.reducer;
