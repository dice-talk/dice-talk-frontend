import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import ModalAlert from './components/ModalAlert'; // 방금 만든 컴포넌트
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../utils/http/config';

export default function AppEntryChecker() {
  const [checking, setChecking] = useState(true); // 로딩 중 표시
  const [isBanned, setIsBanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const memberId = await AsyncStorage.getItem('memberId');

        if (!token || !memberId) {
          // 토큰 없으면 로그인 화면 이동
          navigation.replace('Login');
          return;
        }

        const response = await fetch(`${BASE_URL}/my-info/${memberId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await response.json();
        const status = json?.data?.memberStatus;

        if (status === 'BANNED') {
          setIsBanned(true);
        } else {
          // BANNED 아니면 정상 진입 (예: Main으로)
          navigation.replace('LendingPage');
        }
      } catch (e) {
        console.error('회원 상태 조회 실패:', e);
      } finally {
        setChecking(false);
      }
    };

    checkUserStatus();
  }, []);

  if (checking) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#C65D45" />
      </View>
    );
  }

  return (
    <>
      <ModalAlert
        visible={isBanned}
        onClose={() => {
          setIsBanned(false);
          navigation.replace('Login'); // 혹은 앱 종료 처리
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
