import React from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import Dice from "../assets/icon/logo/friends_icon.svg";

export default function DiceFriendsDs({ visible, onClose, onParticipate }) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={{ alignItems: "center" }}>
              <Dice width={36} height={36} />
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>X</Text>
              </Pressable>
            </View>
            <Text style={styles.title}>다이스프렌즈</Text>
            <Text style={styles.subtitle}>게임 규칙</Text>
            <Text style={styles.description}>
              다이스 프렌즈에 참여하는 플레이어는 6명 입니다{"\n\n"}
              다이스 프렌즈는 2일간 진행됩니다.{"\n\n"}
              24시간 후 단 한명의 플레이어에게 메시지를 보낼 수 있습니다.{"\n"}
              (단, 발신자의 닉네임은 표시되지 않습니다.)
            </Text>
          </View>
          <View style={styles.buttonRow}>
            <Pressable style={styles.button} onPress={onParticipate}>
              <Text style={styles.buttonText}>참여하기</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>창 닫기</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: "#558EDD",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    width: "100%",
    height: "60%",
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 10,
  },
  closeText: {
    color: "#fff",
    fontSize: 18,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  subtitle: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 'auto',
  },
  button: {
    backgroundColor: "#BFA7F3",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 120,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});