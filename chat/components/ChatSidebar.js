import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SidebarBack from "../../assets/icon/logo/love_sidebar_back.svg";
import HeartArrow from "../../assets/event/heart_arrow.svg";
import Exit from "../../assets/icon/chat/exit.svg";
import Bell from "../../assets/icon/chat/bell.svg";
import Siren from "../../assets/icon/chat/siren.svg";
import Love_01 from "../../assets/icon/profile/love_01.svg";
import Love_02 from "../../assets/icon/profile/love_02.svg";
import Love_03 from "../../assets/icon/profile/love_03.svg";
import Love_04 from "../../assets/icon/profile/love_04.svg";
import Love_05 from "../../assets/icon/profile/love_05.svg";
import Love_06 from "../../assets/icon/profile/love_06.svg";

export default function ChatSidebar({ 
  onClose, 
  onEventPress, 
  onExitPress, 
  onReportPress,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 사이드바 내용 */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Pressable onPress={onClose} style={styles.backButton}>
            <SidebarBack width={28} height={28} />
          </Pressable>
        </View>
        {/* 상단 이벤트 이미지 */}
        <Pressable onPress={onEventPress} style={styles.eventBanner}>
          <HeartArrow width="100%" height="100%" />
        </Pressable>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            다음 이벤트까지: 12:23:43
          </Text>
        </View>
        <View style={styles.divider} />
        {/* 대화상대 목록 */}
        <Text style={styles.sectionTitle}>대화상대</Text>

        <ScrollView style={styles.userList}>
          {[
            { name: "두 얼굴의 매력 두리", Icon: Love_02 },
            { name: "한가로운 하나", Icon: Love_01 },
            { name: "세침한 세찌", Icon: Love_03 },
            { name: "네모지만 부드러운 네몽", Icon: Love_04 },
            { name: "단호한데 다정한 다오", Icon: Love_05 },
            { name: "육감적인 직감파 육댕", Icon: Love_06 },
          ].map((item, idx) => (
            <View key={idx} style={styles.userItem}>
              <View style={styles.profileWrapper}>
                <item.Icon width={24} height={24} />
              </View>
              <Text style={styles.userName}>{item.name}</Text>
            </View>
          ))}
          <View style={{ marginTop: 16 }}>
            {/* 개발 중인 화면이므로 임시로 주석 처리 */}
            {/* <Button
              title="러브레터 이벤트로 이동"
              onPress={() => navigation.navigate('LetterEventScreen')}
              color="#A45C73"
            /> */}
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Pressable onPress={onExitPress}><Exit width={28} height={28} /></Pressable>
        <View style={styles.footerButtons}>
          <Bell width={28} height={28} />
          <Pressable onPress={onReportPress}>
            <Siren width={28} height={28} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  backButton: {
    padding: 10,
  },
  eventBanner: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative"
  },
  timerContainer: {
    backgroundColor: "#EAD1EB",
    marginTop: 6,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "100%",
  },
  timerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#7A4F67"
  },
  divider: {
    height: 1,
    backgroundColor: "#D8A6C1",
    marginTop: 16
  },
  sectionTitle: {
    marginVertical: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#111"
  },
  userList: {
    flex: 1,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileWrapper: {
    borderWidth: 1,
    borderColor: "#D8A6C1",
    borderRadius: 24,
    padding: 4,
    marginRight: 12,
  },
  userName: {
    fontSize: 13,
    color: "#A45C73"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#D8A6C1",
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  footerButtons: {
    flexDirection: "row",
    gap: 20,
  },
});