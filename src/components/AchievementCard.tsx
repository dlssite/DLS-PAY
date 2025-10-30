
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

const AchievementCard = ({ icon, title, subtitle, locked = false, bonus }) => {
  const { theme } = useTheme();

  const cardStyles = locked
    ? {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
      }
    : {};

  const iconBackgroundColor = locked ? theme.colors.surface : theme.colors.primary;

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
        <Ionicons name={locked ? "lock-closed-outline" : icon} size={24} color={theme.colors.text} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>{title}</Text>
        {subtitle && <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.xs }}>{subtitle}</Text>}
      </View>
      {bonus && (
        <View style={{ backgroundColor: theme.colors.surface, paddingHorizontal: theme.spacing.sm, paddingVertical: 2, borderRadius: 10 }}>
          <Text style={{ color: theme.colors.text, fontSize: theme.typography.fontSize.xs }}>{bonus}</Text>
        </View>
      )}
    </View>
  );
}

export default AchievementCard;
