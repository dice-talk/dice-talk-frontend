
import { BASE_URL } from "./config";
import { fetchWithAuth } from "./fetchWithAuth";

// fetch로로 호출 함수 delete
export const deleteMyQuestion = async (questionId, token) => {
  try {
    const response = await fetchWithAuth(`questions/${questionId}`, {
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
export const getMyQuestions = async (memberId, page) => {
  try {
    console.log(memberId, page);
    const response = await fetchWithAuth(`questions/my-questions/${memberId}?page=${page}&size=4`, {
      method: 'GET',
    });
    console.log(
      '요청 URL:',
      `${BASE_URL}my-questions/${memberId}?page=${page}&size=4`,
    );
    console.log(response);

    // if (!response.ok) {
    //   throw new Error(`문의 조회 실패: ${response.status}`);
    // }

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
    const response = await fetchWithAuth(`questions/${memberId}/${questionId}`, {
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
    const response = await fetchWithAuth(`questions`, {
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

// 질문 등록
export const postQuestion = async (question) => {
  try {
    const response = await fetchWithAuth('questions', {
      method: 'POST',
      body: JSON.stringify({question})
    });

    if (!response.created) {
      const errorData = await response.json();
      console.error('질문 등록 실패:', errorData);
      throw new Error(errorData.error || '질문 등록 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('질문 등록 실패:', err.message);
    throw err;
  }
};

// 질문 수정
export const updateQuestion = async (questionId, question) => {
  try {
    const response = await fetchWithAuth(`questions/${questionId}`, {
      method: 'PATCH',
      body: JSON.stringify({question})
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('질문 수정 실패:', errorData);
      throw new Error(errorData.error || '질문 수정 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('질문 수정 실패:', err.message);
    throw err;
  }
};

// 질문 단일 조회
export const getQuestion = async (questionId) => {
  try {
    const response = await fetchWithAuth(`questions/${questionId}`, {
      method: 'GET'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('질문 조회 실패:', errorData);
      throw new Error(errorData.error || '질문 조회 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('질문 조회 실패:', err.message);
    throw err;
  }
};

// 질문 전체 조회
export const getQuestions = async (page, size) => {
  try {
    const response = await fetchWithAuth(`questions?page=${page}&size=${size}`, {
      method: 'GET'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('질문 전체 조회 실패:', errorData);
      throw new Error(errorData.error || '질문 전체 조회 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('질문 전체 조회 실패:', err.message);
    throw err;
  }
};

// 질문 삭제
export const deleteQuestion = async (questionId) => {
  try {
    const response = await fetchWithAuth(`questions/${questionId}`, {
      method: 'DELETE'
    });

    if (!response.noContent) {
      const errorData = await response.json();
      console.error('질문 삭제 실패:', errorData);
      throw new Error(errorData.error || '질문 삭제 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('질문 삭제 실패:', err.message);
    throw err;
  }
};