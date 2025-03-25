import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function AlerModal({ visible, message, onConfirm, onCancel, }) {

    const navigation = useNavigation();

    const handleCancel = () => {
        onCancel?.(); // 외부 필요시
    }

    const handleConfirm = () => {
        onCancel?.();
        if(onConfirm) {
            onConfirm(); // 외부에 전달
        } else {
            navigation.navigate("TossAuth"); // 기본 confirm 액션션
        }
    }
    return (
        <Modal transparent animationType="fade" visible={visible}>
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalBox}>
                            <Text style={styles.message}>{message}</Text>
        
                            <View style={styles.buttonRow}>
                                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                                    <Text style={styles.cancelText}>취소</Text>
                                </TouchableOpacity>
                                
                                {/* 확인 버튼 (그라디언트 직접 구현) */}
                                <TouchableOpacity onPress={handleConfirm} style={styles.confirmWrapper}>
                                    <LinearGradient
                                        colors={["#B28EF8", "#F476E5"]}
                                        start={{ x: 0, y: 0.5 }}
                                        end={{ x: 1, y: 0.5 }}
                                        style={styles.confirmButton}>
                                            <Text style={styles.confirmText}>확인</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.3)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalBox: {
      width: 300,
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 24,
      alignItems: "center",
    },
    message: {
      fontSize: 16,
      color: "#333",
      textAlign: "center",
      marginBottom: 20,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      gap: 8,
    },
    cancelButton: {
      flex: 1,
      backgroundColor: "#ccc",
      paddingVertical: 12,
      borderRadius: 30,
      alignItems: "center",
    },
    cancelText: {
      color: "white",
      fontSize: 16,
    },
    confirmWrapper: {
        flex: 1,
        height: 48, // LongButton 내부 스타일과 맞추기
    },
    confirmWrapper: {
        flex: 1,
        height: 48,
        borderRadius: 30,
        overflow: "hidden",
      },
      confirmButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
      },
      confirmText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
  });