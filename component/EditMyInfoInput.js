import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LongButton from "./LongButton";
import { Alert } from "react-native";
import CitySelectBox from './CitySelectBox';
import { LinearGradient } from "expo-linear-gradient";
import { BASE_URL } from "../utils/http/config";

const BACKEND_URL = BASE_URL;

export default function EditMyInfoInput({ route, navigation }) {
    // 사용자 정보 (서버에서 받아온 데이터라고 가정)
    const userInfo = route?.params?.userInfo || {
        email: 'user@example.com',
        name: '홍길동',
        gender: '남성',
        birth: '1939-03-30',
        phone: '010-1234-5678',
        region: '서울특별시 강남구'
    };

    // 수정 가능한 필드 상태
    const [phone, setPhone] = useState(userInfo.phone || '');
    const [selectedCity, setSelectedCity] = useState(userInfo.region?.split(' ')[0] || null);
    const [selectedDistrict, setSelectedDistrict] = useState(userInfo.region?.split(' ')[1] || null);

    // 나이 계산
    const [age, setAge] = useState('');
    useEffect(() => {
        if (userInfo.birth) {
            const birthYear = parseInt(userInfo.birth.substring(0,4), 10);
            const currentYear = new Date().getFullYear();
            setAge((currentYear - birthYear).toString());
        }
    }, [userInfo.birth]);

    // 핸드폰 번호 유효성 검사
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    const validatePhone = (value) => {
        const onlyNumber = value.replace(/[^0-9]/g, '');
        let formatted = onlyNumber;
        if (onlyNumber.length <= 3) {
            formatted = onlyNumber;
        } else if (onlyNumber.length <= 7) {
            formatted = onlyNumber.replace(/(\d{3})(\d{1,4})/, '$1-$2');
        } else {
            formatted = onlyNumber.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
        }
        setPhone(formatted);
    };

    // 입력값 유효성 검사
    const validateForm = () => {
        // 핸드폰 번호 검사
        if (!phoneRegex.test(phone)) {
            Alert.alert('알림', '올바른 휴대폰 번호를 입력해주세요.');
            return false;
        }

        // 지역 선택 검사
        if (!selectedCity || !selectedDistrict) {
            Alert.alert('알림', '지역을 선택해주세요.');
            return false;
        }

        return true;
    };

    const handleUpdate = async () => {
        // 클라이언트 측 유효성 검사
        if (!validateForm()) {
            return;
        }

        const normalizedGender = userInfo.gender === '남성' ? 'MALE' : 'FEMALE';
        const region = selectedCity + " " + selectedDistrict;

        try {
            const res = await fetch(`${BACKEND_URL}/user/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone,
                    region
                }),
            });

            if (!res.ok) throw new Error('서버 오류');
            navigation.navigate('EditMyInfoClear');
        } catch (err) {
            console.error('수정 실패:', err);
            Alert.alert('오류', '정보 수정에 실패했습니다.');
        }
    };

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior="height">
            <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: 100}]}>
                <View style={styles.headerSection}>
                    <LinearGradient
                        colors={['#B28EF8', '#F476E5']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.iconCircle}>
                        <Ionicons name='person-outline' size={30} color='white'/>
                    </LinearGradient>
                    <Text style={styles.title}>내 정보 수정</Text>
                </View>

                {/* 이메일 - 읽기 전용 */}
                <Text style={styles.label}>이메일</Text>
                <TextInput 
                    style={styles.input} 
                    value={userInfo.email} 
                    editable={false}
                    placeholder={userInfo.email}
                />

                {/* 이름 - 읽기 전용 */}
                <Text style={styles.label}>성함</Text>
                <TextInput 
                    style={styles.input} 
                    value={userInfo.name} 
                    editable={false} 
                />

                {/* 성별 - 읽기 전용 */}
                <Text style={styles.label}>성별</Text>
                <TextInput 
                    style={styles.input} 
                    value={userInfo.gender} 
                    editable={false} 
                />

                {/* 나이 - 읽기 전용 */}
                <Text style={styles.label}>나이</Text>
                <TextInput 
                    style={styles.input} 
                    value={age} 
                    editable={false} 
                />

                {/* 핸드폰 번호 - 수정 가능 */}
                <Text style={styles.label}>휴대폰 번호</Text>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.inputFlex}
                        placeholder="휴대폰 번호를 입력해주세요"
                        value={phone}
                        onChangeText={validatePhone}
                    />
                </View>

                {/* 지역 - 수정 가능 */}
                <Text style={styles.label}>지역</Text>
                <CitySelectBox 
                    selectedCity={selectedCity}
                    selectedDistrict={selectedDistrict}
                    setSelectedCity={setSelectedCity}
                    setSelectedDistrict={setSelectedDistrict}
                />

                {/* 수정하기 버튼 */}
                <View style={{marginTop: 30, alignItems: 'center'}}>
                    <LongButton onPress={handleUpdate}>
                        <Text style={styles.buttonText}>수정하기</Text>
                    </LongButton>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 24,
        backgroundColor: '#fff'
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        marginTop: 16,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#BEBEBE',
        paddingVertical: 6,
        fontSize: 14,
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