import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';

interface CreditCardProps {
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  ccv?: string;
}

export default function CreditCard({ cardHolder, cardNumber, expiryDate, ccv = '123' }: CreditCardProps) {
  const { theme } = useTheme();
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
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <View style={{ width: 350, height: 220 }}>
      <TouchableOpacity onPress={flipCard} activeOpacity={0.9}>
        {/* Front Side */}
        <Animated.View style={[{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: 15,
          backgroundColor: '#1a1a1a',
          backfaceVisibility: 'hidden',
          overflow: 'hidden',
        }, frontAnimatedStyle]}>
          {/* Strip Top */}
          <View style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 180,
            height: '100%',
            backgroundColor: '#ff6767',
            transform: [{ skewX: '20deg' }, { translateX: 50 }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }} />

          {/* Strip Bottom */}
          <View style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 200,
            height: '100%',
            backgroundColor: '#ff4545',
            transform: [{ skewX: '-15deg' }, { translateX: 50 }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }} />

          {/* Logo */}
          <View style={{ position: 'absolute', top: 20, right: 20 }}>
            <Svg width="40" height="40" viewBox="0 0 17.5 16.2">
              <Path d="M3.2 0l5.4 5.6L14.3 0l3.2 3v9L13 16.2V7.8l-4.4 4.1L4.5 8v8.2L0 12V3l3.2-3z" fill="white" />
            </Svg>
          </View>

          {/* Investor */}
          <Text style={{
            position: 'absolute',
            top: 20,
            left: 20,
            color: 'white',
            fontSize: 12,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textShadowColor: 'rgba(0,0,0,0.3)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 1,
          }}>
            Sanctyr
          </Text>

          {/* Chip */}
          <View style={{
            position: 'absolute',
            top: 60,
            left: 20,
            width: 50,
            height: 40,
            borderRadius: 5,
            backgroundColor: '#ffecc7',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            <View style={{
              position: 'absolute',
              width: '100%',
              height: 1,
              backgroundColor: '#333',
              top: 13,
            }} />
            <View style={{
              position: 'absolute',
              width: '100%',
              height: 1,
              backgroundColor: '#333',
              top: 20,
            }} />
            <View style={{
              position: 'absolute',
              width: '100%',
              height: 1,
              backgroundColor: '#333',
              top: 28,
            }} />
            <View style={{
              position: 'absolute',
              left: 25,
              width: 1,
              height: 50,
              backgroundColor: '#333',
            }} />
            <View style={{
              width: 20,
              height: 25,
              borderWidth: 1,
              borderColor: '#333',
              borderRadius: 3,
              backgroundColor: '#efdbab',
            }} />
          </View>

          {/* Wave */}
          <View style={{ position: 'absolute', top: 20, left: 100 }}>
            <Svg width="26.959" height="38.787" viewBox="0 3.71 26.959 38.787">
              <Path d="M19.709 3.719c.266.043.5.187.656.406 4.125 5.207 6.594 11.781 6.594 18.938 0 7.156-2.469 13.73-6.594 18.937-.195.336-.57.531-.957.492a.9946.9946 0 0 1-.851-.66c-.129-.367-.035-.777.246-1.051 3.855-4.867 6.156-11.023 6.156-17.718 0-6.696-2.301-12.852-6.156-17.719-.262-.317-.301-.762-.102-1.121.204-.36.602-.559 1.008-.504z" fill="white" />
              <Path d="M13.74 7.563c.231.039.442.164.594.343 3.508 4.059 5.625 9.371 5.625 15.157 0 5.785-2.113 11.097-5.625 15.156-.363.422-1 .472-1.422.109-.422-.363-.472-1-.109-1.422 3.211-3.711 5.156-8.551 5.156-13.843 0-5.293-1.949-10.133-5.156-13.844-.27-.309-.324-.75-.141-1.114.188-.367.578-.582.985-.542h.093z" fill="white" />
              <Path d="M7.584 11.438c.227.031.438.144.594.312 2.953 2.863 4.781 6.875 4.781 11.313 0 4.433-1.828 8.449-4.781 11.312-.398.387-1.035.383-1.422-.016-.387-.398-.383-1.035.016-1.421 2.582-2.504 4.187-5.993 4.187-9.875 0-3.883-1.605-7.372-4.187-9.875-.321-.282-.426-.739-.266-1.133.164-.395.559-.641.984-.617h.094zM1.178 15.531c.121.02.238.063.344.125 2.633 1.414 4.437 4.215 4.437 7.407 0 3.195-1.797 5.996-4.437 7.406-.492.258-1.102.07-1.36-.422-.257-.492-.07-1.102.422-1.359 2.012-1.075 3.375-3.176 3.375-5.625 0-2.446-1.371-4.551-3.375-5.625-.441-.204-.676-.692-.551-1.165.122-.468.567-.785 1.051-.742h.094z" fill="white" />
            </Svg>
          </View>

          {/* Card Number */}
          <View style={{
            position: 'absolute',
            top: 120,
            left: 20,
            right: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Text style={{
              fontSize: 20,
              fontFamily: 'monospace',
              color: 'white',
              textShadowColor: 'rgba(0,0,0,0.3)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 1,
            }}>
              {cardNumber.slice(0, 4)}
            </Text>
            <Text style={{
              fontSize: 20,
              fontFamily: 'monospace',
              color: 'white',
              textShadowColor: 'rgba(0,0,0,0.3)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 1,
            }}>
              {cardNumber.slice(4, 8)}
            </Text>
            <Text style={{
              fontSize: 20,
              fontFamily: 'monospace',
              color: 'white',
              textShadowColor: 'rgba(0,0,0,0.3)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 1,
            }}>
              {cardNumber.slice(8, 12)}
            </Text>
            <Text style={{
              fontSize: 20,
              fontFamily: 'monospace',
              color: 'white',
              textShadowColor: 'rgba(0,0,0,0.3)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 1,
            }}>
              {cardNumber.slice(12, 16)}
            </Text>
          </View>

          {/* Expiry */}
          <View style={{ position: 'absolute', bottom: 50, left: 20 }}>
            <Text style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
            }}>
              exp. end:
            </Text>
            <Text style={{
              fontSize: 14,
              color: 'white',
              fontFamily: 'monospace',
              textShadowColor: 'rgba(0,0,0,0.3)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 1,
            }}>
              {expiryDate}
            </Text>
          </View>

          {/* Card Holder */}
          <Text style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            fontSize: 14,
            color: 'white',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            textShadowColor: 'rgba(0,0,0,0.3)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 1,
          }}>
            {cardHolder}
          </Text>

          {/* Master Circles */}
          <View style={{
            position: 'absolute',
            right: 20,
            bottom: 20,
            flexDirection: 'row',
          }}>
            <View style={{
              width: 25,
              height: 25,
              borderRadius: 12.5,
              backgroundColor: '#eb001b',
            }} />
            <View style={{
              width: 25,
              height: 25,
              borderRadius: 12.5,
              backgroundColor: 'rgba(255, 209, 0, 0.7)',
              marginLeft: -10,
            }} />
          </View>
        </Animated.View>

        {/* Back Side */}
        <Animated.View style={[{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: 15,
          backgroundColor: '#9e9e9e',
          backfaceVisibility: 'hidden',
          overflow: 'hidden',
        }, backAnimatedStyle]}>
          {/* Strip Black */}
          <View style={{
            position: 'absolute',
            top: 30,
            left: 0,
            width: '100%',
            height: 50,
            backgroundColor: 'black',
          }} />

          {/* CCV */}
          <View style={{
            position: 'absolute',
            top: 110,
            left: '5%',
            right: '5%',
            height: 36,
            padding: 10,
            borderRadius: 5,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
            <Text style={{
              position: 'absolute',
              top: -25,
              left: 0,
              fontSize: 10,
              color: 'white',
              textTransform: 'uppercase',
            }}>
              ccv
            </Text>
            <Text style={{
              fontSize: 16,
              color: 'black',
              letterSpacing: 1,
              fontFamily: 'monospace',
            }}>
              {ccv}
            </Text>
          </View>

          {/* Terms */}
          <View style={{
            position: 'absolute',
            top: 150,
            left: 20,
            right: 20,
            padding: 10,
          }}>
            <Text style={{
              fontSize: 10,
              color: 'white',
              textAlign: 'justify',
              lineHeight: 12,
            }}>
              This card is property of Sanctyr Wallet. Misuse is criminal offence. If found, please return to Sanctyr Wallet or to the nearest bank with MasterCard logo.
            </Text>
            <Text style={{
              fontSize: 10,
              color: 'white',
              textAlign: 'justify',
              lineHeight: 12,
              marginTop: 5,
            }}>
              Use of this card is subject to the credit card agreement.
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}
