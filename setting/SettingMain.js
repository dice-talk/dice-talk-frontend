import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Footer from "../component/Footer";

const SettingMain = () => {
  const navigation = useNavigation();
  const menuItems = [
    {
      title: "회원정보 수정",
      screen: "SettingUserInfo"
    },
    {
      title: "1 대 1 문의하기",
      screen: "MyQuestionInputText"
    },
    {
      title: "공지사항 / 이벤트",
      screen: "Notifications"
    },
    {
      title: "설정",
      screen: "AlertSetting"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>더보기</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem} 
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={styles.menuText}>{item.title}</Text>
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
  header: {
    backgroundColor: "#E6B9F7",
    padding: 15,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
  },
  menuContainer: {
    marginTop: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  menuText: {
    fontSize: 16,
    color: "#000",
  },
  arrow: {
    fontSize: 16,
    color: "#999",
  },
  version: {
    fontSize: 12,
    color: "#C187F3",
    position: "absolute",
    bottom: 100,
    right: 20,
  },
});

export default SettingMain;