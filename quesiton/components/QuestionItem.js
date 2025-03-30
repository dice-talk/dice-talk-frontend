// 개별 질문 아이템 컴포넌트
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QuestionStatus from './QuestionStatus';

export default function QuestionItem({ question }) {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <Text style={styles.date}>{question.createdAt}</Text>
                <QuestionStatus status={question.status} />
            </View>
            <Text style={styles.title}>{question.title}</Text>
            <Text style={styles.content}>{question.content}</Text>
            {question.answer && (
                <View style={styles.answerContainer}>
                    <Text style={styles.answerLabel}>답변</Text>
                    <Text style={styles.answerContent}>{question.answer}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    date: {
        fontSize: 12,
        color: '#666666',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    content: {
        fontSize: 14,
        color: '#333333',
        marginBottom: 16,
    },
    answerContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
    },
    answerLabel: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 4,
    },
    answerContent: {
        fontSize: 14,
        color: '#333333',
    },
});