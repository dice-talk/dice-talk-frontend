// import React, { createContext, useState, useEffect, useContext } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { connectSocket, disconnectSocket, sendMessage as socketSendMessage } from '../lib/socket';

// const ChatContext = createContext();

// export const useChat = () => useContext(ChatContext);

// export const ChatProvider = ({ children }) => {
//   const [isConnected, setIsConnected] = useState(false);
//   const [currentRoomId, setCurrentRoomId] = useState(null);
//   const [messages, setMessages] = useState({});
//   const [userInfo, setUserInfo] = useState(null);
//   const [token, setToken] = useState(null);
//   const [isConnecting, setIsConnecting] = useState(false);

//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem('access_token');
//         const storedUserInfo = await AsyncStorage.getItem('user_info');
//         if (storedToken) setToken(storedToken);
//         if (storedUserInfo) setUserInfo(JSON.parse(storedUserInfo));
//       } catch (error) {
//         console.error('❌ 사용자 데이터 로드 오류:', error);
//       }
//     };
//     loadUserData();
//   }, []);

//   useEffect(() => {
//     if (token && !isConnected && !isConnecting) {
//       setIsConnecting(true);

//       connectSocket((type, payload) => {
//         // 🔥 여기 추가
//         if (type === 'CHAT') {
//           const {
//             chatRoomId,
//             chatId,
//             message,
//             nickName,
//             createdAt
//           } = payload;

//           // setCurrentRoomId(chatRoomId); 
          
//           console.log("📦 수신된 chatRoomId:", chatRoomId);
//           console.log("🆔 chatId:", chatId);
//           console.log("💬 message:", message);
//           console.log("🙋‍♂️ nickName:", nickName);
//           console.log("⏰ createdAt:", createdAt);
          
//           const convertedMessage = {
//             id: chatId,
//             content: message,
//             sender: nickName,
//             timestamp: createdAt,
//           };

          
//           setMessages(prev => ({
//             ...prev,
//             [chatRoomId]: [...(prev[chatRoomId] || []), convertedMessage],
//           }));

//           console.log("💬 [수신된 메시지]", convertedMessage);
//         }
//       });

//       setIsConnected(true);
//       setIsConnecting(false);
//     }

//     return () => {
//       if (isConnected) disconnectSocket();
//     };
//   }, [token, isConnected, isConnecting]);

//   const joinRoom = (roomId) => setCurrentRoomId(roomId);
//   const leaveRoom = () => setCurrentRoomId(null);

//   const sendMessage = async (content) => {
//     console.log("content : " + content);
//     console.log("currentRoomId : " + currentRoomId);
//     console.log("isConnected : " + isConnected);
//     if (!isConnected || !currentRoomId) return false;
  
//     const memberIdStr = await AsyncStorage.getItem("memberId");
//     const memberId = Number(memberIdStr);
//     const nickname = await AsyncStorage.getItem("nickname");
  
//     const message = {
//       message: content,
//       nickname: nickname || "익명",
//       memberId,
//       chatRoomId: currentRoomId,
//     };
  
//     // 👉 낙관적 메시지 미리 추가
//     const optimisticMsg = {
//       id: Date.now(), // 임시 ID
//       content: content,
//       sender: nickname,
//       timestamp: new Date().toISOString(),
//     };
  
//     setMessages((prev) => ({
//       ...prev,
//       [currentRoomId]: [...(prev[currentRoomId] || []), optimisticMsg],
//     }));
  
//     socketSendMessage(currentRoomId, message);
//     return true;
//   };
  
  

//   const currentRoomMessages = messages[currentRoomId] || [];

//   useEffect(() => {
//     console.log("🧾 [현재 메시지 상태 업데이트됨]");
//     console.log("📦 전체 messages 객체:", messages);
//     console.log("💬 현재 채팅방 메시지:", messages[currentRoomId] || []);
//   }, [messages, currentRoomId]);

