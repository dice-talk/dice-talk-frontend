import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useEvent } from '../../contexts/EventContext';

export default function ArrowCountdownTimer() {
  const { calculateRemainingTime, getEventStage } = useEvent();
  const [timeLeft, setTimeLeft] = useState(null);
  const stage = getEventStage();

  useEffect(() => {
    const updateTimer = () => {
      const remaining = calculateRemainingTime();
      if (remaining !== null) {
        setTimeLeft(remaining);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [calculateRemainingTime]);

  const formatTime = (ms) => {
    if (ms <= 0) return '00:00:00';
    
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const getStageText = () => {
    switch (stage) {
      case 'WAITING':
        return '이벤트 대기 중';
      case 'EVENT':
        return '이벤트 진행 중';
      case 'REVIEW':
        return '결과 확인';
      case 'ENDED':
        return '이벤트 종료';
      default:
        return '';
    }
  };

  if (timeLeft === null) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.stageText}>{getStageText()}</Text>
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F3FF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  stageText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 5,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
}); 

// 이벤트 시작 시간 표시
// 이벤트 진행 시간 표시
// 이벤트 결과 확인 시간 표시
// 이벤트 종료 시간 표시