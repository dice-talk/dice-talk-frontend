import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { CodeField, Cursor,useClearByFocusCell, useBlurOnFulfill } from 'react-native-confirmation-code-field';
import LongButton from '../component/LongButton';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { sendEmail } from '../utils/http/EmailAPI'; // 이메일 전송 및 코드 검증
import { verifyCode } from '../utils/http/EmailAPI';
import EmailExistModal from '../component/EmailExistsModal';
import { useEmail } from '../context/EmailContext';
// 인증 코드 자리 수
const CELL_COUNT = 6;

export default function VerifyCode({ route, navigation }) {
  // 자동 포커스를 호출하고 싶어 설정하자.
  const codeFieldRef = useRef(null);
    // 이전 화면에서 받은 이메일
  const { email } = useEmail();
  // 인증 코드 입력 상태
  const [value, setValue] = useState('');
  // 셀 포커스 제어어
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue,});

  const [timer, setTimer] = useState(300); // 5분  300초
  //버튼 비활성화 조건
  const isDisabled = value.length !== 6 || timer === 0;
  // 모달 상태
  const [showModal, setShowModal] = useState(false);
  //useRef로 컴포넌트 상태를 추적
  const isMounted = useRef(true);

  useEffect(() => {
    //300ms 정도 딜레이를 줘서 더 자연스럽게 하자.
    const timer = setTimeout(() => {
        Keyboard.dismiss(); // 키보드 초기화
        codeFieldRef.current?.focus?.();
    }, 300);

    return () => clearTimeout(timer);
}, []);

// 타이머 카운트 다운
// 특정 상태(timer)가 변경될 때 실행되는 React Hook
  useEffect(() => {
    // 이 useEffect가 실행되었을 때는 마운트 상태이다.
    isMounted.current = true;
    // 타이머가 0이 되면 Alert 띄우고 이전 화면으로 이동한다.
    // navigation.isFocused() 을 이용해 현재 화면이 Active한 상태에서만 Alert을 띄운다.
    if (timer === 0 && isMounted.current && navigation.isFocused()) {
        Alert.alert('시간 만료', '인증 요청에 실패하셨습니다.',[
            {
                text: '확인',
                onPress: () => navigation.replace('EmailInput'), //이전화면으로 이동
            },
        ]);
        return;
    } 
// 타이머가 0보다 작아지지 않도록 조건 추가
    if (timer <= 0) return;

// 1초마다 감소한다. setInterval은 timer을 1씩 줄이는 함수
    const interval = setInterval(() => {
      if (isMounted.current) {
      setTimer((prev) => (prev > 0 ? prev -1 : 0)); // 음수 방지!
  }
  }, 1000);
    // 언마운트시 타이머 정리 clearInterval은 컴포넌트가 사라질 때(setInterval 중복 방지) 타이머 정리하는 정리 함수
    return () => {
      isMounted.current = false, // 이제 더이상 화면에 없다.
      clearInterval(interval); // setInterval 중복 방지지
  };
}, [timer]);
// 타이머 텍스트 포맷
// 숫자 형태의 초(sec)를 '분:초' 형태의 00:00 문자열로 변환해준다.
  const formatTime = (sec) => {
    // Math.floor(sec / 60) 초를 60으로 나눠서 분 단위로 내림
    const min = String(Math.floor(sec / 60)).padStart(2,'0');
    // sec % 60 초를 60으로 나눈 나머지 
    // -> 남은 초 String(...).padStart(2, '0'): 자릿수가 1개일 경우, 앞에 '0'을 붙여 2자리를 맞춘다. ex) 4 -> '04'
    const secStr = String(sec % 60).padStart(2, '0');
    return `${min}:${secStr}`;
  };
// 인증 코드 서버 검증 요청
  const handleVerify = async () => {
    try {
        // 서버에 검증 요청 인증 서버에 요청하는 핵심 액션 
        // 아래 코드가 없으면 인증 코드가 서버에 아예 전송되지 않는다.
        // 즉, 사용자가 입력한 6자리 숫자를 백엔드에 보내서 맞는지 확인하는 작업을 하지 않게 된다.
        //console.log('검증 성공1', result);
        await verifyCode({ email, code: value });
        Alert.alert('인증 성공', '본인인증을 시작하겠습니다!',
            [{ text: '확인', onPress: () => navigation.navigate('TossAuth')}] // 다음 단계로 이동
        );
    } catch (error) {
        //console.log('오류전체', error);
        // ?.(옵셔널 체이닝) 하나라도 undefined면 에러 터지지 않고 undefined 반환하도록 안전하게 체크한다.
        const errMsg = error.response?.data?.error || '인증 실패, 다시 시도해주세요';
        if (errMsg === '이미 등록된 이메일입니다.') {
            setShowModal(true); // 모달 오픈
        } else {
            Alert.alert('오류', errMsg)
        }
        
    }
  };

  return (
    <>
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
            {/*인증코드 입력 필드*/}
            <CodeField
                ref={codeFieldRef}
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
            {/*인증 메일 재요청 버튼*/}
            <TouchableOpacity onPress={async () => {
                try {
                    // 이메일 재요청
                    await sendEmail(email);
                    Alert.alert('알림','재요청 되었습니다. 이메일을 확인해주세요.')
                } catch (error) {
                    Alert.alert('오류','이메일 재전송에 실패했습니다.')
                }
            }}>
                <Text style={styles.helperSmall}>이메일을 받지 못했어요</Text>
            </TouchableOpacity>
            {/*인증하기 버튼 (조건부 비활성화 + 투명도 조절)*/}
            <View 
            style={[styles.buttonContainer, isDisabled && styles.disabled]}
            pointerEvents={ isDisabled ? "none" : "auto"}>
                <LongButton onPress={handleVerify} disabled={isDisabled}>
                    <Text style={styles.buttonText}>인증하기</Text>
                </LongButton>
            </View>
        </View>
                <EmailExistModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onLogin={() => {
                    setShowModal(false);
                    navigation.navigate('Login')// 로그인 페이지로 이동
                }}
                onFindEmail={() => {
                    setShowModal(false);
                    navigation.navigate('FindPassword'); //비밀번호 찾기 페이지로 이동
                }}
                />
    </>
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
    buttonContainer: {
      opacity: 1
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    disabled: { // 버튼 비활성화 상태일 때 투명도 적용
        opacity: 0.5,
    },
  });

  // useBlurOnFulfill 인증코드 입력이 끝날 때 자동으로 포커스 해제해준다.
