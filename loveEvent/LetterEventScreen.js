import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LetterRain from '../component/LetterRain';
import LoveNoteCard from '../component/LoveNoteCard';
import HeartVoteModal from './HeartVoteModal';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { postEvent } from '../utils/http/eventAPI';

export default function LetterEventScreen() {
    const [showCard, setShowCard] = useState(false);
    const [isVoteModalVisible, setVoteModalVisible] = useState(true); 
    // 익명프로필 보여주기
    const [selecteduserName, setSelectedUserName] = useState('');
    const route = useRoute();
    const { receiverId, senderId, chatRoomId, eventId } = route.params;

    const handleSend = async(text) => {
        console.log('보낸 편지 내용:', text);
        try {
            const eventPayload = {
                receiverId,
                senderId,
                eventId,
                chatRoomId,
                message: text,
                roomEventType: 'PICK_MESSAGE',
            };

            await postEvent(eventPayload);
            console.log('이벤트 전송 성공');
        } catch (error) {
            console.error('이벤트 전송 실패:', error);
            Alert.alert('오류', '하트 메세지 전송 중 오류가 발생했어요.');
        }
    };

    return (
        <>
        <HeartVoteModal
            visible={isVoteModalVisible}
            onSelectDice={(id, name) => {
                console.log('선택된 상대 ID:', id);
            setSelectedUserName(name);
            setVoteModalVisible(false); // 모달닫기 -> 이후 LetterRain 실행행
        }}
        onClose={() => setVoteModalVisible(false)} />

        {!isVoteModalVisible && (
        <View style={styles.container}>
            {!showCard && <LetterRain onFinish={() => setShowCard(true)} />}
            {showCard && <LoveNoteCard onSubmit={handleSend} />}
        </View>
        )}

    {/* {showCard && (
    <LoveNoteCard
        onSubmit={handleSend}
        onReport={() => {
            Alert.alert('신고 완료', '관리자에게 해당 내용이 전송되었습니다.')
        }} />
    )}
         */}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff0f5',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });