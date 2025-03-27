import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Pagination from "../../../../.Trash/dice-talk-frontend/component/Pagination";
import Footer from "../../../../.Trash/dice-talk-frontend/component/Footer";

const postData = [
  { id: "1", type: "공지", title: "런칭 기념 이벤트", date: "2025-03-01" },
  { id: "2", type: "공지", title: "깨끗한 말을 사용해주세요.", date: "2025-03-01" },
  { id: "3", type: "이벤트", title: "마음 맞는 친구를 찾아드려요", date: "2025-03-05" },
  { id: "4", type: "이벤트", title: "환승연애 참가모집", date: "2025-03-03" },
  { id: "5", type: "이벤트", title: "오픈 기념 이벤트", date: "2025-03-01" },
];

const renderPostRow = ({ type, title, date }) => (
  <View style={styles.postRow}>
    <View style={styles.tag}>
      <Text style={styles.tagText}>{type}</Text>
    </View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.date}>{date}</Text>
  </View>
);

export default function Notifications() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>제목</Text>
          <Text style={styles.headerText}>작성일</Text>
        </View>

        <FlatList
          data={postData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderPostRow(item)}
          contentContainerStyle={styles.listContent}
        />

        <Pagination />
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  listContent: {
    paddingVertical: 10,
  },
  postRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E3D5F5",
    paddingVertical: 12,
  },
  tag: {
    backgroundColor: "#D9A7FF",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
});
