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

    // Chat으로 이동하는 핸들러
    const handleChatPress = () => {
        navigation.navigate('ChatTab', {
            screen: 'Chat',
            params: {
                chatRoomId: testChatRoom.id,
                creationTime: testChatRoom.creationTime
            }
        });
    };

    // Event로 이동하는 핸들러
    const handleEventPress = () => {
        navigation.navigate('ChatTab', {
            screen: 'LetterEventScreen'
        });
    };

    return (
        <View style={styles.container}>
            {/* 버튼 컨테이너 */}
            <View style={styles.buttonContainer}>
                {/* Chat 버튼 */}
                <TouchableOpacity 
                    style={[styles.button, styles.chatButton]}
                    onPress={handleChatPress}
                >
                    <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>

                {/* Event 버튼 */}
                <TouchableOpacity 
                    style={[styles.button, styles.eventButton]}
                    onPress={handleEventPress}
                >
                    <Text style={styles.buttonText}>Event</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        width: '45%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    chatButton: {
        backgroundColor: '#B28EF8',
    },
    eventButton: {
        backgroundColor: '#F476E5',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});