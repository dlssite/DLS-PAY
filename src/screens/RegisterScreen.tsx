import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '../store/slices/authSlice';
import { authService } from '../services/authService';
import Button from '../components/Button';
import Input from '../components/Input';
import { theme } from '../theme';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  OTP: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLocalLoading] = useState(false);
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLocalLoading(true);
    dispatch(setLoading(true));

    try {
      const user = await authService.registerWithEmail(email, password);
      dispatch(setUser(user));
      navigation.navigate('OTP');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLocalLoading(false);
      dispatch(setLoading(false));
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
              Create Account
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.md,
              color: theme.colors.textSecondary,
              textAlign: 'center'
            }}>
              Join our E-Wallet community
            </Text>
          </View>

          <View style={{ marginBottom: theme.spacing.xxl }}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <Button
            title="Create Account"
            onPress={handleRegister}
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
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{
                color: theme.colors.primary,
                fontSize: theme.typography.fontSize.md,
                fontWeight: theme.typography.fontWeight.semibold
              }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
