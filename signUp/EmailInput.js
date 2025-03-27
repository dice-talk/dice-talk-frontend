import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import LongButton from '../component/LongButton';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { sendEmail } from '../utils/http/EmailAPI';
import { Alert } from 'react-native';
import { useEmail } from '../context/EmailContext';


export default function EmailInput({navigation}) {
    const { email, setEmail } = useEmail(''); // 이메일 입력 상태 관리 전역 상태 접근

    const [inputEmail, setInputEmail] = useState('');
    const [isValid, setIsValid] = useState(false); // 버튼 활성화 비활성화 + 이메일이 유효한지 check
    const [isSending, setIsSending] = useState(false) // 메일보내기 중복 방지

//    const handleNext = () => {
//        setEmail(inputEmail); // 전역 상태에 저장
//        navigation.navigate('VerifyCode') // 다음 화면으로 이동
//    }

    const validateEmail = (text) => {
        setInputEmail(text); // 로컬상태
        //setEmail(text); // 전역상태
        // 이메일 정규표현식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // 이메일이 유효하면 true, 아니면 false
        setIsValid(emailRegex.test(text));
    }

    //이메일 전송 핸들러 함수
    const handleSendEmail = async () => {
        if(isSending) return; // 이메일 중복 보내기 방지
        try {
            setIsSending(true); // 중복 클릭 방지 시작
            setEmail(inputEmail); // 여기서 전역상태 설정
            const result = await sendEmail(inputEmail); // 이메일 전송
            console.log('서버 응답:', result);
                //Alert.alert('성공', '이메일을 성공적으로 전송했어요!');
                // 인증번호 화면으로 넘어간다. (Code 같이 넘김)
                // VerifyCode 라는 화면(스크린) 으로 이동하면서 email과 code라는 데이터(파라미터)를 함께 전달하는 것이다.
                navigation.navigate('VerifyCode');
            } catch (error) {
                const errMsg = error.response?.data?.error || '알 수 없는 오류입니다.';
                Alert.alert('오류', errMsg);
                } finally {
                    setIsSending(false); // 다시 누를 수 있게 해준다.
                }
    };

    return (
        <>
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

                    {/*타이틀*/}
                    <Text style={styles.titleText}>이메일 주소를 입력해주세요</Text>

                    <TextInput
                        style={styles.input} 
                        placeholder='sample@example.com'
                        placeholderTextColor='#B3B3B3'
                        keyboardType='email-address' // 이메일 키보드 사용
                        autoCapitalize='none' // 첫 글자 대문자 방지
                        autoCorrect={false} // 자동 수정 방지
                        onChangeText={(text) => {
                            setInputEmail(text); // 로컬상태
                            validateEmail(text); // 전역상태 + 유효성체크
                        }} // 입력 값이 들어오면 이메일 검사를 진행한다.
                        value={inputEmail}
                    />
                    <View 
                    style={[!isValid && styles.disabledButton]} 
                    pointerEvents={!isValid ? "none" : "auto"}>
                        <LongButton 
                        onPress={handleSendEmail}
                        // 이메일이 올바르게 작성되지 않으면 비활성화
                        disabled={!isValid}// 비활성 상태일 때 스타일 변경
                        >
                            <Text style={styles.text}>확인 메일 보내기</Text>
                        </LongButton>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </>
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

//pointerEvents={!isValid ? 'none' : 'auto'} 비활성 상태일 때 pointerEvents: 'none' 적용해 클릭 자체를 막는다.
// isValid === false 상태일 때 버튼이 뿌옇게 opacity: 0.5 표시된다.
// 비화성 상태일 때 pointerEvents : 'none' 을 적용해 버튼이 아예 클릭되지 않는다.
// 활성화 (isValid === true) 상태가 되면 원래대로 작동한다. (pointerEvents: "auto")