import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import LongButton from '../component/LongButton';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AlertModal from '../component/AlertModal';
import { loginDiceTalk } from '../utils/http/EmailAPI';
import { useEmail } from '../context/EmailContext';
import { useMemberContext } from '../context/MemberContext';
import { navigateAfterLogin } from '../navigation/navigationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginPassword({navigation}) {
    const { email } = useEmail(); // 전역상태로 관리되는 email
    const { updateMemberId } = useMemberContext(); // memberId 관리를 위한 context
    const [inputPassword, setInputPassword] = useState('');
    const [isValid, setIsValid] = useState(false); // 버튼 활성화 비활성화 + 비밀번호가가 유효한지 check
    const [showPassword, setShowPassword] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const validatePassword = (text) => {
        // 비밀번호 정규표현식 비밀번호는 8~16자 영문 대, 소문자, 숫자, 특수문자를 사용하세요.
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]).{8,16}$/;
        // 비밀번호가 유효하면 true, 아니면 false
        console.log('비밀번호 유효성:', passwordRegex.test(text));
        setIsValid(passwordRegex.test(text));
    }

    //비밀번호 전송 핸들러 함수
    const handleSendPassword = async () => {
        try {
            const result = await loginDiceTalk(email, inputPassword);
            console.log('서버 응답:', result);
            
            if (result.user && result.user.memberid) {
                updateMemberId(result.user.memberid);
            }
            await AsyncStorage.setItem('accessToken', result.token);
            await AsyncStorage.setItem('memberId', result.memberId);
            await AsyncStorage.setItem('username', result.username);
            
            
            const acToken = AsyncStorage.getItem('accessToken');
            console.log(acToken);
            // await AsyncStorage.setItem('accessToken', result.token);
            // console.log('토큰 저장 완료', accessToken);

            navigation.replace('Main');
        } catch (error) {
            console.log('로그인 실패:', error);
            const errMsg = error.response?.data?.error || '로그인 실패';
            Alert.alert('로그인 실패', errMsg);
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
                        <Text style={styles.dotIcon}>•••</Text>
                    </LinearGradient>

                    {/*타이틀*/}
                    <Text style={styles.titleText}>비밀번호를 입력해주세요</Text>

                    {/* 비밀번호 확인*/}
                    <View style={styles.inputRow}>
                        <TextInput
                        style={styles.inputFlex}
                        placeholder="비밀번호를 입력해주세요"
                        secureTextEntry={!showPassword}
                        value={inputPassword}
                        onChangeText={ (text) => {
                            setInputPassword(text);
                            validatePassword(text);
                        }}
                        />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color='#666' />
                    </TouchableOpacity>
                </View>

                    <View style={styles.forgotContainer}>
                        <TouchableOpacity onPress={() => {setShowModal(true)}} style={styles.forgotButton}>
                        <Text style={{color: '#B19ADE', fontSize: 12, textAlign: 'right'}}>비밀번호를 잊으셨나요?</Text>
                        </TouchableOpacity>
                    </View>

                    <AlertModal
                    visible={showModal}
                    message={`본인 인증이 필요한 서비스입니다.\n계속하시겠습니까?`}
                    onCancel={() => setShowModal(false)}
                    />
                    {/* 로그인 버튼 */}
                    <View 
                    style={[!isValid && styles.disabled]} 
                    pointerEvents={!isValid ? "none" : "auto"}
                    >
                        <LongButton 
                        onPress={handleSendPassword}
                        // 이메일이 올바르게 작성되지 않으면 비활성화
                        disabled={!isValid}// 비활성 상태일 때 스타일 변경
                        >
                            <Text style={styles.text}>로그인</Text>
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
  
    disabled: { // 버튼 비활성화 상태이 때 투명도 적용
        opacity: 0.5,
    },
    forgotContainer: {
        width: '100%', // 전체 너비 차지
        paddingLeft: 20, // 왼쪽 여백 추가
        marginBottom: 16
      },
      forgotButton: {
        alignItems: 'flex-end', //오른쪽 정렬
      },
      dotIcon: {
        color: 'white',
        fontSize: 24,
      },
      label: { 
        fontSize: 14, 
        marginTop: 16 
    },
    inputRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 4,
      },
      inputFlex: {
        flex: 1,
        fontSize: 14,
        paddingVertical: 6,
      },
});