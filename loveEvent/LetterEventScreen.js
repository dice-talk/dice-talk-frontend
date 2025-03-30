import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import LetterRain from '../component/LetterRain';
import LoveNoteCard from '../component/LoveNoteCard';
import HeartVoteModal from './HeartVoteModal';
import { useRoute, useNavigation } from '@react-navigation/native';
import { postEvent } from '../utils/http/eventAPI';

export default function LetterEventScreen() {
    const [showCard, setShowCard] = useState(false);
    const [isVoteModalVisible, setVoteModalVisible] = useState(true); 
    // 익명프로필 보여주기
    const [selecteduserName, setSelectedUserName] = useState('');
    
    const navigation = useNavigation();
    const route = useRoute();
    const { receiverId, senderId, chatRoomId, eventId } = route.params || {};

    // 필수 파라미터가 없으면 이전 화면으로 돌아가기
    React.useEffect(() => {
        if (!receiverId || !senderId || !chatRoomId || !eventId) {
            Alert.alert('오류', '필요한 정보가 누락되었습니다.');
            navigation.goBack();
        }
    }, [receiverId, senderId, chatRoomId, eventId, navigation]);

    const handleSend = async(text) => {
        if (!text?.trim()) return;
        
        try {
            const eventPayload = {
                receiverId,
                senderId,
                eventId,
                chatRoomId,
                message: text,
                roomEventType: 'PICK',
            };

            await postEvent(eventPayload);
            navigation.goBack();
        } catch (error) {
            Alert.alert('오류', '하트 메세지 전송 중 오류가 발생했어요.');
        }
    };

    // 필수 파라미터가 없으면 렌더링하지 않음
    if (!receiverId || !senderId || !chatRoomId || !eventId) {
        return null;
    }

    return (
        <View style={styles.container}>
            <HeartVoteModal
                visible={isVoteModalVisible}
                onSelectDice={(id, name) => {
                    setSelectedUserName(name);
                    setVoteModalVisible(false);
                }}
                onClose={() => {
                    setVoteModalVisible(false);
                    navigation.goBack();
                }}
            />

            {!isVoteModalVisible && (
                <>
                    {!showCard && <LetterRain onFinish={() => setShowCard(true)} />}
                    {showCard && <LoveNoteCard onSubmit={handleSend} />}
                </>
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