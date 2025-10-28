import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

const Header = ({ onSettingsPress }) => {
  return (
    <View style={{ marginTop: theme.spacing.lg, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.lg, paddingBottom: theme.spacing.lg }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="wallet-outline" size={24} color="white" style={{ marginRight: theme.spacing.sm }} />
          <Text style={{ color: 'white', fontSize: theme.typography.fontSize.xl, fontWeight: 'bold' }}>Wallet</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={onSettingsPress} style={{ marginRight: theme.spacing.md }}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="help-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;