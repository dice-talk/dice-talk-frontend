import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Love01 from "../../assets/icon/profile/love_01.svg";
import Love02 from "../../assets/icon/profile/love_02.svg";
import Signal from "../../assets/event/signal.svg";

export default function SignalModal({ visible, onClose }) {
  if (!visible) return null;
  
  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <View style={{ alignItems: "center" }}>
        <View style={{ width: 520, height: 400, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <Image 
            source={require("../../assets/event/board.png")} 
            style={{ width: 400, height: 280 }}
          />
          <Pressable onPress={onClose} style={{ position: 'absolute', top: 8, right: 10, zIndex: 1 }}>
            <Text style={{ color: "white", fontSize: 16 }}>X</Text>
          </Pressable>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, position: 'absolute', top: 170, zIndex: 1 }}>
            <Love01 width={50} height={50} />
            <Signal width={150} height={90} />
            <Love02 width={50} height={50} />
          </View>

          <Text style={{ position: 'absolute', top: 135, fontSize: 14, color: "#fff", zIndex: 1 }}>
            시그널이 연결되었어요!
          </Text>
        </View>
        <Pressable
          style={[
            styles.confirmButton,
            { backgroundColor: "#F8B4C4", marginTop: 16 }
          ]}
          onPress={onClose}
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