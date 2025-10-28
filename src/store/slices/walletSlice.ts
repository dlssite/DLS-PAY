import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  balance: number;
  currency: string;
}

const initialState: WalletState = {
  balance: 0,
  currency: 'USD',
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
  },
});

export const { setBalance, updateBalance, setCurrency } = walletSlice.actions;
export default walletSlice.reducer;
