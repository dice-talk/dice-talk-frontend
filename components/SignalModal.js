import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignalModal({ visible, onClose, matchedUser }) {
  const handleConfirm = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>매칭 결과</Text>
          
          {matchedUser ? (
            <View style={styles.matchedContainer}>
              <Text style={styles.resultText}>매칭 성공!</Text>
              <Text style={styles.userName}>{matchedUser.nickname}</Text>
              <Text style={styles.description}>
                서로 매칭되었습니다.{'\n'}
                1:1 채팅방으로 이동합니다.
              </Text>
            </View>
          ) : (
            <View style={styles.unmatchedContainer}>
              <Text style={styles.resultText}>매칭 실패</Text>
              <Text style={styles.description}>
                이번 이벤트에서는 매칭되지 않았습니다.{'\n'}
                새로운 채팅방에 참여해보세요.
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <LinearGradient
              colors={['#C4B5FD', '#A78BFA']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>확인</Text>
            </LinearGradient>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 20,
  },
  matchedContainer: {
    alignItems: 'center',
    padding: 20,
  },
  unmatchedContainer: {
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 24,
  },
  confirmButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 20,
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