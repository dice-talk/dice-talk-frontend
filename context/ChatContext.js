// context/ChatContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// 미리 정의된 닉네임 목록
const PREDEFINED_NICKNAMES = ['하나', '두리', '세찌', '네몽', '다오', '육댕'];

const ChatContext = createContext();


export const ChatProvider = ({ children }) => {
  const [currentRoomMessages, setCurrentRoomMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [nickname, setNickname] = useState('');
  const [isInQueue, setIsInQueue] = useState(false);

  const clientRef = useRef(null);
  const subscriptionRef = useRef(null);

  // STOMP 클라이언트 초기화
  useEffect(() => {
    const setupStompClient = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          return;
        }

        const stompClient = new Client({
          // ✅ 변경 필요: 백엔드 웹소켓 URL
          webSocketFactory: () => new SockJS('http://172.30.1.22:8080/ws-stomp'),
          connectHeaders: { Authorization: token },
          debug: (str) => console.log(new Date(), str),
          reconnectDelay: 5000,
          onConnect: () => {
            console.log('STOMP connected');
            setIsConnected(true);
          },
          onStompError: (frame) => {
            console.error('STOMP Error:', frame.headers['message']);
            Alert.alert('연결 오류', '채팅 서버에 연결할 수 없습니다.');
          },
        });

        stompClient.activate();
        clientRef.current = stompClient;

        return () => {
          if (stompClient) {
            stompClient.deactivate();
          }
        };
      } catch (error) {
        console.error('Setup chat error:', error);
      }
    };

    setupStompClient();
  }, []);

  // 대기열 참가
  const joinQueue = async () => {
    if (!isConnected || !clientRef.current) {
      Alert.alert('연결 오류', '서버에 연결되어 있지 않습니다.');
      return;
    }

    try {
      setIsInQueue(true);

      // ✅ 변경 필요: 대기열 참가 API 엔드포인트
      const token = await AsyncStorage.getItem('accessToken');
      const memberId = await AsyncStorage.getItem('memberId'); // 멤버 ID 가져오기

      // ✅ 커스텀 필요: 대기열 참가 가능 여부 확인 API 호출
      const isPossibleResponse = await fetch(
        `http://172.30.1.22:8080/chat-rooms/isPossible/${memberId}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (!isPossibleResponse.ok) {
        setIsInQueue(false);
        Alert.alert('오류', '이미 다른 채팅방에 참여 중입니다.');
        return;
      }

      // ✅ 커스텀 필요: 대기열 참가 API 호출 (실제 API URL로 변경)
      const response = await fetch('http://172.30.1.22:8080/queue/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error('대기열 참가에 실패했습니다.');
      }

      // 대기열 참가 후 서버로부터 채팅방 할당 대기
      subscribeToQueueResult();
    } catch (error) {
      setIsInQueue(false);
      Alert.alert('오류', error.message);
    }
  };

  // 대기열 결과 구독 (방 할당 알림 수신)
  const subscribeToQueueResult = () => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    // ✅ 커스텀 필요: 대기열 결과 수신 주제(topic)
    const newSubscription = clientRef.current.subscribe(
      '/user/queue/assignment',
      (message) => {
        try {
          const payload = JSON.parse(message.body);
          // 닉네임 할당
          assignRandomNickname();
          // 채팅방 참여
          joinRoom(payload.roomId);
          setIsInQueue(false);
        } catch (error) {
          console.error('Failed to parse queue result:', error);
        }
      },
    );

    subscriptionRef.current = newSubscription;
  };

  // 랜덤 닉네임 할당
  const assignRandomNickname = () => {
    const randomIndex = Math.floor(Math.random() * PREDEFINED_NICKNAMES.length);
    const selectedNickname = PREDEFINED_NICKNAMES[randomIndex];
    setNickname(selectedNickname);
    return selectedNickname;
  };

  // 채팅방 참여
  const joinRoom = (roomId) => {
    if (!isConnected || !clientRef.current) {
      console.warn('STOMP is not connected yet. Cannot join room.');
      return;
    }

    // 이미 구독 중인 채팅방이 있다면 해제
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    setCurrentRoomMessages([]);
    setCurrentRoom(roomId);

    // ✅ 변경 필요: 채팅방 구독 주제(topic)
    console.log(`Subscribing to /sub/chat/${roomId}`);
    const newSubscription = clientRef.current.subscribe(
      `/sub/chat/${roomId}`,
      (message) => {
        try {
          const payload = JSON.parse(message.body);
          // ✅ 변경 필요: 메시지 형식 백엔드에 맞게 변경
          const formattedMessage = {
            id: payload.chatId || `msg_${Date.now()}`,
            content: payload.message,
            sender:
              payload.nickName === nickname ? 'current_user' : payload.nickName,
            timestamp: payload.createdAt || new Date().toISOString(),
          };
          setCurrentRoomMessages((prev) => [...prev, formattedMessage]);
        } catch (error) {
          console.error('Failed to parse message:', error);
        }
      },
    );

    subscriptionRef.current = newSubscription;
  };

  // 채팅방 나가기
  const leaveRoom = () => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }

    if (currentRoom && isConnected && clientRef.current) {
      // ✅ 커스텀 필요: 채팅방 나가기 API 엔드포인트 (추가 구현 필요)
      clientRef.current.publish({
        destination: `/pub/chat/${currentRoom}/leave`,
        body: JSON.stringify({ nickname }),
      });
    }

    setCurrentRoom(null);
    setCurrentRoomMessages([]);
    setNickname('');
  };

  // 메시지 전송
  const sendMessage = (messageText) => {
    if (
      !isConnected ||
      !clientRef.current ||
      !currentRoom ||
      !messageText.trim()
    ) {
      return;
    }

    // ✅ 변경 필요: 메시지 페이로드 형식 백엔드에 맞게 변경
    const messagePayload = {
      message: messageText,
      nickname: nickname,
      chatRoomId: currentRoom,
      // memberId는 서버에서 STOMP 헤더로부터 가져옴
    };

    // ✅ 변경 필요: 메시지 전송 API 엔드포인트
    clientRef.current.publish({
      destination: `/pub/chat/${currentRoom}/sendMessage`,
      body: JSON.stringify(messagePayload),
    });

    // 로컬에 메시지 추가 (UI 즉시 업데이트)
    const localMessage = {
      id: `local_${Date.now()}`,
      content: messageText,
      sender: 'current_user',
      timestamp: new Date().toISOString(),
    };
    setCurrentRoomMessages((prev) => [...prev, localMessage]);
  };

  return (
    <ChatContext.Provider
      value={{
        currentRoomMessages,
        isConnected,
        currentRoom,
        nickname,
        isInQueue,
        joinQueue,
        joinRoom,
        leaveRoom,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
