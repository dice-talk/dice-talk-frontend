import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, Easing, Text, TouchableOpacity } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import Logo from'../assets/icon/logo/logo_icon.svg';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export default function LoadingScreen({ waitingCount = 1 }) { // 대기 인원 props 추가
  const navigation = useNavigation(); 
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const textColorAnim = useRef(new Animated.Value(0)).current;
  const [joined, setJoined] = useState(false);
  const [participants, setParticipants] = useState(0);

  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(textColorAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(textColorAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ),
    ]).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const textColor = textColorAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#F9A8D4', '#8B5CF6', '#60A5FA'],
  });

  const handleJoin = () => {
    setJoined(true);
    navigation.replace('Chat');
  };

return (
  <View style={styles.container}>
    <Text style={[styles.title, { color: '#8B5CF6', marginTop: -50 }]}>대기실</Text>
    <View style={styles.circleContainer}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg height="280" width="280" viewBox="0 0 280 280">
          <Defs>
            <LinearGradient id='grad' x1='0' y1='0' x2='1' y2='1'>
              <Stop offset='0' stopColor='#8B5CF6' stopOpacity='1' />
              <Stop offset='1' stopColor='#EC4899' stopOpacity='1' />
            </LinearGradient>
          </Defs>
          <Circle
            cx='140'
            cy='140'
            r='130'
            stroke='url(#grad)'
            strokeWidth='10'
            strokeLinecap='round'
            fill='none'
          />
        </Svg>
      </Animated.View>
      <View style={styles.logoContainer}>
        <Logo width={180} height={180} />
      </View>
    </View>
    {!joined ? (
      <TouchableOpacity 
        style={styles.joinButton}
        onPress={handleJoin}
      >
        <LinearGradient
          colors={['#C4B5FD', '#A78BFA']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>입장하기</Text>
        </LinearGradient>
      </TouchableOpacity>
    ) : (
      <Animated.Text style={[styles.message, { color: textColor }]}>
        ✨ 누군가 마음을 열 준비를 하고 있어요
      </Animated.Text>
    )}
    <Animated.Text style={[styles.waitingCount, { color: textColor }]}>
      현재 {waitingCount}명이 기다리고 있어요
    </Animated.Text>
  </View>
);}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  circleContainer: {
    position: 'relative',
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: '600',
  },
  waitingCount: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 10,
  },
  joinButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 40, // 원과의 간격 조정
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  message: {
    fontSize: 16,
    marginTop: 40, // 원과의 간격 조정
    fontWeight: '600',
  },
  waitingCount: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: '500',
  },
});
