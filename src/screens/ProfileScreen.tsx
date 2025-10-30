import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { mockUsers } from '../mockData';
import Button from '../components/Button';
import CreditCard from '../components/CreditCard';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  // Get current user (using first user from mock data for now)
  const user = mockUsers[0];

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleSecurity = () => {
    Alert.alert('Security', 'Security settings feature coming soon!');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Customer support feature coming soon!');
  };

  const handleConnectDiscord = () => {
    Alert.alert('Connect Discord', 'Discord integration coming soon!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => navigation.navigate('Login' as never) }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      {/* Header */}
      <View style={{ paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.lg, paddingBottom: theme.spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: theme.spacing.md }}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={{ color: theme.colors.text, fontSize: theme.typography.fontSize.xl, fontWeight: 'bold' }}>Profile</Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Profile Header */}
        <View style={{ paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.xl }}>
          <View style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.xl,
            alignItems: 'center',
            ...theme.shadows.md
          }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: theme.spacing.lg
            }}>
              <Text style={{ fontSize: 32, color: theme.colors.secondary, fontWeight: 'bold' }}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <Text style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: 'bold',
              color: theme.colors.text,
              marginBottom: theme.spacing.xs
            }}>
              {user.name}
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.md,
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.sm
            }}>
              {user.email}
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.textSecondary
            }}>
              Wallet ID: {user.walletId}
            </Text>
          </View>

          {/* Connect Discord Button */}
          <TouchableOpacity
            onPress={handleConnectDiscord}
            style={{
              backgroundColor: '#5865F2',
              borderRadius: theme.borderRadius.md,
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.lg,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: theme.spacing.lg,
              ...theme.shadows.sm
            }}
          >
            <Ionicons name="logo-discord" size={20} color="white" style={{ marginRight: theme.spacing.sm }} />
            <Text style={{
              color: 'white',
              fontSize: theme.typography.fontSize.md,
              fontWeight: 'bold'
            }}>
              Connect Discord
            </Text>
          </TouchableOpacity>
        </View>

        {/* Credit Card Design */}
        <View style={{ paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.xl, alignItems: 'center' }}>
          <CreditCard
            cardHolder={user.name}
            cardNumber="5453200000001234"
            expiryDate="12/28"
            ccv="123"
          />
        </View>

        {/* Action Buttons */}
        <View style={{ paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.xl }}>
          <View style={{ gap: theme.spacing.md }}>
            <TouchableOpacity
              onPress={handleEditProfile}
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.lg,
                paddingVertical: theme.spacing.lg,
                paddingHorizontal: theme.spacing.xl,
                alignItems: 'center',
                ...theme.shadows.sm
              }}
            >
              <Text style={{
                color: theme.colors.text,
                fontSize: theme.typography.fontSize.md,
                fontWeight: 'bold'
              }}>
                Edit Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSecurity}
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.lg,
                paddingVertical: theme.spacing.lg,
                paddingHorizontal: theme.spacing.xl,
                alignItems: 'center',
                ...theme.shadows.sm
              }}
            >
              <Text style={{
                color: theme.colors.text,
                fontSize: theme.typography.fontSize.md,
                fontWeight: 'bold'
              }}>
                Security Settings
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSupport}
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.lg,
                paddingVertical: theme.spacing.lg,
                paddingHorizontal: theme.spacing.xl,
                alignItems: 'center',
                ...theme.shadows.sm
              }}
            >
              <Text style={{
                color: theme.colors.text,
                fontSize: theme.typography.fontSize.md,
                fontWeight: 'bold'
              }}>
                Support & Help
              </Text>
            </TouchableOpacity>

            <Button
              title="Logout"
              onPress={handleLogout}
              size="lg"
              style={{ backgroundColor: '#ff4444' }}
            />
          </View>
        </View>

        {/* App Version */}
        <View style={{ paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.xl, alignItems: 'center' }}>
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary
          }}>
            Sanctyr Wallet v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
