import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated, Easing } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connectSocket, disconnectSocket } from "../lib/socket";
import { useNavigation } from "@react-navigation/native";
import { requestNickname } from "../utils/http/nicknameUtils";
import { BASE_URL } from "../utils/http/config";
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import Logo from'../assets/icon/logo/logo_icon.svg';

export default function hihihi() {
  const navigation = useNavigation();
  const [participants, setParticipants] = useState([]);
  const [joined, setJoined] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const textColorAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('[🔄 useEffect 실행]');
    
    const callback = async (type, payload) => {
      console.log('[👀 콜백 실행]', type, payload);
      if (type === "QUEUE_STATUS") {
        console.log('[📋 참가자 목록]', payload.participants);
        console.log('[💬 상태 메시지]', payload.message);
        if (Array.isArray(payload.participants)) {
          setParticipants(payload.participants);
        } else {
          console.error('[❌ 참가자 목록이 배열이 아님]', payload.participants);
          setParticipants([]);
        }
        setStatusMessage(payload.message || "매칭 대기 중...");
      } else if (type === "MATCHED") {
        console.log("[✅ 매칭 성공]", payload);
        try {
          await AsyncStorage.setItem("lastRoomId", String(payload.chatRoomId));
          console.log("[🏠 채팅방 이동 시도]", payload.chatRoomId);
          navigation.navigate("ChatTab", {
            screen: "Chat",
            params: { roomId: payload.chatRoomId },
          });
        } catch (error) {
          console.error("[❌ 채팅방 이동 실패]", error);
          alert("채팅방 입장에 실패했습니다. 다시 시도해주세요.");
        }
      }
    };

    // 애니메이션 시작
    Animated.parallel([
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(textColorAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(textColorAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ])
      ),
    ]).start();

    console.log('[🔌 소켓 연결 시도]');
    connectSocket(callback);

    return () => {
      console.log('[🔌 소켓 연결 해제]');
      disconnectSocket();
    };
  }, [navigation]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const textColor = textColorAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#F9A8D4', '#8B5CF6', '#60A5FA'],
  });

  const handleJoin = async () => {
    try {
      console.log('[🚪 입장 시도]');
      const memberIdStr = await AsyncStorage.getItem("memberId");
      if (!memberIdStr) {
        console.error('[❌ 사용자 ID가 없음]');
        alert("사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
        return;
      }

      const memberId = Number(memberIdStr);
      console.log('[👤 사용자 ID]', memberId);

      try {
        const nickname = await requestNickname(memberId);
        console.log('[🏷 닉네임 할당 성공]', nickname);
        await AsyncStorage.setItem("nickname", nickname);
      } catch (error) {
        console.error('[❌ 닉네임 할당 실패]', error.message);
        if (error.message.includes('토큰')) {
          alert("로그인이 필요합니다. 다시 로그인해주세요.");
        } else {
          alert("닉네임 할당에 실패했습니다: " + error.message);
        }
        return;
      }
        
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        console.error('[❌ 토큰 없음]');
        alert("로그인이 필요합니다. 다시 로그인해주세요.");
        return;
      }
      console.log("[🔑 토큰]", "토큰 있음");
      
      const res = await fetch(BASE_URL + "matching/join", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`[❌ 입장 실패] Status: ${res.status}, Error: ${errorText}`);
        throw new Error(`입장 실패 (${res.status}): ${errorText}`);
      }
      
      const data = await res.json();
      console.log("[✅ 입장 성공]", data);
      setJoined(true);
    } catch (error) {
      console.error("[❌ 입장 실패]", error.message);
      alert(error.message || "입장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: '#8B5CF6', marginTop: -50 }]}>대기실</Text>
      
      <View style={styles.circleContainer}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Svg height="280" width="280" viewBox="0 0 280 280">
            <Defs>
              <SvgGradient id='grad' x1='0' y1='0' x2='1' y2='1'>
                <Stop offset='0' stopColor='#8B5CF6' stopOpacity='1' />
                <Stop offset='1' stopColor='#EC4899' stopOpacity='1' />
              </SvgGradient>
            </Defs>
            <Circle
              cx='140'
              cy='140'
              r='130'
              stroke='url(#grad)'
              strokeWidth='10'
              strokeLinecap='round'
              fill='none'
            />
          </Svg>
        </Animated.View>
        <View style={styles.logoContainer}>
          <Logo width={180} height={180} />
        </View>
      </View>

      {!joined ? (
        <TouchableOpacity 
          style={styles.joinButton}
          onPress={handleJoin}
        >
          <LinearGradient
            colors={['#C4B5FD', '#A78BFA']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>입장하기</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <>
          <Animated.Text style={[styles.message, { color: textColor }]}>
            ✨ 누군가 마음을 열 준비를 하고 있어요
          </Animated.Text>
          <Animated.Text style={[styles.statusMessage, { color: textColor }]}>
            {statusMessage}
          </Animated.Text>
          <View style={styles.participantsContainer}>
            <Text style={styles.participantsTitle}>참가자 목록</Text>
            <ScrollView style={styles.scroll}>
              {(participants || []).map((name, idx) => (
                <Animated.Text key={idx} style={[styles.participant, { color: textColor }]}>
                  {name}
                </Animated.Text>
              ))}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  circleContainer: {
    position: 'relative',
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: '600',
  },
  statusMessage: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
  },
  participantsContainer: {
    width: '100%',
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  participantsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
    marginBottom: 10,
    textAlign: 'center',
  },
  joinButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  scroll: {
    maxHeight: 150,
  },
  participant: {
    fontSize: 16,
    paddingVertical: 8,
    textAlign: 'center',
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
});