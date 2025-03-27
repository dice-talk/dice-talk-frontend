import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Footer from "../../../../.Trash/dice-talk-frontend/component/Footer";

const SettingUserInfo = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          placeholder="gildongii@gmail.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>비밀번호 확인</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력해주세요."
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SettingUserInfoChange')}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  contentContainer: {
    flex: 1,
  },
  footerContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    marginTop: 20,
    color: "#333",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#D9A7FF",
    paddingVertical: 8,
    fontSize: 14,
    color: "#000",
  },
  button: {
    marginTop: 40,
    alignSelf: "center",
    backgroundColor: "#D9A7FF",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SettingUserInfo;
