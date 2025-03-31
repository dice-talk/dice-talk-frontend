import { View, Text, StyleSheet, Pressable, ScrollView, Image, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../component/Footer";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { postQuestion } from '../utils/http/QuestionAPI'; // 실제 위치에 따라 경로 조정
import * as DocumentPicker from 'expo-document-picker';

export default function MyQuestionInputText () {
    const [text, setText] = useState('');
    const navigation = useNavigation();
    const [content, setContent] = useState('');
    const [question, setQuestion] = useState(null);
    const [files, setFiles] = useState([]);

    const handleFilePick = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['image/*'],
                multiple: true,
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets.length > 0) {
                const selected = result.assets.slice(0, 3);
                const filtered = selected.filter(file => file.size <= 30 * 1024 * 1024);
                setFiles(filtered);
            }
        } catch (error) {
            alert('파일 선택에 실패했습니다.');
        }
    };

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
            <View style={styles.formGuideContainer}>
                <Text style={styles.formGuideTitle}>문의 양식</Text>
                <Text style={styles.formGuideSubtitle}>문의 내용은 가능한 자세히 작성해주세요</Text>
            </View>
            <Text style={styles.label}>제목</Text>
            <TextInput style={styles.input} placeholder='제목을 입력해 주세요' value={text} onChangeText={setText} placeholderTextColor="#ccc" />
            <View style={styles.fullWidthLine}>
                <LinearGradient colors={["#D3D3D3", "#D3D3D3"]} style={styles.gradientLine} />
            </View>
            <Image source={question?.question_image} style={styles.imageSize} resizeMode='contain'/>
            <View style={styles.bottomInputContainer}>
                <TextInput
                    style={styles.bottomTextInput}
                    placeholder="문의 내용을 입력해주세요"
                    multiline
                    value={content}
                    onChangeText={setContent}
                    placeholderTextColor="#ccc"
                />
                <View style={styles.buttonRow}>
                    <Pressable onPress={handleFilePick}>
                        <LinearGradient colors={["#D8B4FE", "#F9A8D4"]} style={styles.confirmButton}>
                            <Text style={[styles.buttonText, { color: 'white' }]}>파일 선택</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
                <View style={{ height: 38, marginTop: 8 }}>
                    {files.map((file, idx) => (
                        <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                            <Text style={{ fontSize: 12, color: '#555' }}>
                                {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                            </Text>
                            <Pressable
                                onPress={() => {
                                    const newFiles = [...files];
                                    newFiles.splice(idx, 1);
                                    setFiles(newFiles);
                                }}
                                style={{
                                    marginLeft: 8,
                                    paddingHorizontal: 8,
                                    paddingVertical: 2,
                                    backgroundColor: '#eee',
                                    borderRadius: 8,
                                }}
                            >
                                <Text style={{ fontSize: 12, color: '#333' }}>X</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
                <View style={styles.bottomButtonRow}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <LinearGradient colors={["#D8B4FE", "#F9A8D4"]} style={styles.confirmButton}>
                            <Text style={[styles.buttonText, { color: 'white' }]}>취소</Text>
                        </LinearGradient>
                    </Pressable>
                    <Pressable onPress={handleSubmit}>
                        <LinearGradient colors={["#D8B4FE", "#F9A8D4"]} style={styles.confirmButton}>
                            <Text style={[styles.buttonText, { color: 'white' }]}>등록</Text>
                        </LinearGradient>
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
    label: { 
      fontSize: 17,
      color: '#888',
      marginBottom: 4,
      marginTop: 8,
    },
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
        width: '97%',
        marginVertical: 8,
        marginHorizontal:5,
      },
      imageSize: {
        maxWidth: 130,
        maxxHeight: 130,
        width: '100%',
      },
      input: {
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
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
        paddingHorizontal: 0,
        paddingBottom: 20,
      },
      bottomTextInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        minHeight: 230,
        textAlignVertical: 'top',
        marginBottom: 12,
        width: '100%',
        alignSelf: 'stretch',
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
      },
      bottomButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
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
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#DCDCDC',
        backgroundColor: '#f9d5ec',
      },
      buttonText: {
        fontSize: 14,
        color: '#333',
      },
      formGuideContainer: {
        marginBottom: 12,
      },
      formGuideTitle: {
        fontSize: 20,
        color: 'gray',
        marginBottom: 2,
      },
      formGuideSubtitle: {
        fontSize: 11,
        color: 'gray',
      },
});