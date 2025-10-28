import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OTPScreen from '../screens/OTPScreen';
import HomeScreen from '../screens/HomeScreen';
import SendMoneyScreen from '../screens/SendMoneyScreen';
import ReceiveMoneyScreen from '../screens/ReceiveMoneyScreen';
import DepositScreen from '../screens/DepositScreen';
import WithdrawScreen from '../screens/WithdrawScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // 👈 disable page header for all tab screens
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Send') {
            iconName = focused ? 'send' : 'send-outline';
          } else if (route.name === 'Receive') {
            iconName = focused ? 'qr-code' : 'qr-code-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Send" component={SendMoneyScreen} />
      <Tab.Screen name="Receive" component={ReceiveMoneyScreen} />
      <Tab.Screen name="History" component={TransactionHistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }} // 👈 disables headers for all stack screens
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Deposit" component={DepositScreen} />
        <Stack.Screen name="Withdraw" component={WithdrawScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
