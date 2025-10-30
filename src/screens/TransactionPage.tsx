
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import TransactionCard, { TransactionGroup } from '../components/TransactionCard';
import { mockTransactions } from '../mockData';

const groupTransactionsByDate = (transactions: any[]) => {
  const grouped: { [key: string]: any[] } = {};
  transactions.forEach(tx => {
    const date = new Date(tx.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(tx);
  });

  return Object.keys(grouped).map(date => ({ 
    date,
    items: grouped[date].map(tx => ({ ...tx, subAmount: `$${tx.amount.toFixed(2)}` }))
  }));
};

interface TransactionPageProps {
  onBack: () => void;
}

const TransactionPage: React.FC<TransactionPageProps> = ({ onBack }) => {
  const transactionGroups: TransactionGroup[] = groupTransactionsByDate(mockTransactions);
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <View style={{ paddingHorizontal: theme.spacing.lg,  paddingTop: theme.spacing.lg, paddingBottom: theme.spacing.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={onBack} style={{ marginRight: theme.spacing.md }}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={{ color: theme.colors.text, fontSize: theme.typography.fontSize.xl, fontWeight: 'bold' }}>Transactions</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: theme.spacing.lg, paddingBottom: 100 }}>
          {transactionGroups.map((group, index) => (
            <TransactionCard key={index} group={group} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TransactionPage;
