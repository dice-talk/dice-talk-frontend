//import { fetchWithAuth } from './fetchWithAuth';
import { useAuth } from '../http/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 채팅방 이벤트 등록
export const usePostEvent = () => {
  const {fetchWithAuth} = useAuth();

  const postEvent = async (eventData) => {
    try {
      const response = await fetchWithAuth('room-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      })  

      if(!response.ok) {
        throw new Error(`Http error! status: ${response.status}`)
      } 

      const text = await response.text();
      return text ? JSON.parse(text) : {};
    } catch (error) {
      console.error('이벤트 등록 실패:', error);
      throw error;
    }
  }

  return {postEvent};
}
// export const postEvent = async (eventData) => {
//   try {
//     const response = await fetchWithAuth('room-event', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json' // 반드시 필요요
//       },
//       body: JSON.stringify(eventData) // stringify 해줘야 서버가 이해
//     });
//     return await response.json();
//   } catch (error) {
//     console.error('이벤트 등록 실패:', error);
//     throw error;
//   }
// };

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