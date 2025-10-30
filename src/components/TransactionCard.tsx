
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export interface TransactionItem {
  type: string;
  description: string;
  amount: string;
  subAmount: string;
  image: any;
}

export interface TransactionGroup {
  date: string;
  items: TransactionItem[];
}

interface TransactionCardProps {
  group: TransactionGroup;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ group }) => {
  const { theme } = useTheme();

  return (
    <View style={{ marginBottom: theme.spacing.md }}>
      <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.sm, marginBottom: theme.spacing.sm }}>{group.date}</Text>
      {group.items.map((item, itemIndex) => (
        <View key={itemIndex} style={{
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: theme.spacing.sm,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: theme.spacing.sm }}>
            <Image source={item.image} style={{ width: 40, height: 40, borderRadius: theme.borderRadius.sm, marginRight: theme.spacing.md }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>{item.type}</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.sm, flexWrap: 'wrap' }}>{item.description}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>{item.amount}</Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.sm }}>{item.subAmount}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default TransactionCard;
