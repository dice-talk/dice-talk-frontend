
import React from "react";
import { View, Text, Modal, StyleSheet, Pressable } from "react-native";


export default function BannedModal ({ visible, onClose, SvgComponent}) {

    return (
      <Modal
        transparent
        visible={visible}
        animationType="fade"
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <SvgComponent width={150} height={150} />
            <Text style={styles.message}>
              이 계정은 금칙어 사용으로 인해{"\n"}
              <Text style={{ fontWeight: 'bold' }}>영구 정지되었습니다.</Text>{"\n"}
              문의 사항이 있으면 고객센터로 연락하세요
            </Text>
            <Pressable style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };
  

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: 300,
      backgroundColor: 'white',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#FF7B7B',
      paddingVertical: 30,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    icon: {
      width: 40,
      height: 40,
      marginBottom: 20,
      resizeMode: 'contain',
    },
    message: {
      textAlign: 'center',
      color: '#333',
      fontSize: 14,
      lineHeight: 22,
      marginBottom: 25,
    },
    button: {
      backgroundColor: '#F15959',
      paddingVertical: 10,
      paddingHorizontal: 50,
      borderRadius: 20,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
  });
  