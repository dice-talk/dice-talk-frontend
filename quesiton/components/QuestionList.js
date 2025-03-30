// 질문 목록 컴포넌트
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import QuestionItem from './QuestionItem';

export default function QuestionList({ questions }) {
    return (
        <ScrollView style={styles.container}>
            {questions.map((question) => (
                <QuestionItem 
                    key={question.id} 
                    question={question}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
});