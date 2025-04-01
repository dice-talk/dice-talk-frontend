import { fetchWithAuth } from "./fetchWithAuth";

// 마이페이지(익명) 조회
export const getAnonymousMyPage = async (memberId, token) => {
  try {
    const response = await fetchWithAuth(`my-page/${memberId}`, {
      method: 'GET',
    });
    console.log(response);

    if (!response.ok) {
      throw new Error(`조회 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// 내 정보 조회
export const getMyInfo = async (memberId, token) => {
  try {
    const response = await fetchWithAuth(`my-info/${memberId}`, {
      method: 'GET',
    });
    console.log(response);

    if (!response.ok) {
      throw new Error(`회원 정보 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log('내 정보:', data);
    return data;
  } catch (error) {
    console.error('내 정보 조회 에러:', error);
    throw error;
  }
};

export const updateMyInfo = async (memberId, updateData) => {
  try {
    const response = await fetchWithAuth(`my-info/${memberId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`회원 정보 수정 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log('회원 정보 수정 완료:', data);
    return data;
  } catch (error) {
    console.error('회원 정보 수정 에러:', error);
    throw error;
  }
};

// 회원 탈퇴
export const deleteMember = async (memberId, reason) => {
  try {
    const response = await fetchWithAuth(`my-info/${memberId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ memberId, reason }),
    });

    if (!response.ok) {
      throw new Error(`회원 탈퇴 실패: ${response.status}`);
    }

    const data = await response.json();   
    console.log('회원 탈퇴 완료:', data);
    return data;
  } catch (error) {
    console.error('회원 탈퇴 에러:', error);
    throw error;  
  }
};

// 내 문의 목록 조회
export const getMyQuestions = async (memberId, page, size) => {
  try {
    console.log('🔍 문의 목록 요청:', { memberId, page, size });
    const response = await fetchWithAuth(`questions/my-questions/${memberId}?page=${page}&size=${size}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`문의 목록 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log('📥 문의 목록 응답:', data);
    return data;
  } catch (error) {
    console.error('❌ 문의 목록 조회 에러:', error);
    throw error;
  }
};

  

  

