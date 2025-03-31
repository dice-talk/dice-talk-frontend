import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing, Text, Image } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function LoadingScreen() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg height="200" width="200" viewBox="0 0 200 200">
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#8B5CF6" stopOpacity="1" />
              <Stop offset="1" stopColor="#EC4899" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Circle
            cx="100"
            cy="100"
            r="90"
            stroke="url(#grad)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
      </Animated.View>
      <Image
        source={require('../assets/dice.png')} // dice 아이콘
        style={styles.icon}
      />
    </View>
  );
}

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
    color: '#1F2937',
  },
  icon: {
    position: 'absolute',
    width: 100,
    height: 100,
  },
});
