import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LetterRain from '../component/LetterRain';
import LoveNoteCard from '../component/LoveNoteCard';

export default function LetterEventScreen() {
    const [showCard, setShowCard] = useState(false);

    const handleSend = (text) => {
        console.log('보낸 편지 내용:', text);
    };

    return (
        <View style={styles.container}>
            {!showCard && <LetterRain onFinish={() => setShowCard(true)} />}
            {showCard && <LoveNoteCard onSubmit={handleSend} />}
        </View>
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