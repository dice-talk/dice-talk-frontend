import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import LongButton from '../component/LongButton';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AlertModal from '../component/AlertModal';
import { recoverPassword } from '../utils/http/EmailAPI';



export default function ReceivePassword({ route, navigation}) {
    const { email, txId } = route.params || {};
    const [inputPassword, setInputPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isValid, setIsValid] = useState(false); // 버튼 활성화 비활성화 + 비밀번호가가 유효한지 check
    //비밀 번호 일치 여부
    const isMatch = inputPassword.length > 0 && confirmpassword.length > 0 && inputPassword === confirmpassword;

    const validatePassword = (text) => {
        setInputPassword(text);
        // 비밀번호 정규표현식 비밀번호는 8~16자 영문 대, 소문자, 숫자, 특수문자를 사용하세요.
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]).{8,16}$/;
        // 비밀번호가 유효하면 true, 아니면 false
        setIsValid(passwordRegex.test(text));
    }
    const [showModal, setShowModal] = useState(false);

    //비밀번호 전송 핸들러 함수
    const handleSendPassword = async () => {
        try {
            const result = await resettingPassword({email, newPassword: inputPassword});  
            console.log('서버 응답:', result);
                setShowModal(true); // 모달을 띄우자자
                //navigation.navigate('MainPage', {password: inputPassword});
            } catch (error) {
                const errMsg = error.response?.data?.error || '알 수 없는 오류입니다.';
                Alert.alert('오류', errMsg);
                }
    };

    const handleConfirm = () => {
        setShowModal(false);
        navigation.navigate('LoginEmail')
    }

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
                    <Text style={styles.titleText}>비밀번호를 재설정합니다.</Text>

                    {/* 비밀번호 설정*/}
                    <View style={styles.inputRow}>
                        <TextInput
                        style={styles.inputFlex}
                        placeholder="새로운 비밀번호를 입력해주세요."
                        secureTextEntry={!showPassword}
                        value={inputPassword}
                        onChangeText={ (text) => {
                            setInputPassword(text);
                            validatePassword(text);
                        }}
                        />
                    </View>

                    {/* 비밀번호 확인 */}
                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.inputFlex}
                            placeholder="새로운 비밀번호를 다시 입력해주세요."
                            secureTextEntry={!showPassword}
                            value={confirmpassword}
                            onChangeText={setConfirmPassword}
                            />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color='#666' />
                        </TouchableOpacity>
                    </View>

                    {/* 비밀번호 일치 여부 메세지*/}
                    {confirmpassword.length > 0 && (
                        <Text style={{ color: isMatch ? 'green' : 'red', fontSize: 12}}>
                            {isMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
                        </Text>
                    )}

                    {/* 로그인 버튼 */}
                    <View 
                    style={[!isMatch && styles.disabled]} 
                    pointerEvents={!isMatch ? "none" : "auto"}>
                        <LongButton 
                            onPress={handleSendPassword}
                            disabled={!isMatch}>
                                <Text style={styles.text}>재설정하기</Text>
                        </LongButton>
                    </View>


                    <AlertModal
                    visible={showModal}
                    message={`설정이 완료되었습니다.\n로그인 화면으로 이동합니다.?`}
                    onCancel={() => setShowModal(false)}
                    onConfirm={handleConfirm}
                    />

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