import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Dice from "../assets/icon/logo/Vector.svg"; // 기존 경로 사용
import Footer from "../component/Footer";

export default function ChargeDice() {
  const chargeItems = [
    { id: 1, label: "10 다이스", price: "₩ 1,100" },
    { id: 2, label: "30 + 1 다이스", price: "₩ 3,300" },
    { id: 3, label: "50 + 2 다이스", price: "₩ 5,500" },
    { id: 4, label: "100 + 5 다이스", price: "₩ 11,000" },
  ];

  return (
    <>
      <View style={styles.container}>
        <LinearGradient colors={["#D7C0FA", "#F8B4F1"]} style={styles.header}>
          <Text style={styles.headerTitle}>충전하기</Text>
        </LinearGradient>

        <View style={styles.body}>
          <Text style={styles.sectionTitle}>보유한 다이스</Text>
          <View style={styles.diceRow}>
            <Dice width={36} height={36} />
            <Text style={styles.diceCount}>0</Text>
          </View>

          <Text style={styles.subTitle}>다이스로 사용할 수 있는 기능</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {["채팅방 나가기 횟수 추가", "최종 선택 수정하기", ""].map((text, index) => (
              <Pressable key={index} style={styles.featureButton}>
                <Text style={styles.featureText}>{text}</Text>
                {text !== "" && (
                  <View style={styles.featureCostBox}>
                    <Dice width={14} height={14} />
                    <Text style={styles.featureCostText}>
                      {index === 0 ? "7 다이스" : "4 다이스"}
                    </Text>
                  </View>
                )}
              </Pressable>
            ))}
          </ScrollView>

          <Text style={styles.subTitle}>다이스 충전</Text>
          {chargeItems.map((item) => (
            <Pressable key={item.id} style={styles.chargeItem}>
              <View style={styles.itemContent}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <Dice width={20} height={20} />
                  <Text style={styles.chargeLabel}>{item.label}</Text>
                </View>
                <Text style={styles.chargePrice}>{item.price}</Text>
              </View>
              <View style={styles.itemLine} />
            </Pressable>
          ))}
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
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
  },
  body: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 16,
    color: "#111",
  },
  diceRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginVertical: 10,
  },
  diceCount: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#715E7C",
    marginVertical: 8,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 24,
    marginBottom: 12,
    color: "#333",
  },
  horizontalScroll: {
    flexDirection: "row",
    marginBottom: 16,
  },
  featureButton: {
    width: 160,
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5D5FB",
    backgroundColor: "#FBF8FF",
    padding: 10,
    marginRight: 12,
    justifyContent: "space-between",
  },
  featureText: {
    fontSize: 13,
    color: "#333",
  },
  featureCostBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0EDF5',
    borderRadius: 8,
    paddingVertical: 4,
    marginTop: 8,
    gap: 4,
  },
  featureCostText: {
    fontSize: 11,
    color: '#715E7C',
  },
  chargeItem: {
    marginBottom: 12,
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  chargeLabel: {
    fontSize: 16,
    color: "#333",
  },
  chargePrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  itemLine: {
    height: 1,
    backgroundColor: "#E8D8F8",
  },
});