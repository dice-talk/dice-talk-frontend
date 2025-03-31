import { View, Text, StyleSheet, Pressable, ScrollView, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../component/Footer";
import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { getQuestionDetail } from '../utils/http/QuestionAPI';
import { useState } from 'react';
import { deleteMyQuestion } from '../utils/http/QuestionAPI';

export default function MyQuestionDetail () {
    const navigation = useNavigation();
    const route = useRoute();
    const { questionId } = route.params;

    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);

useEffect(() => {
  const fetchDetail = async () => {
    try {
      const result = await getQuestionDetail(questionId,1);
      setQuestion(result); // API 응답이 { data: { ... } } 형태
      setAnswer(result.answer)
    } catch (error) {
      console.error("❌ 질문 상세 조회 에러:", error);
    }
  };
  fetchDetail();
}, []);

const handleDelete = async () => {
  try {
    await deleteMyQuestion(questionId); // 삭제 API 호출
    alert('질문이 삭제되었습니다.');
    navigation.goBack(); // 이전 화면으로 이동
  } catch (error) {
    alert('삭제 중 오류가 발생했습니다.');
  }
};

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
            <Image source={question?.question_image} style={styles.imageSize} resizeMode='contain'/>
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
                    <Image source={question?.answerImage} style={styles.imageSize} resizeMode='contain'/>
                    <View style={styles.answerBox}>
                        <Text style={styles.answerText}>
                            { answer?.content === null ? "작성된 답변이 없습니다" : answer?.content }
                        </Text>
                    </View>
                    <LinearGradient colors={["#D8B4FE", "#F9A8D4"]} style={styles.deleteButton}>
                        <Pressable onPress={handleDelete}>
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
      },
      imageSize: {
        maxWidth: 130,
        maxxHeight: 130,
        width: '100%',
        // height: '100%',
        // aspectRatio: 1
      }
  });