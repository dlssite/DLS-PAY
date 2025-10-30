
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export interface Promotion {
  title: string;
  description: string;
  endsIn: { days: number; hours: number; minutes: number; seconds: number };
  image: any;
}

interface PromotionCardProps {
  promo: Promotion;
}

const PromotionCard: React.FC<PromotionCardProps> = ({ promo }) => {
  const { theme } = useTheme();

  return (
    <View style={{
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      width: 280,
      marginRight: theme.spacing.md,
    }}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={promo.image} style={{ width: 60, height: 60, borderRadius: theme.borderRadius.sm, marginRight: theme.spacing.md }} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.colors.text, fontWeight: 'bold', fontSize: theme.typography.fontSize.md }}>{promo.title}</Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.sm, marginTop: theme.spacing.xs, flexWrap: 'wrap' }}>{promo.description}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: theme.spacing.md }}>
        <View>
          <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.xs, marginBottom: theme.spacing.xs }}>Promotion ends in</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'center', marginRight: theme.spacing.sm }}>
              <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>{String(promo.endsIn.days).padStart(2, '0')}</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.xs }}>DAYS</Text>
            </View>
            <View style={{ alignItems: 'center', marginRight: theme.spacing.sm }}>
              <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>{String(promo.endsIn.hours).padStart(2, '0')}</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.xs }}>HOURS</Text>
            </View>
            <View style={{ alignItems: 'center', marginRight: theme.spacing.sm }}>
              <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>{String(promo.endsIn.minutes).padStart(2, '0')}</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.xs }}>MINUTES</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>{String(promo.endsIn.seconds).padStart(2, '0')}</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.xs }}>SECONDS</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Get</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PromotionCard;
