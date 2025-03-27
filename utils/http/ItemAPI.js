import { BASE_URL } from './config';
import { fetchWithAuth } from './AuthContext';

// 상품 등록
export const postItem = async (item) => {
  try {
    const response = await fetchWithAuth(`items`, {
      method: 'POST',
      body: JSON.stringify({item})
    });

    if (!response.created) {
      const errorData = await response.json();
      console.error('상품 등록 실패:', errorData);
      throw new Error(errorData.error || '상품 등록 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('상품 등록 실패:', err.message);
    throw err;
  }
};

// 상품 삭제
export const deleteItem = async (itemId) => {
  try {
    const response = await fetchWithAuth(`items/${itemId}`, {
      method: 'DELETE'
    });

    if (!response.noContent) {
      const errorData = await response.json();
      console.error('상품 삭제 실패:', errorData);
      throw new Error(errorData.error || '상품 삭제 실패');
    }
  } catch (err) {
    console.error('상품 삭제 실패:', err.message);
    throw err;
  }
};

// 상품 수정
export const updateItem = async (itemId, item) => {
  try {
    const response = await fetchWithAuth(`items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({item})
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('상품 수정 실패:', errorData);
      throw new Error(errorData.error || '상품 수정 실패');
    }
  } catch (err) {
    console.error('상품 수정 실패:', err.message);
    throw err;
  }
};

// 상품 단일 조회
export const getItem = async (itemId) => {
  try {
    const response = await fetchWithAuth(`items/${itemId}`, {
        method: 'GET'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('상품 조회 실패:', errorData);
      throw new Error(errorData.error || '상품 조회 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('상품 조회 실패:', err.message);
    throw err;
  }
};

// 상품 전체 조회
export const getItems = async (page, size) => {
  try {
    const response = await fetchWithAuth(`items?page=${page}&size=${size}`, {
      method: 'GET'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('상품 전체 조회 실패:', errorData);
      throw new Error(errorData.error || '상품 전체 조회 실패');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('상품 전체 조회 실패:', err.message);
    throw err;
  }
};
