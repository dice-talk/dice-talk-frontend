import { useAuth } from "./AuthContext";
import { fetchWithAuth } from "./AuthContext";
import { BASE_URL } from "../Config";

const {fetchWithAuth} = useAuth();

// fetch로로 호출 함수 delete
export const deleteMyQuestion = async (questionId, token) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}questions/${questionId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`삭제 실패: ${response.status}`);
    }

    return response; // 204 No Content일 경우 body 없음
  } catch (error) {
    console.error(' 에러:', error);
    throw error;
  }
};

// 내 문의 조회
export const getMyQuestions = async (memberId, page, size = 4) => {
  try {
    // URLSearchParams를 사용하여 쿼리 파라미터 생성
    const params = new URLSearchParams({
      page: page,
      size: size
    });

    const response = await fetchWithAuth(`${BASE_URL}questions/${memberId}?${params}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`문의 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log('내 문의 목록:', data);
    return data;
  } catch (error) {
    console.error('문의 조회 에러:', error);
    throw error;
  }
};

// question 단일 조회
// 내 문의 상세 조회 API 요청 함수
export const getMyQuestionDetail = async (memberId, questionId) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}questions/${memberId}/${questionId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`문의 상세 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log('문의 상세 데이터:', data);
    return data;
  } catch (error) {
    console.error('문의 상세 조회 에러:', error);
    throw error;
  }
};

export const createMyQuestion = async (questionData) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 명시적으로 설정
      },
      body: JSON.stringify(questionData),
    });

    if (!response.ok) {
      throw new Error(`문의 등록 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log('문의 등록 완료:', data);
    return data;
  } catch (error) {
    console.error('문의 등록 에러:', error);
    throw error;
  }
};


export const createBannedMemberQuestion = async (questionData) => {
  try {
    const response = await fetch(`${BASE_URL}questions/bannedMember`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionData),
    });

    if (!response.ok) {
      throw new Error(`정지회원 문의 등록 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log('정지회원 문의 등록 완료:', data);
    return data;
  } catch (error) {
    console.error('정지회원 문의 등록 에러:', error);
    throw error;
  }
};
