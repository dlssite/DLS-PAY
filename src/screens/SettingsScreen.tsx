import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { View, Text, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const [biometricLock, setBiometricLock] = useState(false);

  const settingsOptions = [
    { title: 'Manage Wallets', icon: 'wallet-outline' },
    { title: 'Manage Subscriptions', icon: 'lock-closed-outline' },
    { title: 'Manage Credit/Debit Cards', icon: 'card-outline' },
    { title: 'Currency', icon: 'cash-outline', right: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: 'https://www.countryflags.io/us/flat/64.png' }} style={{ width: 24, height: 24, marginRight: theme.spacing.sm }} />
        <Text style={{ color: theme.colors.text, fontSize: theme.typography.fontSize.md }}>USD</Text>
      </View>
    )},
    { title: 'Biometric Lock', icon: 'finger-print-outline', right: () => (
      <Switch
        value={biometricLock}
        onValueChange={setBiometricLock}
        trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
        thumbColor={biometricLock ? theme.colors.secondary : theme.colors.text}
      />
    )},
    { title: 'Theme', icon: 'color-palette-outline', right: () => (
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
        thumbColor={isDarkMode ? theme.colors.secondary : theme.colors.text}
      />
    )},
    { title: 'Check for Updates', icon: 'refresh-outline', subtitle: 'Current version 3.33.2' },
  ];

  const communityOptions = [
    { title: 'X', icon: 'logo-twitter' },
    { title: 'Facebook', icon: 'logo-facebook' },
  ];

  const renderSettingItem = (item: any, index: number) => (
    <TouchableOpacity key={index} style={{
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={item.icon} size={24} color={theme.colors.primary} style={{ marginRight: theme.spacing.md }} />
        <View>
          <Text style={{ color: theme.colors.text, fontSize: theme.typography.fontSize.md }}>{item.title}</Text>
          {item.subtitle && <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.sm, marginTop: 2 }}>{item.subtitle}</Text>}
        </View>
      </View>
      {item.right && item.right()}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ marginTop: theme.spacing.lg, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.lg, paddingBottom: theme.spacing.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={{ color: theme.colors.text, fontSize: theme.typography.fontSize.xl, fontWeight: 'bold' }}>Settings</Text>
        <TouchableOpacity>
          <Ionicons name="help-circle-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.md }}>
        {settingsOptions.map(renderSettingItem)}

        <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.md, marginTop: theme.spacing.xl, marginBottom: theme.spacing.md }}>Community</Text>
        {communityOptions.map(renderSettingItem)}
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
