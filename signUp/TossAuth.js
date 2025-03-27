import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, Alert, SafeAreaView, AppState } from "react-native";
import * as Linking from "expo-linking";
import * as Crypto from 'expo-crypto';
import uuid from 'react-native-uuid';

const BACKEND_URL = "http://172.30.1.86:8080"; // 이건 추후 로컬 주소로 수정 필요

export default function TossAuth({ navigation }) {
  const [txId, setTxId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingUrl, setPendingUrl] = useState(null);
  const appState = useRef(AppState.currentState);

  // ✅ Toss 인증 요청
  useEffect(() => {
    const requestToss = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/auth/request`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        console.log("✅ 인증 요청 응답:", data);
        setTxId(data.txId);

        const appUriRes = await fetch(
          `https://cert.toss.im/api-client/v1/transactions/${data.txId}`
        );
        const appUriData = await appUriRes.json();

        if (appUriData.resultType === "SUCCESS") {
          const tossUri = appUriData.success.appUri.ios;
          await Linking.openURL(tossUri); // Toss 앱 실행
        } else {
          throw new Error(appUriData.error?.reason || "Toss 인증 오류");
        }
      } catch (err) {
        console.error("❌ Toss 인증 요청 실패:", err);
        Alert.alert("오류", "Toss 인증 요청 또는 실행에 실패했습니다.");
      } finally {
        console.log("✅ Toss 인증 요청 성공");
        setLoading(false);
      }
    };

    requestToss();
  }, []);

  // ✅ 세션키 생성
  const createSessionKey = async () => {
    const randomBytes = await Crypto.getRandomBytesAsync(32);
    const base64Key = Buffer.from(randomBytes).toString("base64");
    const uuidKey = uuid.v4();
    return `v1$${uuidKey}$${base64Key}`;
  };

  // ✅ 사용자 정보 조회
const fetchUserInfo = async () => {
  try {
    setLoading(true);
    console.log("✅ 사용자 정보 조회 시작");

    const res = await fetch(`${BACKEND_URL}/auth/cert?txId=${txId}`, {
      method: "POST",
    });

    const data = await res.json();
    console.log("✅ 사용자 정보:", data);
    navigation.navigate("SignupInput", { userInfo: data });

  } catch (err) {
    console.error("❌ 사용자 정보 요청 실패:", err);
    Alert.alert("오류", "인증 정보 확인에 실패했습니다.");
  } finally {
    setLoading(false);
  }
};


  // ✅ 앱 복귀 감지 + 딥링크 확인
  useEffect(() => {
    const handleAppStateChange = async (nextState) => {
      if (appState.current.match(/inactive|background/) && nextState === "active") {
        console.log("📱 앱 복귀 감지됨");
        const url = await Linking.getInitialURL();
        if (url) {
          console.log("🔗 복귀 URL:", url);
          setPendingUrl(url); // 바로 처리하지 않고 저장
        }
      }
      appState.current = nextState;
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => subscription.remove();
  }, []);

  // ✅ txId와 복귀 URL이 모두 준비됐을 때 실행
  useEffect(() => {
    const tryProcess = async () => {
      console.log("✅ txId와 복귀 URL이 모두 준비됐을 때 실행" + txId + pendingUrl);
      if (!txId || !pendingUrl) return;

      if (txId) {
        console.log("🚀 Toss 인증 성공 처리 시작");
        await fetchUserInfo();
      } else if (!txId) {
        Alert.alert("인증 실패", "다시 시도해주세요.");
      }

      setPendingUrl(null); // 중복 방지
    };

    tryProcess();
  }, [txId, pendingUrl]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading && <ActivityIndicator size="large" />}
    </SafeAreaView>
  );
}
