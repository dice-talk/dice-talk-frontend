import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";

// SVG 테마 컴포넌트
import ExFriendsTheme from "../assets/theme/exFriendsTheme.svg";
import FriendsTheme from "../assets/theme/friendsTheme.svg";
import HeartSignalTheme from "../assets/theme/heartSignalTheme.svg";

const { width } = Dimensions.get("window");
const BANNER_HEIGHT = 180;
const THEME_IMAGE_SIZE = 200;
const ITEM_WIDTH = THEME_IMAGE_SIZE;
const SPACING = 20;

export default function Main() {
  const scrollX = useRef(new Animated.Value(0)).current;

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
        {/* 텍스트 오버레이
        <View style={styles.bannerOverlay}>
          <Text style={styles.welcomeText}>WELCOME</Text>
          <Text style={styles.benefitText}>BENEFIT</Text>
          <Text style={styles.dateText}>2025.03.01 ~ 2025.04.01</Text>
          <View style={styles.pageIndicator}>
            <Text style={styles.pageText}>1 / {bannerImages.length}</Text>
          </View>
        </View> */}
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
            paddingHorizontal: (width - ITEM_WIDTH) / 2,
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
                ]}
              >
                <BlurView intensity={opacity.__getValue() < 1 ? 60 : 0} style={styles.blurWrapper}>
                  <item.Component width={THEME_IMAGE_SIZE} height={THEME_IMAGE_SIZE} />
                </BlurView>
                <Text style={styles.label}>{item.label}</Text>
              </Animated.View>
            );
          })}
        </Animated.ScrollView>
      </View>
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
  bannerOverlay: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#C66DD2",
  },
  benefitText: {
    fontSize: 20,
    color: "#6F95DD",
    marginTop: -5,
  },
  dateText: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  pageIndicator: {
    position: "absolute",
    bottom: -10,
    right: -20,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  pageText: {
    fontSize: 12,
    color: "#555",
  },

  // 캐러셀
  carouselWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: ITEM_WIDTH,
    marginHorizontal: SPACING / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  blurWrapper: {
    borderRadius: THEME_IMAGE_SIZE / 2,
    overflow: "hidden",
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    textAlign: "center",
  },
});
