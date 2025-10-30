import React from 'react';
import { TextInput, View, Text, TextInputProps, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: string;
  labelStyle?: any;
  inputStyle?: any;
  placeholderTextColor?: string;
}

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  labelStyle,
  inputStyle,
  placeholderTextColor,
  ...props
}: InputProps) {
  const { theme } = useTheme();

  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      {label && <Text style={[{ color: theme.colors.text, fontWeight: 'bold', fontSize: theme.typography.fontSize.md, marginBottom: theme.spacing.sm }, labelStyle]}>{label}</Text>}
      <TextInput
        style={[
          {
            borderWidth: 1,
            borderColor: error ? theme.colors.error : theme.colors.border,
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            fontSize: theme.typography.fontSize.md,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.md,
            borderRadius: theme.borderRadius.md,
          },
          inputStyle,
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || theme.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        {...props}
      />
      {error && <Text style={{ color: theme.colors.error, fontSize: theme.typography.fontSize.sm, marginTop: theme.spacing.xs }}>{error}</Text>}
    </View>
  );
}

// Styles are now inline to use theme dynamically
