
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView, StatusBar, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '../store/slices/authSlice';
import { authService } from '../services/authService';
import Button from '../components/Button';
import Input from '../components/Input';
import { useTheme } from '../hooks/useTheme';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLocalLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLocalLoading(true);
    dispatch(setLoading(true));

    try {
      const user = await authService.loginWithEmail(email, password);
      dispatch(setUser(user));
      navigation.replace('MainTabs');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLocalLoading(false);
      dispatch(setLoading(false));
    }
  };

  const handleBiometricLogin = async () => {
    try {
      const user = await authService.biometricLogin();
      dispatch(setUser(user));
      navigation.replace('MainTabs');
    } catch (error: any) {
      Alert.alert('Biometric Login Failed', error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.colors.background} />
      <View style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing.xl,
        paddingTop: theme.spacing.xxl,
        justifyContent: 'center'
      }}>
        {/* Header */}
        <View style={{ marginTop: theme.spacing.lg, alignItems: 'center', marginBottom: theme.spacing.xxxl }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: theme.borderRadius.full,
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: theme.spacing.lg,
            ...theme.shadows.md
          }}>
            <Text style={{
              fontSize: theme.typography.fontSize.xxxl,
              color: theme.colors.text,
              fontWeight: theme.typography.fontWeight.bold
            }}>
              ₦
            </Text>
          </View>
          <Text style={{
            fontSize: theme.typography.fontSize.xxxl,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text,
            textAlign: 'center',
            marginBottom: theme.spacing.sm
          }}>
            Welcome Back
          </Text>
          <Text style={{
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.textSecondary,
            textAlign: 'center'
          }}>
            Sign in to your E-Wallet account
          </Text>
        </View>

        {/* Form */}
        <View style={{ marginBottom: theme.spacing.xxl }}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: theme.spacing.lg }}>
            <Text style={{
              color: theme.colors.primary,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium
            }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View style={{ gap: theme.spacing.md }}>
          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            size="lg"
          />

          <Button
            title="Sign in with Biometrics"
            onPress={handleBiometricLogin}
            variant="outline"
            size="lg"
          />
        </View>

        {/* Footer */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: theme.spacing.xxl
        }}>
          <Text style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.fontSize.md
          }}>
            Don\'t have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{
              color: theme.colors.primary,
              fontSize: theme.typography.fontSize.md,
              fontWeight: theme.typography.fontWeight.semibold
            }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: theme.spacing.lg }}>
          <Text style={{ color: theme.colors.text, marginRight: theme.spacing.sm }}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: theme.colors.primaryLight }}
            thumbColor={isDarkMode ? theme.colors.primary : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
