import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Animated, Dimensions, Keyboard, TouchableWithoutFeedback } from "react-native";

import LoveBack from "../assets/icon/logo/love_back.svg";
import LoveSideBar from "../assets/icon/logo/love_sidebar_nonClick.svg";
import Love_01 from "../assets/icon/profile/love_01.svg";
import Love_02 from "../assets/icon/profile/love_02.svg";
import Love_03 from "../assets/icon/profile/love_03.svg";
import Love_04 from "../assets/icon/profile/love_04.svg";
import Love_05 from "../assets/icon/profile/love_05.svg";
import Love_06 from "../assets/icon/profile/love_06.svg";
import HeartArrow from "../assets/event/heart_arrow.svg";
import SidebarBack from "../assets/icon/logo/love_sidebar_back.svg";
import Siren from "../assets/icon/chat/siren.svg";
import Exit from "../assets/icon/chat/exit.svg";
import Bell from "../assets/icon/chat/bell.svg";
import ChatPost from "../assets/icon/chat/chatPost.svg"
import ArrowBoard01 from "../assets/event/arrowBoard_01.svg";
import ArrowBoard02 from "../assets/event/arrowBoard_02.svg";
import FriendsGame_01 from "../assets/icon/profile/friends_game_01";
import FriendsGame_02 from "../assets/icon/profile/friends_game_02";
import FriendsGame_03 from "../assets/icon/profile/friends_game_03";
import FriendsGame_05 from "../assets/icon/profile/friends_game_05";
import LoveGameSelect_01 from "../assets/icon/profile/love_game_select_01";
import LoveGameSelect_02 from "../assets/icon/profile/love_game_select_02";
import LoveGameSelect_03 from "../assets/icon/profile/love_game_select_03";
import LoveGameSelect_05 from "../assets/icon/profile/love_game_select_05";
import ArrowBoard03 from "../assets/event/arrowBoard_03"
import Love01 from "../assets/icon/profile/love_01.svg";
import Love02 from "../assets/icon/profile/love_02.svg";
import Love03 from "../assets/icon/profile/love_03.svg";
import Love04 from "../assets/icon/profile/love_04.svg";
import Love05 from "../assets/icon/profile/love_05.svg";
import Love06 from "../assets/icon/profile/love_06.svg";
import Signal from "../assets/event/signal.svg";
import ResultModal from "../component/ResultModal";


