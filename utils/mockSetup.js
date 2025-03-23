import axios from 'axios';
// 가짜 응답 처리해보자
import MockAdapter from 'axios-mock-adapter';

export const BACK_URL = 'http://10.0.2.2:8080';

export const setupMockAPI = () => {
  //axios-mock-adapter로 axios 요청을 가짜 응답으로 대체
  const mock = new MockAdapter(axios);
  // 이메일 중복 여부 확인 + 인증번호 반환
  mock.onPost(BACK_URL + '/auth/email').reply(config => {
      const { email } = JSON.parse(config.data);
    
      // // 예시: 중복 이메일 체크
      // if (email === 'test@duplicate.com') {
      //   return [400, { error: '이미 등록된 이메일입니다.' }];
      // }
    
      // 인증번호 반환 (테스트용)
      return [200, { code: '123456', message: '인증번호가 발송되었습니다.' }];
    });
    // 인증번호 확인 (verifyCode)
    mock.onPost(BACK_URL + '/auth/email/verify-code').reply(config => {
      const { email, code } = JSON.parse(config.data);
    
      // 테스트용 인증번호는 항상 '123456'
      if (code === '123456') {
        return [200, { message: '인증 성공' }];
      }
        // 예시: 중복 이메일 체크
        if (email === 'test@duplicate.com') {
            return [400, { error: '이미 등록된 이메일입니다.' }];
          }
    
      return [400, { error: '인증번호가 올바르지 않습니다.' }];
  });

// toss 확인
    // Toss 인증 결과 확인
    mock.onPost(BACK_URL + '/toss/check').reply(config => {
      const { txId } = JSON.parse(config.data);
      console.log('[mock] Toss check 요청 받음:', txId);
  
      if (txId === 'txid-1234') {
        return [200, { status: 'COMPLETED', name: '홍길동' }];
      }
  
      return [400, { error: '유효하지 않은 txId입니다.' }];
    });

    mock.onGet(BACK_URL + '/toss/auth-url').reply(200, {
        authUrl: 'https://example.com/auth/complete',
        txId: 'txid-1234'
      });
};
