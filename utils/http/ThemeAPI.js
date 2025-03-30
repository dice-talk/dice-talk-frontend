export const createTheme = async (theme) => {
  try {
    const response = await fetchWithAuth('themes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(theme),
    });

    if (!response.ok) {
      throw new Error(`테마 등록 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;    
  } catch (error) {
    throw error;
  }
};


export const updateTheme = async (themeId, theme) => {
  try {
    const response = await fetchWithAuth(`themes/${themeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(theme),
    });

    if (!response.ok) {
      throw new Error(`테마 수정 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ 테마 수정 성공:', data);
    return data;
  } catch (error) {
    console.error('❌ 테마 수정 에러:', error);
    throw error;
  }
};

// 테마 전체 조회
export const getThemeList = async (page, size) => {
  try {
    const response = await fetchWithAuth(`themes?page=${page}&size=${size}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`테마 전체 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ 테마 전체 조회 성공:', data);
    return data;
  } catch (error) {
    console.error('❌ 테마 전체 조회 에러:', error);
    throw error;
  } 
};

// 테마 상세 조회
export const getThemeDetail = async (themeId) => {
  try {
    const response = await fetchWithAuth(`themes/${themeId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`테마 상세 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ 테마 상세 조회 성공:', data);
    return data;
  } catch (error) {
    console.error('❌ 테마 상세 조회 에러:', error);
    throw error;
  }
};

// 테마 삭제    
export const deleteTheme = async (themeId) => {
  try {
    const response = await fetchWithAuth(`themes/${themeId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`테마 삭제 실패: ${response.status}`);
    }   

    const data = await response.json();
    console.log('✅ 테마 삭제 성공:', data);
    return data;
  } catch (error) {
    console.error('❌ 테마 삭제 에러:', error);
    throw error;
  }
};
