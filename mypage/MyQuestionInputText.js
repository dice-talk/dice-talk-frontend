import { View, Text, StyleSheet, Pressable, ScrollView, Image, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../component/Footer";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { postQuestion } from '../utils/http/question.API'; // 실제 위치에 따라 경로 조정

export default function MyQuestionInputText () {
    const [text, setText] = useState('');
    const navigation = useNavigation();
    const [content, setContent] = useState('');
    const [question, setQuestion] = useState(null);

    const handleSubmit = async () => {
        try {
            const newQuestion = {
                title: text,
                content: content,
                question_image: null, // 필요한 경우 이미지 데이터 처리
            };
            await postQuestion(newQuestion);
            alert('문의가 등록되었습니다.');
            navigation.goBack();
        } catch (error) {
            alert('등록에 실패했습니다.');
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
            <TextInput style={styles.input} placeholder='제목을 작성해주세요' value={text} onChangeText={setText} />
            <View style={styles.fullWidthLine}>
                <LinearGradient colors={["#D8B4FE", "#F9A8D4"]} style={styles.gradientLine} />
            </View>
            {/* <Pressable style={styles.attachmentButton}>
                <Text style={styles.attachmentText}>첨부파일</Text>
            </Pressable> */}
            <Image source={question?.question_image} style={styles.imageSize} resizeMode='contain'/>
            <View style={styles.bottomInputContainer}>
                <TextInput
                    style={styles.bottomTextInput}
                    placeholder="문의 내용을 입력해주세요"
                    multiline
                    value={content}
                    onChangeText={setContent}
                />
                <View style={styles.buttonRow}>
                    <Pressable style={styles.confirmButton} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>등록</Text>
                    </Pressable>
                </View>
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
    label: { fontSize: 14, color: '#888', marginBottom: 4 },
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
      },
      input: {
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
      },
      attachmentButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#eee',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginBottom: 8,
      },
      attachmentText: {
        fontSize: 14,
        color: '#555',
      },
      bottomInputContainer: {
        padding: 20,
      },
      bottomTextInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        textAlignVertical: 'top',
        marginBottom: 12,
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
      },
      cancelButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DCDCDC',
        backgroundColor: '#f3e8ff',
      },
      confirmButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DCDCDC',
        backgroundColor: '#f9d5ec',
      },
      buttonText: {
        fontSize: 14,
        color: '#333',
      },
});