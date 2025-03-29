import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LongButton from "../component/LongButton";

export default function DropOutMember({ navigation }) {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const reasons = [
    "원하는 서비스가 아니에요.",
    "자주 이용하지 않아요.",
    "앱 사용 과정이 불편해요.",
    "광고성 알림이 너무 많아요.",
    "이용 가격이 높아요.",
    "기타",
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior= "height"
      keyboardVerticalOffset={150}
    >
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{flex: 1, justifyContent: "space-between"}}>
            <View style={styles.container}>
                <LinearGradient colors={["#D7C0FA", "#F8B4F1"]} style={styles.header}>
                        <Text style={styles.headerTitle}>탈퇴하기</Text>
                </LinearGradient>

          <View style={styles.content}>
            <Text style={styles.title}>탈퇴 하시는 이유를 알려주세요.</Text>

            <View style={styles.reasonContainer}>
              {reasons.map((reason, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => setSelectedReason(reason)}
                >
                  <View style={styles.radioCircle}>
                    {selectedReason === reason && <View style={styles.selectedDot} />}
                  </View>
                  <Text style={styles.optionText}>{reason}</Text>
                </TouchableOpacity>
              ))}

                <TextInput
                style={styles.input}
                placeholder="기타 사유를 입력해주세요."
                multiline
                value={otherReason}
                onChangeText={setOtherReason}
                />

                    <View style={styles.buttonWrapper}>
                      <LongButton onPress={() => navigation.navigate("CheckDropOutMember")}>
                        <Text style={styles.buttonText}>확인</Text>
                      </LongButton>
                    </View>
                </View>
            </View>
        </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    header: {
      paddingTop: 60,
      paddingBottom: 20,
      alignItems: "center",
    },
    headerTitle: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
    },
    content: {
      padding: 20,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 20,
    },
    reasonContainer: {
      marginBottom: 20,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    radioCircle: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#A178DF",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    selectedDot: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: "#A178DF",
    },
    optionText: {
      fontSize: 14,
    },
    input: {
      height: 100,
      borderColor: "#ccc",
      borderWidth: 1,
      padding: 10,
      textAlignVertical: "top",
      borderRadius: 8,
    },
    buttonWrapper: {
      paddingHorizontal: 20,
      paddingBottom: 30,
      alignItems: 'center'
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
  });