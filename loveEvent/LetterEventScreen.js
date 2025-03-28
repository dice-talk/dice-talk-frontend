import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LetterRain from '../component/LetterRain';
import LoveNoteCard from '../component/LoveNoteCard';
import HeartVoteModal from './HeartVoteModal';

export default function LetterEventScreen() {
    const [showCard, setShowCard] = useState(false);
    const [isVoteModalVisible, setVoteModalVisible] = useState(true); 
    // 익명프로필 보여주기
    const [selecteduserName, setSelectedUserName] = useState('');

    const handleSend = (text) => {
        console.log('보낸 편지 내용:', text);
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