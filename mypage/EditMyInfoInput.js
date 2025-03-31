import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LongButton from "./LongButton";
import { Alert } from "react-native";
import CitySelectBox from './CitySelectBox';
import { LinearGradient } from "react-native-svg";
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

    const handleUpdate = async () => {
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
            Alert.alert('성공', '정보가 성공적으로 수정되었습니다.');
            navigation.goBack();
        } catch (err) {
            console.error('수정 실패:', err);
            Alert.alert('오류', '정보 수정에 실패했습니다.');
        }
    };

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView style={styles.container}>
                {/* 뒤로가기 버튼 */}
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                {/* 프로필 아이콘 */}
                <View style={styles.profileContainer}>
                    <View style={styles.profileIcon}>
                        <Ionicons name="person-outline" size={40} color="white" />
                    </View>
                </View>

                <Text style={styles.title}>내 정보 수정</Text>

                {/* 이메일 - 읽기 전용 */}
                <Text style={styles.label}>이메일</Text>
                <TextInput 
                    style={styles.input} 
                    value={userInfo.email} 
                    editable={false}
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
                <TextInput
                    style={[styles.input, { borderColor: '#B28EF8' }]}
                    placeholder="휴대폰 번호를 입력해주세요"
                    value={phone}
                    onChangeText={validatePhone}
                />

                {/* 지역 - 수정 가능 */}
                <Text style={styles.label}>지역</Text>
                <CitySelectBox 
                    selectedCity={selectedCity}
                    selectedDistrict={selectedDistrict}
                    setSelectedCity={setSelectedCity}
                    setSelectedDistrict={setSelectedDistrict}
                />

                {/* 수정하기 버튼 */}
                <TouchableOpacity 
                    style={styles.updateButton}
                    onPress={handleUpdate}>
                    <Text style={styles.updateButtonText}>수정하기</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    backButton: {
        marginTop: 10,
        marginBottom: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#B28EF8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 30,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 8,
        marginBottom: 20,
        fontSize: 16,
    },
    updateButton: {
        backgroundColor: '#B28EF8',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    updateButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});