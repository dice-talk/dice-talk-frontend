import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../component/Footer";
import Friends_03 from "../assets/icon/profile/friends_03";
import Birth from "../assets/icon/birth.svg";
import Email from "../assets/icon/email.svg";
import Name from "../assets/icon/name.svg";
import Phone from "../assets/icon/phone.svg";
import Region from "../assets/icon/region.svg";

export default function MyInfo({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          colors={["#D7C0FA", "#F8B4F1"]}
          style={styles.topBackground}
        />
        <View style={styles.profileSection}>
            <Text style={styles.title}>나의 정보</Text>
            <View style={styles.profileImageWrapper}>
                <Friends_03 width={90} height={90} />
            </View>
            <Text style={styles.nickname}>새침한 세찌</Text>
            <Text style={styles.notice}>* 프로필 사진과 닉네임은 랜덤으로 제공됩니다.</Text>
            <Pressable style={styles.editButton} onPress={() => navigation.navigate("EditMyInfo")}>
                <Text style={styles.editText}>수정하기</Text>
            </Pressable>
        </View>
        <View style={styles.infoBox}>
          <InfoRow label="email" value="seaOtter@gmail.com" icon={Email} />
          <InfoRow label="name" value="김해달" icon={Name} />
          <InfoRow label="phone" value="010 - 1345 - 9099" icon={Phone} />
          <InfoRow label="birth" value="2000 - 01 - 01" icon={Birth} />
          <InfoRow label="region" value="서울특별시 강남구" icon={Region} />
        </View>
      </View>

      <Footer />
    </>
  );
}

const InfoRow = ({ label, value, icon: Icon }) => (
  <View style={styles.row}>
    <View style={styles.rowContent}>
      <Icon style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
    <View style={styles.underline} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBackground: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 160,
    borderBottomRightRadius: 160,
  },
  profileSection: {
    alignItems: "center",
    paddingTop: 70,
  },
  title: {
    fontSize: 20,
    color: "#715E7C",
    marginBottom: 12,
  },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginBottom: 10,
  },
  nickname: {
    fontSize: 18,
    color: "#715E7C",
    marginBottom: 4,
  },
  notice: {
    fontSize: 10,
    color: "#aaa",
    marginTop: 4,
    marginBottom: 16,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D8B4FE",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: "flex-end",
    marginRight: 30,
  },
  editText: {
    color: "#715E7C",
    fontSize: 12,
  },
  infoBox: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  row: {
    marginBottom: 24,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "flex-end", // 하단 정렬
    marginBottom: 6,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    color: "#715E7C",
  },
  value: {
    fontSize: 16,
    color: "#444",
  },
  underline: {
    borderBottomColor: "#D8B4FE",
    borderBottomWidth: 1,
    marginTop: 4,
  },
});