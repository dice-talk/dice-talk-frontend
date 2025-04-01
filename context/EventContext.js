import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWithAuth } from '../utils/http/fetchWithAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventContext = createContext();

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
}; 

export const EventProvider = ({ children }) => {
  const [eventState, setEventState] = useState({
    participants: [],
    selectedUser: null,
    hasSelected: false,
    hasModified: false,
    isEventActive: false,
    stage: 'WAITING',  // WAITING, EVENT, REVIEW, ENDED
    matchResult: null,
    startTime: null,  // 이벤트 시작 시간 추가
  });

  // 이벤트 상태 초기화
  useEffect(() => {
    const initializeEventState = async () => {
      try {
        const savedState = await AsyncStorage.getItem('eventState');
        if (savedState) {
          setEventState(JSON.parse(savedState));
        }
      } catch (error) {
        console.error('이벤트 상태 초기화 실패:', error);
      }
    };
    initializeEventState();
  }, []);

  // 이벤트 상태 저장
  useEffect(() => {
    const saveEventState = async () => {
      try {
        await AsyncStorage.setItem('eventState', JSON.stringify(eventState));
      } catch (error) {
        console.error('이벤트 상태 저장 실패:', error);
      }
    };
    saveEventState();
  }, [eventState]);

  const calculateRemainingTime = () => {
    if (!eventState.startTime) return null;
    
    const now = new Date();
    const start = new Date(eventState.startTime);
    const totalDuration = 60 * 60 * 1000; // 1시간
    const elapsed = now - start;
    const remaining = totalDuration - elapsed;
    
    return remaining > 0 ? remaining : 0;
  };

  const selectUser = async (userId) => {
    try {
      const memberId = await AsyncStorage.getItem('memberId');
      const chatRoomId = await AsyncStorage.getItem('currentChatRoomId');
      
      const response = await fetchWithAuth('/room-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverId: userId,
          senderId: parseInt(memberId),
          eventId: 1, // 하트 이벤트 ID
          chatRoomId: parseInt(chatRoomId),
          message: "하트를 보냈습니다",
          roomEventType: "PICK_MESSAGE"
        })
      });

      if (response.ok) {
        setEventState(prev => ({
          ...prev,
          selectedUser: userId,
          hasSelected: true,
          startTime: new Date().toISOString(),  // 선택 시 시작 시간 설정
        }));
      }
    } catch (error) {
      console.error('이벤트 선택 실패:', error);
    }
  };

  const modifySelection = async () => {
    // 결제 로직 구현 후 선택 수정 가능하도록 변경
    setEventState(prev => ({
      ...prev,
      hasModified: true
    }));
  };

  const checkEventResult = async (chatRoomId) => {
    try {
      const response = await fetchWithAuth(`/room-event/chat-room/${chatRoomId}`);
      const data = await response.json();
      
      setEventState(prev => ({
        ...prev,
        matchResult: data,
        stage: 'REVIEW'
      }));
    } catch (error) {
      console.error('이벤트 결과 조회 실패:', error);
    }
  };

  const getEventStage = () => {
    return eventState.stage;
  };

  const updateEventState = (newState) => {
    setEventState(prev => ({ ...prev, ...newState }));
  };

  return (
    <EventContext.Provider value={{
      eventState,
      selectUser,
      modifySelection,
      checkEventResult,
      getEventStage,
      calculateRemainingTime,
      updateEventState
    }}>
      {children}
    </EventContext.Provider>
  );
};