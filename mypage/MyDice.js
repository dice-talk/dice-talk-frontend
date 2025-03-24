import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import Footer from "../component/Footer";
import Pagination from "../component/Pagination";
import Dice from "../assets/icon/logo/Vector.svg"

export default function MyDice() {
  const [selectedTab, setSelectedTab] = useState("charge"); // "charge" or "use"
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3); // 가짜 데이터 기준
  const [data, setData] = useState([]);

  const handlePageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    // 임시 데이터 - 실제로는 charge/use 기준 API 호출 필요
    const fullData = Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      date: `2025-03-${String(15 - index).padStart(2, "0")} 12:00:00`,
      type: selectedTab === "charge" ? "DICE 충전" : "DICE 사용",
      amount: `${(index + 1) * 5} 개`,
    }));

    const itemsPerPage = 4;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = fullData.slice(startIndex, startIndex + itemsPerPage);

    setTotalPages(Math.ceil(fullData.length / itemsPerPage));
    setData(paginatedData);
  }, [selectedTab, currentPage]);

  return (
    <>
      <View style={styles.container}>
        <LinearGradient colors={["#D7C0FA", "#F8B4F1"]} style={styles.header}>
          <Text style={styles.headerTitle}>My Dice</Text>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.diceTitleRow}>
            <Dice width={24} height={24} />
            <Text style={styles.diceTitleText}>나의 DICE</Text>
          </View>
          <View style={styles.lightSeparator} />

          <View style={styles.infoRow}>
            <Text style={styles.diceLabel}>현재 보유 중인 나의 DICE</Text>
            <Text style={styles.diceAmount}>34 개</Text>
          </View>

          <View style={styles.tabContainer}>
            <Pressable style={{ flex: 1 }} onPress={() => setSelectedTab("charge")}>
              {selectedTab === "charge" ? (
                <LinearGradient colors={["#B28EF8", "#F9A8D4"]} style={styles.tab}>
                  <Text style={styles.tabTextSelected}>충전 내역</Text>
                </LinearGradient>
              ) : (
                <View style={[styles.tab, styles.tabInactive]}>
                  <Text style={styles.tabText}>충전 내역</Text>
                </View>
              )}
            </Pressable>

            <Pressable style={{ flex: 1 }} onPress={() => setSelectedTab("use")}>
              {selectedTab === "use" ? (
                <LinearGradient colors={["#B28EF8", "#F9A8D4"]} style={styles.tab}>
                  <Text style={styles.tabTextSelected}>사용 내역</Text>
                </LinearGradient>
              ) : (
                <View style={[styles.tab, styles.tabInactive]}>
                  <Text style={styles.tabText}>사용 내역</Text>
                </View>
              )}
            </Pressable>
          </View>

          <ScrollView style={{ marginTop: 20 }}>
            <View style={{ minHeight: 4 * 80 }}>
              {data.map((item) => (
                <View key={item.id} style={styles.itemBox}>
                  <View style={styles.itemLine} />
                  <View style={styles.itemContent}>
                    <Text style={styles.itemDate}>충전일 {item.date}</Text>
                    <Text style={styles.itemRight}>{item.type} {item.amount}</Text>
                  </View>
                  <View style={styles.itemLine} />
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={{ paddingTop: 10, paddingBottom: 80 }}>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </View>
        </View>
      </View>

      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: "center",
    paddingBottom: 12,

  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
  },
  body: {
    padding: 20,
    flex: 1,
  },
  diceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  diceTitleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  lightSeparator: {
    height: 1,
    backgroundColor: '#E8D8F8',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  diceLabel: {
    fontSize: 14,
    color: "#333",
  },
  diceAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#715E7C",
  },
  tabContainer: {
    flexDirection: "row",
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 10,
    height: 40,
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  tabInactive: {
    backgroundColor: "#F3E8FF",
  },
  tabText: {
    color: "#715E7C",
    fontSize: 14,
  },
  tabTextSelected: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  itemBox: {
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  itemDate: {
    fontSize: 12,
    color: "#666",
  },
  itemRight: {
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
  },
  itemLine: {
    height: 1,
    backgroundColor: "#eee", // 아주 연한 회색
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,  // 세로 간격 증가
    paddingHorizontal: 10,
  },
});