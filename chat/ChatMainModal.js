import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LongButton from '../component/LongButton';

const { width } = Dimensions.get('window');

export default function ChatTimerModal({ visible, remainingTime, unreadCount, onEnter }) {
  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      {/* 🔹 어두운 배경 */}
      <View style={styles.overlay}>
        {/* 🔸 그라데이션 테두리 모달 */}
        <LinearGradient
          colors={['#d58fff', '#f87de8']}
          style={styles.gradientBorder}
        >
          <View style={styles.modalContent}>
            {/* 읽지 않은 메시지 수 뱃지 */}
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{unreadCount}</Text>
            </View>

            <View style={styles.textWrapper}>
              <Text style={styles.label}>채팅 종료까지</Text>
              <LinearGradient
                colors={['#a46bff', '#ff7dd3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.underline}
              />
            </View>

            <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>

            <LongButton title="입장" onPress={onEnter} />
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // 어두운 반투명 배경
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBorder: {
    padding: 3,
    borderRadius: 24,
  },
  modalContent: {
    width: width * 0.8,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    position: 'relative',
  },
  textWrapper: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  underline: {
    height: 3,
    width: 100,
    borderRadius: 2,
  },
  timerText: {
    fontSize: 48,
    fontFamily: 'Courier',
    marginVertical: 20,
    color: '#555',
  },
  unreadBadge: {
    position: 'absolute',
    top: -16,
    right: -16,
    backgroundColor: '#9c4fff',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
