import React from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import ExFriendsLogo from "../assets/icon/logo/exFriends_icon.svg";
import ExFriendsLogo2 from "../assets/icon/logo/exFriends_icon2.svg";

export default function ExFriendsDs({ visible, onClose, onParticipate }) {
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
              <View style={styles.logoContainer}>
                <ExFriendsLogo width={36} height={36} style={styles.tintedLogo} />
              </View>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>X</Text>
              </Pressable>
            </View>
            <Text style={styles.title}>Ex-Friends</Text>
            <Text style={styles.subtitle}>환승연애</Text>
            <View style={styles.iconContainer}>
              <ExFriendsLogo2 width={120} height={120} />
            </View>
          </View>
          <View style={styles.bottomSection}>
            <Text style={styles.openDateText}>
              2025. 04. 05일에 open 됩니다!
            </Text>
            <View style={styles.buttonRow}>
              <Pressable style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>창 닫기</Text>
              </Pressable>
            </View>
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
    backgroundColor: "#DEC2DB",
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
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#C4A7C1",
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
  logoContainer: {
    borderRadius: 20,
  },
  tintedLogo: {
    tintColor: '#fff',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    flex: 1,
  },
  bottomSection: {
    alignItems: 'center',
    marginBottom: 10,
  },
  openDateText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
}); 