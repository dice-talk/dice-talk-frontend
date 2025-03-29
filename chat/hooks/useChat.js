import { useState, useEffect, useCallback } from 'react';

export default function useChat(roomId) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // 웹소켓 연결
  useEffect(() => {
    const ws = new WebSocket(`ws://your-websocket-server/chat/${roomId}`);

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
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
  }, [roomId]);

  // 메시지 전송
  const sendMessage = useCallback((message) => {
    if (socket && isConnected) {
      const messageData = {
        type: 'message',
        content: message,
        timestamp: new Date().toISOString(),
        sender: 'current_user', // 실제 사용자 ID로 교체 필요
      };
      socket.send(JSON.stringify(messageData));
    }
  }, [socket, isConnected]);

  // 메시지 삭제
  const deleteMessage = useCallback((messageId) => {
    if (socket && isConnected) {
      const deleteData = {
        type: 'delete',
        messageId,
      };
      socket.send(JSON.stringify(deleteData));
    }
  }, [socket, isConnected]);

  // 메시지 수정
  const editMessage = useCallback((messageId, newContent) => {
    if (socket && isConnected) {
      const editData = {
        type: 'edit',
        messageId,
        content: newContent,
      };
      socket.send(JSON.stringify(editData));
    }
  }, [socket, isConnected]);

  return {
    messages,
    isConnected,
    sendMessage,
    deleteMessage,
    editMessage,
  };
} 