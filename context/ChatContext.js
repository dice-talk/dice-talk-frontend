import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 채팅 컨텍스트 생성
const ChatContext = createContext();
const CHAT_STORAGE_KEY = '@chat_room_info';

// 채팅 컨텍스트 훅
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

// 채팅 프로바이더 컴포넌트
export function ChatProvider({ children }) {
  const [chatRoomInfo, setChatRoomInfo] = useState({
    chatRoomId: null,
    chatPart: [],
  });
  
  const [currentRoomMessages, setCurrentRoomMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  // 앱 시작 시 AsyncStorage에서 데이터 복원
  useEffect(() => {
    const loadStoredChatInfo = async () => {
      try {
        const storedInfo = await AsyncStorage.getItem(CHAT_STORAGE_KEY);
        if (storedInfo) {
          const parsedInfo = JSON.parse(storedInfo);
          setChatRoomInfo(parsedInfo);
        }
      } catch (error) {
        console.error('채팅방 정보 복원 실패:', error);
      }
    };

    loadStoredChatInfo();
  }, []);

  // 메시지 전송 함수
  const sendMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      content: message,
      sender: 'current_user',
      timestamp: new Date().toISOString(),
    };
    setCurrentRoomMessages(prev => [...prev, newMessage]);
  };

  // 채팅방 참여 함수
  const joinRoom = async (roomId) => {
    try {
      const newInfo = { chatRoomId: roomId };
      await AsyncStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(newInfo));
      setChatRoomInfo(prev => ({ ...prev, ...newInfo }));
      setIsConnected(true);
    } catch (error) {
      console.error('채팅방 참여 실패:', error);
    }
  };

  // 채팅방 나가기 함수
  const leaveRoom = async () => {
    try {
      await AsyncStorage.removeItem(CHAT_STORAGE_KEY);
      setChatRoomInfo({ chatRoomId: null, chatPart: [] });
      setCurrentRoomMessages([]);
      setIsConnected(false);
    } catch (error) {
      console.error('채팅방 나가기 실패:', error);
    }
  };

  // Context와 AsyncStorage 모두 업데이트
  const updateChatRoomInfo = async (newInfo) => {
    try {
      const updatedInfo = { ...chatRoomInfo, ...newInfo };
      await AsyncStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedInfo));
      setChatRoomInfo(updatedInfo);
    } catch (error) {
      console.error('채팅방 정보 저장 실패:', error);
    }
  };

  // 채팅방 정보 초기화
  const clearChatRoomInfo = async () => {
    try {
      await AsyncStorage.removeItem(CHAT_STORAGE_KEY);
      setChatRoomInfo({ chatRoomId: null, chatPart: [] });
      setCurrentRoomMessages([]);
    } catch (error) {
      console.error('채팅방 정보 초기화 실패:', error);
    }
  };

  return (
    <ChatContext.Provider 
      value={{
        chatRoomInfo,
        currentRoomMessages,
        isConnected,
        sendMessage,
        joinRoom,
        leaveRoom,
        updateChatRoomInfo,
        clearChatRoomInfo
      }}
    >
      {children}
    </ChatContext.Provider>
  );
} 