export default function Chat({ navigation }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [eventConfirmed, setEventConfirmed] = useState(false);
  const [selectedGameIcon, setSelectedGameIcon] = useState(null);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [thirdModalVisible, setThirdModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(Dimensions.get("window").width)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: sidebarVisible ? Dimensions.get("window").width * 0 : Dimensions.get("window").width,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [sidebarVisible]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* 상단 바 */}
        <View style={styles.topBar}>
          <LoveBack width={28} height={28} />
          <Text style={styles.title}>하트시그널</Text>
          <Pressable onPress={() => setSidebarVisible(!sidebarVisible)}>
            <LoveSideBar width={28} height={28} />
          </Pressable>
        </View>

      {/* 채팅 영역 */}
      <ScrollView style={styles.chatArea} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* 상대방 메시지 */}
        <View style={styles.leftMessageBlock}>
          <Love_01 width={36} height={36} />
          <View>
            <Text style={styles.userName}>한가로운 하나</Text>
            <View style={styles.leftBubble}>
              <Text style={styles.messageText}>
                안녕하세요! 한가로운 하나에요 앞으로{"\n"}2일간 잘 부탁드려요
              </Text>
            </View>
            <Text style={styles.timeTextLeft}>오후 6:57</Text>
          </View>
        </View>

        {/* 내 메시지 */}
        <View style={styles.rightMessageBlock}>
          <View style={styles.userRowRight}>
            <Text style={styles.userName}>네모지만 부드러운 네몽</Text>
            <Love_04 width={36} height={36} />
          </View>
          <View style={styles.rightBubble}>
            <Text style={styles.messageText}>안녕하세요 네몽이에요</Text>
          </View>
          <Text style={styles.timeTextRight}>오후 6:57</Text>
        </View>

        {/* 상대방 메시지 2 */}
        <View style={styles.leftMessageBlock}>
          <Love_01 width={36} height={36} />
          <View>
            <Text style={styles.userName}>한가로운 하나</Text>
            <View style={styles.leftBubble}>
              <Text style={styles.messageText}>
                다들 어제 개봉한 펩시 vs 콜라 영화 보셨나요?{"\n"}
                정말 재밌어서 추천드려요
              </Text>
            </View>
            <Text style={styles.timeTextLeft}>오후 6:58</Text>
          </View>
        </View>

        {/* 내 메시지 2 */}
        <View style={styles.rightMessageBlock}>
          <View style={styles.userRowRight}>
            <Text style={styles.userName}>네모지만 부드러운 네몽</Text>
            <Love_04 width={36} height={36} />
          </View>
          <View style={styles.rightBubble}>
            <Text style={styles.messageText}>
              오! 저도 어제 봤는데 사람이 많더라구요{"\n"}저는 펩시파에요{"\n"}다오님은요?
            </Text>
          </View>
          <Text style={styles.timeTextRight}>오후 6:59</Text>
        </View>
      </ScrollView>

      {/* 하단 입력창 */}
      <View style={[styles.inputWrapper, { flexDirection: 'row', alignItems: 'center' }]}>
        <TextInput
          style={[styles.input, { flex: inputFocused ? 1 : 1 }]}
          placeholder="메시지 입력"
          placeholderTextColor="#DEB6C2"
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        {inputFocused && (
          <Pressable onPress={() => {}} style={{ marginLeft: 8 }}>
            <ChatPost width={28} height={28} />
          </Pressable>
        )}
      </View>

      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: Dimensions.get("window").width * 0.8,
          backgroundColor: "#fff",
          transform: [{ translateX: slideAnim }],
          shadowColor: "#000",
          shadowOffset: { width: -2, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
          zIndex: 10,
        }}
      >
        {/* 사이드바 콘텐츠 여기에 삽입 */}
        <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Pressable onPress={() => setSidebarVisible(false)} style={{ padding: 10 }}>
              <SidebarBack width={28} height={28} />
            </Pressable>
          </View>
          {/* 상단 이벤트 이미지 */}
          <Pressable onPress={() => setEventModalVisible(true)} style={{ width: "100%", height: 180, borderRadius: 10, overflow: "hidden", position: "relative" }}>
            <HeartArrow width="100%" height="100%" />
          </Pressable>
          <View
              style={{
                  backgroundColor: "#EAD1EB",
                  marginTop: 6,
                  borderRadius: 6,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  width: "100%",
              }}
          >
              <Text style={{ textAlign: "center", fontSize: 12, color: "#7A4F67" }}>
                  다음 이벤트까지: 12:23:43
              </Text>
          </View>
          <View style={{ height: 1, backgroundColor: "#D8A6C1", marginTop: 16 }} />
          {/* 대화상대 목록 */}
          <Text style={{ marginVertical: 12, fontSize: 14, fontWeight: "600", color: "#111" }}>대화상대</Text>

          <ScrollView style={{ flex: 1 }}>
              {[
              { name: "두 얼굴의 매력 두리", Icon: Love_02 },
              { name: "한가로운 하나", Icon: Love_01 },
              { name: "세침한 세찌", Icon: Love_03 },
              { name: "네모지만 부드러운 네몽", Icon: Love_04 },
              { name: "단호한데 다정한 다오", Icon: Love_05 },
              { name: "육감적인 직감파 육댕", Icon: Love_06 },
              ].map((item, idx) => (
              <View
                  key={idx}
                  style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 16,
                  }}
              >
                  <View
                  style={{
                      borderWidth: 1,
                      borderColor: "#D8A6C1",
                      borderRadius: 24,
                      padding: 4,
                      marginRight: 12,
                  }}
                  >
                  <item.Icon width={24} height={24} />
                  </View>
                  <Text style={{ fontSize: 13, color: "#A45C73" }}>{item.name}</Text>
              </View>
              ))}
          </ScrollView>
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopWidth: 1,
          borderTopColor: "#D8A6C1",
          paddingHorizontal: 30,
          paddingVertical: 12,
        }}>
          <Pressable onPress={() => setExitModalVisible(true)}><Exit width={28} height={28} /></Pressable>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Bell width={28} height={28} />
            <Pressable onPress={() => navigation.navigate("ChatReport")}>
              <Siren width={28} height={28} />
            </Pressable>
          </View>
        </View>
      </Animated.View>

      {eventModalVisible && (
        <Pressable style={styles.overlay} onPress={() => setEventModalVisible(false)}>
            <View style={{ alignItems: "center" }}>
            {/* ArrowBoard01을 배경으로 사용하는 영역 */}
            <View style={{ width: 520, height: 400, position: 'relative' }}>
                {eventConfirmed ? (
                  <>
                    <ArrowBoard02 width={520} height={400} />

                  </>
                ) : (
                  <ArrowBoard01 width={520} height={400} />
                )}

                {/* 닫기 버튼 */}
                <Pressable onPress={() => setEventModalVisible(false)} style={{ position: 'absolute', top: 8, right: 10, zIndex: 1 }}>
                <Text style={{ color: "white", fontSize: 16 }}>X</Text>
                </Pressable>

                {/* 안내 텍스트 */}
                <View style={{ position: 'absolute', top: 135, left: 0, right: 0, alignItems: 'center', zIndex: 1 }}>
                <Text style={{ fontSize: 12, color: '#F8B4C4' }}>
                    {eventConfirmed ? "선택의 결과를 확인해주세요" : "좀 더 대화하고 싶은 상대를 선택해주세요"}
                </Text>
                </View>

                {!eventConfirmed && (
                  <>
                    {/* 주사위 아이콘 3개 */}
                    <View style={{ position: 'absolute', top: 180, left: 20, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 28, zIndex: 1 }}>
                    {[1, 2, 3].map(num => {
                        const isSelected = selectedGameIcon === num;
                        const Icon = isSelected
                        ? num === 1 ? LoveGameSelect_01
                        : num === 2 ? LoveGameSelect_02
                        : LoveGameSelect_05
                        : num === 1 ? FriendsGame_01
                        : num === 2 ? FriendsGame_02
                        : FriendsGame_05;

                        const name = num === 1 ? "한가로운 하나" : num === 2 ? "세침한 세찌" : "단호한데 다정한 다오";

                        return (
                        <Pressable key={num} onPress={() => setSelectedGameIcon(num)} style={{ alignItems: 'center', marginLeft: num === 2 ? 20 : 10 }}>
                            <Icon width={40} height={40} />
                            <Text style={{ marginTop: 4, fontSize: 10, color: '#fff' }}>{name}</Text>
                        </Pressable>
                        );
                    })}
                    </View>

                    {/* 남은 횟수 */}
                    <Text style={{ position: 'absolute', bottom: 12, alignSelf: 'center', fontSize: 11, color: "#fff", zIndex: 1 }}>
                    남은 수정 횟수 1회
                    </Text>
                  </>
                )}
            </View>

            {/* 확인 버튼은 보드 아래 위치 */}
            <Pressable
                style={[
                styles.confirmButton,
                { backgroundColor: selectedGameIcon ? "#F8B4C4" : "gray", marginTop: 16 }
                ]}
                disabled={!selectedGameIcon}
                onPress={() => {
                    setEventModalVisible(false);
                    setSelectedGameIcon(null);
                    setTimeout(() => setResultModalVisible(true), 300);
                }}
            >
                <Text style={styles.confirmText}>확인</Text>
            </Pressable>
            </View>
        </Pressable>
        )}

      {exitModalVisible && (
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center", zIndex: 20 }}>
          <View style={{ width: 280, backgroundColor: "white", borderRadius: 16, paddingVertical: 32, paddingHorizontal: 24, alignItems: "center" }}>
            <Text style={{ textAlign: "center", color: "#7A4F67", fontSize: 16, lineHeight: 28 }}>
              하루에 최대 2번 채팅방을{"\n"}나갈 수 있습니다.{"\n\n"}나가시겠습니까?
            </Text>
            <View style={{ flexDirection: "row", gap: 20, marginTop: 28 }}>
              <Pressable onPress={() => setExitModalVisible(false)} style={{ backgroundColor: "#E4E1EA", borderRadius: 24, paddingVertical: 10, paddingHorizontal: 24 }}>
                <Text style={{ color: "#fff" }}>취소</Text>
              </Pressable>
              <Pressable onPress={() => {}} style={{ backgroundColor: "#D6B4E6", borderRadius: 24, paddingVertical: 10, paddingHorizontal: 24 }}>
                <Text style={{ color: "#fff" }}>확인</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

{thirdModalVisible && (
  <Pressable style={styles.overlay} onPress={() => setThirdModalVisible(false)}>
    <View style={{ alignItems: "center" }}>
      <View style={{ width: 520, height: 400, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
        <ArrowBoard01 width={520} height={400} />

        <Pressable onPress={() => setThirdModalVisible(false)} style={{ position: 'absolute', top: 8, right: 10, zIndex: 1 }}>
          <Text style={{ color: "white", fontSize: 16 }}>X</Text>
        </Pressable>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, position: 'absolute', top: 170, zIndex: 1 }}>
          <Love01 width={50} height={50} />
          <Signal width={150} height={90} />
          <Love02 width={50} height={50} />
        </View>

        <Text style={{ position: 'absolute', top: 135, fontSize: 14, color: "#fff", zIndex: 1 }}>
          시그널이 연결되었어요!
        </Text>
      </View>
      <Pressable
        style={[
          styles.confirmButton,
          { backgroundColor: "#F8B4C4", marginTop: 16 }
        ]}
        onPress={() => setThirdModalVisible(false)}
      >
        <Text style={styles.confirmText}>확인</Text>
      </Pressable>
    </View>
  </Pressable>
)}
      
      <ResultModal
  visible={resultModalVisible}
  onClose={() => setResultModalVisible(false)}
  text="선택의 결과를 확인해주세요"
  SvgComponent={ArrowBoard02}
  onConfirm={() => {
    setResultModalVisible(false);
    setTimeout(() => setThirdModalVisible(true), 300);
  }}
/>

{resultModalVisible && (
        <Pressable style={styles.overlay} onPress={() => setResultModalVisible(false)}>
          <View style={{ alignItems: "center" }}>
            <View style={{ width: 420, height: 300, position: 'relative' }}>
              <ArrowBoard02 width={420} height={300} />
              <Text style={{ position: 'absolute', top: 148, left: 0, right: 0, textAlign: 'center', fontSize: 18, color: '#F8B4C4', zIndex: 1 }}>
                선택의 결과를 확인해주세요
              </Text>
              <Pressable onPress={() => setResultModalVisible(false)} style={{ position: 'absolute', top: 8, right: 10, zIndex: 1 }}>
                <Text style={{ color: "white", fontSize: 16 }}>X</Text>
              </Pressable>
            </View>
            <Pressable
              style={[
                styles.confirmButton,
                { backgroundColor: "#F8B4C4", marginTop: 16 }
              ]}
              onPress={() => {
                  setResultModalVisible(false);
                  setTimeout(() => setThirdModalVisible(true), 300);
              }}
            >
              <Text style={styles.confirmText}>확인</Text>
            </Pressable>
          </View>
        </Pressable>
      )}
      </View>
    </TouchableWithoutFeedback>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    height: 60,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    color: "#A45C73",
    fontWeight: "600",
  },
  chatArea: {
    flex: 1,
    padding: 16,
  },
  leftMessageBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 8,
  },
  rightMessageBlock: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  userRowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
    justifyContent: "flex-end",
  },
  userName: {
    fontSize: 12,
    color: "#A45C73",
  },
  leftBubble: {
    backgroundColor: "#E7D0EB",
    padding: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  rightBubble: {
    backgroundColor: "#F8CDD6",
    padding: 12,
    borderRadius: 12,
    alignSelf: "flex-end",
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 14,
    color: "#fff",
  },
  timeTextLeft: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
    marginLeft: 44,
  },
  timeTextRight: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
    alignSelf: "flex-end",
    marginRight: 4,
  },
  timeText: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
    textAlign: "right",
  },
  inputWrapper: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#F3CEDD",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  eventModal: {
    width: 320,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  attemptInfo: {
    marginTop: 16,
    fontSize: 12,
    color: '#333',
  },
  confirmButton: {
    marginTop: 20,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
  },
});