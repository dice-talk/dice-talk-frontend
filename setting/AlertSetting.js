import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, Platform } from "react-native";
import Footer from "../../../../.Trash/dice-talk-frontend/component/Footer";

export default function AlertSetting() {
  const [soundNotification, setSoundNotification] = useState(true);
  const [vibrationNotification, setVibrationNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(true);
  const [pushNotification, setPushNotification] = useState(false);
  const [nightPushNotification, setNightPushNotification] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [emailConsent, setEmailConsent] = useState(true);
  const [snsConsent, setSnsConsent] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.label}>소리 알림</Text>
          <Switch value={soundNotification} onValueChange={setSoundNotification} trackColor={{ false: "#ddd", true: "#D9A7FF" }} thumbColor={Platform.OS === 'android' ? "#fff" : ""} />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>진동 알림</Text>
          <Switch value={vibrationNotification} onValueChange={setVibrationNotification} trackColor={{ false: "#ddd", true: "#D9A7FF" }} thumbColor={Platform.OS === 'android' ? "#fff" : ""} />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>이메일 알림</Text>
          <Switch value={emailNotification} onValueChange={setEmailNotification} trackColor={{ false: "#ddd", true: "#D9A7FF" }} thumbColor={Platform.OS === 'android' ? "#fff" : ""} />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>PUSH 알림</Text>
          <Switch value={pushNotification} onValueChange={setPushNotification} trackColor={{ false: "#ddd", true: "#D9A7FF" }} thumbColor={Platform.OS === 'android' ? "#fff" : ""} />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>야간 PUSH 알림</Text>
          <Switch value={nightPushNotification} onValueChange={setNightPushNotification} trackColor={{ false: "#ddd", true: "#D9A7FF" }} thumbColor={Platform.OS === 'android' ? "#fff" : ""} />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>마케팅 수신 동의</Text>
          <Switch value={marketingConsent} onValueChange={setMarketingConsent} trackColor={{ false: "#ddd", true: "#D9A7FF" }} thumbColor={Platform.OS === 'android' ? "#fff" : ""} />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>이메일 수신 동의</Text>
          <Switch value={emailConsent} onValueChange={setEmailConsent} trackColor={{ false: "#ddd", true: "#D9A7FF" }} thumbColor={Platform.OS === 'android' ? "#fff" : ""} />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>SNS 수신 동의</Text>
          <Switch value={snsConsent} onValueChange={setSnsConsent} trackColor={{ false: "#ddd", true: "#D9A7FF" }} thumbColor={Platform.OS === 'android' ? "#fff" : ""} />
        </View>
        <Text style={styles.withdraw}>회원탈퇴</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // vertically center
    paddingVertical: 14, // reduce from 20 to ~2/3
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  label: {
    fontSize: 16,
    lineHeight: 20,
  },
  withdraw: {
    position: "absolute",
    bottom: 80,
    right: 24,
    fontSize: 14,
    color: "#999",
  },
});
