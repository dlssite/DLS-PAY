
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import MoonCard from '../components/MoonCard';
import AchievementCard from '../components/AchievementCard';

const BonusScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [showPrevious, setShowPrevious] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      {/* Header */}
      <View style={{  paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.lg, paddingBottom: theme.spacing.lg, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={{ color: theme.colors.text, fontSize: theme.typography.fontSize.xl, fontWeight: 'bold', marginLeft: theme.spacing.md }}>Up to 6% Bonus!</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Info Cards */}
        <View style={{ flexDirection: 'row', paddingHorizontal: theme.spacing.lg, marginTop: theme.spacing.md }}>
          <View style={{ flex: 1, backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg, padding: theme.spacing.md, marginRight: theme.spacing.sm }}>
            <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: 'bold' }}>£0.79</Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.xs }}>Bonus received</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg, padding: theme.spacing.md, marginLeft: theme.spacing.sm }}>
            <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: 'bold' }}>2,092.00 APPC</Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.xs }}>Amount spent to reach this level</Text>
          </View>
        </View>

        {/* Achievements Timeline */}
        <View style={{ paddingHorizontal: theme.spacing.lg, marginTop: theme.spacing.xl, paddingBottom: 100 }}>
          {showPrevious && (
            <View>
                <AchievementCard icon="earth-outline" title="You started your journey" subtitle="Just left Earth!" bonus="" />
            </View>
          )}
          <TouchableOpacity onPress={() => setShowPrevious(!showPrevious)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.primary, paddingVertical: theme.spacing.sm, borderRadius: 20, marginBottom: theme.spacing.md }}>
            <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>{showPrevious ? 'HIDE' : 'SHOW'} PREVIOUS ACHIEVEMENTS</Text>
            <Ionicons name={showPrevious ? "chevron-up-outline" : "chevron-down-outline"} size={20} color={theme.colors.text} style={{ marginLeft: theme.spacing.xs }} />
          </TouchableOpacity>

          <MoonCard />

          <View style={{ marginTop: theme.spacing.md }}>
            <AchievementCard icon="trophy-outline" locked title="Spend 10,000 Sanctyr to reach next level" subtitle="" bonus="7% Bonus" />
            <AchievementCard icon="trophy-outline" locked title="Spend 50,000 Sanctyr to reach next level" subtitle="" bonus="8.5% Bonus" />
            <AchievementCard icon="trophy-outline" locked title="Spend 100,000 Sanctyr to reach next level" subtitle="" bonus="10% Bonus" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BonusScreen;
