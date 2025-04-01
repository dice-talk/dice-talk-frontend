import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function EventModal({ visible, onClose, participants }) {
  const handleSelect = (userId) => {
    onClose();
  };

  const renderParticipantList = () => {
    return participants.map((participant) => (
      <TouchableOpacity
        key={participant.id}
        style={styles.participantItem}
        onPress={() => handleSelect(participant.id)}
      >
        <Text style={styles.participantName}>{participant.nickname}</Text>
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
          
          <ScrollView style={styles.participantList}>
            {renderParticipantList()}
          </ScrollView>

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
  participantName: {
    fontSize: 16,
    color: '#1F2937',
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