import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../component/Footer";

export default function EditMyInfo({ navigation }) {
  const handleConfirm = () => {
    // 여기에 비밀번호 확인 로직을 추가할 수 있습니다.
    navigation.navigate('EditMyInfoInput');
  };

  return (
    <>
      <View style={styles.container}>
        <LinearGradient colors={["#D7C0FA", "#F8B4F1"]} style={styles.topBar}>
          <Text style={styles.header}>회원정보 수정</Text>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.label}>이메일</Text>
          <TextInput style={styles.input} placeholder="gildongii@gmail.com" placeholderTextColor="#aaa"/>

          <Text style={[styles.label, { marginTop: 32 }]}>비밀번호 확인</Text>
          <TextInput style={styles.input} placeholder="비밀번호를 입력해주세요." placeholderTextColor="#aaa" secureTextEntry/>

          <Pressable style={styles.button} onPress={handleConfirm}>
            <LinearGradient colors={["#B28EF8", "#F9A8D4"]} style={styles.gradientButton}>
              <Text style={styles.buttonText}>확인</Text>
            </LinearGradient>
          </Pressable>
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
  topBar: {
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  header: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
  },
  content: {
    padding: 24,
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#D8B4FE",
    fontSize: 16,
    paddingVertical: 8,
    color: "#000",
  },
  button: {
    marginTop: 40,
    alignItems: "center",
  },
  gradientButton: {
    width: 106,
    height: 32,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});