// components/QuestionItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MyQuestionDetail from './MyQuestionDetail'
import { useNavigation } from '@react-navigation/native';


const formatDate = (dateString) => {
  if (!dateString) return '날짜 오류';

  const datePart = dateString.split('T')[0]; // '2025-03-31'
  //const year = date.getFullYear(); // '2025.03.31
  
  return datePart.replace(/-/g, '.');
}
// 제목, 날짜, 답변 상태 받기
export default function QuestionItem({ id, title, createdAt, isAnswered }) {
    const navigation = useNavigation();

    function handlePress() {
        navigation.navigate('MyQuestionDetail', {questionId: id});
    }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.title}>[Title] {title}</Text>
        <View style={styles.row}>
          <Text style={styles.date}>등록일 : {formatDate(createdAt)}</Text>
          {isAnswered && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>답변완료</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  badge: {
    backgroundColor: '#f0d9f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 12,
    color: '#6b4a7d',
    fontWeight: '600',
  },
});