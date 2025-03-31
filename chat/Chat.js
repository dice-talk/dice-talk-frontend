import React, { useEffect, useRef, useState } from 'react';
import {
  View, ScrollView, Animated, Dimensions, Keyboard,
  TouchableWithoutFeedback
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
import { subscribeChatRoom } from "../lib/socket";

export default function Chat({ navigation }) {
  const route = useRoute();
  const roomId = route.params?.roomId;

  const [myNickname, setMyNickname] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const scrollViewRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(Dimensions.get("window").width)).current;

  const {
    currentRoomMessages,
    setCurrentRoomMessages,
    sendMessage,
    joinRoom,
    leaveRoom,
  } = useChat();

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
        const myIdStr = await AsyncStorage.getItem("memberId");
        const myId = Number(myIdStr);
  
        if (msg.memberId && msg.memberId === myId) {
          console.log("🙅‍♂️ 내 메시지 echo, 무시함");
          return;
        }
  
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
{currentRoomMessages.map((msg, index) => {
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
})}

</ScrollView>

        <ChatInput onSendMessage={sendMessage} />

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
            onEventPress={() => console.log("이벤트")}
            onExitPress={() => console.log("나가기")}
            onReportPress={() => navigation.navigate("ChatReport")}
            navigation={navigation}
          />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}