import { fetchWithAuth } from './AuthContext';

// 신고 등록
export const postReport = async (report) => {
  try {
    const response = await fetchWithAuth('reports', {
      method: 'POST',
      body: JSON.stringify(report),
    });

    if (!response.created) {    
      throw new Error(`신고 등록 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// 신고 상세 조회
export const getReportDetail = async (reportId) => {
  try {
    const response = await fetchWithAuth(`reports/${reportId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`신고 상세 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// 신고 전체 조회
export const getReportList = async (page, size) => {
  try {
    const response = await fetchWithAuth(`reports?page=${page}&size=${size}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`신고 전체 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// 신고 삭제
export const deleteReport = async (reportId) => {
  try {
    const response = await fetchWithAuth(`reports/${reportId}`, {
      method: 'DELETE',
    });

    if (!response.noContent) {
      throw new Error(`신고 삭제 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
