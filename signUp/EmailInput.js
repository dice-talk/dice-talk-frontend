import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import LongButton from '../component/LongButton';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


export default function EmailInput({navigation}) {
    const [email, setEmail] = useState(""); // 이메일 입력 상태 관리
    const [isValid, setIsValid] = useState(false); // 버튼 활성화 비활성화 + 이메일이 유효한지 check

    const validateEmail = (text) => {
        setEmail(text);
        // 이메일 정규표현식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // 이메일이 유효하면 true, 아니면 false
        setIsValid(emailRegex.test(text));
    }

    return (
        <KeyboardAvoidingView 
            behavior='height' // 안드로이드 전용 설정
            style={styles.container}
        > 
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {/*아이콘*/}
                    <LinearGradient 
                          colors={["#B28EF8", "#F476E5"]}
                          start= { {x: 0, y: 0.5}}
                          end= { {x: 1, y: 0.5}}
                          style={styles.iconContainer}>
                        <FontAwesome name='envelope' size={30} color='white'/>
                    </LinearGradient>

                    {/*타이틀틀*/}
                    <Text style={styles.titleText}>이메일 주소를 입력해주세요</Text>

                    <TextInput
                        style={styles.input} 
                        placeholder='sample@example.com'
                        placeholderTextColor='#B3B3B3'
                        keyboardType='email-address' // 이메일 키보드 사용
                        //autoCapitalize='none' // 첫 글자 대문자 방지
                        autoCorrect={false} // 자동 수정 방지
                        onChangeText={validateEmail} // 입력 값이 들어오면 이메일 검사를 진행한다.
                        value={email}
                    />
                    <LongButton 
                    onPress={() => navigation.navigate()}
                    // 이메일이 올바르게 작성되지 않으면 비활성화
                    disabled={!isValid}// 비활성 상태일 때 스타일 변경
                    >
                    <View style={[styles.button, !isValid && styles.disabledButton]}>
                        <Text style={styles.text}>확인 메일 보내기</Text>
                        </View>
                    </LongButton>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5', // 배경색 추가
    },
    inner: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#A078C2', // 보라색 원 배경
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#B3B3B3',
        paddingVertical: 10,
        marginBottom: 40, // 버튼과의 간격 추가
        color: '#000',
    },
    text: {
        color: "white",
        fontSize: 16,
    },
    titleText: {
        marginBottom: 16,
    },
    // button: {
    //     opacity: 1
    // },
    disabledButton: { // 버튼 비활성화 상태이 때 투명도 적용
        opacity: 0.5,
    },
});