import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { navigateToChat } from '../navigation/navigationUtils';

// 🔹 더미 이미지 임포트 예시
const bannerImages = [require('../assets/banner/banner_Ex_love.png')]; // 배너 이미지

export default function ChatMain() {
  const navigation = useNavigation();
  const [unreadCount, setUnreadCount] = useState(42);
  const [remainingTime, setRemainingTime] = useState(48 * 60 * 60); // 48시간 = 172800초
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const handleConfirm = () => {
    navigateToChat(navigation, 'Chat');
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Header */}
      <View style={styles.bannerContainer}>
        <Image source={bannerImages[0]} style={styles.bannerImage} />
      </View>

      {/* 🔸 Body */}
      <View style={styles.chatBody}>
        {/* 채팅 배경 영역 */}
        <View style={styles.chatBackground}>
          {/* 예시 채팅 메시지 */}
          <Text style={styles.chatBubble}>안녕하세요! 하늘놀늘 강하늘이에요!</Text>
        </View>

        {/* 🔸 남은 시간 모달 */}
        <View style={styles.timerModal}>
          <Text style={styles.modalLabel}>채팅 종료까지</Text>
          <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
          <Pressable 
            style={[styles.enterButton, isLoading && styles.buttonDisabled]} 
            onPress={handleConfirm}
            disabled={isLoading}
          >
            <Text style={styles.enterButtonText}>입장</Text>
          </Pressable>

          {/* 🔹 안읽은 메시지 수 뱃지 */}
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{unreadCount}</Text>
          </View>
        </View>
      </View>

      {/* 🔹 Footer */}
      <View style={styles.footer}>
        <FooterButton title="Home" Icon={null} onPress={() => {}} />
        <FooterButton title="History" Icon={null} onPress={() => {}} />
        <FooterButton title="Chat" Icon={null} onPress={() => {}} />
        <FooterButton title="Message" Icon={null} onPress={() => {}} />
        <FooterButton title="Setting" Icon={null} onPress={() => {}} />
      </View>
    </View>
  );
}

function FooterButton({ title, Icon, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.footerButton}>
      {Icon && <Icon width={35} height={35} />}
      <Text style={styles.footerText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    height: 100,
    backgroundColor: '#f0f',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  chatBody: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  chatBackground: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fafafa',
  },
  chatBubble: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 8,
  },
  timerModal: {
    position: 'absolute',
    top: 80,
    left: '10%',
    right: '10%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalLabel: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 48,
    fontFamily: 'Courier',
    letterSpacing: 2,
    marginBottom: 20,
  },
  enterButton: {
    backgroundColor: '#e163f6',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 24,
  },
  enterButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  unreadBadge: {
    position: 'absolute',
    top: -20,
    right: -20,
    backgroundColor: '#9c4fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    marginTop: 4,
    fontSize: 12,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
});
