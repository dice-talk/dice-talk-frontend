import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import LongButton from '../component/LongButton';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { sendEmail } from '../utils/http/email.API';
// input 버튼 6개로 나눠보자
const CELL_COUNT = 6;

export default function VerifyCode({ route, navigation }) {
  const { email } = route.params;
  const [value, setValue] = useState('');
  //const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue,});

  const [timer, setTimer] = useState(300); // 5분  300초

// 타이머 카운트 다운
  useEffect(() => {
    if (timer === 0) {
        Alert.alert('시간 만료', '인증 요청에 실패하셨습니다.',[
            {
                text: '확인',
                onPress: () => navigation.replace('EmailInput'), //이전화면으로 이동동
            },
        ]);
        return;
    } 

    const interval = setInterval(() => setTimer((prev) => prev -1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (sec) => {
    const min = String(Math.floor(sec / 60)).padStart(2,'0');
    const secStr = String(sec % 60).padStart(2, '0');
    return `${min}:${secStr}`;
  };

  const handleVerify = async () => {
    try {
        const result = await VerifyCode({ email, code: value });
        Alert.alert('인증 성공', '본인인증을 시작하겠습니다!');
        navigation.navigate(); // 다음 단계로 이동
    } catch (error) {
        const errMsg = error.response?.data?.error || '인증 실패, 다시 시도해주세요';
        Alert.alert('오류', errMsg);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#B28EF8', '#F476E5']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.iconContainer}>
            <FontAwesome name='envelope' size={30} color='white'/>
        </LinearGradient>

        <Text style={styles.title}>인증 코드를 입력해주세요</Text>
        <Text style={styles.timer}>남은 시간: {formatTime(timer)}</Text>

        <CodeField
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType='number-pad'
            textContentType='oneTimeCode'
            renderCell={({ index, symbol, isFocused }) => (
                <View
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    <Text style={styles.cellText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                </View>
            )}
        />

        <Text style={styles.helper}>수신된 이메일에 기재된 6자리 숫자를 입력해 주세요.</Text>

        <TouchableOpacity onPress={async () => {
            try {
                await sendEmail(email);
                Alert.alert('알림','재요청 되었습니다. 이메일을 확인해주세요.')
            } catch (error) {
                Alert.alert('오류','이메일 재전송에 실패했습니다.')
            }
        }}>
            <Text style={styles.helperSmall}>이메일을 받지 못했어요</Text>
        </TouchableOpacity>

        <View style={{marginTop: 30}}>
            <LongButton onPress={handleVerify} disabled={timer === 0 || value.length !== 6}>
                <Text style={styles.buttonText}>인증하기</Text>
            </LongButton>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fff' },
    iconContainer: {
      width: 60, 
      height: 60, 
      borderRadius: 30, 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginBottom: 20
    },
    icon: { 
        fontSize: 30 
    },
    title: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 16 },
    codeFieldRoot: { 
        marginTop: 20, 
        width: 280, 
        justifyContent: 'space-between' 
    },
    cell: {
      width: 40,
      height: 50,
      lineHeight: 50,
      borderRadius: 10,
      backgroundColor: '#F2E5FF',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    focusCell: {
      borderWidth: 2,
      borderColor: '#B28EF8',
    },
    cellText: {
      fontSize: 24,
      color: '#000',
      textAlign: 'center',
    },
    helper: {
      marginTop: 12,
      fontSize: 12,
      color: '#555',
    },
    helperSmall: {
      fontSize: 11,
      color: '#999',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
