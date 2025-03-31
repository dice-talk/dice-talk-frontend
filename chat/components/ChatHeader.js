import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connectSocket, disconnectSocket, sendMessage as socketSendMessage } from '../../lib/socket';


const ChatContext = createContext();


export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [messages, setMessages] = useState({});
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

  useEffect(() => {
    if (token && !isConnected && !isConnecting) {
      setIsConnecting(true);

      connectSocket((type, payload) => {
        // 🔥 여기 추가
        if (type === 'CHAT') {
          const {
            chatRoomId,
            chatId,
            message,
            nickName,
            createdAt
          } = payload;

          // setCurrentRoomId(chatRoomId); 
          
          console.log("📦 수신된 chatRoomId:", chatRoomId);
          console.log("🆔 chatId:", chatId);
          console.log("💬 message:", message);
          console.log("🙋‍♂️ nickName:", nickName);
          console.log("⏰ createdAt:", createdAt);
          
          const convertedMessage = {
            id: chatId,
            content: message,
            sender: nickName,
            timestamp: createdAt,
          };

          
          setMessages(prev => ({
            ...prev,
            [chatRoomId]: [...(prev[chatRoomId] || []), convertedMessage],
          }));

          console.log("💬 [수신된 메시지]", convertedMessage);
        }
      });

      setIsConnected(true);
      setIsConnecting(false);
    }

    return () => {
      if (isConnected) disconnectSocket();
    };
  }, [token, isConnected, isConnecting]);

  // 채팅방 참여
  const joinRoom = (roomId) => setCurrentRoomId(roomId);

  // 채팅방 나가기
  const leaveRoom = () => setCurrentRoomId(null);

  // 채팅 메시지 전송
  const sendMessage = async (content) => {
    if (!isConnected || !currentRoomId) return false;
  
    const memberIdStr = await AsyncStorage.getItem("memberId");

    const memberId = Number(memberIdStr);
    const nickname = await AsyncStorage.getItem("nickname");
  
    const message = {
      message: content,
      nickname: nickname || "익명",
      memberId,
      chatRoomId: currentRoomId,
    };
  
    // 👉 낙관적 메시지 미리 추가
    const optimisticMsg = {
      id: Date.now(), // 임시 ID
      content: content,
      sender: nickname,
      timestamp: new Date().toISOString(),
    };
  
    setMessages((prev) => ({
      ...prev,
      [currentRoomId]: [...(prev[currentRoomId] || []), optimisticMsg],
    }));
  
    socketSendMessage(currentRoomId, message);
    return true;
  };
  
  

  const currentRoomMessages = messages[currentRoomId] || [];

  useEffect(() => {
    console.log("🧾 [현재 메시지 상태 업데이트됨]");
    console.log("📦 전체 messages 객체:", messages);
    console.log("💬 현재 채팅방 메시지:", messages[currentRoomId] || []);
  }, [messages, currentRoomId]);

  return (
    <ChatContext.Provider
      value={{
        isConnected,
        isConnecting,
        currentRoomId,
        currentRoomMessages,
        userInfo,
        token,
        joinRoom,
        leaveRoom,
        sendMessage,
        // 🔁 ChatContext.js 수정
        setCurrentRoomMessages: (roomId, updater) =>
          setMessages((prev) => ({
            ...prev,
            [roomId]:
              typeof updater === 'function'
                ? updater(prev[roomId] || [])
                : updater,
          })),
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// import React from 'react';
// import { View, Text, StyleSheet, Pressable } from 'react-native';
// import LoveBack from "../../assets/icon/logo/love_back.svg";
// import LoveSideBar from "../../assets/icon/logo/love_sidebar_nonClick.svg";

// export default function ChatHeader({ title, onBack, onToggleSidebar }) {
//   return (
//     <View style={styles.topBar}>
//       <Pressable onPress={onBack}>
//         <LoveBack width={28} height={28} />
//       </Pressable>
//       <Text style={styles.title}>{title}</Text>
//       <Pressable onPress={onToggleSidebar}>
//         <LoveSideBar width={28} height={28} />
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   topBar: {
//     height: 60,
//     backgroundColor: "white",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 18,
//     color: "#A45C73",
//     fontWeight: "600",
//   },
// }); 