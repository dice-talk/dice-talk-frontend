// utils/nicknameUtils.js
import { BASE_URL } from "./config";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestNickname = async (memberId) => {
    try {
      console.log('[🏷 닉네임 요청 시작]', memberId);
      
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        console.error('[❌ 토큰이 없음]');
        throw new Error('인증 토큰이 없습니다.');
      }

      // 먼저 현재 닉네임이 있는지 확인
      const currentNickname = await AsyncStorage.getItem("nickname");
      if (currentNickname) {
        console.log('[✅ 기존 닉네임 사용]', currentNickname);
        return currentNickname;
      }
      
      const res = await fetch(BASE_URL + `matching/nickname/${memberId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.status === 409) {
        // 이미 닉네임이 할당된 경우, GET 요청으로 현재 닉네임을 가져옵니다
        console.log('[ℹ️ 기존 닉네임 조회 시도]');
        const getNicknameRes = await fetch(BASE_URL + `matching/nickname/${memberId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (getNicknameRes.ok) {
          const data = await getNicknameRes.json();
          if (data.nickname) {
            console.log('[✅ 기존 닉네임 조회 성공]', data.nickname);
            await AsyncStorage.setItem("nickname", data.nickname);
            return data.nickname;
          }
        }
        throw new Error('이미 할당된 닉네임을 찾을 수 없습니다.');
      }

      if (!res.ok) {
        console.error('[❌ 닉네임 요청 실패]', res.status);
        throw new Error(`닉네임 요청 실패: ${res.status}`);
      }

      const data = await res.json();
      console.log('[✅ 닉네임 응답]', data);
      
      if (!data.nickname) {
        console.error('[❌ 닉네임이 없음]', data);
        throw new Error('서버에서 닉네임을 받지 못했습니다.');
      }

      await AsyncStorage.setItem("nickname", data.nickname);
      return data.nickname;
    } catch (err) {
      console.error("[❌ 닉네임 요청 오류]", err.message);
      throw err;
    }
};
  