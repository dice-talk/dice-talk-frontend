import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

// 채팅 컨텍스트 생성
const ChatContext = createContext();

// 채팅 컨텍스트 훅
export const useChat = () => {
  return useContext(ChatContext);
};

// 채팅 프로바이더 컴포넌트
export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [messages, setMessages] = useState({});

  // 웹소켓 연결
  const connectWebSocket = useCallback((userId) => {
    if (!userId) return;

    const ws = new WebSocket(`ws://your-websocket-server/chat/${userId}`);

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // 메시지 타입에 따른 처리
      switch (data.type) {
        case 'message':
          handleNewMessage(data);
          break;
        case 'room_list':
          setChatRooms(data.rooms);
          break;
        case 'room_update':
          updateRoom(data.room);
          break;
        default:
          console.log('Unknown message type:', data.type);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  // 채팅방 입장
  const joinRoom = useCallback((roomId) => {
    if (socket && isConnected) {
      const joinData = {
        type: 'join_room',
        roomId,
      };
      socket.send(JSON.stringify(joinData));
      setCurrentRoomId(roomId);
    }
  }, [socket, isConnected]);

  // 채팅방 나가기
  const leaveRoom = useCallback(() => {
    if (socket && isConnected && currentRoomId) {
      const leaveData = {
        type: 'leave_room',
        roomId: currentRoomId,
      };
      socket.send(JSON.stringify(leaveData));
      setCurrentRoomId(null);
    }
  }, [socket, isConnected, currentRoomId]);

  // 메시지 전송
  const sendMessage = useCallback((content) => {
    if (socket && isConnected && currentRoomId) {
      const messageData = {
        type: 'message',
        roomId: currentRoomId,
        content,
        timestamp: new Date().toISOString(),
      };
      socket.send(JSON.stringify(messageData));
    }
  }, [socket, isConnected, currentRoomId]);

  // 새 메시지 처리
  const handleNewMessage = useCallback((messageData) => {
    const { roomId } = messageData;
    
    setMessages(prevMessages => ({
      ...prevMessages,
      [roomId]: [...(prevMessages[roomId] || []), messageData]
    }));
  }, []);

  // 채팅방 정보 업데이트
  const updateRoom = useCallback((roomData) => {
    setChatRooms(prevRooms => {
      const index = prevRooms.findIndex(room => room.id === roomData.id);
      if (index !== -1) {
        const updatedRooms = [...prevRooms];
        updatedRooms[index] = roomData;
        return updatedRooms;
      }
      return [...prevRooms, roomData];
    });
  }, []);

  // 현재 채팅방 메시지
  const currentRoomMessages = messages[currentRoomId] || [];

  // 컨텍스트 값
  const value = {
    socket,
    isConnected,
    chatRooms,
    currentRoomId,
    currentRoomMessages,
    connectWebSocket,
    joinRoom,
    leaveRoom,
    sendMessage,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}; 