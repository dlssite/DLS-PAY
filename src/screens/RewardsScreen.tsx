import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import Header from '../components/Header';
import PromotionCard from '../components/PromotionCard';
import CompatibleGames from '../components/CompatibleGames';
import PromoCodeModal from '../components/PromoCodeModal';
import { activePromotions } from '../mockData';

const RewardsScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('promo');

  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const onSettings = () => navigation.navigate('Settings');
  const onBonus = () => navigation.navigate('Bonus');

  return (
    <View style={{ flex: 1, backgroundColor: '#1C1C23' }}>
      <Header onSettingsPress={onSettings} />
      <ScrollView>
        {/* Spend Progress Card */}
        <View style={{ paddingHorizontal: theme.spacing.lg }}>
            <View style={{ backgroundColor: '#2A2A37', borderRadius: theme.borderRadius.lg, padding: theme.spacing.lg }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'white', fontSize: theme.typography.fontSize.md, fontWeight: 'bold' }}>Spend 7,908 AppCoins Credits to reach the next level!</Text>
                        <View style={{ height: 8, backgroundColor: '#393948', borderRadius: 4, marginTop: theme.spacing.sm, overflow: 'hidden' }}>
                            <View style={{ width: `${(2092 / 10000) * 100}%`, height: '100%', backgroundColor: '#FF4D6D', borderRadius: 4 }} />
                        </View>
                        <Text style={{ color: '#A0A0A0', fontSize: theme.typography.fontSize.sm, alignSelf: 'flex-end' }}>2092 / 10000</Text>
                    </View>
                    <Image source={{ uri: 'https://cdn.discordapp.com/attachments/1206540094236925952/1236053890044465172/Group_427318728.png?ex=6636a111&is=66354f91&hm=39d84f800ead8e85876228999339e144a7cee2a8eb33a928b55f6539659d5830&' }} style={{ width: 80, height: 80, marginLeft: theme.spacing.md }} />
                </View>
                 <TouchableOpacity onPress={onBonus} style={{ flexDirection: 'row', alignItems: 'center', marginTop: theme.spacing.md }}>
                    <Ionicons name="gift" size={16} color="#FFD700" style={{ marginRight: theme.spacing.sm }} />
                    <Text style={{ color: 'white', fontSize: theme.typography.fontSize.sm }}>6% bonus in every purchase</Text>
                    <Ionicons name="chevron-forward-outline" size={16} color="white" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>
            </View>
        </View>

        {/* Gift Card and Promo Code Buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: theme.spacing.lg, marginTop: theme.spacing.md }}>
          <TouchableOpacity onPress={() => openModal('promo')} style={{ flex: 1, marginRight: theme.spacing.sm }}>
            <View style={{ backgroundColor: '#2A2A37', borderRadius: theme.borderRadius.lg, padding: theme.spacing.lg, alignItems: 'center' }}>
                <Ionicons name="pricetag" size={40} color="#FF4D6D" />
              <Text style={{ color: 'white', marginTop: theme.spacing.sm, fontWeight: 'bold' }}>Promo Code</Text>
              <Text style={{ color: '#A0A0A0', fontSize: theme.typography.fontSize.xs, textAlign: 'center', marginTop: theme.spacing.xs }}>Use a promo code to get special deals!</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal('gift')} style={{ flex: 1, marginLeft: theme.spacing.sm }}>
            <View style={{ backgroundColor: '#2A2A37', borderRadius: theme.borderRadius.lg, padding: theme.spacing.lg, alignItems: 'center' }}>
                <Ionicons name="card" size={40} color="#FF4D6D" />
              <Text style={{ color: 'white', marginTop: theme.spacing.sm, fontWeight: 'bold' }}>Gift Card</Text>
              <Text style={{ color: '#A0A0A0', fontSize: theme.typography.fontSize.xs, textAlign: 'center', marginTop: theme.spacing.xs }}>Redeem your gift card code.</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Promotions */}
        <View style={{ paddingHorizontal: theme.spacing.lg, marginTop: theme.spacing.xl }}>
          <Text style={{ color: 'white', fontSize: theme.typography.fontSize.lg, fontWeight: 'bold', marginBottom: theme.spacing.md }}>
            Promotions
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {activePromotions.map((promo, index) => (
              <PromotionCard key={index} promo={promo} />
            ))}
          </ScrollView>
        </View>

        {/* AppCoins Compatible Games */}
        <CompatibleGames />
      </ScrollView>

      <PromoCodeModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        title={modalType === 'promo' ? 'Promo Code' : 'Gift Card'}
        subtitle={modalType === 'promo' ? 'Insert a Promo Code to get special deals!' : 'Redeem your gift card code.'}
      />
    </View>
  );
};

export default RewardsScreen;
