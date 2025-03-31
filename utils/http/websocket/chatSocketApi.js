import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { BASE_URL, WS_URL } from '../http/config';

let stompClient = null;
let subscribers = {};

// 웹소켓 연결
export const connectWebSocket = (token, callbacks) => {
  if (!token) {
    console.warn('토큰이 없습니다. 웹소켓 연결을 위해서는 토큰이 필요합니다.');
    return false;
  }

  try {
    // SockJS 연결 생성
    const socket = new SockJS(`${BASE_URL}ws-stomp`);

    // Stomp 클라이언트 생성
    stompClient = Stomp.over(socket);

    // 디버그 로그 비활성화
    stompClient.debug = null;

    // 연결 헤더 설정 (인증 토큰 포함)
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // 웹소켓 연결
    stompClient.connect(
      headers,
      // 연결 성공 콜백
      frame => {
        console.log('웹소켓 연결 성공:', frame);
        if (callbacks.onConnect) {
          callbacks.onConnect();
        }
        return true;
      },
      // 연결 오류 콜백
      error => {
        console.error('웹소켓 연결 오류:', error);
        if (callbacks.onDisconnect) {
          callbacks.onDisconnect();
        }
        return false;
      }
    );

    // 대기열 상태 구독
    subscribeToTopic('/sub/chat/queue', message => {
      const parsedMessage = JSON.parse(message.body);
      if (callbacks.onQueueUpdate) {
        callbacks.onQueueUpdate(parsedMessage);
      }
    });

    return true;
  } catch (error) {
    console.error('웹소켓 연결 중 예외 발생:', error);
    if (callbacks.onDisconnect) {
      callbacks.onDisconnect();
    }
    return false;
  }
};

// 웹소켓 연결 해제
export const disconnectWebSocket = () => {
  if (stompClient) {
    try {
      // 모든 구독 해제
      Object.keys(subscribers).forEach(destination => {
        try {
          subscribers[destination].unsubscribe();
        } catch (e) {
          console.error(`구독 해제 중 오류: ${destination}`, e);
        }
      });

      stompClient.disconnect();
      console.log('웹소켓 연결 해제됨');
    } catch (e) {
      console.error('웹소켓 연결 해제 중 오류:', e);
    }

    stompClient = null;
    subscribers = {};
  }
};

// 토픽 구독
const subscribeToTopic = (destination, callback) => {
  if (!stompClient) {
    console.error('웹소켓이 연결되지 않았습니다. 구독 실패:', destination);
    return null;
  }

  try {
    const subscription = stompClient.subscribe(destination, message => {
      let parsedMessage;
      try {
        parsedMessage = JSON.parse(message.body);
      } catch (e) {
        parsedMessage = message.body;
      }
      callback(parsedMessage, message);
    });

    subscribers[destination] = subscription;
    console.log(`토픽 구독 성공: ${destination}, ID: ${subscription.id}`);
    return subscription.id;
  } catch (e) {
    console.error(`토픽 구독 실패: ${destination}`, e);
    return null;
  }
};

// 메시지 전송
const sendMessage = (destination, message) => {
  if (!stompClient) {
    console.error('웹소켓이 연결되지 않았습니다. 메시지 전송 실패:', destination);
    return false;
  }

  try {
    stompClient.send(destination, {}, JSON.stringify(message));
    console.log(`메시지 전송 성공: ${destination}`, message);
    return true;
  } catch (e) {
    console.error(`메시지 전송 실패: ${destination}`, e);
    return false;
  }
};

// 대기열 참가
export const joinQueue = async (memberId, nickname) => {
  const message = {
    type: 'JOIN_QUEUE',
    memberId,
    nickname: nickname || '게스트'
  };

  return sendMessage('/pub/chat/queue/join', message);
};

// 대기열 나가기
export const leaveQueue = async (memberId) => {
  const message = {
    type: 'LEAVE_QUEUE',
    memberId
  };

  return sendMessage('/pub/chat/queue/leave', message);
};

// 대기열 상태 요청
export const getQueueStatus = async () => {
  return sendMessage('/pub/chat/queue/status', {});
}; 