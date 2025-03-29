import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LongButton from '../component/LongButton';


export default function DropOutModal ({ visible, onCancel, onConfirm}) {
    return (
        <Modal visible={visible} transparent animationType='fade'>
            <View style={styles.overlay}>
            <LinearGradient colors={['#D7C0FA', '#F8B4F1']} style={styles.modalContainer}>
                <View style={styles.innerBox}>
                    <Text style={styles.headerText}>정말</Text>
                    <Text style={styles.title}>탈퇴하시겠습니까?</Text>
                    <Text style={styles.subText}>우리의 추억을 잊지 말아주세요🥺</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity 
                        onPress={onCancel} 
                        style={styles.smallButton}
                        activeOpacity={1} >
                            <LinearGradient
                            colors={['#D8CFF0', '#F5CEDD']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.buttonGradient}
                            >
                            <Text style={styles.buttonText}>취소</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={onConfirm} 
                        style={styles.smallButton}
                        activeOpacity={1} >
                            <LinearGradient
                            colors={['#D8CFF0', '#F5CEDD']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.buttonGradient}
                            >
                            <Text style={styles.buttonText}>탈퇴하기</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        </View>
                </View>
            </LinearGradient>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.25)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      borderRadius: 20,
      padding: 2,
      width: '80%',
    },
    innerBox: {
      backgroundColor: '#fff',
      borderRadius: 18,
      padding: 24,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 20,
      color: '#7B4ACF',
      fontWeight: '600',
    },
    title: {
      fontSize: 18,
      color: '#333',
      marginTop: 4,
      fontWeight: 'bold',
    },
    subText: {
      fontSize: 14,
      color: '#888',
      marginTop: 12,
      textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        gap: 12,
      },
      
      smallButton: {
        flex: 1,
        borderRadius: 24,
        //overflow: 'hidden',
      },
      
      buttonGradient: {
        paddingVertical: 10,
        borderRadius: 24,
        alignItems: 'center',
      },
      
      buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
      },
  });