import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { mockUsers, mockTransactions, activePromotions, compatibleGames } from '../mockData';

const { width } = Dimensions.get('window');

export default function AdminScreen() {
  const { theme } = useTheme();
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user?.isAdmin) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.accessDeniedContainer}>
          <Ionicons name="lock-closed" size={64} color={theme.colors.textSecondary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Access Denied
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            You do not have permission to access this page.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const stats = [
    {
      title: 'Total Users',
      value: mockUsers.length.toString(),
      icon: 'people',
      color: theme.colors.primary,
    },
    {
      title: 'Total Transactions',
      value: mockTransactions.length.toString(),
      icon: 'swap-horizontal',
      color: theme.colors.success,
    },
    {
      title: 'Active Promotions',
      value: activePromotions.length.toString(),
      icon: 'gift',
      color: theme.colors.accent,
    },
    {
      title: 'Compatible Games',
      value: compatibleGames.length.toString(),
      icon: 'game-controller',
      color: theme.colors.secondary,
    },
  ];

  const adminActions = [
    {
      title: 'User Management',
      description: 'View, edit, and manage user accounts',
      icon: 'people-circle',
      actions: [
        { label: 'View All Users', icon: 'list' },
        { label: 'Manage Roles', icon: 'shield-checkmark' },
        { label: 'Add New User', icon: 'person-add' },
      ],
    },
    {
      title: 'Transaction Management',
      description: 'Monitor and manage all transactions',
      icon: 'card',
      actions: [
        { label: 'View Transactions', icon: 'list' },
        { label: 'Generate Reports', icon: 'document-text' },
        { label: 'Export Data', icon: 'download' },
      ],
    },
    {
      title: 'Promotion Management',
      description: 'Create and manage promotional campaigns',
      icon: 'gift-outline',
      actions: [
        { label: 'View Promotions', icon: 'list' },
        { label: 'Create Promotion', icon: 'add-circle' },
        { label: 'Manage Codes', icon: 'key' },
      ],
    },
    {
      title: 'Game Management',
      description: 'Manage compatible games and categories',
      icon: 'game-controller-outline',
      actions: [
        { label: 'View Games', icon: 'list' },
        { label: 'Add New Game', icon: 'add-circle' },
        { label: 'Update Categories', icon: 'folder' },
      ],
    },
    {
      title: 'System Settings',
      description: 'Configure app settings and security',
      icon: 'settings',
      actions: [
        { label: 'App Configuration', icon: 'cog' },
        { label: 'Security Settings', icon: 'shield' },
        { label: 'Database Management', icon: 'server' },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
       <View style={styles.headerTop}>
       <Ionicons name="shield-checkmark" size={24} color={theme.colors.primary} marginRight={theme.spacing.md} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
                Admin Dashboard
              </Text>
       </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <View style={styles.headerTop}>
           
            <View style={styles.headerTextContainer}>
            
              <Text style={[styles.welcomeText, { color: theme.colors.textSecondary }]}>
                Welcome back, {user.name}
              </Text>
            </View>
          </View>
          <View style={styles.headerStats}>
            <View style={styles.quickStat}>
              <Text style={[styles.quickStatValue, { color: theme.colors.primary }]}>
                {mockUsers.length}
              </Text>
              <Text style={[styles.quickStatLabel, { color: theme.colors.textSecondary }]}>
                Users
              </Text>
            </View>
            <View style={styles.quickStat}>
              <Text style={[styles.quickStatValue, { color: theme.colors.success }]}>
                {mockTransactions.length}
              </Text>
              <Text style={[styles.quickStatLabel, { color: theme.colors.textSecondary }]}>
                Transactions
              </Text>
            </View>
            <View style={styles.quickStat}>
              <Text style={[styles.quickStatValue, { color: theme.colors.accent }]}>
                {activePromotions.length}
              </Text>
              <Text style={[styles.quickStatLabel, { color: theme.colors.textSecondary }]}>
                Promotions
              </Text>
            </View>
          </View>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
              <View style={styles.statIconContainer}>
                <Ionicons name={stat.icon as any} size={24} color={stat.color} />
              </View>
              <View style={styles.statContent}>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
                <Text style={[styles.statTitle, { color: theme.colors.textSecondary }]}>{stat.title}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Admin Actions */}
        <View style={styles.actionsContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Management Tools
          </Text>

          {adminActions.map((section, sectionIndex) => (
            <View key={sectionIndex} style={[styles.actionCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
              <View style={styles.actionHeader}>
                <View style={styles.actionIconContainer}>
                  <Ionicons name={section.icon as any} size={24} color={theme.colors.primary} />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={[styles.actionTitle, { color: theme.colors.text }]}>
                    {section.title}
                  </Text>
                  <Text style={[styles.actionDescription, { color: theme.colors.textSecondary }]}>
                    {section.description}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </View>

              <View style={styles.actionButtons}>
                {section.actions.map((action, actionIndex) => (
                  <TouchableOpacity
                    key={actionIndex}
                    style={[styles.actionButton, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}
                  >
                    <Ionicons name={action.icon as any} size={16} color={theme.colors.primary} />
                    <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>
                      {action.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  accessDeniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  header: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 14,
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickStat: {
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quickStatLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: (width - 50) / 2,
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    marginRight: 15,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statTitle: {
    fontSize: 14,
    marginTop: 2,
  },
  actionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  actionCard: {
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    overflow: 'hidden',
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  actionIconContainer: {
    marginRight: 15,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    paddingTop: 0,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
});
