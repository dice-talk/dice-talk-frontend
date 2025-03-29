import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import LongButton from '../component/LongButton';
import { LinearGradient } from 'expo-linear-gradient';
import DropOutMember from './DropOutMember';
import DropOutModal from './DropOutModal';

export default function CheckDropOutMember( {navigation} ) {
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    
    const handleWithdraw = () => {
        if (!password) {
            alert('비밀번호를 입력해주세요');
            return;
        }

            // 비밀번호 확인 및 탈퇴 처리 로직
    alert('탈퇴 요청이 접수되었습니다.')
    }

    return (
      <>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior= "height"
        >
            <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled"
            >
            <View style={styles.container}>
                <LinearGradient colors={["#D7C0FA", "#F8B4F1"]} style={styles.header}>
                        <Text style={styles.headerTitle}>탈퇴하기</Text>
                </LinearGradient>

                {/* 타이틀 */}
                <Text style={styles.title}>정말 떠나시는 건가요?{'\n'}한 번 더 생각해 보지 않으시겠어요?</Text>
                <View style={styles.divider} />

                      {/* 안내 문구 */}
                <View style={styles.warningBox}>
                    <Text style={styles.warning}>• 회원 탈퇴 후, 가입 정보 및 이용 내역은 복구할 수 없습니다.</Text>
                    <Text style={styles.warning}>• 구매 내역, 쿠폰, 포인트 등 모든 혜택이 소멸됩니다.</Text>
                    <Text style={styles.warning}>• 탈퇴 후 동일한 이메일(또는 휴대폰 번호)로 재가입이 제한될 수 있습니다.</Text>
                    <Text style={styles.warning}>• 탈퇴 후 일정 기간 동안 법적 의무에 따라 일부 정보가 보관될 수 있습니다.</Text>
                </View>
                
                      {/* 비밀번호 입력 */}
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                    {/* 확인 버튼 */}
                <View style={styles.buttonWrapper}>
                    <LongButton onPress={() => setVisible(true)}>
                    <Text style={styles.buttonText}>확인</Text>
                    </LongButton>
                </View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
    <DropOutModal
      visible={visible}
      onCancel={() => setVisible(false)}
      onConfirm={() => {setVisible(false);
        alert('탈퇴 처리 완료');
      }}
      />
      </>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 60,
      paddingBottom: 20,
      paddingHorizontal: 16,
      backgroundColor: 'linear-gradient(90deg, #C65D45, #D179AC)', // 이미지처럼 그라데이션
    },
    headerTitle: {
      fontSize: 18,
      color: '#fff',
      fontWeight: '600',
      marginLeft: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 32,
      marginBottom: 16,
      color: '#000',
    },
    divider: {
      height: 1,
      backgroundColor: '#000',
      width: '100%',
      marginBottom: 24,
    },
    warningBox: {
      marginBottom: 40,
    },
    warning: {
      color: '#DD2C00',
      marginBottom: 8,
      lineHeight: 20,
      fontSize: 14,
    },
    input: {
      borderWidth: 1,
      borderColor: '#eee',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 24,
      fontSize: 16,
    },
    buttonWrapper: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        alignItems: 'center'
      },
      buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
      },
  });
  
