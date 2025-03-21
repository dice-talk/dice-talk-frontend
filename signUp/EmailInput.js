//import React from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import LongButton from '../component/LongButton';
import { FontAwesome } from '@expo/vector-icons';


export default function EmailInput({navigation}) {
    return (
        <KeyboardAvoidingView 
            behavior='height' // 안드로이드 전용 설정
            style={styles.container}
        > 
            <TouchableWithoutFeedback onPress={Keyboard.dimiss}>
                <View style={styles.inner}>
                    {/*아이콘*/}
                    <View style={styles.iconContainer}>
                        <FontAwesome name='envelope' size={30} color='white'/>
                    </View>

                    {/*타이틀틀*/}
                    <Text>이메일 주소를 입력해주세요</Text>

                    <TextInput
                        style={styles.input} 
                        placeholder='sample@example.com'
                        placeholderTextColor='#B3B3B3'
                        keyboardType='email-address' // 이메일 키보드 사용
                        //autoCapitalize='none' // 첫 글자 대문자 방지지
                        autoCorrect={false} // 자동 수정 방지지
                    />

                    <LongButton 
                        onPress={() => navigation.navigate()}>
                        <Text styles={styles.text}>확인 메일 보내기</Text>
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
        marginBottom: 40, // ✅ 버튼과의 간격 추가
        color: '#000',
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    }
});