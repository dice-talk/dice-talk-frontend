import { BASE_URL } from './config';
import { fetchWithAuth } from './AuthContext';
import { postQuestion, getQuestions } from '../utils/http/QuestionAPI';

// 채팅방 생성
export const chatRooms = async ({roomType, themeId, chatParts}) => {
  try {
    console.log('채팅방 생성 요청 데이터:', {
      room_type: roomType,
      theme_id: themeId,
      chatParts: chatParts
    });

    const response = await fetchWithAuth('chat/rooms', {
      method: 'POST',
      body: JSON.stringify({
        room_type: roomType,
        theme_id: themeId,
        chatParts: chatParts
      })
    });

    if (!response.created) {
      const errorData = await response.json();
      console.error('채팅방 생성 실패:', errorData);
      throw new Error(errorData.error || '채팅방 생성 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('채팅방 생성 실패:', err.message);
    throw err;
  }
};

// 채팅방 전체 조회
export const getAllChatRooms = async ({page, size}) => {
  try {
    const response = await fetchWithAuth(`chat-rooms?page=${page}&size=${size}`, {
      method: 'GET'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('채팅방 목록 조회 실패:', errorData);
      throw new Error(errorData.error || '채팅방 목록 조회 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('채팅방 목록 조회 실패:', err.message);
    throw err;
  }
};

// 채팅방 단일 조회
export const getChatRoom = async (roomId) => {
  try {
    const response = await fetchWithAuth(`chat-room/${roomId}`, {
      method: 'GET'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('채팅방 조회 실패:', errorData);
      throw new Error(errorData.error || '채팅방 조회 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('채팅방 조회 실패:', err.message);
    throw err;
  }
};

// 채팅방 삭제
export const deleteChatRoom = async (roomId) => {
  try {
    const response = await fetchWithAuth(`chattingRoom/${roomId}`, {
      method: 'DELETE'
    });

    if (!response.noContent) {
      const errorData = await response.json();
      console.error('채팅방 삭제 실패:', errorData);
      throw new Error(errorData.error || '채팅방 삭제 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('채팅방 삭제 실패:', err.message);
    throw err;
  }
};

// 채팅방 참여 가능 여부 확인
export const getIsPossibleMember = async (roomId) => {
  try {
    const response = await fetchWithAuth(`chat-room/${roomId}/is-possible-member`, {
      method: 'GET'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('채팅방 참여 가능 여부 확인 실패:', errorData);
      throw new Error(errorData.error || '채팅방 참여 가능 여부 확인 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('채팅방 참여 가능 여부 확인 실패:', err.message);
    throw err;
  }
};

// 채팅방 히스토리 조회
export const getChatRoomHistory = async (roomId) => {
  try {
    const response = await fetchWithAuth(`chat-room/${roomId}/history`, {
      method: 'GET'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('채팅방 히스토리 조회 실패:', errorData);
      throw new Error(errorData.error || '채팅방 히스토리 조회 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('채팅방 히스토리 조회 실패:', err.message);
    throw err;
  }
};

// 채팅방 공지사항 수정
export const updateChatRoomNotice = async (roomId, notice) => {
  try {
    const response = await fetchWithAuth(`chat-room/${roomId}/notice`, {
      method: 'PUT',
      body: JSON.stringify({ notice })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('채팅방 공지사항 수정 실패:', errorData);
      throw new Error(errorData.error || '채팅방 공지사항 수정 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('채팅방 공지사항 수정 실패:', err.message);
    throw err;
  }
};

// 채팅 시작
export const startChat = async (roomId) => {
  try {
    const response = await fetchWithAuth(`chat-room/${roomId}/start`, {
      method: 'POST'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '채팅 시작 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

// 채팅 등록 (메세지 보내기)
export const sendMessage = async ({chatRoomId, message}) => {
  try {
    const response = await fetch(`${BASE_URL}/chattingRoom/${chatRoomId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message})
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('채팅방 메세지 보내기 실패:', errorData);
      throw new Error(errorData.error || '채팅방 메세지 보내기 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('채팅방 메세지 보내기 실패:', err.message);
    throw err;
  }
};

  