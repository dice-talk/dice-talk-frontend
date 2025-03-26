// http/emailAPI.js
import axios from 'axios';
// import { BACKEND_URL } from '../../signUp/VerifyCode';
// 회원가입-이메일 인증
const BACKEND_URL = 'http://172.30.1.3:8080';

export const sendEmail = async (email) => {
      try {  
        console.log(email)
        const response = await axios.post( `${BACKEND_URL}/auth/email`, {email});
        return response.data;
      } catch (err) {
        console.error('이메일 전송 실패:', err.response?.data || err.message);
        throw err; // 다시 던져서 상위에서 잡는다.
      }
};
// 회원가입 - 인증번호 검증
export const verifyCode = async({ email, code }) => {
    //console.log('요청보냄!', {email, code});
    const response = await axios.post(`${BACKEND_URL}/auth/verify-code`, {email, code});
    //console.log('응답 받음!', response.status, response.data);
    return response.data;
};

//로그인 요청 함수
export const loginDiceTalk = async(email, password) => {
  try{
    const response = await axios.post(`${BACKEND_URL}/auth/login`, {
      username: email,
      password: password,
    });
    // 서버 응답 헤더에서 토큰 추출
    const token = response.headers['authorization'] || response.headers['Authorization'];

    if(!token) {
      throw new Error('토큰이 응답에 포함되지 있지 않습니다.');
    }

    //필요한 사용자 정보와 토큰 반환
    return {
      token, user: response.data, // 서버가 유저 정보를 body에 담는 경우
     };
  } catch (error) {
    console.error('로그인 요청 실패:', error);
    throw error;
  }
};

//이메일 찾기 API 요청함수
export const recoverEmail = async(txId) => {
  try{
    const response = await axios.post(`${BACKEND_URL}/auth/recover/email`, {
      txId: txId,
    });

    return response.data; // 응답 {email: "user@gmail.com"}
  } catch (error) {
    console.error('이메일 찾기 실패:', error);
    throw error;
  }
}

// 패스워드 재설정하기
export const recoverPassword = async({email, txId, password}) => {
  const res = await axios.post(`${BACKEND_URL}/auth/recover/password`, { txId, email, password });
  return res.data;
}



