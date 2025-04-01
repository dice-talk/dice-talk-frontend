import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ArrowSignalModal({ visible, onClose, matchResult, onConfirm }) {
  const getResultMessage = () => {
    if (!matchResult) return "결과를 확인하는 중입니다...";
    
    const { isMatched } = matchResult;
    return isMatched 
      ? "매칭되었습니다" 
      : "매칭에 실패하였습니다";
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
          <Text style={styles.title}>매칭 결과</Text>
          <Text style={styles.message}>{getResultMessage()}</Text>
          
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={onConfirm}
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
  message: {
    fontSize: 18,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 30,
  },
  confirmButton: {
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

// 매칭 결과 표시
// 매칭 실패 표시
// 확인 버튼 클릭 시 이벤트 종료
