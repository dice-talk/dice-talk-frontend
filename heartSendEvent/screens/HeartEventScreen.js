import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import HeartRain from '../components/HeartRain';
import HeartNoteCard from '../components/HeartNoteCard';
import { checkEventTiming, EVENT_STATUS } from '../utils/HeartEventManager';

export default function HeartEventScreen({ chatRoomId, creationTime }) {
    const [eventStatus, setEventStatus] = useState(EVENT_STATUS.NOT_STARTED);
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        checkEventStatus();
        startEventTimer();
    }, []);

    // ... (이전 코드와 동일)

    return (
        <View style={styles.container}>
            {!showCard && <HeartRain onFinish={() => setShowCard(true)} />}
            {showCard && (
                <HeartNoteCard 
                    onSubmit={handleSend}
                    onReport={(messageId) => {
                        // 신고 처리 로직
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff0f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
});