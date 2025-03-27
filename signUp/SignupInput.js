import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LongButton from "../component/LongButton";
import { Alert } from "react-native";
import CitySelectBox from '../component/CitySelectBox';
import { useEmail } from '../context/EmailContext';
import { LinearGradient } from "react-native-svg";
//import { BACKEND_URL } from './TossAuth'

const BACKEND_URL = "http://192.168.0.12:8080";

export default function SignupInput({ route, navigation}) {
    const { email } = useEmail(); // 전역상태 가져오기
    //  토스에서 전달받은 사용자 정보 (이름, 성별 , 생년월일)
    // const { userInfo } = route.params || {};
    // null 또는 undefined 일 경우 기본값을 채워준다.
    console.log("📥 userInfo:", route?.params?.userInfo);
    const userInfo = route?.params?.userInfo || {};
    const name = userInfo.name ?? '홍길동';
    const gender = userInfo.gender ?? '남성';
    const birth = userInfo.birth ?? '1939-03-30';

    if (!userInfo) {
        return <Text> 사용자 정보가 없습니다</Text>;
      };
    // 비밀번호 관련 상태
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    //const [passwordValid, setPasswordValid] = useState(null); 
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]).{8,16}$/;
    const handlePasswordChange = (text) => {
        setPassword(text);
        // 정규식 검사 필요 시 여기서 추가로 처리
        if (!passwordRegex.test(text)) {
          console.log("유효하지 않은 비밀번호 형식입니다.");
        }
      };
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    //지역 선택
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    //핸드폰번호 입력
    const [phone, setPhone] = useState('');
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    const validatePhone = (value) => {
      // 숫자만 남기기
      const onlyNumber = value.replace(/[^0-9]/g, '');
      // 하이픈 자동 포맷: 010-1234-5678
      let formatted = onlyNumber;
      if (onlyNumber.length <= 3) {
        formatted = onlyNumber;
      } else if (onlyNumber.length <= 7) {
        formatted = onlyNumber.replace(/(\d{3})(\d{1,4})/, '$1-$2');
      } else {
        formatted = onlyNumber.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
      }
      setPhone(formatted);
      // 검증
      if (formatted.length === 13 && phoneRegex.test(formatted)) {
        console.log('✅ 유효한 휴대폰 번호');
      } else {
        console.log('❌ 유효하지 않음');
      }
    };
    

    //나이계산(생년월일로부터)
    const [age, setAge] = useState('');
    useEffect(() => {
        if (birth) {
            const birthYear = parseInt(birth.substring(0,4), 10);
            const currentYear = new Date().getFullYear();
            setAge((currentYear - birthYear).toString());
        }
    },[birth]);

    //비밀 번호 일치 여부
    const isMatch = password.length > 0 && confirmpassword.length > 0 && password === confirmpassword;

    // 버튼 활성화 조건: 비밀번호 일치 + 지역 선택됨
    const isFormValid = isMatch && selectedCity && selectedDistrict;

    
    const handleSignup = async () => {
        console.log('🟢 handleSignup 시작됨!');
        const normalizedGender = gender === '남성' ? 'MALE' : 'FEMALE';
        const region = selectedCity + " " + selectedDistrict;
        console.log("🔗 보낸 데이터:", {
            email,
            name,
            gender: normalizedGender,
            birth,
            password,
            phone,
            region
          });

        try {
            const res = await fetch(`${BACKEND_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    email,
                    name,
                    gender: normalizedGender,
                    birth,
                    password, //  사용자가 입력
                    phone,    //  사용자가 입력
                    region
                }),
              });
              console.log('📡 응답 상태 코드:', res.status);
              const responseText = await res.text(); // JSON 파싱 실패 대비
              console.log('📦 응답 내용:', responseText);

              if(!res.ok) throw new Error('서버오류');
              const result = await res.json();
              console.log('회원가입 성공:', result);

            navigation.navigate('Congratulate'); // 사용자 정보 넘김

            } catch (err) {
            console.error('인증 결과 확인 실패:', err); 
            Alert.alert('오류', '인증 결과 확인에 실패했습니다.');
            }
        };

    return (
        <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior="height">
            <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: 100}]}>
        {/*<View style={styles.container}>*/}
            <View style={styles.headerSection}>
        <LinearGradient
            colors={['#B28EF8', '#F476E5']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.iconCircle}>
                <Ionicons name='person-outline' size={30} color='white'/>
            </LinearGradient>
            <Text style={styles.title}>정보를 입력해주세요</Text>
            </View>

            {/* 이메일 - 고정 */}
            <Text style={styles.label}>이메일</Text>
            <TextInput style={styles.input} value={email} editable={false} placeholder={email} />

            {/* 비밀번호 입력 */}
            <Text style={styles.label}>비밀번호</Text>
            <Text style={styles.condition}>비밀번호는 영어 대문자 소문자 특수문자 1개씩 포함해야합니다.</Text>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.inputFlex}
                    placeholder="비밀번호를 입력해주세요"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={handlePasswordChange}
                    />
            </View>

            {/* 비밀번호 확인*/}
            <Text style={styles.label}>비밀번호 확인</Text>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.inputFlex}
                    placeholder="비밀번호를 입력해주세요"
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
            
            {/* 핸드폰을 입력 받자 */}
            <Text style={styles.label}>휴대폰 번호</Text>
            <TextInput
                style={styles.input}
                placeholder="휴대폰 번호를 입력해주세요"
                value={phone}
                onChangeText={validatePhone}
            />

            {/* 이름, 성별, 나이 - 모두 고정정 */}
            <Text style={styles.label}>성함</Text>
            <TextInput style={styles.input} value={name} editable={false} />

            <Text style={styles.label}>성별</Text>
            <TextInput style={styles.input} value={gender} editable={false} />

            <Text style={styles.label}>나이</Text>
            <TextInput style={styles.input} value={age} editable={false} />

            {/* 지역선택 - 드롭박스 2개 */}
            <Text style={styles.label}>지역</Text>
            <CitySelectBox 
                selectedCity={selectedCity}
                selectedDistrict={selectedDistrict}
                setSelectedCity={setSelectedCity}
                setSelectedDistrict={setSelectedDistrict}
            />

            {/* 가입버튼 */}
            <View style={{marginTop: 30, alignItems: 'center', opacity: isMatch ? 1 : 0.4}}>
                <LongButton onPress={handleSignup} /*disabled={!isMatch}*/>
                    <Text style={styles.buttonText}>가입하기</Text>
                </LongButton>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
       flex: 1, 
       padding: 24, 
       backgroundColor: '#fff' 
    },
    title: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: 30 
    },
    label: { 
        fontSize: 14, 
        marginTop: 16 
    },
    input: { 
        borderBottomWidth: 1, 
        borderColor: '#BEBEBE', 
        paddingVertical: 6, 
        fontSize: 14 
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
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    scrollContainer: {
      flexGrow: 1,
    },
    condition: {
      fontSize: 10,
      color: '#B3B3B3'
    },
    headerSection: {
        alignItems: 'center',
        //marginBottom: 30,
        paddingHorizontal: 20,
      },
      
      iconCircle: {
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
        borderBottomColor: '#34568B', // 파란 밑줄 색상
        paddingBottom: 4,
      },
      
  });

// - secureTextEntry: 입력 시 마스킹 처리 (●●●)
// - showPassword 상태로 눈 아이콘 토글
// - 실제 password, confirmPassword 값은 프론트에서 비교만 하고 저장 X
// - 서버에서는 이 값 받아 hash 저장함 (bcrypt 등)

// Toss 인증 요청
// Toss 앱 실행
// 앱 복귀 (딥링크 감지)
// fetchUserInfo() → 인증 결과 받기
// 받은 데이터로 userInfo 세팅 → SignupInput으로 전달
// 그런데 4번에서 404 뜨면 → 5번에서 undefined 값이 되고
// → 결국 회원가입 시 name, birth가 undefined로 들어가면서 서버 500 에러가 뜬다.

// const userInfo = route?.params?.userInfo || {
//     name: '홍길동',
//     gender: '남성',
//     birth: '1939-03-30',
//   };  userInfo가 아예 undefined일 때만 동작하고, 내부 값이 null이면 안 채워진다.