
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

const AchievementCard = ({ icon, title, subtitle, locked = false, bonus }) => {
  const cardStyles = locked
    ? {
        backgroundColor: '#2A2A37',
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
      }
    : {};

  const iconBackgroundColor = locked ? '#393948' : '#FF4D6D';

  return (
    <View style={{ ...cardStyles, flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: iconBackgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
      
      }}>
        <Ionicons name={locked ? "lock-closed-outline" : icon} size={24} color="white" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{title}</Text>
        {subtitle && <Text style={{ color: '#A0A0A0', fontSize: theme.typography.fontSize.xs }}>{subtitle}</Text>}
      </View>
      {bonus && (
        <View style={{ backgroundColor: '#393948', paddingHorizontal: theme.spacing.sm, paddingVertical: 2, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontSize: theme.typography.fontSize.xs }}>{bonus}</Text>
        </View>
      )}
    </View>
  );
};

export default AchievementCard;
