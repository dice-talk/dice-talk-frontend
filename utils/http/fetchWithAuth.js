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
    const response = await fetch(`${BASE_URL}${parsedEndpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    return response;

  } catch (error) {
    throw error;
  }
}; 