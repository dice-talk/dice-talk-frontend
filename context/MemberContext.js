import React, { createContext, useContext, useState } from 'react';

const MemberContext = createContext();

export function useMemberContext() {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMemberContext must be used within a MemberProvider');
  }
  return context;
}

export function MemberProvider({ children }) {
  const [memberId, setMemberId] = useState(null);

  const updateMemberId = (id) => {
    console.log('updateMemberId 호출됨. 이전 memberId:', memberId);
    const numericId = Number(id);
    setMemberId(numericId);
    console.log('memberId 업데이트 완료:', numericId);
  };

  const clearMemberId = () => {
    console.log('clearMemberId 호출됨. 이전 memberId:', memberId);
    setMemberId(null);
    console.log('memberId 초기화 완료');
  };

  // Provider 렌더링 시마다 현재 memberId 상태 로깅
  console.log('MemberProvider 현재 memberId:', memberId);

  return (
    <MemberContext.Provider 
      value={{
        memberId,
        updateMemberId,
        clearMemberId
      }}
    >
      {children}
    </MemberContext.Provider>
  );
} 