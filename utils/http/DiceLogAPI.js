import { fetchWithAuth } from './AuthContext';

// dicelog 등록 (charge 등록)
export const postDiceLog = async (diceLog) => {
    try {
      const response = await fetchWithAuth('dices/charge', {
        method: 'POST',
        body: JSON.stringify({diceLog})
      });
  
      if (!response.created) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'diceLog 등록 실패');
      }
  
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  };

  // dicelog 등록 (used dice 등록)
  export const postUsedDiceLog = async (usedDiceLog) => {
    try {
      const response = await fetchWithAuth('dices/used', {
        method: 'POST',
        body: JSON.stringify({usedDiceLog})
      });

      if (!response.created) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'usedDiceLog 등록 실패');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  };

  // dicelog 조회
  export const diceLogDiceLog = async (memberId, page, size) => {
    try {
      const response = await fetchWithAuth(`dices/${memberId}?page=${page}&size=${size}`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'diceLog 조회 실패');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  };

  // dicelog 전체 조회 (관리자)
  export const diceLogDiceLogAdmin = async (page, size) => {
    try {
      const response = await fetchWithAuth(`dices/logs?page=${page}&size=${size}`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'diceLog 조회 실패');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  };