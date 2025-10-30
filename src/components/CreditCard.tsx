import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CreditCardProps {
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  ccv?: string;
}

export default function CreditCard({ cardHolder, cardNumber, expiryDate, ccv = '420' }: CreditCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = new Animated.Value(0);

  const flipCard = () => {
    const toValue = isFlipped ? 0 : 180;
    Animated.spring(flipAnimation, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '-180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '0deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <TouchableOpacity onPress={flipCard} activeOpacity={0.9}>
      <View style={{ width: 320, height: 190, position: 'relative' }}>
        {/* Front Side */}
        <Animated.View style={[{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: 8,
          backfaceVisibility: 'hidden',
          overflow: 'hidden',
          padding: 18,
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
        }, frontAnimatedStyle]}>
          <LinearGradient
            colors={['#fd696b', '#fa616e', '#f65871', '#f15075', '#ec4879']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 8,
            }}
          />
          {/* Small Square */}
          <Image
            source={{ uri: 'https://image.ibb.co/cZeFjx/little_square.png' }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 5,
              marginBottom: 10,
            }}
          />

          {/* Visa Logo */}
          <Image
            source={{ uri: 'https://www.fireeye.com/partners/strategic-technology-partners/visa-fireeye-cyber-watch-program/_jcr_content/content-par/grid_20_80_full/grid-20-left/image.img.png/1505254557388.png' }}
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
              width: 40,
              height: 16,
            }}
            resizeMode="contain"
          />

          {/* Card Number */}
          <Text style={{
            fontSize: 20,
            fontFamily: 'monospace',
            color: '#fff',
            textAlign: 'center',
            marginBottom: 20,
            marginTop: 20,
            letterSpacing: 2,
          }}>
            **** **** **** {cardNumber.slice(-4)}
          </Text>

          {/* Card Holder */}
          <View style={{ width: '75%', marginBottom: 10 }}>
            <Text style={{
              fontSize: 10,
              color: 'rgba(255,255,255,0.8)',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}>
              Card holder
            </Text>
            <Text style={{
              fontSize: 16,
              color: '#fff',
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginTop: 5,
            }}>
              {cardHolder}
            </Text>
          </View>

          {/* Expiry */}
          <View style={{ width: '25%', position: 'absolute', bottom: 0, right: 0 }}>
            <Text style={{
              fontSize: 10,
              color: 'rgba(255,255,255,0.8)',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}>
              Expires
            </Text>
            <Text style={{
              fontSize: 16,
              color: '#fff',
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginTop: 5,
            }}>
              {expiryDate}
            </Text>
          </View>
        </Animated.View>

        {/* Back Side */}
        <Animated.View style={[{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: 8,
          backfaceVisibility: 'hidden',
          overflow: 'hidden',
          paddingTop: 18,
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
        }, backAnimatedStyle]}>
          <LinearGradient
            colors={['#fd696b', '#fa616e', '#f65871', '#f15075', '#ec4879']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 8,
            }}
          />
          <View style={{
            flex: 1,
            borderRadius: 8,
          }}>
            {/* Black Line */}
            <View style={{
              marginTop: 5,
              height: 38,
              backgroundColor: '#303030',
            }} />

            {/* Back Content */}
            <View style={{ padding: 15 }}>
              {/* CCV Area */}
              <View style={{
                backgroundColor: '#fff',
                padding: 5,
                paddingHorizontal: 12,
                position: 'relative',
                marginBottom: 15,
              }}>
                <View style={{
                  position: 'absolute',
                  top: -3,
                  left: -3,
                  right: 42,
                  bottom: -3,
                  backgroundColor: '#ededed',
                  borderRadius: 4,
                }} />
                <Text style={{
                  color: '#303030',
                  textAlign: 'right',
                  fontSize: 14,
                  fontFamily: 'monospace',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  {ccv}
                </Text>
              </View>

              {/* Small Square */}
              <Image
                source={{ uri: 'https://image.ibb.co/cZeFjx/little_square.png' }}
                style={{
                  position: 'absolute',
                  bottom: 15,
                  left: 15,
                  width: 30,
                  height: 30,
                  borderRadius: 5,
                }}
              />

              {/* Visa Logo */}
              <Image
                source={{ uri: 'https://www.fireeye.com/partners/strategic-technology-partners/visa-fireeye-cyber-watch-program/_jcr_content/content-par/grid_20_80_full/grid-20-left/image.img.png/1505254557388.png' }}
                style={{
                  position: 'absolute',
                  bottom: 15,
                  right: 15,
                  width: 40,
                  height: 16,
                }}
                resizeMode="contain"
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}
