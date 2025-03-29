import { BASE_URL } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchWithAuth = async (endpoint, options = {}) => {
  try {
    // accessToken으로 키 이름 수정
    const token = await AsyncStorage.getItem('accessToken');
    console.log('token:', token);
    if (!token) {
      throw new Error('인증 토큰이 없습니다.');
    }

    // 기본 옵션과 사용자 지정 옵션 병합
    const mergedOptions = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    };

    if (mergedOptions.body && typeof mergedOptions.body === 'object') {
      mergedOptions.body = JSON.stringify(mergedOptions.body);
    }

    // API 요청
    const response = await fetch(`${BASE_URL}${endpoint}`, mergedOptions);
    console.log('Response status:', response.status);

    // 응답 상태 코드 체크 (2xx는 성공)
    if (!response.ok) {  // response.ok는 status가 200-299 사이인 경우 true
      const errorData = await response.json().catch(() => ({ message: '요청 실패' }));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    // 응답 데이터 반환
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('API 요청 실패:', error);
    throw error;
  }
}; 