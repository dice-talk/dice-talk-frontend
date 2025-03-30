// 질문 상태 표시 컴포넌트
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QuestionHeader() {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>문의내역</Text>
            <Text style={styles.headerSubtitle}>
                문의하신 내용과 답변을 확인하실 수 있습니다.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666666',
    },
});