import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { authService } from '../services/authService';
import { useTheme } from '../hooks/useTheme';


type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainTabs: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const { theme } = useTheme();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          // User is logged in, navigate to main app
          setTimeout(() => navigation.replace('MainTabs'), 2000);
        } else {
          // User not logged in, navigate to login
          setTimeout(() => navigation.replace('Login'), 2000);
        }
      } catch (error) {
        setTimeout(() => navigation.replace('Login'), 2000);
      }
    };

    checkAuthStatus();
  }, [navigation]);

  return (
    <View style={{ marginTop: theme.spacing.lg, flex: 1, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('../../assets/icon.png')}
        style={{ width: 96, height: 96, marginBottom: 16 }}
        resizeMode="contain"
      />
      <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: 'bold' }}>S-Wallet</Text>
      <Text style={{ color: theme.colors.text, fontSize: 18, marginTop: 8 }}>Your Digital Wallet</Text>
    </View>
  );
}
