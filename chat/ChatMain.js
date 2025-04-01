// ... 기존 import 유지 ...
import { joinMatching, cancelMatching } from '../utils/http/nicknameUtils';
import { StyleSheet, View, Text, Image, Pressable, ActivityIndicator, Alert } from 'react-native';

export default function ChatMain() {

  // ... 기존 state 유지 ...
  const [isInMatching, setIsInMatching] = useState(false);
  const [unreadCount, setUnreadCount] = useState(42);
  const [remainingTime, setRemainingTime] = useState(48 * 60 * 60); // 48시간 = 172800초
  const navigation = useNavigation();
  const [isJoiningQueue, setIsJoiningQueue] = useState(false);
  
  // ChatContext에서 필요한 상태와 함수 가져오기
  const { 
    connectWebSocket, 
    isConnected, 
    isConnecting, 
    userInfo, 
    token, 
    queueStatus, 
    isInQueue, 
    joinQueue, 
    leaveQueue, 
    getQueueStatus,
    chatRooms
  } = useChat();


  // 선택된 아이콘에 해당하는 사용자의 memberId를 찾는 함수
  const findSelectedUserMemberId = (iconId) => {
    const selectedUser = chatRoomInfo.chatPart.find(user => user.iconId === iconId);
    return selectedUser ? selectedUser.memberId : null;
  };

  // if(!chatRoomId) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>채팅방 정보를 불러오는 중입니다...</Text>
  //       <Button title='결과보기' onPress={() => navigation.navigate('LetterResult')}/>
  //     </View>
  //   )
  // }

  // 토큰과 웹소켓 연결 관리
  useEffect(() => {
    if (token && !isConnected && !isConnecting) {
      // connectWebSocket();
    }
  }, [token, isConnected, isConnecting, connectWebSocket]);

  // 웹소켓 연결 후 대기열 상태 요청
  useEffect(() => {
    if (isConnected) {
      getQueueStatus();
    }
  }, [isConnected, getQueueStatus]);

  // 타이머 설정

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // 입장 버튼 핸들러
  const handleEnterPress = async () => {
    if (!token || !userInfo) {
      Alert.alert('알림', '로그인이 필요합니다.');
      return;
    }
    
    setIsJoiningQueue(true);
    setIsInMatching(true);
    
    try {
      const result = await joinMatching();
      if (result.chatRoomId) {
        navigation.navigate("ChatTab", {
          screen: "Chat",
          params: { roomId: result.chatRoomId },
        });
      } else {
        Alert.alert('알림', '매칭 대기열에 참가했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '매칭 참가 중 오류가 발생했습니다.');
    } finally {
      setIsJoiningQueue(false);
    }
  };


  // 돌아가기 버튼 핸들러
  const handleCancelPress = async () => {
    try {
      await cancelMatching();
      setIsInMatching(false);
      Alert.alert('알림', '매칭이 취소되었습니다.');
    } catch (error) {
      Alert.alert('오류', '매칭 취소 중 오류가 발생했습니다.');
    }
  };

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  // 뒤로가기 핸들러 - Home으로 돌아가기
  const handleGoBack = () => {
    navigation.navigate('Main');
  };

  // const handleEventConfirm = async () => {
  //   try {
  //     if (!selectedIcon) return;
      
  //     const receiverMemberId = findSelectedUserMemberId(selectedIcon);
  //     if (!receiverMemberId) {
  //       Alert.alert('오류', '선택된 사용자를 찾을 수 없습니다.');
  //       return;
  //     }

  //     const response = await postEvent({
  //       receiverId: receiverMemberId,
  //       senderId: memberId,
  //       eventId: 1,
  //       chatRoomId: chatRoomInfo.chatRoomId,
  //       message: "상대방을 선택했습니다.",
  //       roomEventType: "PICK_MESSAGE"
  //     });
      
  //     if (response) {
  //       setChatRoomInfo(prev => ({
  //         ...prev,
  //         lastEventTime: new Date().toISOString(),
  //         lastEventType: "PICK_MESSAGE",
  //         selectedReceiverId: receiverMemberId
  //       }));
  //     }
      
  //     setIsConfirmed(true);
  //     setTimeout(() => {
  //       setShowEventModal(false);
  //       setIsConfirmed(false);
  //       setSelectedIcon(null);
  //     }, 2000);
      
  //   } catch (error) {
  //     Alert.alert('오류', '이벤트 등록에 실패했습니다.');
  //   }
  // 현재 대기열 참가자 수 표시
  const getUserCount = () => {
    if (queueStatus && queueStatus.users) {
      return queueStatus.users.length;
    }
  };


  // 예상 대기 시간 표시
  const getEstimatedWaitTime = () => {
    if (queueStatus && queueStatus.estimatedWaitTime !== undefined) {
      const minutes = Math.floor(queueStatus.estimatedWaitTime / 60);
      const seconds = queueStatus.estimatedWaitTime % 60;
      return `${minutes}분 ${seconds}초`;
    }
    return '계산 중...';
  };

  // 우측 상단 배지의 안 읽은 메시지 수
  // useEffect(() => {
  //   // 모든 채팅방의 안 읽은 메시지 수 계산
  //   let totalUnread = 0;
  //   if (chatRooms && chatRooms.length > 0) {
  //     // 각 채팅방의 안읽은 메시지를 합산 (실제 구현이 필요합니다)
  //     // 예: chatRooms.forEach(room => totalUnread += room.unreadCount || 0);
  //     totalUnread = 42; // 현재는 고정 값 사용
  //   }
  //   setUnreadCount(totalUnread);
  // }, [chatRooms]);

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

        </View>

        {/* 🔸 남은 시간 모달 */}
        <View style={styles.timerModal}>
          <Text style={styles.modalLabel}>채팅 종료까지</Text>
          <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
          
          {isConnecting ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#e163f6" />
              <Text style={styles.loadingText}>연결 중...</Text>
            </View>
          ) : (
            <>
              {queueStatus && isInQueue && (
                <View style={styles.queueInfoContainer}>
                  <Text style={styles.queueInfoText}>
                    현재 대기 인원: {getUserCount()}/6명
                  </Text>
                  <Text style={styles.queueInfoText}>
                    예상 대기 시간: {getEstimatedWaitTime()}
                  </Text>
                </View>
              )}
              
              <Pressable 
                style={[
                  styles.enterButton,
                  isJoiningQueue && styles.disabledButton,
                  isInQueue && styles.leaveButton
                ]}
                onPress={handleEnterPress}
                disabled={isJoiningQueue}
              >
                {isJoiningQueue ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.enterButtonText}>
                    {isInQueue ? '나가기' : '입장'}
                  </Text>
                )}
              </Pressable>
            </>
          )}

          {/* 🔹 안읽은 메시지 수 뱃지 */}
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{unreadCount}</Text>
          </View>
        </View>
      </View>


      {/* Footer 컴포넌트로 교체 */}
      <Footer />
    </View>
  );
}

// function FooterButton({ title, Icon, onPress }) {
//   return (
//     <Pressable onPress={onPress} style={styles.footerButton}>
//       {Icon && <Icon width={35} height={35} />}
//       <Text style={styles.footerText}>{title}</Text>
//     </Pressable>
//     );
//     } 
//   }
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
    top: 100,
    left: '5%',
    right: '5%',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalLabel: {
    fontSize: 20,
    color: '#888',
    marginBottom: 12,
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
    minWidth: 180,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  leaveButton: {
    backgroundColor: '#ff6b6b',
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
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  queueInfoContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  queueInfoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});
