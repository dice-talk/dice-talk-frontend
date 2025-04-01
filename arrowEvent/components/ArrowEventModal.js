import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Pressable, Alert, Image } from 'react-native';
import { useEvent } from '../../context/EventContext';
import { LinearGradient } from 'expo-linear-gradient';
import ArrowBoard01 from "../../assets/event/arrowBoard_01.svg";
import ArrowBoard02 from "../../assets/event/arrowBoard_02.svg";
import { usePostEvent } from '../../utils/http/eventAPI';
import { useMemberContext } from '../../context/MemberContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FriendsGame_01 from "../../assets/icon/profile/friends_game_01";
import FriendsGame_02 from "../../assets/icon/profile/friends_game_02";
import FriendsGame_05 from "../../assets/icon/profile/friends_game_05";
import LoveGameSelect_01 from "../../assets/icon/profile/love_game_select_01";
import LoveGameSelect_02 from "../../assets/icon/profile/love_game_select_02";
import LoveGameSelect_05 from "../../assets/icon/profile/love_game_select_05";

// 하드코딩된 참여자 데이터
const MOCK_PARTICIPANTS = [
  {
    id: 1,
    nickname: "한가로운 하나",
    DefaultIcon: FriendsGame_01,
    SelectedIcon: LoveGameSelect_01,
    color: '#FF6B6B'
  },
  {
    id: 2,
    nickname: "세침한 세찌",
    DefaultIcon: FriendsGame_02,
    SelectedIcon: LoveGameSelect_02,
    color: '#4ECDC4'
  },
  {
    id: 3,
    nickname: "단호한데 다정한 다오",
    DefaultIcon: FriendsGame_05,
    SelectedIcon: LoveGameSelect_05,
    color: '#45B7D1'
  }
];

export default function ArrowEventModal({ visible, onClose, chatRoomId }) {
  const { postEvent } = usePostEvent();
  const { eventState, selectUser, modifySelection } = useEvent();
  const { memberId } = useMemberContext();
  const [showResult, setShowResult] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const handleSelect = async (userId) => {
    if (eventState.hasSelected && !eventState.hasModified) {
      return;
    }

    try {
      const token = await AsyncStorage.getItem('accessToken');
      const participant = MOCK_PARTICIPANTS.find(p => p.id === userId);
      
      setSelectedParticipant(participant);
      setShowResult(true);
      
      const eventData = {
        receiverId: userId,
        senderId: memberId,
        eventId: 1,
        chatRoomId: chatRoomId || 2,
        message: "화살표 이벤트 선택",
        roomEventType: "PICK_MESSAGE"
      };

      // 이벤트 전송
      const eventResponse = await postEvent(eventData);
      console.log('✅ 이벤트 전송 응답:', eventResponse);

      // // 3초 후에 결과를 저장하고 모달을 닫습니다
      // setTimeout(() => {
      //   selectUser(userId);
      //   setShowResult(false);
      //   onClose();
      // }, 3000);

    } catch (error) {
      console.error('❌ 에러 발생:', error);
      Alert.alert('오류', error.message || '요청 처리 중 오류가 발생했습니다.');
    }
  };

  const handleModify = () => {
    modifySelection();
  };

  const renderParticipantList = () => {
    return (
      <View style={styles.diceContainer}>
        {MOCK_PARTICIPANTS.map((participant) => {
          const isSelected = eventState.selectedUser === participant.id;
          const Icon = isSelected ? participant.SelectedIcon : participant.DefaultIcon;

          return (
            <TouchableOpacity
              key={participant.id}
              style={styles.diceItem}
              onPress={() => handleSelect(participant.id)}
              disabled={eventState.hasSelected && !eventState.hasModified}
            >
              <Icon width={40} height={40} />
              <Text style={[styles.participantName, { color: participant.color }]}>
                {participant.nickname}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <View style={styles.modalContent}>
          <View style={styles.arrowBoardContainer}>
            {showResult ? (
              <ArrowBoard02 width={450} height={330} />
            ) : (
              <ArrowBoard01 width={450} height={330} />
            )}

            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {showResult ? "선택의 결과를 확인해주세요" : "좀 더 대화하고 싶은 상대를 선택해주세요"}
              </Text>
            </View>

            {eventState.hasSelected && !eventState.hasModified ? (
              <View style={styles.modifyContainer}>
                <Text style={styles.modifyText}>
                  이미 선택을 완료했습니다.
                  {'\n'}선택을 수정하시겠습니까?
                </Text>
                <TouchableOpacity
                  style={styles.modifyButton}
                  onPress={handleModify}
                >
                  <LinearGradient
                    colors={['#C4B5FD', '#A78BFA']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.gradient}
                  >
                    <Text style={styles.buttonText}>선택 수정하기</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.participantList}>
                {renderParticipantList()}
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
  },
  arrowBoardContainer: {
    width: 520,
    height: 400,
    position: 'relative',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  titleContainer: {
    position: 'absolute',
    top: 135,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 12,
    color: '#F8B4C4',
    textAlign: 'center',
  },
  participantList: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  diceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  diceItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  participantName: {
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
  },
  modifyContainer: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
    alignItems: 'center',
    padding: 20,
    zIndex: 1,
  },
  modifyText: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 20,
  },
  modifyButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

// 참가자 목록 표시
// 사용자 선택 기능
// 선택 수정 시 결제 유도도