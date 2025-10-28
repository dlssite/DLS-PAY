import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export default function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  style,
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.sm,
    };

    const sizeStyles = {
      sm: { paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md },
      md: { paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.lg },
      lg: { paddingVertical: theme.spacing.lg, paddingHorizontal: theme.spacing.xl },
    };

    const variantStyles = {
      primary: {
        backgroundColor: disabled ? theme.colors.textSecondary : theme.colors.primary,
      },
      secondary: {
        backgroundColor: theme.colors.secondary,
        borderWidth: 1,
        borderColor: theme.colors.primary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
      },
      ghost: {
        backgroundColor: 'transparent',
        ...theme.shadows.sm,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...style,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: theme.typography.fontWeight.semibold,
    };

    const sizeStyles = {
      sm: { fontSize: theme.typography.fontSize.sm },
      md: { fontSize: theme.typography.fontSize.md },
      lg: { fontSize: theme.typography.fontSize.lg },
    };

    const variantStyles = {
      primary: { color: theme.colors.secondary },
      secondary: { color: theme.colors.primary },
      outline: { color: theme.colors.primary },
      ghost: { color: theme.colors.primary },
    };

    return {
      ...baseTextStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? theme.colors.secondary : theme.colors.primary} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