//   return (
//     <ChatContext.Provider
//       value={{
//         isConnected,
//         isConnecting,
//         currentRoomId,
//         currentRoomMessages,
//         userInfo,
//         token,
//         joinRoom,
//         leaveRoom,
//         sendMessage,
//         // 🔁 ChatContext.js 수정
//         setCurrentRoomMessages: (roomId, updater) =>
//           setMessages((prev) => ({
//             ...prev,
//             [roomId]:
//               typeof updater === 'function'
//                 ? updater(prev[roomId] || [])
//                 : updater,
//           })),
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendMessage as socketSendMessage } from '../lib/socket';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false); // 연결 상태만 관리
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [messages, setMessages] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);

  // 사용자 정보 로딩
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

  const joinRoom = (roomId) => setCurrentRoomId(roomId);
  const leaveRoom = () => setCurrentRoomId(null);

  const sendMessage = async (content) => {
    console.log("content : " + content);
    console.log("currentRoomId : " + currentRoomId);
    console.log("isConnected : " + isConnected);
    if (!currentRoomId) return false;

    const memberIdStr = await AsyncStorage.getItem("memberId");
    const memberId = Number(memberIdStr);
    const nickname = await AsyncStorage.getItem("nickname");

    const message = {
      message: content,
      nickname: nickname || "익명",
      memberId,
      chatRoomId: currentRoomId,
    };

    // 낙관적 렌더링
    const optimisticMsg = {
      id: Date.now(),
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

  return (
    <ChatContext.Provider
      value={{
        isConnected,
        setIsConnected, // 외부에서 상태 제어용으로 노출
        currentRoomId,
        currentRoomMessages,
        userInfo,
        token,
        joinRoom,
        leaveRoom,
        sendMessage,
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


// import React, { createContext, useState, useEffect, useContext } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { connectSocket, disconnectSocket, sendMessage as socketSendMessage } from '../lib/socket';

// const ChatContext = createContext();

// export const useChat = () => useContext(ChatContext);

// export const ChatProvider = ({ children }) => {
//   const [isConnected, setIsConnected] = useState(false);
//   const [currentRoomId, setCurrentRoomId] = useState(null);
//   const [messages, setMessages] = useState({});
//   const [userInfo, setUserInfo] = useState(null);
//   const [token, setToken] = useState(null);

//   // 사용자 정보 및 토큰 로딩 + 소켓 연결
//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem('access_token');
//         const storedUserInfo = await AsyncStorage.getItem('user_info');
  
//         if (storedToken) {
//           setToken(storedToken);
//         }
  
//         if (storedUserInfo) {
//           setUserInfo(JSON.parse(storedUserInfo));
//         }
  
//         // ✅ 여기서 connectSocket 실행
//         if (storedToken && !isConnected) {
//           console.log("📡 [소켓 연결 시작]");
//           connectSocket((type, payload) => {
//             if (type === 'CHAT') {
//               const {
//                 chatRoomId,
//                 chatId,
//                 message,
//                 nickName,
//                 createdAt,
//               } = payload;
  
//               const convertedMessage = {
//                 id: chatId,
//                 content: message,
//                 sender: nickName,
//                 timestamp: createdAt,
//               };
  
//               setMessages(prev => ({
//                 ...prev,
//                 [chatRoomId]: [...(prev[chatRoomId] || []), convertedMessage],
//               }));
  
//               console.log("💬 [수신된 메시지]", convertedMessage);
//             }
//           });
  
//           setIsConnected(true);
//         }
//       } catch (error) {
//         console.error('❌ 사용자 정보 로딩 실패:', error);
//       }
//     };
  
//     loadUserData();
  
//     return () => {
//       if (isConnected) {
//         console.log("🔌 [소켓 연결 해제]");
//         disconnectSocket();
//         setIsConnected(false);
//       }
//     };
//   }, []);
  

//   // 채팅방 입장/퇴장
//   const joinRoom = (roomId) => setCurrentRoomId(roomId);
//   const leaveRoom = () => setCurrentRoomId(null);

//   // 메시지 전송
//   const sendMessage = async (content) => {
//     console.log("📤 [메시지 전송 시도]");
//     console.log("내용:", content);
//     console.log("현재 채팅방:", currentRoomId);
//     console.log("소켓 연결 상태:", isConnected);

//     if (!isConnected || !currentRoomId) return false;

//     const memberIdStr = await AsyncStorage.getItem("memberId");
//     const nickname = await AsyncStorage.getItem("nickname");

//     const message = {
//       message: content,
//       nickname: nickname || "익명",
//       memberId: Number(memberIdStr),
//       chatRoomId: currentRoomId,
//     };

//     // 낙관적 메시지 렌더링
//     const optimisticMsg = {
//       id: Date.now(),
//       content: content,
//       sender: nickname,
//       timestamp: new Date().toISOString(),
//     };

//     setMessages(prev => ({
//       ...prev,
//       [currentRoomId]: [...(prev[currentRoomId] || []), optimisticMsg],
//     }));

//     socketSendMessage(currentRoomId, message);
//     return true;
//   };

//   // 현재 채팅방 메시지
//   const currentRoomMessages = messages[currentRoomId] || [];

//   // 상태 확인용 디버깅 로그
//   useEffect(() => {
//     console.log("🧾 [메시지 상태 업데이트]");
//     console.log("전체 messages:", messages);
//     console.log("현재 채팅방 메시지:", currentRoomMessages);
//   }, [messages, currentRoomId]);

//   return (
//     <ChatContext.Provider
//       value={{
//         isConnected,
//         currentRoomId,
//         currentRoomMessages,
//         userInfo,
//         token,
//         joinRoom,
//         leaveRoom,
//         sendMessage,
//         setCurrentRoomMessages: (roomId, updater) =>
//           setMessages(prev => ({
//             ...prev,
//             [roomId]: typeof updater === 'function'
//               ? updater(prev[roomId] || [])
//               : updater,
//           })),
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };
