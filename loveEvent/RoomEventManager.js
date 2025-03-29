import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import HeartVoteModal from './HeartVoteModal';
import { postEvent } from '../utils/http/roomAPI';

export default function RoomEventManager({ children }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventTriggered, setEventTriggered] = useState(false); // 중복 방지

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // 00:00일 때 한 번만 트리거
      if (hours === 0 && minutes === 0 && !eventTriggered) {
        console.log("이벤트 발생 시간 도달!");
        setModalVisible(true);
        setEventTriggered(true);

        const autoEvent = {
          receiverId: 1,
          senderId: 2,
          chatRoomId: 5,
          eventId: 2,
          message: '자동 이벤트입니다.',
          roomEventType: 'PICK_MESSAGE',
        };

        postEvent(autoEvent);
      }

      // 다음 날을 위한 리셋 조건
      if (hours !== 0 || minutes !== 0) {
        setEventTriggered(false);
      }

    }, 60000); // 매 분마다 체크

    return () => clearInterval(interval);
  }, [eventTriggered]);

  return (
    <>
      {children}
      <HeartVoteModal
        visible={isModalVisible}
        onSelectDice={(id, name) => {
            navigation.navigate('LetterEventScrreen', {
                receiverId: id,
                senderId: 999,
                chatRoomId: 999,
                eventId: 1,
                roomEventType: 'PICK_MESSAGE'
            })
            setModalVisible(false)}} // 수동 닫기
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}
