import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import HeartEventScreen from './screens/HeartEventScreen';
import { checkEventTiming } from './utils/HeartEventManager';

export default function HeartChat({ chatRoomId }) {
    const [showHeartEvent, setShowHeartEvent] = useState(false);
    const [chatCreationTime, setChatCreationTime] = useState(null);



    // 채팅방 생성 시간 가져오기 및 이벤트 체크
    useEffect(() => {
        const fetchChatInfo = async () => {
            try {
                // 채팅방 정보 가져오기 API 호출
                const response = await fetch(`YOUR_API_ENDPOINT/chat-rooms/${chatRoomId}`);
                const data = await response.json();
                setChatCreationTime(data.creationTime);

                // 이벤트 시간인지 체크
                const { isEventTime } = checkEventTiming(data.creationTime);
                if (isEventTime) {
                    setShowHeartEvent(true);
                }
            } catch (error) {
                console.error('채팅방 정보 가져오기 실패:', error);
            }
        };

        fetchChatInfo();
    }, [chatRoomId]);

    // 알림 로직 추가
    useEffect(() => {
        const checkEventNotify = async () => {
            if(showHeartEvent) {
                await sendEventStartNotification(chatRoomId);
            }
        };

        checkEventNotify();
    }, [showHeartEvent]);

    return (
        <View style={styles.container}>
            {/* 기존 채팅 UI */}
            <View style={styles.chatContainer}>
                {/* 채팅 컴포넌트 */}
            </View>

            {/* 하트 이벤트 오버레이 */}
            {showHeartEvent && (
                <View style={styles.eventOverlay}>
                    <HeartEventScreen 
                        chatRoomId={chatRoomId}
                        creationTime={chatCreationTime}
                        onClose={() => setShowHeartEvent(false)}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatContainer: {
        flex: 1,
    },
    eventOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    },
});