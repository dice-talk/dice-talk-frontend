// 메인 질문 화면
import React from 'react';
import { View, StyleSheet } from 'react-native';
import QuestionHeader from '../../components/question/QuestionHeader';
import QuestionList from '../../components/question/QuestionList';
import { useQuestions } from '../../hooks/question/useQuestions';

export default function MyQuestion() {
    const { questions, loading, error } = useQuestions();

    return (
        <View style={styles.container}>
            <QuestionHeader />
            <QuestionList questions={questions} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});
