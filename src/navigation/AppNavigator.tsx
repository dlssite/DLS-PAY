
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabNavigator from './MainTabNavigator';
import TransactionPage from '../screens/TransactionPage';
import TransferPage from '../screens/TransferPage';
import TopUpPage from '../screens/TopUpPage';
import SettingsScreen from '../screens/SettingsScreen';
import BonusScreen from '../screens/BonusScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="TransactionHistory" component={TransactionPage} />
        <Stack.Screen name="Transfer" component={TransferPage} options={{ presentation: 'modal' }} />
        <Stack.Screen name="TopUp" component={TopUpPage} options={{ presentation: 'modal' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Bonus" component={BonusScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
