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
  Deposit: undefined;
  MainTabs: undefined;
};

type DepositScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Deposit'>;

export default function DepositScreen() {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<DepositScreenNavigationProp>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleDeposit = async () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }

    const depositAmount = parseFloat(amount);
    if (depositAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      await walletService.depositMoney(user.uid, depositAmount, method);

      dispatch(updateBalance(depositAmount));
      dispatch(addTransaction({
        id: Date.now().toString(),
        type: 'deposit',
        amount: depositAmount,
        description: `Deposit via ${method}`,
        date: new Date().toISOString(),
      }));

      Alert.alert('Success', 'Deposit successful!');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    { key: 'card', label: 'Card', icon: '💳' },
    { key: 'bank', label: 'Bank Transfer', icon: '🏦' },
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
              backgroundColor: theme.colors.warning,
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
                +
              </Text>
            </View>
            <Text style={{
              fontSize: theme.typography.fontSize.xxxl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
              textAlign: 'center',
              marginBottom: theme.spacing.sm
            }}>
              Deposit Money
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.md,
              color: theme.colors.textSecondary,
              textAlign: 'center'
            }}>
              Add funds to your wallet securely
            </Text>
          </View>

          <View style={{ marginBottom: theme.spacing.xxl }}>
            <Input
              label="Amount"
              placeholder="Enter amount to deposit"
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
                Payment Method
              </Text>
              <View style={{ gap: theme.spacing.sm }}>
                {paymentMethods.map((paymentMethod) => (
                  <TouchableOpacity
                    key={paymentMethod.key}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: theme.spacing.md,
                      borderRadius: theme.borderRadius.lg,
                      borderWidth: 2,
                      borderColor: method === paymentMethod.key ? theme.colors.primary : theme.colors.border,
                      backgroundColor: method === paymentMethod.key ? `${theme.colors.primary}10` : theme.colors.surface,
                      ...theme.shadows.sm
                    }}
                    onPress={() => setMethod(paymentMethod.key)}
                  >
                    <Text style={{
                      fontSize: theme.typography.fontSize.lg,
                      marginRight: theme.spacing.md
                    }}>
                      {paymentMethod.icon}
                    </Text>
                    <Text style={{
                      fontSize: theme.typography.fontSize.md,
                      fontWeight: theme.typography.fontWeight.medium,
                      color: theme.colors.text
                    }}>
                      {paymentMethod.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <Button
            title="Deposit Money"
            onPress={handleDeposit}
            loading={loading}
            disabled={!amount}
            size="lg"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
