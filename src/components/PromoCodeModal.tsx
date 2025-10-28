
import React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

interface PromoCodeModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
}

const PromoCodeModal: React.FC<PromoCodeModalProps> = ({ visible, onClose, title, subtitle }) => {
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
        <View style={{ backgroundColor: '#2A2A37', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: theme.spacing.lg }}>
          <TouchableOpacity onPress={onClose} style={{ alignSelf: 'center', marginBottom: theme.spacing.md }}>
            <View style={{ width: 40, height: 5, backgroundColor: '#393948', borderRadius: 2.5 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
            <Ionicons name={title === 'Promo Code' ? "pricetag-outline" : "card-outline"} size={24} color="white" style={{ marginRight: theme.spacing.sm }} />
            <Text style={{ color: 'white', fontSize: theme.typography.fontSize.lg, fontWeight: 'bold' }}>{title}</Text>
          </View>
          <Text style={{ color: '#A0A0A0', marginBottom: theme.spacing.md }}>{subtitle}</Text>
          <TextInput
            style={{ 
              backgroundColor: '#1C1C23', 
              color: 'white', 
              borderRadius: theme.borderRadius.md, 
              padding: theme.spacing.md, 
              marginBottom: theme.spacing.md 
            }}
            placeholder={title === 'Promo Code' ? "Promo Code here..." : "Gift Card code here..."}
            placeholderTextColor="#A0A0A0"
          />
          <TouchableOpacity style={{ backgroundColor: '#4A4A58', padding: theme.spacing.md, borderRadius: theme.borderRadius.md, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PromoCodeModal;
