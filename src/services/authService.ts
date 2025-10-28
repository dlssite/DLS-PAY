import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import { mockApi, mockUsers } from '../mockData';

export const authService = {
  async loginWithEmail(email: string, password: string) {
    try {
      const result = await mockApi.login(email, password);
      try {
        await SecureStore.setItemAsync('userToken', result.user.id);
      } catch (secureError) {
        console.log('SecureStore not available, proceeding without persistence', secureError);
      }
      return { uid: result.user.id, email: result.user.email };
    } catch (error) {
      throw error;
    }
  },

  async registerWithEmail(email: string, password: string) {
    try {
      // For mock, we'll use a simple phone number
      const result = await mockApi.register(email, '+1234567890', password);
      try {
        await SecureStore.setItemAsync('userToken', result.user.id);
      } catch (secureError) {
        console.log('SecureStore not available, proceeding without persistence', secureError);
      }
      return { uid: result.user.id, email: result.user.email };
    } catch (error) {
      throw error;
    }
  },

  async loginWithGoogle() {
    try {
      // Mock Google login - return first user
      const user = mockUsers[0];
      try {
        await SecureStore.setItemAsync('userToken', user.id);
      } catch (secureError) {
        console.log('SecureStore not available, proceeding without persistence', secureError);
      }
      return { uid: user.id, email: user.email };
    } catch (error) {
      throw error;
    }
  },

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
            const token = await SecureStore.getItemAsync('userToken');
            if (token) {
              return { uid: token };
            }
          } catch (secureError) {
            console.log('SecureStore not available during biometric login', secureError);
          }
          // If no stored token, use first mock user
          const user = mockUsers[0];
          try {
            await SecureStore.setItemAsync('userToken', user.id);
          } catch (secureError) {
            console.log('SecureStore not available, proceeding without persistence', secureError);
          }
          return { uid: user.id };
        }
      }
      throw new Error('Biometric authentication failed');
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      await SecureStore.deleteItemAsync('userToken');
    } catch (error) {
      console.log('SecureStore not available during logout', error);
    }
  },

  async getCurrentUser() {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        const user = mockUsers.find(u => u.id === token);
        return user ? { uid: user.id, email: user.email } : null;
      }
      return null;
    } catch (error) {
      console.log('SecureStore not available, returning null', error);
      return null;
    }
  },
};
