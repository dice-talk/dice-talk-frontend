import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connectSocket, disconnectSocket } from "../lib/socket";
import { useNavigation } from "@react-navigation/native";
import { requestNickname } from "../utils/http/nicknameUtils"; // 유틸 함수 추가했다고 가정
import { BASE_URL } from "../utils/http/config";
export default function hihihi() {
  const navigation = useNavigation();
  const [participants, setParticipants] = useState([]);
  const [joined, setJoined] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  
  useEffect(() => {
    console.log('[🔄 useEffect 실행]');
    
    const callback = async (type, payload) => {
      console.log('[👀 콜백 실행]', type, payload);
      if (type === "QUEUE_STATUS") {
        setStatusMessage(payload.message);
        setParticipants(payload.participants || []);
      } else if (type === "MATCHED") {
        
        console.log("[✅ 채팅방 이동]", payload.chatRoomId);
        // ✅ 방 ID 저장
        await AsyncStorage.setItem("lastRoomId", String(payload.chatRoomId));

        navigation.navigate("ChatTab", {
          screen: "Chat",
          params: { roomId: payload.chatRoomId },
        });
      }
    };

    console.log('[🔌 소켓 연결 시도]');
    connectSocket(callback);

    return () => {
      console.log('[🔌 소켓 연결 해제]');
      disconnectSocket();
    };
  }, [navigation]);

  const handleJoin = async () => {
    try {
        const memberIdStr = await AsyncStorage.getItem("memberId");
        const memberId = Number(memberIdStr);

        // ⭐ 1. 먼저 닉네임 요청 (중복 방지를 위해 서버에서 할당)
        const nickname = await requestNickname(memberId);
        if (!nickname) {
          alert("닉네임 할당에 실패했습니다.");
          return;
        }
        await AsyncStorage.setItem("nickname", nickname); // 3번 저장
        
      const token = await AsyncStorage.getItem("accessToken");
      console.log("token : ", token)
      const res = await fetch(BASE_URL + "matching/join", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("[응답]", data);
      setJoined(true);
    } catch (error) {
      console.error("입장 실패:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>대기실</Text>
      {!joined ? (
        <Button title="입장하기" onPress={handleJoin} />
      ) : (
        <Text style={styles.joined}>입장 완료! 매칭을 기다리는 중...</Text>
      )}
      <Text style={styles.status}>{statusMessage}</Text>
      <ScrollView style={styles.scroll}>
        {participants.map((name, idx) => (
          <Text key={idx} style={styles.participant}>{name}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
  joined: { marginVertical: 10, color: "green" },
  status: { fontSize: 16, marginVertical: 10 },
  scroll: { width: "100%", marginTop: 20 },
  participant: {
    fontSize: 18,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
  },
});