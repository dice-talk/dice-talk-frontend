import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function ExitModal({ visible, onClose, onConfirm }) {
  if (!visible) return null;
  
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>
          하루에 최대 2번 채팅방을{"\n"}나갈 수 있습니다.{"\n\n"}나가시겠습니까?
        </Text>
        <View style={styles.modalButtons}>
          <Pressable 
            style={[styles.modalButton, styles.cancelButton]} 
            onPress={onClose}
          >
            <Text style={styles.buttonText}>취소</Text>
          </Pressable>
          <Pressable 
            style={[styles.modalButton, styles.confirmButton]} 
            onPress={onConfirm}
          >
            <Text style={styles.buttonText}>확인</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  modalContent: {
    width: 280,
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  modalText: {
    textAlign: "center",
    color: "#7A4F67",
    fontSize: 16,
    lineHeight: 28,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 20,
    marginTop: 28,
  },
  modalButton: {
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  cancelButton: {
    backgroundColor: "#E4E1EA",
  },
  confirmButton: {
    backgroundColor: "#D6B4E6",
  },
  buttonText: {
    color: "#fff",
  },
}); 