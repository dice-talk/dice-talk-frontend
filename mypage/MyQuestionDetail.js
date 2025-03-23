import { View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../component/Footer";
import React, { useEffect, useState } from 'react';
import { getQuestionDetail } from '../utils/http/question.API'; // 이거 import 필요!

export default function MyQuestionDetail () {
    const navigation = useNavigation();

    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
useEffect(() => {
  const fetchDetail = async () => {
    try {
      const result = await getQuestionDetail(1,1);
      setQuestion(result); // API 응답이 { data: { ... } } 형태
      setAnswer(result.answer)
    } catch (error) {
      console.error("❌ 질문 상세 조회 에러:", error);
    }
  };
  fetchDetail();
}, []);

    return (
    <View style={styles.container}>
        <LinearGradient colors={["#D8B4FE", "#F9A8D4"]} style={styles.gradient}>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </Pressable>
            </View>
        </LinearGradient>
        <ScrollView contentContainerStyle={styles.content}>
            {/* 옵셔널 체이닝 = ?. 값이 있을때만 가져옴 없으면 undefined반환으로 에러 방지 */}
            <Text style={styles.label}>제목</Text>
            <View style={styles.titleBox}>
                    <Text style={styles.title}>{question?.title}</Text>
                    <Text style={styles.date}>등록일: {question?.createAt}</Text>
            </View>
            <View style={styles.fullWidthLine}>
                <LinearGradient colors={["#D8B4FE", "#F9A8D4"]} style={styles.gradientLine} />
            </View>
            <View style={styles.chatBox}>
                <Text style={styles.chatText}>
                   {question?.content}
                </Text>
            </View>
            </ScrollView>
            <ScrollView contentContainerStyle={styles.content}>
                <View contentContainerStyle={styles.content}>
                    <LinearGradient colors={["#D8B4FE", "#F9A8D4"]} style={styles.gradientLine} />
                    <View style={styles.titleBox}>
                        <Text style={styles.label}>답변</Text>
                        <Text style={styles.date}>등록일: {answer?.createAt}</Text>
                    </View>
                    <View style={styles.answerBox}>
                        <Text style={styles.answerText}>
                            {answer?.content}
                        </Text>
                    </View>
                    <LinearGradient colors={["#D8B4FE", "#F9A8D4"]} style={styles.deleteButton}>
                        <Pressable>
                            <Text style={styles.date}>삭제</Text>
                        </Pressable>
                    </LinearGradient>    
                    <LinearGradient colors={["#D8B4FE", "#F9A8D4"]} style={styles.gradientLine} />
                </View>
            </ScrollView>
    <Footer />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    gradient: {
      height: 80, 
      paddingTop: 30, 
    },
    headerContainer: {
      paddingHorizontal: 16,
    },
    content: {
        padding: 20,
        paddingBottom: 0,
    },
    label: { fontSize: 14, color: '#888' },
    title: {
         fontSize: 20,
          fontWeight: '600',
           color: '#888',
            
        },
    date: { fontSize: 10, color: '#999' },
    titleBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    chatBox: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        padding: 16,
        marginTop: 16,
      },
      chatText: { fontSize: 12, lineHeight: 22 },
    
      answerBox: {
        marginTop: 12,
        marginBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        padding: 16,
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
      },
      answerText: {
        fontSize: 12,
        lineHeight: 22,
      },
      deleteButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#eee',
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderRadius: 8,
        borderColor: '#DCDCDC',
        borderWidth: 1
      },
      tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
      },
      separator: {
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#B28EF8',
        width: '100%',
        alignSelf: 'center',
      },
      bottomBox: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
      },
      gradientLine: {
        height: 1,
        width: '100%',
        marginVertical: 8,
      },
      fullWidthLine: {
        marginHorizontal: -20,
      }
  });