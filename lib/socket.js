import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BASE_URL, WS_URL } from '../utils/http/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
let stompClient = null;
let latestCallback = null;


export const connectSocket = async (onMessageCallback) => {
    // ✅ 이미 연결된 상태인지 로그로 확인
  if (stompClient?.connected) {
    console.log('[⚠️ 이미 연결된 stompClient가 있음]');
    stompClient.deactivate(); // 기존 연결 해제
  }
  latestCallback = onMessageCallback; // ✅ 최신 콜백 저장

  try {
    // 비동기적으로 토큰 가져오기
    const token = await AsyncStorage.getItem("accessToken");
    console.log("token : ", token)
    console.log('[🔑 연결 토큰]', token ? '토큰 있음' : '토큰 없음');
    
    const socket = new SockJS(BASE_URL + 'ws-stomp');
    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      connectHeaders: { Authorization: `Bearer ${token}`},
      onConnect: () => {
        console.log('[✅ WebSocket 연결 완료]');

        stompClient.subscribe('/sub/matching/status', (message) => {
          console.log('[📨 Raw 수신]', message.body);
          try {
            const parsed = JSON.parse(message.body);
            console.log('[📦 파싱된 메시지]', parsed);
            console.log('[🔍 현재 콜백 상태]', !!latestCallback); // 콜백 존재 여부 확인

            if (parsed.type === "QUEUE_STATUS") {
              if (latestCallback) {
                latestCallback("QUEUE_STATUS", parsed);
              } else {
                console.log('[⚠️ 콜백이 없음 - QUEUE_STATUS]');
              }
            } else if (parsed.type === "MATCHED") {
              if (latestCallback) {
                latestCallback("MATCHED", parsed);
              } else {
                console.log('[⚠️ 콜백이 없음 - MATCHED]');
              }
            }
          } catch (e) {
            console.log('[⚠️ JSON 파싱 실패]', e.message);
          }
        });
      },
      onStompError: (frame) => {
        console.log('[❌ STOMP 에러]', frame.headers['message']);
        console.log('[❌ STOMP 에러 상세]', frame.body);
      },
      onWebSocketError: (event) => {
        console.log('[❌ WebSocket 에러]', event);
      },
    });

    stompClient.debug = (msg) => console.log('[STOMP 디버그]', msg);
    stompClient.activate();
  } catch (error) {
    console.log('[❌ 소켓 연결 초기화 오류]', error);
  }
};

export const subscribeChatRoom = (roomId, onMessageCallback) => {
  stompClient?.subscribe(`/sub/chat/${roomId}`, (message) => {
    const msg = JSON.parse(message.body);
    onMessageCallback?.('CHAT', msg);
  });
};

export const sendMessage = (roomId, message) => {
  if (!stompClient) return;
  // console.log("soeket " + roomId);
  // console.log("soeket " + message);
  stompClient.publish({
    destination: `/pub/chat/${roomId}/sendMessage`,
    body: JSON.stringify(message),
  });
};

export const disconnectSocket = () => {
  if (stompClient) {
    console.log('[🔌 소켓 연결 해제 시도]');
    try {
      stompClient.deactivate();
      stompClient = null;
      latestCallback = null;
      console.log('[✅ 소켓 연결 해제 완료]');
    } catch (error) {
      console.log('[❌ 소켓 연결 해제 실패]', error);
    }
  } else {
    console.log('[⚠️ 해제할 소켓 연결이 없음]');
  }
};