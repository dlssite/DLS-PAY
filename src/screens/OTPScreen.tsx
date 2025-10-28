import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../components/Button';
import { theme } from '../theme';

type RootStackParamList = {
  OTP: undefined;
  MainTabs: undefined;
};

type OTPScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OTP'>;

export default function OTPScreen() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<OTPScreenNavigationProp>();

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);

    // Mock OTP verification
    setTimeout(() => {
      if (otp === '123456') {
        Alert.alert('Success', 'Account verified successfully!');
        navigation.replace('MainTabs');
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <View style={{ flex: 1, padding: theme.spacing.xl }}>
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
              🔒
            </Text>
          </View>
          <Text style={{
            fontSize: theme.typography.fontSize.xxxl,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text,
            textAlign: 'center',
            marginBottom: theme.spacing.sm
          }}>
            Verify Your Account
          </Text>
          <Text style={{
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            lineHeight: 24
          }}>
            We've sent a 6-digit code to your phone number
          </Text>
        </View>

        <View style={{ alignItems: 'center', marginBottom: theme.spacing.xxxl }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: theme.spacing.xl }}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <View
                key={index}
                style={{
                  width: 48,
                  height: 48,
                  borderWidth: 2,
                  borderColor: otp[index] ? theme.colors.primary : theme.colors.border,
                  borderRadius: theme.borderRadius.lg,
                  marginHorizontal: theme.spacing.xs,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: otp[index] ? theme.colors.primary + '10' : theme.colors.surface,
                  ...theme.shadows.sm
                }}
              >
                <Text style={{
                  fontSize: theme.typography.fontSize.xxl,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: otp[index] ? theme.colors.primary : theme.colors.textSecondary
                }}>
                  {otp[index] || ''}
                </Text>
              </View>
            ))}
          </View>

          <TextInput
            style={{
              position: 'absolute',
              opacity: 0,
              width: 1,
              height: 1,
            }}
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
            maxLength={6}
            autoFocus
          />

          <Text style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.fontSize.sm,
            textAlign: 'center',
            marginBottom: theme.spacing.lg
          }}>
            Enter the 6-digit code
          </Text>
        </View>

        <Button
          title="Verify Code"
          onPress={handleVerifyOTP}
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
            Didn't receive the code?{' '}
          </Text>
          <Text style={{
            color: theme.colors.primary,
            fontSize: theme.typography.fontSize.md,
            fontWeight: theme.typography.fontWeight.semibold
          }}>
            Resend in 30s
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
