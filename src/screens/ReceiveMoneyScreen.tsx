import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { theme } from '../theme';

export default function ReceiveMoneyScreen() {
  const { user } = useSelector((state: RootState) => state.auth);
  const walletId = user?.uid || 'demo-wallet-id';

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
              backgroundColor: theme.colors.success,
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
    </SafeAreaView>
  );
}
