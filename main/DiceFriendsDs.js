import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Dice from "../assets/icon/logo/friends_icon.svg";

export default function DiceFriendsDs() {
  const navigation = useNavigation();

  const handleClose = () => {
    navigation.goBack();
  };

  const handleParticipate = () => {
    navigation.navigate("SelectRegion");
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Dice width={36} height={36} />
        <Pressable onPress={handleClose} style={styles.closeButton}>
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
      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={handleParticipate}>
          <Text style={styles.buttonText}>참여하기</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleClose}>
          <Text style={styles.buttonText}>창 닫기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7FA8DB",
    borderRadius: 16,
    padding: 20,
    justifyContent: "center",
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  description: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#BFA7F3",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});