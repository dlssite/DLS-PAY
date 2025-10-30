
import React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

interface PromoCodeModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
}

const PromoCodeModal: React.FC<PromoCodeModalProps> = ({ visible, onClose, title, subtitle }) => {
  const { theme } = useTheme();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: 'flex-end' }}
      >
        <View style={{ backgroundColor: theme.colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: theme.spacing.lg }}>
          <TouchableOpacity onPress={onClose} style={{ alignSelf: 'center', marginBottom: theme.spacing.md }}>
            <View style={{ width: 40, height: 5, backgroundColor: theme.colors.surface, borderRadius: 2.5 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
            <Ionicons name={title === 'Promo Code' ? "pricetag-outline" : "card-outline"} size={24} color={theme.colors.text} style={{ marginRight: theme.spacing.sm }} />
            <Text style={{ color: theme.colors.text, fontSize: theme.typography.fontSize.lg, fontWeight: 'bold' }}>{title}</Text>
          </View>
          <Text style={{ color: theme.colors.textSecondary, marginBottom: theme.spacing.md }}>{subtitle}</Text>
          <TextInput
            style={{
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
              borderRadius: theme.borderRadius.md,
              padding: theme.spacing.md,
              marginBottom: theme.spacing.md
            }}
            placeholder={title === 'Promo Code' ? "Promo Code here..." : "Gift Card code here..."}
            placeholderTextColor={theme.colors.textSecondary}
          />
          <TouchableOpacity style={{ backgroundColor: theme.colors.primary, padding: theme.spacing.md, borderRadius: theme.borderRadius.md, alignItems: 'center' }}>
            <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default PromoCodeModal;
