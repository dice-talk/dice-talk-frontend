import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./config";

export const sendEmail = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}auth/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email})
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '이메일 전송 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

// 회원가입 - 인증번호 검증
export const verifyCode = async({ email, code }) => {
    try { const response = await fetch(`${BASE_URL}auth/verify-code`, {
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
    throw err;
  }
}
  

export const loginDiceTalk = async (email, password) => {
  const loginUrl = `${BASE_URL}auth/login`;

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

    // 바디에서 memberId 추출
    const responseData = await response.json();
    console.log('리스폰스 데이터 : ', responseData)
    const memberId = responseData.memberid;

    // 동시 저장
    await AsyncStorage.multiSet([
      ['accessToken', token],
      ['memberId', String(memberId)]
    ]);


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '로그인 실패');
    }

    const responseText = await response.text();
    
    let userData;
    try {
      userData = responseText ? JSON.parse(responseText) : {};
    } catch (parseError) {
      userData = {};
    }

    const token = response.headers.get('Authorization') || response.headers.get('authorization');

    if (!token) {
      throw new Error('토큰이 응답에 포함되지 있지 않습니다.');
    }

    return {
      token,
      user: userData,
    };

  } catch (error) {

    throw error;
  }
};

//이메일 찾기 API 요청함수
export const recoverEmail = async (txId) => {
  try {
    const response = await fetch(`${BASE_URL}auth/recover/email`, {
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
    throw error;
  }
};

 
// 패스워드 찾기
export const recoverPassword = async ({ email, txId }) => {
  try {
    const response = await fetch(`${BASE_URL}auth/recover/password`, {
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
    throw error;
  }
};


// 패스워드 재설정하기
export const resettingPassword = async ({ email, newPassword, memberId }) => {
  try {
    const response = await fetch(`${BASE_URL}auth/resetting/password/${memberId}`, {
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
    throw error;
  }
};

// 로그아웃구현하기
export const logout = async (token) => {
  try {
    const response = await fetch (`${BASE_URL}auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type' : 'application/json', 
      },
      body: null,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '로그아웃 실패');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};