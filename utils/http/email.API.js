// http/emailAPI.js
import axios from 'axios';
// 가짜 응답 처리해보자
import MockAdapter from 'axios-mock-adapter';

const BACK_URL = 'http://10.0.2.2:8080';

//axios-mock-adapter로 axios 요청을 가짜 응답으로 대체
const mock = new MockAdapter(axios);

// 이메일 중복 여부 확인 + 인증번호 반환
mock.onPost(BACK_URL + '/auth/email').reply(config => {
    const { email } = JSON.parse(config.data);
  
    // 예시: 중복 이메일 체크
    if (email === 'test@duplicate.com') {
      return [400, { error: '이미 중복된 이메일입니다.' }];
    }
  
    // 인증번호 반환 (테스트용)
    return [200, { code: '123456', message: '인증번호가 발송되었습니다.' }];
  });
  // 인증번호 확인 (verifyCode)
  mock.onPost(BACK_URL + '/auth/verifyCode').reply(config => {
    const { email, code } = JSON.parse(config.data);
  
    // 테스트용 인증번호는 항상 '123456'
    if (code === '123456') {
      return [200, { message: '인증 성공' }];
    }
  
    return [400, { error: '인증번호가 올바르지 않습니다.' }];
  });







export const sendEmail = async (email) => {
        //console.log(email)
        const response = await axios.post( BACK_URL + '/auth/email', {email});
        return response.data;
};

export const verifyCode = async({ email, code }) => {
    //console.log('요청보냄!', {email, code});
    const response = await axios.post(BACK_URL + '/auth/verifyCode', {email, code});
    //console.log('응답 받음!', response.status, response.data);
    return response.data;
};

