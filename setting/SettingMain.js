import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../../../.Trash/dice-talk-frontend/component/Footer";

const SettingMain = () => {
  const navigation = useNavigation();
  const menuItems = [
    "회원정보 수정",
    "1 대 1 문의하기",
    "공지사항 / 이벤트",
    "설정",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem} 
              onPress={
                index === 0
                  ? () => navigation.navigate("SettingUserInfo")
                  : index === 1
                  ? () => navigation.navigate("MyQuestionInputText")
                  : index === 2
                  ? () => navigation.navigate("Notifications")
                  : index === 3
                  ? () => navigation.navigate("AlertSetting")
                  : undefined
              }
            >
              <Text style={styles.menuText}>{item}</Text>
              <Text style={styles.arrow}>{">"}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.version}>v 0.0.1</Text>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
  },
  menuContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  menuText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 16,
    color: "#999",
  },
  version: {
    fontSize: 12,
    color: "#C187F3",
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 80,
  },
});

export default SettingMain;