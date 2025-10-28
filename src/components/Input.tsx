import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import { theme } from '../theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: string;
  label?: string;
  style?: any;
}

export default function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  label,
  style,
  ...props
}: InputProps) {
  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      {label && (
        <Text style={{
          color: theme.colors.text,
          fontWeight: theme.typography.fontWeight.medium,
          marginBottom: theme.spacing.xs,
          fontSize: theme.typography.fontSize.md
        }}>
          {label}
        </Text>
      )}
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: error ? theme.colors.error : theme.colors.border,
          borderRadius: theme.borderRadius.md,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.md,
          fontSize: theme.typography.fontSize.md,
          color: theme.colors.text,
          backgroundColor: theme.colors.surface,
          ...theme.shadows.sm,
          ...style,
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        {...props}
      />
      {error && (
        <Text style={{
          color: theme.colors.error,
          fontSize: theme.typography.fontSize.sm,
          marginTop: theme.spacing.xs
        }}>
          {error}
        </Text>
      )}
    </View>
  );
}
