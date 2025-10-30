import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateBalance } from '../store/slices/walletSlice';
import { addTransaction } from '../store/slices/transactionSlice';
import { walletService } from '../services/walletService';
import Button from '../components/Button';
import Input from '../components/Input';
import { useTheme } from '../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TopUpPage: React.FC = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { theme } = useTheme();

  const handleTopUp = async () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }

    const topUpAmount = parseFloat(amount);
    if (topUpAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      await walletService.depositMoney(user.uid, topUpAmount, method);

      dispatch(updateBalance(topUpAmount));
      dispatch(addTransaction({
        id: Date.now().toString(),
        type: 'deposit',
        amount: topUpAmount,
        description: `Top up via ${method}`,
        date: new Date().toISOString(),
      }));

      Alert.alert('Success', 'Top up successful!');
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
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <View style={{ marginTop: theme.spacing.xxl, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.lg, paddingBottom: theme.spacing.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: theme.spacing.md }}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={{ color: theme.colors.text, fontSize: theme.typography.fontSize.xl, fontWeight: 'bold' }}>Top Up</Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ padding: theme.spacing.lg }}>
          <View style={{ marginBottom: theme.spacing.xl }}>
            <Input
              label="Amount"
              placeholder="Enter amount to top up"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              labelStyle={{ color: theme.colors.text }}
              inputStyle={{ color: theme.colors.text }}
              placeholderTextColor={theme.colors.textSecondary}
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
                      backgroundColor: method === paymentMethod.key ? theme.colors.surface : theme.colors.surface,
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
            title="Top Up"
            onPress={handleTopUp}
            loading={loading}
            disabled={!amount}
            size="lg"
            style={{ backgroundColor: theme.colors.primary }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TopUpPage;
