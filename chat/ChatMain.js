import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { navigateToChat } from '../navigation/navigationUtils';
import EventModal from './components/EventModal';
import { postEvent } from '../utils/http/eventAPI';
import { useChat } from '../context/ChatContext';
import Footer from '../component/Footer';

// 🔹 더미 이미지 임포트 예시
const bannerImages = [require('../assets/banner/banner_Ex_love.png')]; // 배너 이미지

export default function ChatMain({ memberId }) {
  const navigation = useNavigation();
  const { chatRoomInfo, updateChatRoomInfo } = useChat();
  const { chatRoomId, chatPart } = chatRoomInfo;
  
  const [unreadCount, setUnreadCount] = useState(42);
  const [remainingTime, setRemainingTime] = useState(48 * 60 * 60); // 48시간 = 172800초
  const [isLoading, setIsLoading] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // 선택된 아이콘에 해당하는 사용자의 memberId를 찾는 함수
  const findSelectedUserMemberId = (iconId) => {
    const selectedUser = chatPart.find(user => user.iconId === iconId);
    return selectedUser ? selectedUser.memberId : null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => {
        const newTime = prev > 0 ? prev - 1 : 0;
        // 8시간 = 28800초
        if (newTime <= 28800) {
          setShowEventModal(true);
        }
        return newTime;
      });
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

  const handleEventConfirm = async () => {
    try {
      if (!selectedIcon) return;
      
      const receiverMemberId = findSelectedUserMemberId(selectedIcon);
      if (!receiverMemberId) {
        console.error('선택된 사용자를 찾을 수 없습니다.');
        return;
      }

      const response = await postEvent({
        receiverId: receiverMemberId,
        senderId: memberId,
        eventId: 1,
        chatRoomId: chatRoomId,
        message: "상대방을 선택했습니다.",
        roomEventType: "PICK_MESSAGE"
      });
      
      // 이벤트 성공 시 Context 업데이트
      if (response) {
        try {
          await updateChatRoomInfo({
            lastEventTime: new Date().toISOString(),
            lastEventType: "PICK_MESSAGE",
            selectedReceiverId: receiverMemberId
          });
          
          setIsConfirmed(true);
          setTimeout(() => {
            setShowEventModal(false);
            setIsConfirmed(false);
            setSelectedIcon(null);
          }, 2000);
        } catch (updateError) {
          console.error('채팅방 정보 업데이트 실패:', updateError);
        }
      }
    } catch (error) {
      console.error('이벤트 등록 실패:', error);
    }
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

      {/* Footer 컴포넌트로 교체 */}
      <Footer />

      <EventModal
        visible={showEventModal}
        onClose={() => setShowEventModal(false)}
        onConfirm={handleEventConfirm}
        isConfirmed={isConfirmed}
        selectedIcon={selectedIcon}
        onSelectIcon={setSelectedIcon}
      />
    </View>
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
