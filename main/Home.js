import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Animated, ScrollView, Text, Image, Pressable, Modal, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import HeartSignalLogo from "../assets/icon/logo/hsDs.svg"

// SVG 테마 컴포넌트
import ExFriendsTheme from "../assets/theme/exFriendsTheme.svg";
import FriendsTheme from "../assets/theme/friendsTheme.svg";
import HeartSignalTheme from "../assets/theme/heartSignalTheme.svg";

const BANNER_HEIGHT = 180;
const THEME_IMAGE_SIZE = 200;
const ITEM_WIDTH = THEME_IMAGE_SIZE;
const SPACING = 20;

export default function Home() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [heartModalVisible, setHeartModalVisible] = useState(false);

  // 배너 이미지들
  const bannerImages = [
    require("../assets/banner/banner_welcome.png"),
    require("../assets/banner/banner_Ex_love.png"),
  ];

  // 테마 카드들
  const themeData = [
    { id: 0, label: "FRIENDS", Component: FriendsTheme },
    { id: 1, label: "HEART SIGNAL", Component: HeartSignalTheme },
    { id: 2, label: "EX LOVE", Component: ExFriendsTheme },
  ];

  return (
    <View style={styles.container}>
      {/* 🔹 배너 섹션 */}
      <View style={styles.bannerContainer}>
        <Image
          source={bannerImages[0]} // 원하는대로 currentIndex 연결 가능
          style={styles.bannerImage}
        />
      </View>

      {/* 🔸 캐러셀 섹션 */}
      <View style={styles.carouselWrapper}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH + SPACING}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: (Dimensions.get("window").width - 200) / 2,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {themeData.map((item, index) => {
            const inputRange = [
              (index - 1) * (ITEM_WIDTH + SPACING),
              index * (ITEM_WIDTH + SPACING),
              (index + 1) * (ITEM_WIDTH + SPACING),
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.8, 1, 0.8],
              extrapolate: "clamp",
            });

            const rotateY = scrollX.interpolate({
              inputRange,
              outputRange: ["30deg", "0deg", "-30deg"],
              extrapolate: "clamp",
            });

            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [30, 0, 30],
              extrapolate: "clamp",
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={item.id}
                style={[
                  styles.card,
                  {
                    transform: [{ perspective: 800 }, { scale }, { rotateY }, { translateY }],
                    opacity,
                  },
                ]}>
                <Pressable
                  onPress={() => {
                    if (item.id === 0) {
                      navigation.navigate("DiceFriendsDs");
                    } else if (item.id === 1) {
                      setHeartModalVisible(true);
                    }
                  }}>
                  <BlurView intensity={opacity.__getValue() < 1 ? 60 : 0} style={styles.blurWrapper}>
                    <item.Component width={THEME_IMAGE_SIZE} height={THEME_IMAGE_SIZE} />
                  </BlurView>
                </Pressable>
                <Text style={styles.label}>{item.label}</Text>
              </Animated.View>
            );
          })}
        </Animated.ScrollView>
      </View>

      {/* Heart Signal Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={heartModalVisible}
        onRequestClose={() => setHeartModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setHeartModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <HeartSignalLogo width={100} height={100} />
            <Text style={styles.modalText}>Join the Heart Signal community!</Text>
            <Pressable style={styles.joinButton} onPress={() => navigation.navigate("SelectRegion")}>
              <Text style={styles.joinButtonText}>참여하기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // 배너 스타일
  bannerContainer: {
    height: BANNER_HEIGHT,
    width: "100%",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  // 캐러셀
  carouselWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 200,
    marginHorizontal: SPACING / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  blurWrapper: {
    borderRadius: 100,
    overflow: "hidden",
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    textAlign: "center",
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalText: {
    marginVertical: 20,
    fontSize: 16,
    textAlign: "center",
  },
  joinButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  joinButtonText: {
    color: "white",
    fontSize: 16,
  },
});
