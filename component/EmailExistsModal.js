import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LongButton from "./LongButton";

export default function EmailExistModal ({ visible, onClose, onLogin, onFindEmail}) {
    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.modalBox}>
                    <Text style={styles.message}>이미 존재하는 이메일입니다.</Text>

                        <LongButton onPress={onLogin}>
                            <Text style={styles.buttonText}>로그인하러 가기</Text>
                        </LongButton>

                        <LongButton onPress={onFindEmail}>
                            <Text style={styles.buttonText}>비밀번호 찾기</Text>
                        </LongButton>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalBox: {
      width: 280,
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 24,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 10,
    },
    message: {
      fontSize: 16,
      color: '#333',
      marginBottom: 20,
    },
    button: {
      width: 200,
      paddingVertical: 10,
      borderRadius: 24,
      marginTop: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
      paddingHorizontal: 10
    },
  });