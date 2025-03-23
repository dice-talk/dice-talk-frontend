// utils/http/question.API.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const BACK_URL = 'http://10.0.2.2:8080';
const mock = new MockAdapter(axios);

// ✅ 목 데이터 정의
const dummyQuestions = [
  {
    id: 1,
    title: "욕설 신고합니다",
    createAt: "2025-03-16",
    content: "프로필 변경할게요",
    question_status: "QUESTION_PENDING",
    question_image: null,
    answer: {
        answerId: null,
        memberId: null,
        questionId: null,
        content: null,
        answerImage: null,
        createAt: null
      }
  },
  {
    id: 2,
    title: "이게 맞는건가요?",
    createAt: "2025-02-03",
    content: "집에 가고싶어요",
    question_status: "QUESTION_ANSWERED",
    question_image: null,
    answer: {
        answerId: 2,
        memberId: 2,
        questionId: 2,
        content: "네 변경하세요~",
        answerImage: null,
        createAt: "2025-03-18"
      }
  }
];

// ✅ 단일 조회 mock (하드코딩 또는 dummy에서 찾아서)
mock.onGet(new RegExp(`${BACK_URL}/questions/\\d+/\\d+$`)).reply(config => {
    const questionId = Number(config.url.split('/').pop());

    const question = dummyQuestions.find(q => q.id === questionId);
  
    if (question) {
        // 성공하면 200 상태코드와 question 리턴
      return [200, question];
    } else {
        // 실패하면 404 상태코드와 에러메시지 출력
      return [404, { message: 'Question not found' }];
    }
  });

  // ✅ 요청 가로채서 응답 처리
mock.onGet(new RegExp(`${BACK_URL}/questions/\\d+`)).reply(config => {
    const { page } = config.params;
    console.log(`📦 Mock 응답 - page: ${page}`);
    return [200, dummyQuestions]; // 간단한 테스트용 mock 데이터
  });

  // ✅ 요청 가로채서 응답 처리
  mock.onDelete(new RegExp(`${BACK_URL}/questions/\\d+`)).reply(config => {
    const id = parseInt(config.url.split('/').pop());
    return [204]; // 간단한 테스트용 mock 데이터
  });

// ✅ 실제 axios 호출 함수 delete
export const deleteMyQuestion = async (questionId) => {
    try {
      // axios로 엔드포인트 설정하여 response 받아오기
      const response = await axios.delete(`${BACK_URL}/questions/${questionId}`);
    // 응답 데이터 반환
    return response;
  } catch (error) {
    // error가 있다면 error 내용 출력
    console.error('❌ 에러:', error);
    throw error;
  }
};

// question 단일 조회
export const getQuestionDetail = async (questionId, memberId) => {
    try {
      const response = await axios.get(`${BACK_URL}/questions/${memberId}/${questionId}`);
      console.log('✅ 단일조회 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ 단일조회 에러:', error);
      throw error;
    }
};

// ✅ 실제 axios 호출 함수
export const getMyQuestions = async (memberId, page) => {
    try {
      // axios로 엔드포인트 설정하여 response 받아오기
      const response = await axios.get(`${BACK_URL}/questions/${memberId}`, {
          // 파람스로 size와 page 전달
        params: {
          size: 4,
          page: page
        }
      });
  
      console.log('✅ 응답 데이터:', response.data);
      // 응답 데이터 반환
      return response;
    } catch (error) {
      // error가 있다면 error 내용 출력
      console.error('❌ 에러:', error);
      throw error;
    }
  };