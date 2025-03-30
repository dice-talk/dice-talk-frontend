import React, { createContext, useContext, useState } from 'react'

const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [eventSelections, setEventSelections] = useState({}); // senderId: { receiverId, message }
    const [eventMeta, setEventMeta] = useState({
      eventId: null,
      chatRoomId: null,
      roomEventType: 'PICK_MESSAGE',
      startTime: Date.now(),
    });

    // 참가자 한 명의 선택 저장
  const updateSelection = ({ senderId, receiverId, message }) => {
    setEventSelections((prev) => ({
      ...prev,
      [senderId]: { receiverId, message },
    }));
  };

  const initializeEvent = ({ eventId, chatRoomId }) => {
    setEventMeta({
      eventId,
      chatRoomId,
      roomEventType: 'PICK_MESSAGE',
      startTime: Date.now(),
    });
    setEventSelections({}); // 초기화
  };

  return (
    <EventContext.Provider
      value={{
        eventSelections,
        eventMeta,
        updateSelection,
        initializeEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);