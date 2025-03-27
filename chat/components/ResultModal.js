import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import ArrowBoard02 from "../../assets/event/arrowBoard_02.svg";

export default function ResultModal({ visible, onClose, onConfirm }) {
  if (!visible) return null;
  
  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <View style={{ alignItems: "center" }}>
        <View style={{ width: 420, height: 300, position: 'relative' }}>
          <ArrowBoard02 width={420} height={300} />
          <Text style={{ position: 'absolute', top: 148, left: 0, right: 0, textAlign: 'center', fontSize: 18, color: '#F8B4C4', zIndex: 1 }}>
            선택의 결과를 확인해주세요
          </Text>
          <Pressable onPress={onClose} style={{ position: 'absolute', top: 8, right: 10, zIndex: 1 }}>
            <Text style={{ color: "white", fontSize: 16 }}>X</Text>
          </Pressable>
        </View>
        <Pressable
          style={[
            styles.confirmButton,
            { backgroundColor: "#F8B4C4", marginTop: 16 }
          ]}
          onPress={onConfirm}
        >
          <Text style={styles.confirmText}>확인</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  confirmButton: {
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
  },
}); 