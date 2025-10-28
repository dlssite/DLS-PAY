import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateBalance } from '../store/slices/walletSlice';
import { addTransaction } from '../store/slices/transactionSlice';
import { walletService } from '../services/walletService';
import Button from '../components/Button';
import Input from '../components/Input';
import { theme } from '../theme';

const SendTab = () => {
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
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ padding: theme.spacing.xl }}>
          <View style={{ alignItems: 'center', marginBottom: theme.spacing.xxxl }}>
            
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
  );
};

const ReceiveTab = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const walletId = user?.uid || 'demo-wallet-id';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
    <View style={{ padding: theme.spacing.xl }}>
      <View style={{ alignItems: 'center', marginBottom: theme.spacing.xxxl }}>
        
        <Text style={{
          fontSize: theme.typography.fontSize.xxxl,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text,
          textAlign: 'center',
          marginBottom: theme.spacing.sm
        }}>
          Receive Money
        </Text>
        <Text style={{
          fontSize: theme.typography.fontSize.md,
          color: theme.colors.textSecondary,
          textAlign: 'center'
        }}>
          Share your QR code or wallet ID
        </Text>
      </View>

      <View style={{ alignItems: 'center', marginBottom: theme.spacing.xxl }}>
        <Text style={{
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.text,
          marginBottom: theme.spacing.lg,
          textAlign: 'center'
        }}>
          Scan QR Code to Receive Money
        </Text>
        <View style={{
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.xl,
          borderRadius: theme.borderRadius.lg,
          ...theme.shadows.md
        }}>
          <QRCode
            value={walletId}
            size={200}
            color={theme.colors.text}
            backgroundColor={theme.colors.surface}
          />
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
          Your Wallet ID
        </Text>
        <Text style={{
          fontSize: theme.typography.fontSize.lg,
          fontFamily: 'monospace',
          color: theme.colors.text,
          fontWeight: theme.typography.fontWeight.medium
        }}>
          {walletId}
        </Text>
      </View>

      <Text style={{
        color: theme.colors.textSecondary,
        textAlign: 'center',
        fontSize: theme.typography.fontSize.md,
        lineHeight: 24
      }}>
        Share your wallet ID or QR code with anyone who wants to send you money
      </Text>
    </View>
  </ScrollView>
  );
};

interface TransferPageProps {
  onBack: () => void;
}

const TransferPage: React.FC<TransferPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('Send');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1C1C23' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1C23" />
      <View style={{ marginTop: theme.spacing.lg, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.lg, paddingBottom: theme.spacing.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={onBack} style={{ marginRight: theme.spacing.md }}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: theme.typography.fontSize.xl, fontWeight: 'bold' }}>Transfer</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.lg }}>
        <TouchableOpacity onPress={() => setActiveTab('Send')} style={{ 
          flex: 1,
          paddingVertical: theme.spacing.md, 
          borderBottomWidth: activeTab === 'Send' ? 2 : 0, 
          borderBottomColor: '#FF4D6D' 
        }}>
          <Text style={{ 
            color: activeTab === 'Send' ? '#FF4D6D' : 'white', 
            textAlign: 'center', 
            fontWeight: 'bold' 
          }}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Receive')} style={{ 
          flex: 1,
          paddingVertical: theme.spacing.md, 
          borderBottomWidth: activeTab === 'Receive' ? 2 : 0, 
          borderBottomColor: '#FF4D6D' 
        }}>
          <Text style={{ 
            color: activeTab === 'Receive' ? '#FF4D6D' : 'white', 
            textAlign: 'center', 
            fontWeight: 'bold' 
          }}>Receive</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Send' ? <SendTab /> : <ReceiveTab />}
    </SafeAreaView>
  );
};

export default TransferPage;
