// 공지사항 전체 조회
export const getNoticeList = async (page, size) => {
    try {
      const response = await fetchWithAuth(`/notice?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`공지사항 조회 실패: ${response.status}`);
      }
      const data = await response.json();
      console.log('✅ 공지사항 조회 성공');
      return data; // 204 No Content
    } catch (error) {
      console.error('❌ 공지사항 조회 에러:', error);
      throw error;
    }
  };

  // 공지사항 상세 조회
  export const getNoticeDetail = async (noticeId) => {
    try {
      const response = await fetchWithAuth(`/notice/${noticeId}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error(`공지사항 상세 조회 실패: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('📌 공지사항 상세:', data);
      return data;
    } catch (error) {
      console.error('❌ 공지사항 상세 조회 에러:', error);
      throw error;
    }
  };
  
  