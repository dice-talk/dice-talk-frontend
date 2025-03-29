// screens/PostEventScreen.tsx
import { fetchWithAuth } from './fetchWithAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 채팅방 이벤트 등록
export const postEvent = async (eventData) => {
  try {
    const response = await fetchWithAuth('room-event', {
      method: 'POST',
      body: eventData
    });
    return await response.json();
  } catch (error) {
    console.error('이벤트 등록 실패:', error);
    throw error;
  }
};

// 특정 채팅방 이벤트 결과 조회
export const getEventResult = async (chatRoomId) => {
  try {
    const response = await fetchWithAuth(`room-event/chat-room/${chatRoomId}`, {
      method: 'GET'
    });
    return await response.json();
  } catch (error) {
    console.error('이벤트 결과 조회 실패:', error);
    throw error;
  }
};

// 채팅방 이벤트 상세 조회
export const getEventDetail = async (roomEventId) => {
  try {
    const response = await fetchWithAuth(`room-event/${roomEventId}`, {
      method: 'GET'
    });
    return await response.json();
  } catch (error) {
    console.error('이벤트 상세 조회 실패:', error);
    throw error;
  }
};