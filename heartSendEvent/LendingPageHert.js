// LendingPage.js 수정
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LendingPage() {
    const navigation = useNavigation();

    // 테스트용 채팅방 데이터
    const testChatRoom = {
        id: 'test-chat-123',
        creationTime: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(), // 23시간 전 생성
    };

    return (
        <View style={styles.container}>
            {/* 기존 코드 ... */}

            {/* 채팅방 테스트 버튼 추가 */}
            <TouchableOpacity 
                style={styles.chatButton}
                onPress={() => navigation.navigate('Chat', { 
                    chatRoomId: testChatRoom.id,
                    creationTime: testChatRoom.creationTime
                })}
            >
                <Text style={styles.chatButtonText}>채팅방 테스트</Text>
            </TouchableOpacity>

            {/* 기존 코드 ... */}
        </View>
    );
}

// 스타일에 추가
const styles = StyleSheet.create({
    // ... 기존 스타일 ...
    chatButton: {
        backgroundColor: '#B28EF8',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    chatButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});