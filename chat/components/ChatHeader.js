import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import LoveBack from "../../assets/icon/logo/love_back.svg";
import LoveSideBar from "../../assets/icon/logo/love_sidebar_nonClick.svg";

export default function ChatHeader({ title, onBack, onToggleSidebar }) {
  return (
    <View style={styles.topBar}>
      <Pressable onPress={onBack}>
        <LoveBack width={28} height={28} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={onToggleSidebar}>
        <LoveSideBar width={28} height={28} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 60,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    color: "#A45C73",
    fontWeight: "600",
  },
}); 