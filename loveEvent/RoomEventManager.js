import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import HeartVoteModal from './HeartVoteModal';
import { usePostEvent } from '../utils/http/eventAPI';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../utils/http/AuthContext';
import { useEvent } from '../context/EventContext';
//import { useChat } from '../utils/http/ChatContext';


export default function RoomEventManager({ children }) {
  const { member } = useAuth();
  //const { currentRoom} = useChat();
  const navigation = useNavigation();
  const { postEvent } = usePostEvent();
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventTriggered, setEventTriggered] = useState(false); // 중복 방지
  const { eventMeta, eventSelections } = useEvent();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const timePassed = now - eventMeta.startTime >= 3600000; // 1시간간
      const minutes = now.getMinutes();

      // 00:00일 때 한 번만 트리거
      if (hours === 0 && minutes === 0 && !eventTriggered) {
        console.log("이벤트 발생 시간 도달!");
        sendAllVote();
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

  const sendAllVote = async () => {
    const entries = Object.entries(eventSelections); //[senderId, {receiverId, message}]
    for (const [senderId, {receiverId, message}] of entries) {
      const payload = {
        receiverId,
        senderId: Number(senderId),
        chatRoomId: eventMeta.chatRoomId,
        eventId: eventMeta.eventId,
        message,
        roomEventType: eventMeta.roomEventType,
      };
      try {
        const result = await postEvent(payload);
        console.log('이벤트 전송 결과:', result);
      } catch (error) {
        console.error('이벤트 전송 실패:', error);
      }
    }
  };

  return (
    <>
      {children}
      <HeartVoteModal
        visible={isModalVisible}
        onSelectDice={(id) => {
            navigation.navigate('LetterEventScreen', {
                receiverId: id,
                senderId: member?.id,
                chatRoomId: 6,
                //chatRoomId: currentRoo?.chatRoomId,
                eventId: 1, // 이건 하드코딩 ok.
                roomEventType: 'PICK_MESSAGE'
            })
            setModalVisible(false)}} // 수동 닫기
        onClose={() => setModalVisible(false)}
      />
    </>
  );
  
}
