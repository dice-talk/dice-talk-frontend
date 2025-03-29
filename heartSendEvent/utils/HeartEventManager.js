import { BASE_URL } from "../../utils/http/config";

export const EVENT_STATUS = {
    NOT_STARTED: 'NOT_STARTED',
    ACTIVE: 'ACTIVE',
    WAITING_RESULT: 'WAITING_RESULT',
    COMPLETED: 'COMPLETED'
};

export const checkEventTiming = (chatCreationTime) => {
    const now = new Date();
    const hoursPassed = (now - new Date(chatCreationTime)) / (1000 * 60 * 60);
    return {
        isEventTime: hoursPassed >= 23 && hoursPassed < 24,
        timeRemaining: 24 - hoursPassed
    };
};

export const saveHeartMessage = async (message, chatRoomId) => {
    try {
        const response = await fetch(`${BASE_URL}room-event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                chatRoomId,
                timestamp: new Date(),
            }),
        });
        return await response.json();
    } catch (error) {
        console.error('하트 메시지 저장 실패:', error);
        throw error;
    }
};

// 이벤트 시작 시 푸시 알림을 보낸다.
export const sendEventStartNotification = async (chatRoomId) => {
    try {
        const response = await fetch(`${BASE_URL}room-event/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatRoomId,
                timestamp: new Date(),
            }),
        });
        return await response.json();
    } catch (error) {
        console.error('이벤트 시작 푸시 알림 전송 실패:', error);
        throw error;
    }
};

