
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// Screens
import HomeScreen from '../screens/HomeScreen';
import RewardsScreen from '../screens/RewardsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminScreen from '../screens/AdminScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const { theme } = useTheme();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Rewards') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Admin') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
            paddingTop: theme.spacing.sm,
            height: 90,
        },
        tabBarLabelStyle: {
            fontSize: theme.typography.fontSize.xs,
            marginTop: 2,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Rewards" component={RewardsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {user?.isAdmin && <Tab.Screen name="Admin" component={AdminScreen} />}
    </Tab.Navigator>
  );
}
