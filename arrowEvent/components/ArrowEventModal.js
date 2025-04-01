import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useEvent } from '../../contexts/EventContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function ArrowEventModal({ visible, onClose, participants }) {
  const { eventState, selectUser, modifySelection, getEventStage } = useEvent();
  const stage = getEventStage();

  const handleSelect = (userId) => {
    if (eventState.hasSelected && !eventState.hasModified) {
      // 결제 필요 모달 표시
      return;
    }
    selectUser(userId);
    onClose();  
  };

  const handleModify = () => {
    // 결제 모달 표시
    modifySelection();
  };

  const renderParticipantList = () => {
    return participants.map((participant) => (
      <TouchableOpacity
        key={participant.id}
        style={[
          styles.participantItem,
          eventState.selectedUser === participant.id && styles.selectedItem
        ]}
        onPress={() => handleSelect(participant.id)}
        disabled={eventState.hasSelected && !eventState.hasModified}
      >
        <Text style={styles.participantName}>{participant.nickname}</Text>
        {eventState.selectedUser === participant.id && (
          <Text style={styles.selectedText}>선택됨</Text>
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>이벤트 참가자 선택</Text>
          
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
            <ScrollView style={styles.participantList}>
              {renderParticipantList()}
            </ScrollView>
          )}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
    textAlign: 'center',
    marginBottom: 20,
  },
  participantList: {
    maxHeight: 400,
  },
  participantItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  selectedItem: {
    backgroundColor: '#F5F3FF',
  },
  participantName: {
    fontSize: 16,
    color: '#1F2937',
  },
  selectedText: {
    fontSize: 14,
    color: '#8B5CF6',
    marginTop: 5,
  },
  modifyContainer: {
    alignItems: 'center',
    padding: 20,
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
  closeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '600',
  },
}); 

// 참가자 목록 표시
// 사용자 선택 기능
// 선택 수정 시 결제 유도도