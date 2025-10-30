import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { compatibleGames } from '../mockData';

const CompatibleGames = () => {
  const { theme } = useTheme();

  return (
    <View style={{ marginTop: theme.spacing.xl, paddingBottom: 100 }}>
      <Text style={{ color: theme.colors.text, fontSize: theme.typography.fontSize.lg, fontWeight: 'bold', marginBottom: theme.spacing.md, paddingHorizontal: theme.spacing.lg }}>
        Sanctyr Compatible Games
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: theme.spacing.lg }}>
        {compatibleGames.map((game, index) => (
          <TouchableOpacity key={index} style={{
            width: 280,
            marginRight: theme.spacing.md,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            overflow: 'hidden'
          }}>
            <Image source={{ uri: game.bannerUrl }} style={{ width: '100%', height: 80 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: theme.spacing.md }}>
              <Image source={{ uri: game.iconUrl }} style={{ width: 60, height: 60, borderRadius: theme.borderRadius.md, marginRight: theme.spacing.md }} />
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.colors.text, fontSize: theme.typography.fontSize.md, fontWeight: 'bold' }}>{game.title}</Text>
                <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.xs, marginTop: 2 }}>{game.category}</Text>
              </View>
              <TouchableOpacity style={{ backgroundColor: theme.colors.primary, paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.sm, borderRadius: theme.borderRadius.md }}>
                <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>Get</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default CompatibleGames;
