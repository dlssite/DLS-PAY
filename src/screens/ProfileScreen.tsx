import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, SafeAreaView, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { authService } from '../services/authService';
import { theme } from '../theme';

type RootStackParamList = {
  Profile: undefined;
  Login: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await authService.logout();
              dispatch(logout());
              navigation.replace('Login');
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      title: 'Personal Information',
      icon: 'person-outline',
      onPress: () => Alert.alert('Coming Soon', 'This feature is under development'),
      color: theme.colors.primary,
    },
    {
      title: 'Security Settings',
      icon: 'shield-outline',
      onPress: () => Alert.alert('Coming Soon', 'This feature is under development'),
      color: theme.colors.success,
    },
    {
      title: 'Notifications',
      icon: 'notifications-outline',
      onPress: () => Alert.alert('Coming Soon', 'This feature is under development'),
      color: theme.colors.warning,
    },
    {
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => Alert.alert('Coming Soon', 'This feature is under development'),
      color: theme.colors.primary,
    },
    {
      title: 'About',
      icon: 'information-circle-outline',
      onPress: () => Alert.alert('E-Wallet App', 'Version 1.0.0\nA digital wallet for all your financial needs.'),
      color: theme.colors.textSecondary,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        {/* Header */}
        <View style={{
          backgroundColor: theme.colors.primary,
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: theme.spacing.xxl,
          paddingTop: theme.spacing.xxxl
        }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{
              width: 100,
              height: 100,
              borderRadius: theme.borderRadius.full,
              backgroundColor: theme.colors.secondary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: theme.spacing.lg,
              ...theme.shadows.md
            }}>
              <Ionicons name="person" size={48} color={theme.colors.primary} />
            </View>
            <Text style={{
              color: theme.colors.secondary,
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              marginBottom: theme.spacing.xs
            }}>
              {user?.email?.split('@')[0] || 'User'}
            </Text>
            <Text style={{
              color: theme.colors.secondary,
              fontSize: theme.typography.fontSize.sm,
              opacity: 0.8
            }}>
              Wallet ID: {user?.uid?.slice(0, 8) || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={{ padding: theme.spacing.xl }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: theme.colors.surface,
                padding: theme.spacing.lg,
                marginBottom: theme.spacing.sm,
                borderRadius: theme.borderRadius.lg,
                ...theme.shadows.sm
              }}
              onPress={item.onPress}
            >
              <View style={{
                width: 40,
                height: 40,
                borderRadius: theme.borderRadius.md,
                backgroundColor: `${item.color}20`,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: theme.spacing.md
              }}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <Text style={{
                flex: 1,
                fontSize: theme.typography.fontSize.md,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.colors.text
              }}>
                {item.title}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme.colors.error + '20',
              padding: theme.spacing.lg,
              marginTop: theme.spacing.lg,
              borderRadius: theme.borderRadius.lg,
              borderWidth: 1,
              borderColor: theme.colors.error + '30'
            }}
            onPress={handleLogout}
          >
            <View style={{
              width: 40,
              height: 40,
              borderRadius: theme.borderRadius.md,
              backgroundColor: theme.colors.error + '30',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: theme.spacing.md
            }}>
              <Ionicons name="log-out-outline" size={20} color={theme.colors.error} />
            </View>
            <Text style={{
              flex: 1,
              fontSize: theme.typography.fontSize.md,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.error
            }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
