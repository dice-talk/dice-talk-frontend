import React, { createContext, useContext, useState } from 'react';

const GroupContext = createContext();

export const useGroupContext = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error('useGroupContext must be used within a GroupProvider');
  }
  return context;
};

export const GroupProvider = ({ children }) => {
  const [groupInfo, setGroupInfo] = useState({
    room_type: 'Group',
    theme_id: null,
    chatParts: []
  });

  const updateGroupInfo = (newInfo) => {
    setGroupInfo(prevInfo => ({
      ...prevInfo,
      ...newInfo
    }));
  };

  const updateParticipant = (memberId, updates) => {
    setGroupInfo(prevInfo => ({
      ...prevInfo,
      chatParts: prevInfo.chatParts.map(part => 
        part.memberId === memberId ? { ...part, ...updates } : part
      )
    }));
  };

  const addParticipant = (participant) => {
    setGroupInfo(prevInfo => ({
      ...prevInfo,
      chatParts: [...prevInfo.chatParts, participant]
    }));
  };

  const removeParticipant = (memberId) => {
    setGroupInfo(prevInfo => ({
      ...prevInfo,
      chatParts: prevInfo.chatParts.filter(part => part.memberId !== memberId)
    }));
  };

  const value = {
    groupInfo,
    updateGroupInfo,
    updateParticipant,
    addParticipant,
    removeParticipant
  };

  return (
    <GroupContext.Provider value={value}>
      {children}
    </GroupContext.Provider>
  );
}; 