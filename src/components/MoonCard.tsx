
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

const MoonCard = () => {
  const { theme } = useTheme();

  return (
    <View style={{ backgroundColor: '#0057FF', borderRadius: theme.borderRadius.lg, padding: theme.spacing.lg }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Ionicons name="rocket-outline" size={40} color="white" />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', paddingHorizontal: theme.spacing.sm, paddingVertical: 2, borderRadius: 10, marginRight: theme.spacing.sm }}>
                    <Text style={{ color: 'white', fontSize: theme.typography.fontSize.xs }}>6% Bonus</Text>
                </View>
                <Ionicons name="information-circle-outline" size={24} color="white" />
            </View>
        </View>
        <Text style={{ color: 'white', fontSize: theme.typography.fontSize.lg, fontWeight: 'bold', marginTop: theme.spacing.md }}>You're on the Moon</Text>
        <Text style={{ color: 'white', marginTop: theme.spacing.sm }}>Spend 7,908 Sanctyr more to reach the next level.</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: theme.spacing.sm }}>
          <View style={{ flex: 1, height: 8, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 4 }}>
            <View style={{ width: '20.92%', height: 8, backgroundColor: 'white', borderRadius: 4 }} />
          </View>
          <Text style={{ color: 'white', fontSize: theme.typography.fontSize.xs, marginLeft: theme.spacing.sm }}>2.09k / 10k</Text>
        </View>
        <Text style={{ color: 'white', fontStyle: 'italic', fontSize: theme.typography.fontSize.xs, marginTop: theme.spacing.md }}>"That's one small step for a man, one giant leap for mankind" - Neil Armstrong</Text>
    </View>
  );
}

export default MoonCard;
