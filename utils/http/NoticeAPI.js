import { fetchWithAuth } from './AuthContext';

// 공지사항 등록
export const postNotice = async (notice) => {
  try {
    const response = await fetchWithAuth(`notices`, {
      method: 'POST',
      body: JSON.stringify({notice})
    });

    if (!response.created) {
      throw new Error(`공지사항 등록 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// 공지사항 수정
export const updateNotice = async (noticeId, notice) => {
  try {
    const response = await fetchWithAuth(`notices/${noticeId}`, {
      method: 'PATCH',
      body: JSON.stringify({notice})
    });

    if (!response.ok) {
      throw new Error(`공지사항 수정 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// 공지사항 삭제
export const deleteNotice = async (noticeId) => {
  try {
    const response = await fetchWithAuth(`notices/${noticeId}`, {
      method: 'DELETE',
    });

    if (!response.noContent) {
      throw new Error(`공지사항 삭제 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// 공지사항 상세 조회
export const getNoticeDetail = async (noticeId) => {
  try {
    const response = await fetchWithAuth(`notices/${noticeId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`공지사항 상세 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// 공지사항 전체 조회
export const getNoticeList = async (page, size) => {
  try {
    const response = await fetchWithAuth(`notices?page=${page}&size=${size}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`공지사항 전체 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};