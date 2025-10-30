import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import { mockApi, mockUsers } from '../mockData';

export const authService = {
  // Generate a unique wallet ID
  generateWalletId(): string {
    return `WAL${Math.random().toString(36).substr(2, 9).toUpperCase()}${Date.now().toString().slice(-4)}`;
  },

  // Create a new wallet
  async createWallet(passcode?: string) {
    try {
      const walletId = this.generateWalletId();

      // Create wallet in mock data
      const result = await mockApi.createWallet(walletId, passcode);

      // Store wallet data securely
      try {
        await SecureStore.setItemAsync('walletId', walletId);
        if (passcode) {
          await SecureStore.setItemAsync('walletPasscode', passcode);
        }
      } catch (secureError) {
        console.log('SecureStore not available, proceeding without persistence', secureError);
      }

      return { walletId, user: result.user };
    } catch (error) {
      throw error;
    }
  },

  // Login with existing wallet
  async loginWithWallet(walletId: string, passcode?: string) {
    try {
      const result = await mockApi.loginWithWallet(walletId, passcode);

      // Store wallet data securely
      try {
        await SecureStore.setItemAsync('walletId', walletId);
        if (passcode) {
          await SecureStore.setItemAsync('walletPasscode', passcode);
        }
      } catch (secureError) {
        console.log('SecureStore not available, proceeding without persistence', secureError);
      }

      return { walletId, user: result.user };
    } catch (error) {
      throw error;
    }
  },

  // Get current wallet
  async getCurrentWallet() {
    try {
      const walletId = await SecureStore.getItemAsync('walletId');
      if (walletId) {
        const user = mockUsers.find(u => u.walletId === walletId);
        return user ? { walletId, user } : null;
      }
      return null;
    } catch (error) {
      console.log('SecureStore not available, returning null', error);
      return null;
    }
  },

  // Biometric login (unchanged)
  async biometricLogin() {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate with biometrics',
        });

        if (result.success) {
          try {
            const walletId = await SecureStore.getItemAsync('walletId');
            if (walletId) {
              const user = mockUsers.find(u => u.walletId === walletId);
              return user ? { walletId, user } : null;
            }
          } catch (secureError) {
            console.log('SecureStore not available during biometric login', secureError);
          }
          // If no stored wallet, return null
          return null;
        }
      }
      throw new Error('Biometric authentication failed');
    } catch (error) {
      throw error;
    }
  },

  // Logout
  async logout() {
    try {
      await SecureStore.deleteItemAsync('walletId');
      await SecureStore.deleteItemAsync('walletPasscode');
    } catch (error) {
      console.log('SecureStore not available during logout', error);
    }
  },

  // Legacy methods (kept for compatibility but not used)
  async loginWithEmail(email: string, password: string) {
    throw new Error('Email login not supported. Use wallet authentication.');
  },

  async registerWithEmail(email: string, password: string) {
    throw new Error('Email registration not supported. Use wallet creation.');
  },

  async loginWithGoogle() {
    throw new Error('Google login not supported. Use wallet authentication.');
  },

  async getCurrentUser() {
    return this.getCurrentWallet();
  },
};
