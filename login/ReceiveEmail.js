import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import LongButton from '../component/LongButton';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AlertModal from '../component/AlertModal';

export default function ReceiveEmali({ route, navigation }) {
    const { email } = route.param 

    const [showModal, setShowModal] = useState(false);
    

    // //이메일 전송 핸들러 함수
    // const handleSendEmail = async () => {
    //     try {
    //         const result = await sendEmail(inputEmail); // 수정 필요 code와 maessage를 보낼 필요 X. email을 보내야 한다.
    //         console.log('서버 응답:', result);

    //             navigation.navigate('LoginEmail', {email: inputEmail});
    //         } catch (error) {
    //             const errMsg = error.response?.data?.error || '알 수 없는 오류입니다.';
    //             Alert.alert('오류', errMsg);
    //             }
    // };

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
                    <Text style={styles.titleText}>검색결과 이메일은 아래와 같습니다.</Text>

                    <TextInput style={styles.input} value={email} editable={false} placeholder={email} />

                    <View style={styles.forgotContainer}>
                        <TouchableOpacity onPress={() => {setShowModal(true)}} style={styles.forgotButton}>
                        <Text style={{color: '#B19ADE', fontSize: 12, textAlign: 'right'}}>비밀번호를 잊으셨나요?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* 모달 컴포넌트 */}
                    <AlertModal
                    visible={showModal}
                    message={`본인 인증이 필요한 서비스입니다.\n계속하시겠습니까?`}
                    onCancel={() => setShowModal(false)}
                    />

                    <LongButton onPress={() => {navigation.navigate('LoginEmail')}}>
                        <Text style={styles.text}>로그인하러 가기</Text>
                    </LongButton>
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
    forgotContainer: {
        width: '100%', // 전체 너비 차지
        paddingLeft: 20, // 왼쪽 여백 추가
        marginBottom: 16
      },
      forgotButton: {
        alignItems: 'flex-end', //오른쪽 정렬
      },
});