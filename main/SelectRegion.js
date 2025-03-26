import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import Modal from 'react-native-modal';
import { useNavigation } from "@react-navigation/native";

import Footer from "../component/Footer";
import Gps from "../assets/public/gps.svg";
import Map from "../assets/public/map.svg";

export default function SelectRegion() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const regions = [
    { label: "내 지역\n서울시 강남구", key: 0 },
    { label: "내 위치", key: 1, icon: <Gps width={24} height={24} /> },
    { label: "랜덤", key: 2 },
  ];

  return (
    <View style={styles.container}>

      <View style={styles.content}>
        <Text style={styles.title}>지역을 선택해 주세요</Text>
        <Text style={styles.description}>어떤 지역의 사람들과 이야기 하고 싶나요?</Text>

        <View style={styles.buttonRow}>
          {regions.map(({ label, key, icon }) => (
            <Pressable
              key={key}
              onPress={() => setSelected(key)}
              style={[
                styles.regionButton,
                selected === key && styles.regionButtonActive,
              ]}
            >
              <Text style={[
                styles.regionText,
                selected === key && styles.regionTextActive
              ]}>
                {label}
              </Text>
              {icon && <View style={{ marginTop: 8 }}>{icon}</View>}
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[
            styles.confirmButton,
            selected !== null && styles.confirmButtonActive,
          ]}
          onPress={() => {
            if (selected !== null && selected !== 1) {
              navigation.navigate("SelectAge");
            } else if (selected === 1) {
              setLocationModalVisible(true);
            }
          }}
          disabled={selected === null}
        >
          <Text style={styles.confirmText}>확인</Text>
        </Pressable>
      </View>
      <Modal isVisible={locationModalVisible} onBackdropPress={() => setLocationModalVisible(false)}>
        <View style={{ backgroundColor: "#fff", borderRadius: 16, padding: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            사용자의 위치를 사용하도록 허용하겠습니까?
          </Text>
          <Text style={{ textAlign: "center", color: "#333", marginBottom: 20 }}>
            가까운 동네를 검색하거나 동네 인증을 위해 현재 위치를 확인합니다.
          </Text>
          <Map width={300} height={200} style={{ marginBottom: 20 }} />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
              style={{ backgroundColor: "#D1A2F1", paddingHorizontal: 30, paddingVertical: 10, borderRadius: 10 }}
              onPress={() => {
                setLocationModalVisible(false);
                navigation.navigate("SelectAge");
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>확인</Text>
            </Pressable>
            <Pressable
              style={{ backgroundColor: "#D1A2F1", paddingHorizontal: 30, paddingVertical: 10, borderRadius: 10 }}
              onPress={() => setLocationModalVisible(false)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>취소</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#D1A2F1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    color: "#fff",
  },
  description: {
    marginTop: 30,
    fontSize: 14,
    color: "#999",
    borderBottomWidth: 2,
    borderBottomColor: "#e2bfff",
    paddingBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-around",
    width: "90%",
  },
  regionButton: {
    width: 80,
    height: 80,
    backgroundColor: "#e2e2e2",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  regionButtonActive: {
    backgroundColor: "#D1A2F1",
  },
  regionText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 12,
    lineHeight: 18,
  },
  regionTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  confirmButton: {
    marginTop: 40,
    backgroundColor: "#ccc",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  confirmButtonActive: {
    backgroundColor: "#D1A2F1",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});