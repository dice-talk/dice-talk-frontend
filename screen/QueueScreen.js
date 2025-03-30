import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 이미지 자산 import
import DiceIcon from '../assets/icon/logo/dice_icon.svg';

export default function QueueScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [isInQueue, setIsInQueue] = useState(false);

  useEffect(() => {
    // 사용자 정보 가져오기
    const getUserInfo = async () => {
      const user = await AsyncStorage.getItem('username');
      setUsername(user || '사용자');
    };
    getUserInfo();
  }, []);

  const handleJoinQueue = () => {
    setIsInQueue(true);
    // 임시로 3초 후에 채팅 화면으로 이동
    setTimeout(() => {
      navigation.navigate('Chat');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeTitle}>Welcome</Text>

      <View style={styles.diceContainer}>
        <DiceIcon width={150} height={150} />
      </View>

      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>DICETALK</Text>
      </View>

      {isInQueue ? (
        <View style={styles.queueContainer}>
          <ActivityIndicator size='large' color='#9370DB' />
          <Text style={styles.queueText}>대기열에서 기다리는 중...</Text>
          <Text style={styles.queueSubText}>다른 참가자들을 찾고 있습니다</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.joinButton} onPress={handleJoinQueue}>
          <Text style={styles.joinButtonText}>참가하기</Text>
        </TouchableOpacity>
      )}

      <View style={styles.diceIconsContainer}>
        {/* 6개의 주사위 아이콘 표시 */}
        {[...Array(6)].map((_, index) => (
          <View key={index} style={styles.diceIconWrapper}>
            <DiceIcon width={40} height={40} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },
  diceContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    borderWidth: 2,
    borderColor: '#9370DB',
  },
  logoContainer: {
    backgroundColor: '#9370DB',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 40,
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  joinButton: {
    backgroundColor: '#9370DB',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 30,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  queueContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  queueText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#9370DB',
  },
  queueSubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  diceIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  diceIconWrapper: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
});
