import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Gps from "../assets/public/gps.svg";

const SelectAge = () => {
  const [selectedAge, setSelectedAge] = useState(null);
  const navigation = useNavigation();

  const handleSelectAge = (age) => {
    setSelectedAge(age);
  };

  const isStartEnabled = selectedAge !== null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>지역</Text>
      <View style={styles.locationRow}>
        <Gps width={16} height={16} />
        <Text style={styles.locationText}>서울시 강남구</Text>
      </View>

      <Text style={styles.subtitle}>나이를 선택해 주세요</Text>
      <Text style={styles.description}>어떤 나이의 사람들과 이야기를 나누고 싶나요?</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.ageButton,
            selectedAge === "20s" && styles.ageButtonSelected,
          ]}
          onPress={() => handleSelectAge("20s")}
        >
          <Text style={styles.ageButtonText}>20대 초반</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.ageButton,
            selectedAge === "random" && styles.ageButtonSelected,
          ]}
          onPress={() => handleSelectAge("random")}
        >
          <Text style={styles.ageButtonText}>랜덤</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.startButton, isStartEnabled && styles.startButtonEnabled]}
        disabled={!isStartEnabled}
        onPress={() => navigation.navigate("hihihi")}
      >
        <Text style={styles.startButtonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  locationRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  locationText: { marginLeft: 8, fontSize: 14 },
  subtitle: { fontSize: 16, fontWeight: "bold", backgroundColor: "#D9A7FF", color: "white", padding: 6, borderRadius: 6, marginBottom: 10 },
  description: { fontSize: 12, marginBottom: 10, borderBottomWidth: 1, borderColor: "#D9A7FF" },
  buttonGroup: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  ageButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 16,
  },
  ageButtonSelected: {
    backgroundColor: "linear-gradient(45deg, #D9A7FF, #9B7BFF)",
  },
  ageButtonText: { color: "white", fontWeight: "bold" },
  startButton: {
    backgroundColor: "#E0E0E0",
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
  },
  startButtonEnabled: {
    backgroundColor: "#D9A7FF",
  },
  startButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SelectAge;
