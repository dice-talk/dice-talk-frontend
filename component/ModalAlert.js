import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const ModalAlert = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType='fade'>
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <MaterialCommunityIcons name='alert' size={40} color='#FFA726' />
                        <Text style={styles.message}>
                            이 계정은 금칙어 사용으로 인해{'\n'}영구 정지되었습니다.{'\n'}{'\n'}
                            문의 사항이 있으면 고객센터로{'\n'}연락하세요요
                        </Text>
                        <TouchableOpacity onPress={onClose} style={styles.button}>
                            <Text style={styles.buttonText}> 확인 </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    );
};

export default ModalAlert;

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: '#fff',
      borderColor: '#C65D45', // 빨간 테두리
      borderWidth: 2,
      borderRadius: 12,
      paddingVertical: 30,
      paddingHorizontal: 20,
      alignItems: 'center',
      width: '80%',
    },
    message: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
      marginTop: 16,
      lineHeight: 24,
    },
    button: {
      marginTop: 24,
      backgroundColor: '#C65D45',
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 24,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });