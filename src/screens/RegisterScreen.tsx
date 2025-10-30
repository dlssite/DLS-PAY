import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, StatusBar, useColorScheme, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '../store/slices/authSlice';
import { authService } from '../services/authService';
import Button from '../components/Button';
import Input from '../components/Input';
import { enhancedTheme } from '../enhanced-theme';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  MainTabs: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [loading, setLocalLoading] = useState(false);
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const theme = isDarkMode ? enhancedTheme.dark : enhancedTheme.light;

  const handleCreateWallet = async () => {
    if (passcode && passcode !== confirmPasscode) {
      Alert.alert('Error', 'Passcodes do not match');
      return;
    }

    setLocalLoading(true);
    dispatch(setLoading(true));

    try {
      const result = await authService.createWallet(passcode || undefined);
      dispatch(setUser(result.user));
      Alert.alert(
        'Wallet Created!',
        `Your wallet ID is: ${result.walletId}\n\nKeep this ID safe - you'll need it to access your wallet.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.replace('MainTabs')
          }
        ]
      );
    } catch (error: any) {
      Alert.alert('Wallet Creation Failed', error.message);
    } finally {
      setLocalLoading(false);
      dispatch(setLoading(false));
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.colors.background} />
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ padding: theme.spacing.xl }}>
          <View style={{ marginTop: theme.spacing.lg, alignItems: 'center', marginBottom: theme.spacing.xxxl }}>
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
                color: theme.colors.text,
                fontWeight: theme.typography.fontWeight.bold
              }}>
                ₦
              </Text>
            </View>
            <Text style={{
              fontSize: theme.typography.fontSize.xxxl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
              textAlign: 'center',
              marginBottom: theme.spacing.sm
            }}>
              Create Your Wallet
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.md,
              color: theme.colors.textSecondary,
              textAlign: 'center'
            }}>
              Get started with your digital wallet
            </Text>
          </View>

          <View style={{ marginBottom: theme.spacing.xxl }}>
            <Text style={{
              fontSize: theme.typography.fontSize.md,
              color: theme.colors.textSecondary,
              textAlign: 'center',
              marginBottom: theme.spacing.lg,
              lineHeight: 20
            }}>
              Your wallet will be automatically assigned a unique ID. You can optionally set a passcode for additional security.
            </Text>

            <Input
              label="Passcode (Optional)"
              placeholder="Set a 4-6 digit passcode"
              value={passcode}
              onChangeText={setPasscode}
              secureTextEntry
              keyboardType="numeric"
              maxLength={6}
            />

            <Input
              label="Confirm Passcode"
              placeholder="Confirm your passcode"
              value={confirmPasscode}
              onChangeText={setConfirmPasscode}
              secureTextEntry
              keyboardType="numeric"
              maxLength={6}
            />
          </View>

          <Button
            title="Create Wallet"
            onPress={handleCreateWallet}
            loading={loading}
            size="lg"
          />

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: theme.spacing.xl
          }}>
            <Text style={{
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.md
            }}>
              Already have a wallet?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{
                color: theme.colors.primary,
                fontSize: theme.typography.fontSize.md,
                fontWeight: theme.typography.fontWeight.semibold
              }}>
                Access It
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: theme.spacing.lg }}>
            <Text style={{ color: theme.colors.text, marginRight: theme.spacing.sm }}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: theme.colors.primaryLight }}
              thumbColor={isDarkMode ? theme.colors.primary : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleTheme}
              value={isDarkMode}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
