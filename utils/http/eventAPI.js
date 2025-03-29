import { fetchWithAuth } from './AuthContext';

// 채팅방 이벤트 등록
export const postEvent = async (event) => {
  try {
    console.log(event);
    const response = await fetchWithAuth('room-event', {
      method: 'POST',
      body: JSON.stringify({event})
    });

    if (!response.created) {
      const errorData = await response.json();
      console.error('채팅방 이벤트 등록 실패:', errorData);
      throw new Error(errorData.error || '채팅방 이벤트 등록 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('채팅방 이벤트 등록 실패:', err.message);
    throw err;
  }
};

// 특정 채팅방 이벤트 결과 조회
export const getEventResult = async (chatRoomId) => {
  try {
    console.log(chatRoomId);
    const response = await fetchWithAuth(`room-event/chat-room/${chatRoomId}`, {
      method: 'GET'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('채팅방 이벤트 결과 조회 실패:', errorData);
      throw new Error(errorData.error || '채팅방 이벤트 결과 조회 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('채팅방 이벤트 결과 조회 실패:', err.message);
    throw err;
  }
};

// 채팅방 이벤트 상세 조회
export const getEventDetail = async (roomEventId) => {
  try {
    console.log(roomEventId);
    const response = await fetchWithAuth(`room-event/${roomEventId}`, {
      method: 'GET'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('채팅방 이벤트 상세 조회 실패:', errorData);
      throw new Error(errorData.error || '채팅방 이벤트 상세 조회 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('채팅방 이벤트 상세 조회 실패:', err.message);
    throw err;
  }
};