import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventState, setEventState] = useState({
    startTime: null,
    selectedUser: null,
    hasSelected: false,
    hasModified: false,
    isEventActive: false,
    remainingTime: null,
    isEventEnded: false,
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

  // 이벤트 시작
  const startEvent = (roomId) => {
    const startTime = new Date();
    setEventState(prev => ({
      ...prev,
      startTime,
      isEventActive: true,
    }));
  };

  // 사용자 선택
  const selectUser = (userId) => {
    if (eventState.hasSelected && !eventState.hasModified) {
      return false; // 이미 선택했고 수정하지 않은 경우
    }
    setEventState(prev => ({
      ...prev,
      selectedUser: userId,
      hasSelected: true,
    }));
    return true;
  };

  // 선택 수정 (결제 필요)
  const modifySelection = () => {
    setEventState(prev => ({
      ...prev,
      hasModified: true,
    }));
  };

  // 이벤트 종료
  const endEvent = () => {
    setEventState(prev => ({
      ...prev,
      isEventActive: false,
      isEventEnded: true,
    }));
  };

  // 남은 시간 계산
  const calculateRemainingTime = () => {
    if (!eventState.startTime) return null;
    
    const now = new Date();
    const start = new Date(eventState.startTime);
    const totalDuration = 49 * 60 * 60 * 1000; // 49시간
    const elapsed = now - start;
    const remaining = totalDuration - elapsed;
    
    return remaining > 0 ? remaining : 0;
  };

  // 이벤트 단계 확인
  const getEventStage = () => {
    if (!eventState.startTime) return 'WAITING';
    
    const now = new Date();
    const start = new Date(eventState.startTime);
    const elapsed = now - start;
    
    if (elapsed < 40 * 60 * 60 * 1000) return 'WAITING';
    if (elapsed < 48 * 60 * 60 * 1000) return 'EVENT';
    if (elapsed < 49 * 60 * 60 * 1000) return 'REVIEW';
    return 'ENDED';
  };

  return (
    <EventContext.Provider value={{
      eventState,
      startEvent,
      selectUser,
      modifySelection,
      endEvent,
      calculateRemainingTime,
      getEventStage,
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
}; 