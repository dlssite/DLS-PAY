import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateBalance } from '../store/slices/walletSlice';
import { addTransaction } from '../store/slices/transactionSlice';
import { walletService } from '../services/walletService';
import Button from '../components/Button';
import Input from '../components/Input';
import { theme } from '../theme';

export default function SendMoneyScreen() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { balance, currency } = useSelector((state: RootState) => state.wallet);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSendMoney = async () => {
    if (!recipient || !amount) {
      Alert.alert('Error', 'Please fill in recipient and amount');
      return;
    }

    const sendAmount = parseFloat(amount);
    if (sendAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (sendAmount > balance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }

    setLoading(true);

    try {
      // Mock sending money (in real app, this would call the service)
      await walletService.sendMoney(user.uid, recipient, sendAmount, description || 'Money transfer');

      dispatch(updateBalance(-sendAmount));
      dispatch(addTransaction({
        id: Date.now().toString(),
        type: 'send',
        amount: sendAmount,
        description: description || 'Money transfer',
        date: new Date().toISOString(),
        recipient,
      }));

      Alert.alert('Success', 'Money sent successfully!');
      setRecipient('');
      setAmount('');
      setDescription('');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

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
              backgroundColor: theme.colors.primary,
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
                ↑
              </Text>
            </View>
            <Text style={{
              fontSize: theme.typography.fontSize.xxxl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
              textAlign: 'center',
              marginBottom: theme.spacing.sm
            }}>
              Send Money
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.md,
              color: theme.colors.textSecondary,
              textAlign: 'center'
            }}>
              Transfer money securely to anyone
            </Text>
          </View>

          <View style={{ marginBottom: theme.spacing.xxl }}>
            <Input
              label="Recipient (Username/Phone)"
              placeholder="Enter recipient's username or phone"
              value={recipient}
              onChangeText={setRecipient}
            />

            <Input
              label="Amount"
              placeholder="Enter amount to send"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />

            <Input
              label="Description (Optional)"
              placeholder="What's this for?"
              value={description}
              onChangeText={setDescription}
            />
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
            title="Send Money"
            onPress={handleSendMoney}
            loading={loading}
            disabled={!recipient || !amount}
            size="lg"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
