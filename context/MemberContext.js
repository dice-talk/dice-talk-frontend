import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

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

  useEffect(() => {
    const loadMemberId = async () => {
      const storedId = await AsyncStorage.getItem('memberId');
      if(storedId) setMemberId(Number(storedId));
    };
    loadMemberId();
  }, []);

  const updateMemberId = async (id) => {
    await AsyncStorage.setItem('memberId', String(id));
    setMemberId(id);
  };

  // const clearMemberId = () => {
  //   setMemberId(null);
  // };

  return (
    <MemberContext.Provider 
      value={{
        memberId,
        updateMemberId
        // clearMemberId
      }}
    >
      {children}
    </MemberContext.Provider>
  );
} 