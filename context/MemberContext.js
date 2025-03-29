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
    const numericId = Number(id);
    setMemberId(numericId);
    console.log('현재 저장된 memberId:', numericId);
  };

  const clearMemberId = () => {
    setMemberId(null);
  };

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