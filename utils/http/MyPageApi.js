
// 마이페이지(익명) 조회
const getAnonymousMyPage = async (memberId) => {
    try {
      const response = await fetchWithAuth(`my-page/${memberId}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error(`조회 실패: ${response.status}`);
      }
  
      const data = await response.json();
      // 데이터 처리
      console.log('마이페이지 데이터:', data);
      return data;
    } catch (error) {
      console.error('마이페이지 조회 에러:', error);
      throw error;
    }
  };
  // 내 정보 조회
  const getMyInfo = async (memberId) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}my-info/${memberId}`, {
        method: 'GET',
      });
  
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

  

  

