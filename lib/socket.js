import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;
let latestCallback = null;


export const connectSocket = (onMessageCallback) => {
    // ✅ 이미 연결된 상태인지 로그로 확인
  if (stompClient?.connected) {
    console.log('[⚠️ 이미 연결된 stompClient가 있음]');
  }
  latestCallback = onMessageCallback; // ✅ 최신 콜백 저장

  const socket = new SockJS('http://172.30.1.78:8080/ws-stomp');
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
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
  });

  stompClient.debug = (msg) => console.log('[STOMP 디버그]', msg);
  stompClient.activate();
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
  stompClient?.deactivate();
};