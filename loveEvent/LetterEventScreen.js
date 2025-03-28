import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LetterRain from '../component/LetterRain';
import LoveNoteCard from '../component/LoveNoteCard';
import HeartVoteModal from './HeartVoteModal';

export default function LetterEventScreen() {
    const [showCard, setShowCard] = useState(false);
    const [isVoteModalVisible, setVoteModalVisible] = useState(true); 

    const handleSend = (text) => {
        console.log('보낸 편지 내용:', text);
    };

    return (
        <>
        <HeartVoteModal
            visible={isVoteModalVisible}
            onSelectDice={(id) => {
                console.log('선택된 상대 ID:', id);
            setVoteModalVisible(false); // 모달닫기 -> 이후 LetterRain 실행행
        }}
        onClose={() => setVoteModalVisible(false)} />

        {!isVoteModalVisible && (
        <View style={styles.container}>
            {!showCard && <LetterRain onFinish={() => setShowCard(true)} />}
            {showCard && <LoveNoteCard onSubmit={handleSend} />}
        </View>
        )}
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