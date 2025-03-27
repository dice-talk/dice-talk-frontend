import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const BACK_URL = 'http://172.30.1.91:8080';
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
]

// ✅ 단일 조회: /questions/:memberId/:questionId
mock.onGet(new RegExp(`${BACK_URL}/questions/\\d+/\\d+$`)).reply(config => {
    const parts = config.url.split('/');
    const questionId = Number(parts[parts.length - 1]);

    const question = dummyQuestions.find(q => q.id === questionId);
  
    if (question) {
        return [200, question];
    } else {
        return [404, { message: 'Question not found' }];
    }
});

// ✅ 목록 조회:
mock.onGet(new RegExp(`${BACK_URL}/questions/\\d+(\\?.*)?$`)).reply(config => {
    const urlParts = config.url.split('/');
    const memberId = parseInt(urlParts[urlParts.length - 1].split('?')[0]);
    const { page = 1, size = 4 } = config.params || {};

    // 페이징 처리
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedQuestions = dummyQuestions.slice(startIndex, endIndex);

    console.log(`📦 Mock 응답 - memberId: ${memberId}, page: ${page}, size: ${size}`);
    return [200, paginatedQuestions];
});

// ✅ 요청 가로채서 응답 처리
mock.onDelete(new RegExp(`${BACK_URL}/questions/\\d+`)).reply(config => {
    const id = parseInt(config.url.split('/').pop());
    return [204]; // 간단한 테스트용 mock 데이터
});

mock.onPost(`${BACK_URL}/questions`).reply(config => {
    const newQuestion = JSON.parse(config.data);
    newQuestion.id = dummyQuestions.length + 1;
    newQuestion.createAt = new Date().toISOString().split('T')[0];
    newQuestion.question_status = "QUESTION_PENDING";
    newQuestion.answer = {
      answerId: null,
      memberId: null,
      questionId: null,
      content: null,
      answerImage: null,
      createAt: null
    };
    dummyQuestions.push(newQuestion);
    return [201, newQuestion];
});

// ✅ 실제 axios 호출 함수 delete
export const deleteMyQuestion = async (questionId) => {
    try {
      const response = await axios.delete(`${BACK_URL}/questions/${questionId}`);
      return response;
    } catch (error) {
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

// ✅ 실제 axios 호출 함-
export const getMyQuestions = async (memberId, page) => {
    try {
      const response = await axios.get(`${BACK_URL}/questions/${memberId}`, {
        params: {
          size: 4,
          page: page
        }
      });
  
      console.log('✅ 응답 데이터:', response.data);
      return response;
    } catch (error) {
      console.error('❌ 에러:', error);
      throw error;
    }
};

// ✅ 질문 등록 요청
export const postQuestion = async (questionData) => {
  try {
    const response = await axios.post(`${BACK_URL}/questions`, questionData);
    console.log('✅ 질문 작성 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ 질문 작성 에러:', error);
    throw error;
  }
};