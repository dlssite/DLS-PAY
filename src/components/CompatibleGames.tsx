import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { compatibleGames } from '../mockData';

const CompatibleGames = () => {
  return (
    <View style={{ marginTop: theme.spacing.xl, paddingBottom: 100 }}>
      <Text style={{ color: 'white', fontSize: theme.typography.fontSize.lg, fontWeight: 'bold', marginBottom: theme.spacing.md, paddingHorizontal: theme.spacing.lg }}>
        AppCoins Compatible Games
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: theme.spacing.lg }}>
        {compatibleGames.map((game, index) => (
          <TouchableOpacity key={index} style={{ 
            width: 280,
            marginRight: theme.spacing.md, 
            backgroundColor: '#2A2A37',
            borderRadius: theme.borderRadius.lg, 
            overflow: 'hidden'
          }}>
            <Image source={{ uri: game.bannerUrl }} style={{ width: '100%', height: 80 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: theme.spacing.md }}>
              <Image source={{ uri: game.iconUrl }} style={{ width: 60, height: 60, borderRadius: theme.borderRadius.md, marginRight: theme.spacing.md }} />
              <View style={{ flex: 1 }}>
                <Text style={{ color: 'white', fontSize: theme.typography.fontSize.md, fontWeight: 'bold' }}>{game.title}</Text>
                <Text style={{ color: '#A0A0A0', fontSize: theme.typography.fontSize.xs, marginTop: 2 }}>{game.category}</Text>
              </View>
              <TouchableOpacity style={{ backgroundColor: '#FF4D6D', paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.sm, borderRadius: theme.borderRadius.md }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Get</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CompatibleGames;
