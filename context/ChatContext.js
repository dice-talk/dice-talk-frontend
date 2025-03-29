import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 채팅 컨텍스트 생성
const ChatContext = createContext();
const CHAT_STORAGE_KEY = '@chat_room_info';

// 채팅 컨텍스트 훅
export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}

// 채팅 프로바이더 컴포넌트
export function ChatProvider({ children }) {
  const [chatRoomInfo, setChatRoomInfo] = useState({
    chatRoomId: null,
    chatPart: [],
    messages: [],
    // 필요한 다른 채팅방 정보들도 여기에 추가
  });

  // 앱 시작 시 AsyncStorage에서 데이터 복원
  useEffect(() => {
    const loadStoredChatInfo = async () => {
      try {
        const storedInfo = await AsyncStorage.getItem(CHAT_STORAGE_KEY);
        if (storedInfo) {
          const parsedInfo = JSON.parse(storedInfo);
          setChatRoomInfo(parsedInfo);
          console.log('채팅방 정보 복원 완료:', parsedInfo);
        }
      } catch (error) {
        console.error('채팅방 정보 복원 실패:', error);
      }
    };

    loadStoredChatInfo();
  }, []);

  // 메시지 추가 함수
  const addMessage = async (message) => {
    try {
      const updatedInfo = {
        ...chatRoomInfo,
        messages: [...(chatRoomInfo.messages || []), message]
      };
      
      setChatRoomInfo(updatedInfo);
      await AsyncStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedInfo));
      console.log('메시지 추가 완료:', message);
    } catch (error) {
      console.error('메시지 추가 실패:', error);
    }
  };

  // Context와 AsyncStorage 모두 업데이트
  const updateChatRoomInfo = async (newInfo) => {
    try {
      const updatedInfo = {
        ...chatRoomInfo,
        ...newInfo
      };
      
      setChatRoomInfo(updatedInfo);
      await AsyncStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedInfo));
      console.log('채팅방 정보 저장 완료:', updatedInfo);
    } catch (error) {
      console.error('채팅방 정보 저장 실패:', error);
    }
  };

  // 채팅방 정보 초기화
  const clearChatRoomInfo = async () => {
    try {
      setChatRoomInfo({
        chatRoomId: null,
        chatPart: [],
        messages: [],
      });
      
      await AsyncStorage.removeItem(CHAT_STORAGE_KEY);
      console.log('채팅방 정보 초기화 완료');
    } catch (error) {
      console.error('채팅방 정보 초기화 실패:', error);
    }
  };

  return (
    <ChatContext.Provider 
      value={{
        chatRoomInfo,
        updateChatRoomInfo,
        clearChatRoomInfo,
        addMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
} 