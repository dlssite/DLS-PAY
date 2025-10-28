import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [biometricLock, setBiometricLock] = useState(false);

  const settingsOptions = [
    { title: 'Manage Wallets', icon: 'wallet-outline' },
    { title: 'Manage Subscriptions', icon: 'lock-closed-outline' },
    { title: 'Manage Credit/Debit Cards', icon: 'card-outline' },
    { title: 'Currency', icon: 'cash-outline', right: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: 'https://www.countryflags.io/us/flat/64.png' }} style={{ width: 24, height: 24, marginRight: theme.spacing.sm }} />
        <Text style={{ color: 'white', fontSize: theme.typography.fontSize.md }}>USD</Text>
      </View>
    )},    
    { title: 'Biometric Lock', icon: 'finger-print-outline', right: () => (
      <Switch 
        value={biometricLock} 
        onValueChange={setBiometricLock}
        trackColor={{ false: '#393948', true: '#FF4D6D' }}
        thumbColor={biometricLock ? 'white' : 'white'}
      />
    )},    
    { title: 'Check for Updates', icon: 'refresh-outline', subtitle: 'Current version 3.33.2' },
  ];

  const communityOptions = [
    { title: 'X', icon: 'logo-twitter' },
    { title: 'Facebook', icon: 'logo-facebook' },
  ];

  const renderSettingItem = (item, index) => (
    <TouchableOpacity key={index} style={{ 
      backgroundColor: '#2A2A37',
      borderRadius: theme.borderRadius.lg, 
      padding: theme.spacing.lg, 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={item.icon} size={24} color="#FF4D6D" style={{ marginRight: theme.spacing.md }} />
        <View>
          <Text style={{ color: 'white', fontSize: theme.typography.fontSize.md }}>{item.title}</Text>
          {item.subtitle && <Text style={{ color: '#A0A0A0', fontSize: theme.typography.fontSize.sm, marginTop: 2 }}>{item.subtitle}</Text>}
        </View>
      </View>
      {item.right && item.right()}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#1C1C23' }}>
      <View style={{ marginTop: theme.spacing.lg, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.lg, paddingBottom: theme.spacing.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: theme.typography.fontSize.xl, fontWeight: 'bold' }}>Settings</Text>
        <TouchableOpacity>
          <Ionicons name="help-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.md }}>
        {settingsOptions.map(renderSettingItem)}

        <Text style={{ color: '#A0A0A0', fontSize: theme.typography.fontSize.md, marginTop: theme.spacing.xl, marginBottom: theme.spacing.md }}>Community</Text>
        {communityOptions.map(renderSettingItem)}
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
