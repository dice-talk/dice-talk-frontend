import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ClearIcon from "../assets/public/clear.svg";
import Footer from "../../../../.Trash/dice-talk-frontend/component/Footer";

const SettingUserInfoClear = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ClearIcon width={60} height={60} />
        <Text style={styles.successText}>변경에 성공했습니다!</Text>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => navigation.navigate("SettingMain")}
        >
          <Text style={styles.confirmButtonText}>확인</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 100,
  },
  content: {
    alignItems: "center",
    gap: 20,
  },
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  confirmButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    backgroundColor: "#D9A7FF",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SettingUserInfoClear;
