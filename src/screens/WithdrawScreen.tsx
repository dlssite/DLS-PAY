import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from '../store';
import { updateBalance } from '../store/slices/walletSlice';
import { addTransaction } from '../store/slices/transactionSlice';
import { walletService } from '../services/walletService';
import Button from '../components/Button';
import Input from '../components/Input';
import { theme } from '../theme';

type RootStackParamList = {
  Withdraw: undefined;
  MainTabs: undefined;
};

type WithdrawScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Withdraw'>;

export default function WithdrawScreen() {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bank');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<WithdrawScreenNavigationProp>();
  const { balance, currency } = useSelector((state: RootState) => state.wallet);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleWithdraw = async () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }

    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (withdrawAmount > balance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }

    setLoading(true);

    try {
      await walletService.withdrawMoney(user.uid, withdrawAmount, method);

      dispatch(updateBalance(-withdrawAmount));
      dispatch(addTransaction({
        id: Date.now().toString(),
        type: 'withdraw',
        amount: withdrawAmount,
        description: `Withdrawal via ${method}`,
        date: new Date().toISOString(),
      }));

      Alert.alert('Success', 'Withdrawal successful!');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const withdrawalMethods = [
    { key: 'bank', label: 'Bank Transfer', icon: '🏦' },
    { key: 'card', label: 'Card', icon: '💳' },
    { key: 'mobile', label: 'Mobile Money', icon: '📱' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ padding: theme.spacing.xl }}>
          <View style={{ alignItems: 'center', marginBottom: theme.spacing.xxxl }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: theme.borderRadius.full,
              backgroundColor: theme.colors.error,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: theme.spacing.lg,
              ...theme.shadows.md
            }}>
              <Text style={{
                fontSize: theme.typography.fontSize.xxxl,
                color: theme.colors.secondary,
                fontWeight: theme.typography.fontWeight.bold
              }}>
                ↓
              </Text>
            </View>
            <Text style={{
              fontSize: theme.typography.fontSize.xxxl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
              textAlign: 'center',
              marginBottom: theme.spacing.sm
            }}>
              Withdraw Money
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.md,
              color: theme.colors.textSecondary,
              textAlign: 'center'
            }}>
              Withdraw funds from your wallet
            </Text>
          </View>

          <View style={{ marginBottom: theme.spacing.xxl }}>
            <Input
              label="Amount"
              placeholder="Enter amount to withdraw"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />

            <View style={{ marginBottom: theme.spacing.lg }}>
              <Text style={{
                color: theme.colors.text,
                fontWeight: theme.typography.fontWeight.medium,
                marginBottom: theme.spacing.md,
                fontSize: theme.typography.fontSize.md
              }}>
                Withdrawal Method
              </Text>
              <View style={{ gap: theme.spacing.sm }}>
                {withdrawalMethods.map((withdrawalMethod) => (
                  <TouchableOpacity
                    key={withdrawalMethod.key}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: theme.spacing.md,
                      borderRadius: theme.borderRadius.lg,
                      borderWidth: 2,
                      borderColor: method === withdrawalMethod.key ? theme.colors.primary : theme.colors.border,
                      backgroundColor: method === withdrawalMethod.key ? `${theme.colors.primary}10` : theme.colors.surface,
                      ...theme.shadows.sm
                    }}
                    onPress={() => setMethod(withdrawalMethod.key)}
                  >
                    <Text style={{
                      fontSize: theme.typography.fontSize.lg,
                      marginRight: theme.spacing.md
                    }}>
                      {withdrawalMethod.icon}
                    </Text>
                    <Text style={{
                      fontSize: theme.typography.fontSize.md,
                      fontWeight: theme.typography.fontWeight.medium,
                      color: theme.colors.text
                    }}>
                      {withdrawalMethod.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.lg,
            marginBottom: theme.spacing.xl,
            ...theme.shadows.sm
          }}>
            <Text style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.xs
            }}>
              Available Balance
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text
            }}>
              {currency} {balance.toFixed(2)}
            </Text>
          </View>

          <Button
            title="Withdraw Money"
            onPress={handleWithdraw}
            loading={loading}
            disabled={!amount}
            size="lg"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
