import React, { useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setTransactions } from '../store/slices/transactionSlice';
import { walletService } from '../services/walletService';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'deposit' | 'withdraw';
  amount: number;
  description: string;
  date: string;
  recipient?: string;
  sender?: string;
}

export default function TransactionHistoryScreen() {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state: RootState) => state.transaction);
  const { user } = useSelector((state: RootState) => state.auth);
  const { currency } = useSelector((state: RootState) => state.wallet);

  useEffect(() => {
    const loadTransactions = async () => {
      if (user?.uid) {
        try {
          const history = await walletService.getTransactionHistory(user.uid);
          dispatch(setTransactions(history));
        } catch (error) {
          console.error('Error loading transactions:', error);
        }
      }
    };

    loadTransactions();
  }, [user, dispatch]);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
        return 'arrow-up-circle';
      case 'receive':
        return 'arrow-down-circle';
      case 'deposit':
        return 'add-circle';
      case 'withdraw':
        return 'remove-circle';
      default:
        return 'help-circle';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'send':
      case 'withdraw':
        return theme.colors.error;
      case 'receive':
      case 'deposit':
        return theme.colors.success;
      default:
        return theme.colors.textSecondary;
    }
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
      borderRadius: theme.borderRadius.lg,
      ...theme.shadows.sm
    }}>
      <View style={{
        width: 48,
        height: 48,
        borderRadius: theme.borderRadius.full,
        backgroundColor: `${getTransactionColor(item.type)}20`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md
      }}>
        <Ionicons
          name={getTransactionIcon(item.type) as any}
          size={24}
          color={getTransactionColor(item.type)}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: theme.typography.fontSize.md,
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.text,
          marginBottom: theme.spacing.xs
        }}>
          {item.description}
        </Text>
        <Text style={{
          color: theme.colors.textSecondary,
          fontSize: theme.typography.fontSize.sm
        }}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
      <Text style={{
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
        color: getTransactionColor(item.type)
      }}>
        {item.type === 'send' || item.type === 'withdraw' ? '-' : '+'}{currency} {item.amount.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: theme.spacing.xl,
          paddingTop: theme.spacing.xxxl
        }}>
          <View style={{ alignItems: 'center', marginBottom: theme.spacing.xxl }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: theme.borderRadius.full,
              backgroundColor: theme.colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: theme.spacing.lg,
              ...theme.shadows.md
            }}>
              <Ionicons name="receipt" size={40} color={theme.colors.secondary} />
            </View>
            <Text style={{
              fontSize: theme.typography.fontSize.xxxl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
              textAlign: 'center',
              marginBottom: theme.spacing.sm
            }}>
              Transaction History
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.md,
              color: theme.colors.textSecondary,
              textAlign: 'center'
            }}>
              Your complete transaction record
            </Text>
          </View>
        </View>

        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.xl,
            paddingBottom: theme.spacing.xl
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: theme.spacing.xxxl
            }}>
              <View style={{
                width: 120,
                height: 120,
                borderRadius: theme.borderRadius.full,
                backgroundColor: theme.colors.surface,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: theme.spacing.lg,
                ...theme.shadows.sm
              }}>
                <Ionicons name="document-text-outline" size={48} color={theme.colors.textSecondary} />
              </View>
              <Text style={{
                color: theme.colors.textSecondary,
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.medium,
                marginBottom: theme.spacing.sm
              }}>
                No transactions yet
              </Text>
              <Text style={{
                color: theme.colors.textSecondary,
                fontSize: theme.typography.fontSize.md,
                textAlign: 'center',
                lineHeight: 24
              }}>
                Your transaction history will appear here once you start using your wallet
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
