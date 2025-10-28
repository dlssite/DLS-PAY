import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '../store';
import { setBalance } from '../store/slices/walletSlice';
import { walletService } from '../services/walletService';
import { theme } from '../theme';

type RootStackParamList = {
  MainTabs: undefined;
  Deposit: undefined;
  Withdraw: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch();
  const { balance, currency } = useSelector((state: RootState) => state.wallet);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const loadBalance = async () => {
      if (user?.uid) {
        try {
          const userBalance = await walletService.getBalance(user.uid);
          dispatch(setBalance(userBalance));
        } catch (error) {
          console.error('Error loading balance:', error);
        }
      }
    };

    loadBalance();
  }, [user, dispatch]);

  const quickActions = [
    {
      title: 'Send Money',
      icon: 'send',
      onPress: () => navigation.navigate('MainTabs', { screen: 'Send' }),
      color: theme.colors.primary,
    },
    {
      title: 'Receive Money',
      icon: 'qr-code',
      onPress: () => navigation.navigate('MainTabs', { screen: 'Receive' }),
      color: theme.colors.success,
    },
    {
      title: 'Deposit',
      icon: 'add-circle',
      onPress: () => navigation.navigate('Deposit'),
      color: theme.colors.warning,
    },
    {
      title: 'Withdraw',
      icon: 'remove-circle',
      onPress: () => navigation.navigate('Withdraw'),
      color: theme.colors.error,
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
            <View>
              <Text style={{
                color: theme.colors.secondary,
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.medium,
                marginBottom: theme.spacing.xs
              }}>
                Welcome back
              </Text>
              <Text style={{
                color: theme.colors.secondary,
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.bold
              }}>
                {user?.email?.split('@')[0] || 'User'}
              </Text>
            </View>
            <TouchableOpacity style={{
              width: 48,
              height: 48,
              borderRadius: theme.borderRadius.full,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Ionicons name="notifications" size={24} color={theme.colors.secondary} />
            </TouchableOpacity>
          </View>

          <View style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.xl,
            marginTop: theme.spacing.lg,
            ...theme.shadows.md
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.sm }}>
              <Text style={{
                color: theme.colors.textSecondary,
                fontSize: theme.typography.fontSize.md,
                fontWeight: theme.typography.fontWeight.medium
              }}>
                Current Balance
              </Text>
              <TouchableOpacity>
                <Ionicons name="eye" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={{
              color: theme.colors.text,
              fontSize: theme.typography.fontSize.xxxl,
              fontWeight: theme.typography.fontWeight.bold
            }}>
              {currency} {balance.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ padding: theme.spacing.xl }}>
          <Text style={{
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text,
            marginBottom: theme.spacing.lg
          }}>
            Quick Actions
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: theme.colors.surface,
                  width: '48%',
                  padding: theme.spacing.lg,
                  borderRadius: theme.borderRadius.lg,
                  alignItems: 'center',
                  marginBottom: theme.spacing.md,
                  ...theme.shadows.sm,
                }}
                onPress={action.onPress}
              >
                <View style={{
                  width: 56,
                  height: 56,
                  borderRadius: theme.borderRadius.full,
                  backgroundColor: `${action.color}15`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: theme.spacing.sm
                }}>
                  <Ionicons name={action.icon as any} size={28} color={action.color} />
                </View>
                <Text style={{
                  fontSize: theme.typography.fontSize.md,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text,
                  textAlign: 'center'
                }}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={{ padding: theme.spacing.xl, paddingTop: 0 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
            <Text style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text
            }}>
              Recent Transactions
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'History' })}>
              <Text style={{
                color: theme.colors.primary,
                fontSize: theme.typography.fontSize.md,
                fontWeight: theme.typography.fontWeight.semibold
              }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.xl,
            alignItems: 'center',
            ...theme.shadows.sm
          }}>
            <Ionicons name="receipt" size={48} color={theme.colors.textSecondary} style={{ marginBottom: theme.spacing.md }} />
            <Text style={{
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.md,
              textAlign: 'center'
            }}>
              No recent transactions
            </Text>
            <Text style={{
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.sm,
              textAlign: 'center',
              marginTop: theme.spacing.xs
            }}>
