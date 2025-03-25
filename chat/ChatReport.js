import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

// 프로필 아이콘
import Love_01 from "../assets/icon/profile/love_01.svg";
import Love_04 from "../assets/icon/profile/love_04.svg";

// 체크 아이콘
import RedCircle from "../assets/icon/chat/red_circle.svg";  // 테두리만 있는 원
import RedCheck from "../assets/icon/chat/red_check.svg";    // 체크표시 원

export default function ChatReport() {
  const navigation = useNavigation();
  const [selectedIds, setSelectedIds] = useState([]);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const messages = [
    {
      id: 1,
      sender: "한가로운 하나",
      icon: Love_01,
      type: "left",
      text: "안녕하세요! 한가로운 하나에요 앞으로\n2일간 잘 부탁드려요",
      time: "오후 6:57"
    },
    {
      id: 2,
      sender: "네모지만 부드러운 네몽",
      icon: Love_04,
      type: "right",
      text: "안녕하세요 네몽이에요",
      time: "오후 6:57"
    },
    {
      id: 3,
      sender: "한가로운 하나",
      icon: Love_01,
      type: "left",
      text: "다들 어제 개봉한 펩시 vs 콜라 영화 보셨나요?\n정말 재밌어서 추천드려요",
      time: "오후 6:58"
    },
    {
      id: 4,
      sender: "네모지만 부드러운 네몽",
      icon: Love_04,
      type: "right",
      text: "오! 저도 어제 봤는데 사람이 많더라구요\n저는 펩시파에요\n다오님은요?",
      time: "오후 6:59"
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatArea} contentContainerStyle={{ paddingBottom: 120 }}>
        {messages.map(msg => (
          <View key={msg.id} style={msg.type === "left" ? styles.leftMessageBlock : styles.rightMessageBlock}>
            {msg.type === "left" && (
              <>
                <Pressable onPress={() => toggleSelect(msg.id)} style={styles.checkWrapper}>
                  {selectedIds.includes(msg.id)
                    ? <RedCheck width={20} height={20} />
                    : <RedCircle width={20} height={20} />
                  }
                </Pressable>
                <msg.icon width={36} height={36} />
              </>
            )}
            <View>
              {msg.type === "right" ? (
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                  <Text style={styles.userName}>{msg.sender}</Text>
                  <msg.icon width={36} height={36} />
                </View>
              ) : (
                <Text style={styles.userName}>{msg.sender}</Text>
              )}
              <View style={msg.type === "left" ? styles.leftBubble : styles.rightBubble}>
                <Text style={styles.messageText}>{msg.text}</Text>
              </View>
              <Text style={msg.type === "left" ? styles.timeTextLeft : styles.timeTextRight}>{msg.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <Pressable
        style={[styles.confirmButton, { backgroundColor: selectedIds.length > 0 ? "#D75C44" : "gray" }]}
        disabled={selectedIds.length === 0}
        onPress={() => setShowReasonModal(true)}
      >
        <Text style={styles.confirmText}>확인</Text>
      </Pressable>

      {showReasonModal && (
        <Pressable style={styles.reasonModalWrapper} onPress={() => setShowReasonModal(false)}>
          <Pressable style={styles.reasonModal} onPress={(e) => e.stopPropagation()}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Pressable onPress={() => setShowReasonModal(false)}>
                <Text style={{ fontSize: 18, color: "#999" }}>X</Text>
              </Pressable>
            </View>
            <Text style={{ fontSize: 16, fontWeight: "600", textAlign: "center", marginBottom: 12 }}>신고하기</Text>
            <Text style={{ fontSize: 13, fontWeight: "500", marginBottom: 8 }}>신고 사유를 선택해주세요</Text>
            <Text style={{ fontSize: 11, color: "#999", marginBottom: 12 }}>
              신고 접수 시 신고자의 정보(휴대전화번호, 이메일)는 신고이력이 남지 않도록 암호화 되어 보호되며, 신고 시점으로부터 1년간 보관 후 삭제됩니다.
            </Text>

            <ScrollView style={{ maxHeight: 260 }}>
              {[
                "스팸 · 유사투자자문 등",
                "음란 · 성적 행위",
                "아동 · 청소년 대상 성범죄",
                "욕설 · 폭력 · 혐오",
                "불법 상품 · 서비스",
                "개인정보 무단 수집 · 유포",
                "비정상적인 서비스 이용",
                "자살 · 자해",
                "사기 · 사칭",
                "명예훼손 · 저작권 등 권리침해"
              ].map((reason, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => {
                    setSelectedReasons(prev =>
                      prev.includes(reason)
                        ? prev.filter(r => r !== reason)
                        : [...prev, reason]
                    );
                  }}
                  style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
                >
                  {selectedReasons.includes(reason)
                    ? <RedCheck width={20} height={20} />
                    : <RedCircle width={20} height={20} />}
                  <Text style={{ marginLeft: 8, fontSize: 14 }}>{reason}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <Pressable
              style={{
                backgroundColor: selectedReasons.length > 0 ? "#D75C44" : "gray",
                borderRadius: 20,
                paddingVertical: 10,
                marginTop: 16,
                alignItems: "center"
              }}
              disabled={selectedReasons.length === 0}
              onPress={() => {
                setShowReasonModal(false);
                navigation.navigate("Chat");
              }}
            >
              <Text style={{ color: "white", fontSize: 15 }}>확인</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  chatArea: { flex: 1, padding: 16 },

  leftMessageBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 16
  },
  rightMessageBlock: {
    alignItems: "flex-end",
    marginBottom: 16
  },
  userName: {
    fontSize: 12,
    color: "#A45C73"
  },
  leftBubble: {
    backgroundColor: "#E7D0EB",
    padding: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
    maxWidth: "80%"
  },
  rightBubble: {
    backgroundColor: "#F8CDD6",
    padding: 12,
    borderRadius: 12,
    alignSelf: "flex-end",
    maxWidth: "80%"
  },
  messageText: {
    fontSize: 14,
    color: "#fff"
  },
  timeTextLeft: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
    marginLeft: 44
  },
  timeTextRight: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
    alignSelf: "flex-end",
    marginRight: 4
  },
  checkWrapper: {
    marginTop: 4
  },
  confirmButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center"
  },
  confirmText: {
    color: "white",
    fontSize: 16
  },
  reasonModalWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  reasonModal: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "88%",
    padding: 20,
    paddingBottom: 16,
  },
});