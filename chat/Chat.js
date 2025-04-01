import React, { useEffect, useRef, useState } from 'react';
import {
  View, ScrollView, Animated, Dimensions, Keyboard,
  TouchableWithoutFeedback, Text
} from 'react-native';
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Love_01 from "../assets/icon/profile/love_01.svg";
import Love_04 from "../assets/icon/profile/love_04.svg";

import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import ChatSidebar from "./components/ChatSidebar";
import ChatHeader from "./components/ChatHeader";

import { useChat } from "../context/ChatContext";
import { subscribeChatRoom, sendMessage as socketSendMessage } from "../lib/socket";
import { useEvent } from "../context/EventContext"; // 이벤트 상태관리를 위해 필요

import ArrowCountdownTimer from "../arrowEvent/components/ArrowCountdownTimer";
import ArrowEventModal from "../arrowEvent/components/ArrowEventModal";
import ArrowSignalModal from "../arrowEvent/components/ArrowSignalModal";

export default function Chat({ navigation }) {
  const route = useRoute();
  const roomId = route.params?.roomId;

  const [showArrowEventModal, setShowArrowEventModal] = useState(false);
  const [showArrowSignalModal, setShowArrowSignalModal] = useState(false);
  const { eventState, setEventState, checkEventResult } = useEvent();

  const [myNickname, setMyNickname] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const scrollViewRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(Dimensions.get("window").width)).current;

  const {
    currentRoomMessages,
    setCurrentRoomMessages,
    joinRoom,
    leaveRoom,
  } = useChat();

  // // 채팅방 생성 시간 기준으로 이벤트 타이머 표시
  // useEffect(() => {
  //   if(!roomId) return;
  //   // 채팅방 정보 가져오기
  //   const fetchChatRoom = async () => {
  //     try {
  //       const response = await fetchWithAuth(`chat-room/${chat-room-id}`);
  //       const data = await response.json();
  //       const creationTime = new Date(data.createdAt);

  //       fetchChatRoomInfo();
  //     } catch (error) {
  //       console.error("채팅방 정보 가져오기 실패:", error);
  //     }
  //   };
  //   fetchChatRoom();
  // }, [roomId]);

  // 내 닉네임 불러오기
  useEffect(() => {
    const fetchNickname = async () => {
      const storedNickname = await AsyncStorage.getItem("nickname");
      console.log("✅ 불러온 nickname:", storedNickname);
      setMyNickname(storedNickname || "익명");
    };
    fetchNickname();
  }, []);

  // 채팅방 입장 및 메시지 구독
  useEffect(() => {
    if (!roomId || !myNickname) return;
  
    joinRoom(roomId);
  
    subscribeChatRoom(roomId, async (type, msg) => {
      if (type === "CHAT") {
        const convertedMsg = {
          id: msg.chatId,
          content: msg.message,
          sender: msg.nickName,
          timestamp: msg.createdAt,
        };
  
        setCurrentRoomMessages(roomId, (prev) => [...prev, convertedMsg]);
        console.log("📥 [렌더링용 메시지]", convertedMsg);
      }
    });
  
    return () => leaveRoom();
  }, [roomId, myNickname]);

  // 사이드바 애니메이션
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: sidebarVisible ? 0 : Dimensions.get("window").width,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [sidebarVisible]);

  // 메시지 변경 확인
  useEffect(() => {
    console.log("📢 Chat 컴포넌트에서 감지된 메시지 변화!");
    console.log(currentRoomMessages);
  }, [currentRoomMessages]);

  // 이벤트 결과 자동 체크
  useEffect(() => {
    if (!roomId) return;

    const checkResult = async () => {
      await checkEventResult(roomId);
      if (eventState.stage === 'REVIEW') {
        setShowArrowSignalModal(true);
      }
    };

    const interval = setInterval(checkResult, 60000); // 1분마다 체크
    return () => clearInterval(interval);
  }, [roomId]);

  // 이벤트 버튼 핸들러
  const handleEventPress = () => {
    setShowArrowEventModal(true);
    setSidebarVisible(false);
  };

  // 시그널 모달 확인 버튼 핸들러
  const handleSignalConfirm = () => {
    setShowArrowSignalModal(false);
    leaveRoom();
    navigation.goBack();
  };

  // 결과 확인 핸들러
  const handleCheckResult = async () => {
    if (!roomId) return;
    await checkEventResult(roomId);
    setShowArrowSignalModal(true);
    setSidebarVisible(false);
  };

  // 메시지 전송 함수
  const handleSendMessage = async (content) => {
    if (!roomId || !myNickname) return;

    try {
      const message = {
        chatRoomId: roomId,
        message: content,
        memberId: await AsyncStorage.getItem("memberId"),
        nickName: myNickname
      };

      // 웹소켓으로 메시지 전송
      socketSendMessage(`/pub/chat/${roomId}/sendMessage`, message);

      // 로컬 메시지 상태 업데이트
      const newMessage = {
        id: Date.now(), // 임시 ID
        content: content,
        sender: myNickname,
        timestamp: new Date().toISOString()
      };

      setCurrentRoomMessages(roomId, (prev) => [...prev, newMessage]);
    } catch (error) {
      console.error('메시지 전송 오류:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ChatHeader
          title="하트시그널"
          onBack={() => navigation.goBack()}
          onToggleSidebar={() => setSidebarVisible(!sidebarVisible)}
        />

        <ScrollView
          style={{ flex: 1, padding: 16 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {currentRoomMessages && currentRoomMessages.length > 0 ? (
            currentRoomMessages.map((msg, index) => {
              const isMine = msg.sender?.trim() === myNickname?.trim();

              return (
                <ChatMessage
                  key={`${msg.id}-${index}`}
                  message={msg.content}
                  sender={msg.sender}
                  type={isMine ? "right" : "left"}
                  icon={isMine ? Love_04 : Love_01}
                  time={new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              );
            })
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#666' }}>아직 메시지가 없습니다.</Text>
            </View>
          )}
        </ScrollView>

        <ChatInput onSendMessage={handleSendMessage} />

        <Animated.View
          style={[{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: Dimensions.get("window").width * 0.8,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: { width: -2, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
            zIndex: 10,
          }, { transform: [{ translateX: slideAnim }] }]}
        >
          <ChatSidebar
            onClose={() => setSidebarVisible(false)}
            onEventPress={handleEventPress}
            onExitPress={() => console.log("나가기")}
            onReportPress={() => navigation.navigate("ChatReport")}
            onCheckResultPress={handleCheckResult}
            navigation={navigation}
          />
        </Animated.View>

        <ArrowCountdownTimer />

        {/* 이벤트 모달 */}
        <ArrowEventModal
          visible={showArrowEventModal}
          onClose={() => setShowArrowEventModal(false)}
          chatRoomId={roomId}
          participants={eventState?.participants || []}
          onConfirm={() => {
            setShowArrowEventModal(false);
            setShowArrowSignalModal(true);
          }}
        />

        {/* 시그널 모달 */}
        <ArrowSignalModal
          visible={showArrowSignalModal}
          onClose={() => setShowArrowSignalModal(false)}
          chatRoomId={roomId}
          matchResult={eventState.matchResult}
          onConfirm={handleSignalConfirm}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}