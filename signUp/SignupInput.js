import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LongButton from "../component/LongButton";
import { Alert } from "react-native";
import { BACKEND_URL } from "../utils/mockSetup"; // 백엔드 주소 상수로 관리
import CitySelectBox from '../component/CitySelectBox';
import { useEmail } from '../context/EmailContext';


export default function SignupInput({ route, navigation}) {
    const { email } = useEmail(); // 전역상태 가져오기기
    // // 토스에서 전달받은 사용자 정보 (이름, 성별 , 생년월일)
    // const { userInfo } = route.params || {};
    const userInfo = route?.params?.userInfo || {
        name: '홍길동',
        gender: '남성',
        birth: '1939-03-30',
      };

    if (!userInfo) {
        return <Text> 사용자 정보가 없습니다</Text>;
      };
    const { name, gender, birth } = userInfo;
    // 비밀번호 관련 상태
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    //const [passwordValid, setPasswordValid] = useState(null); 

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    //지역 선택
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    //핸드폰번호 입력
    const [phone, setPhone] =useState('');

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
        try {
            const res = await fetch(`${BACKEND_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    email,
                    name,
                    gender,
                    birth,
                    password, //  사용자가 입력
                    phone,    //  사용자가 입력
                    city: selectedCity + " " + selectedDistrict,
                }),
              });

              if(!res.ok) throw new Error('서버오류');
              const result = await res.json();
              console.log('회원가입 성공:', result);

            navigation.navigate('SignupInput'); // 사용자 정보 넘김

            } catch (err) {
            console.error('인증 결과 확인 실패:', err); 
            Alert.alert('오류', '인증 결과 확인에 실패했습니다.');
            }
        };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>정보를 입력해주세요</Text>

            {/* 이메일 - 고정 */}
            <Text style={styles.label}>이메일</Text>
            <TextInput style={styles.input} value={email} editable={false} placeholder={email} />

            {/* 비밀번호 입력 */}
            <Text style={styles.label}>비밀번호</Text>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.inputFlex}
                    placeholder="비밀번호를 입력해주세요"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    />
                {/*<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color='#666' />
                </TouchableOpacity>*/}
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
                onChangeText={setPhone}
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
            <View style={{marginTop: 30, alignItems: 'center', opacity: isFormValid ? 1 : 0.4}}>
                <LongButton onPress={handleSignup} disabled={!isFormValid}>
                    <Text style={styles.buttonText}>가입하기</Text>
                </LongButton>
            </View>
        </View>
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
        borderColor: '#ccc', 
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
  });

// - secureTextEntry: 입력 시 마스킹 처리 (●●●)
// - showPassword 상태로 눈 아이콘 토글
// - 실제 password, confirmPassword 값은 프론트에서 비교만 하고 저장 X
// - 서버에서는 이 값 받아 hash 저장함 (bcrypt 등)