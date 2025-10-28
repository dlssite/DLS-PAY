
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import PromotionCard from '../components/PromotionCard';
import TransactionCard, { TransactionGroup } from '../components/TransactionCard';
import { mockTransactions, activePromotions, mockUsers } from '../mockData';
import CompatibleGames from '../components/CompatibleGames';
import Header from '../components/Header';

// Helper function to group transactions by date
const groupTransactionsByDate = (transactions: any[]): TransactionGroup[] => {
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

type RootStackParamList = {
  MainTabs: { screen: string };
  TransactionHistory: undefined;
  Transfer: undefined;
  TopUp: undefined;
  Settings: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  // Get user and transactions from mock data
  const user = mockUsers[0];
  const recentTransactions = mockTransactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 3);
  const transactionGroups = groupTransactionsByDate(recentTransactions);

  // Navigation handlers
  const onSeeAll = () => navigation.navigate('MainTabs', { screen: 'History' });
  const onTransfer = () => navigation.navigate('Transfer');
  const onTopUp = () => navigation.navigate('TopUp');
  const onSettings = () => navigation.navigate('Settings');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1C1C23' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1C23" />
      <Header onSettingsPress={onSettings} />
      <ScrollView>
        {/* Balance Card */}
        <View style={{ paddingHorizontal: theme.spacing.lg }}>
          <View style={{
            backgroundColor: '#2A2A37',
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.lg,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 36, fontWeight: 'bold' }}>${user.balance.toFixed(2)}</Text>
                  <TouchableOpacity style={{ marginLeft: theme.spacing.sm }}>
                    <Ionicons name="chevron-down-outline" size={20} color="white" />
                  </TouchableOpacity>
                </View>
                <Text style={{ color: '#A0A0A0', fontSize: theme.typography.fontSize.sm }}>USD</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: theme.spacing.lg }}>
              <TouchableOpacity
                onPress={onTransfer}
                style={{
                  flex: 1,
                  backgroundColor: '#393948',
                  paddingVertical: theme.spacing.md,
                  borderRadius: theme.borderRadius.md,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: theme.spacing.sm,
                }}>
                <Ionicons name="swap-horizontal" size={16} color="white" />
                <Text style={{ color: 'white', marginLeft: theme.spacing.sm }}>Transfer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onTopUp}
                style={{
                  flex: 1,
                  backgroundColor: '#FF4D6D',
                  paddingVertical: theme.spacing.md,
                  borderRadius: theme.borderRadius.md,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: theme.spacing.sm,
                }}>
                <Ionicons name="add" size={20} color="white" />
                <Text style={{ color: 'white', marginLeft: theme.spacing.sm }}>Top Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Active Promotions */}
        <View style={{ paddingHorizontal: theme.spacing.lg, marginTop: theme.spacing.xl }}>
          <Text style={{ color: 'white', fontSize: theme.typography.fontSize.lg, fontWeight: 'bold', marginBottom: theme.spacing.md }}>
            Active Promotions
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {activePromotions.map((promo, index) => (
              <PromotionCard key={index} promo={promo} />
            ))}
          </ScrollView>
        </View>

        {/* Transactions */}
        <View style={{ paddingHorizontal: theme.spacing.lg, marginTop: theme.spacing.xl }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.md }}>
            <Text style={{ color: 'white', fontSize: theme.typography.fontSize.lg, fontWeight: 'bold' }}>Transactions</Text>
            <TouchableOpacity onPress={onSeeAll}>
              <Text style={{ color: '#FF4D6D' }}>See all</Text>
            </TouchableOpacity>
          </View>
          {transactionGroups.map((group, index) => (
            <TransactionCard key={index} group={group} />
          ))}
        </View>

        {/* AppCoins Compatible Games */}
        <CompatibleGames />
      </ScrollView>
    </SafeAreaView>
  );
}
