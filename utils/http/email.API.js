// http/emailAPI.js
import axios from 'axios';
// import { BACKEND_URL } from '../../signUp/VerifyCode';
// 회원가입-이메일 인증
const BACKEND_URL = 'http://172.30.1.44:8080';

export const sendEmail = async (email) => {
  
      try {
        console.log(email);
        const response = await fetch(`${BACKEND_URL}/auth/email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email})
        });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('이메일 전송 실패:', errorData);
        throw new Error(errorData.error || '이메일 전송 실패');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('이메일 전송 실패:', err.message);
      throw err;
  }
};


// 회원가입 - 인증번호 검증
export const verifyCode = async({ email, code }) => {
    //console.log('요청보냄!', {email, code});
    try { const response = await fetch(`${BACKEND_URL}/auth/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '인증번호 검증 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('인증번호 검증 실패:', err.message);
    throw err;
  }
}
  
//로그인 요청 함수
export const loginDiceTalk = async (email, password) => {
  const loginUrl = `${BACKEND_URL}/auth/login`;
  console.log('🔐 로그인 요청 URL:', loginUrl);

  try {
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    console.log('📡 응답 상태:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ 로그인 실패 응답:', errorData);
      throw new Error(errorData.message || '로그인 실패');
    }

    // 헤더에서 토큰 추출
    const token = response.headers.get('Authorization') || response.headers.get('authorization');

    if (!token) {
      throw new Error('토큰이 응답에 포함되지 있지 않습니다.');
    }

    const userData = await response.json();

    return {
      token,
      user: userData,
    };

  } catch (error) {
    console.error('❌ 로그인 요청 실패:', error);
    throw error;
  }
};


//이메일 찾기 API 요청함수
export const recoverEmail = async (txId) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/recover/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ txId }),
    });

    if (!response.ok) {
      throw new Error('서버 응답 오류');
    }

    const data = await response.json(); // 응답 예: { email: "user@gmail.com" }
    return data;
  } catch (error) {
    console.error('이메일 찾기 실패:', error);
    throw error;
  }
};

 
// 패스워드 찾기
export const recoverPassword = async ({ email, txId }) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/recover/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ txId, email }),
    });

    if (!response.ok) {
      throw new Error('패스워드 찾기 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('패스워드 찾기 에러:', error);
    throw error;
  }
};


// 패스워드 재설정하기
export const resettingPassword = async ({ email, newPassword }) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/resetting/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword }),
    });

    if (!response.ok) {
      throw new Error('비밀번호 재설정 실패');
    }

    // 응답 필요시 아래 라인 사용
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('비밀번호 재설정 에러:', error);
    throw error;
  }
};

// 로그아웃구현하기
export const logout = async (token) => {
  try {
    const response = await fetch (`${BACKEND_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type' : 'application/json', 
      },
      body: null, // 요청 바디 없음
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error('로그아웃 실패:', errorData);
      throw new Error(errorData.error || '로그아웃 실패');
    }
    const data = await response.json();
    console.log('로그아웃 성공:', data);
    return data;
  } catch (err) {
    console.error('로그아웃 요청 중 에러:', err.message);
    throw err;
  }
};