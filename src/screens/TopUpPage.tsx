import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateBalance } from '../store/slices/walletSlice';
import { addTransaction } from '../store/slices/transactionSlice';
import { walletService } from '../services/walletService';
import Button from '../components/Button';
import Input from '../components/Input';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

interface TopUpPageProps {
  onBack: () => void;
}

const TopUpPage: React.FC<TopUpPageProps> = ({ onBack }) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

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
      onBack();
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1C1C23' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1C23" />
      <View style={{ marginTop: theme.spacing.lg, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.lg, paddingBottom: theme.spacing.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={onBack} style={{ marginRight: theme.spacing.md }}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: theme.typography.fontSize.xl, fontWeight: 'bold' }}>Top Up</Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: '#1C1C23' }}>
        <View style={{ padding: theme.spacing.lg }}>
          <View style={{ marginBottom: theme.spacing.xl }}>
            <Input
              label="Amount"
              placeholder="Enter amount to top up"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              labelStyle={{ color: 'white' }}
              inputStyle={{ color: 'white' }}
              placeholderTextColor="#A0A0A0"
            />

            <View style={{ marginBottom: theme.spacing.lg }}>
              <Text style={{
                color: 'white',
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
                      borderColor: method === paymentMethod.key ? '#FF4D6D' : '#2A2A37',
                      backgroundColor: method === paymentMethod.key ? '#393948' : '#2A2A37',
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
                      color: 'white'
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
            style={{ backgroundColor: '#FF4D6D' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopUpPage;
