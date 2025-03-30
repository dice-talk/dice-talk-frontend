import { BASE_URL } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchWithAuth = async (endpoint, options = {}) => {

  // 저장소에서 자동 조회
  const [token, memberId] = await Promise.all([
    AsyncStorage.getItem('accessToken'),
    AsyncStorage.getItem('memberId'),
  ]);

  // 경로 치환
  const parsedEndpoint = endpoint
    .replace(/:memberId/gi, memberId) // 대소문자 구분 없이 치환
    .replace(/:member-id/gi, memberId);
  
  try {
    const token = await AsyncStorage.getItem('accessToken');
    
    if (!token) {
      throw new Error('인증 토큰이 없습니다.');
    }

    const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

    const mergedOptions = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken,

        ...options.headers,
      },
    };
    
    if (mergedOptions.body && typeof mergedOptions.body === 'object') {
      mergedOptions.body = JSON.stringify(mergedOptions.body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, mergedOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: '요청 실패' }));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    throw error;
  }
}; 