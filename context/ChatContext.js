import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connectSocket, disconnectSocket, sendMessage as socketSendMessage } from '../lib/socket';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [currentRoomMessages, setCurrentRoomMessages] = useState([]);  // 초기값을 빈 배열로 설정
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('access_token');
        const storedUserInfo = await AsyncStorage.getItem('user_info');
        if (storedToken) setToken(storedToken);
        if (storedUserInfo) setUserInfo(JSON.parse(storedUserInfo));
      } catch (error) {
        console.error('❌ 사용자 데이터 로드 오류:', error);
      }
    };
    loadUserData();
  }, []);

  const joinRoom = (roomId) => {
    setCurrentRoomId(roomId);
    setCurrentRoomMessages([]);  // 채팅방 입장 시 메시지 초기화
  };

  const leaveRoom = () => {
    setCurrentRoomId(null);
    setCurrentRoomMessages([]);  // 채팅방 퇴장 시 메시지 초기화
  };

  const sendMessage = async (content) => {
    if (!currentRoomId || !token) return;

    try {
      const response = await fetch('http://172.30.1.52:8080/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          chatRoomId: currentRoomId,
          message: content
        })
      });

      if (!response.ok) {
        throw new Error('메시지 전송 실패');
      }

      const data = await response.json();
      const newMessage = {
        id: data.chatId,
        content: data.message,
        sender: data.nickName,
        timestamp: data.createdAt
      };

      setCurrentRoomMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error('메시지 전송 오류:', error);
    }
  };

  return (
    <ChatContext.Provider value={{
      isConnected,
      currentRoomId,
      currentRoomMessages,
      setCurrentRoomMessages,
      userInfo,
      token,
      isConnecting,
      joinRoom,
      leaveRoom,
      sendMessage
    }}>
      {children}
    </ChatContext.Provider>
  );
};
