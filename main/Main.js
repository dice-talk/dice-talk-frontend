import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated, PanResponder, Text, Image } from "react-native";
import { BlurView } from "expo-blur";

// SVG 테마 컴포넌트
import ExFriendsTheme from "../assets/theme/exFriendsTheme.svg";
import FriendsTheme from "../assets/theme/friendsTheme.svg";
import HeartSignalTheme from "../assets/theme/heartSignalTheme.svg";

const { width } = Dimensions.get("window");
const BANNER_HEIGHT = 180;
const THEME_IMAGE_SIZE = 200; // 2/3 크기로 조정 (300 → 200)
const ITEM_WIDTH = THEME_IMAGE_SIZE * 0.7;
const SPACING = -ITEM_WIDTH * 0.3;

export default function Main() {
  // 배너 이미지
  const bannerImages = [
    require("../assets/banner/banner_welcome.png"),
    require("../assets/banner/banner_Ex_love.png"),
  ];

  // 테마 데이터 (요구사항 순서 유지)
  const themeData = [
    { id: 1, Component: FriendsTheme },
    { id: 2, Component: HeartSignalTheme },
    { id: 3, Component: ExFriendsTheme },
  ];

  // 애니메이션 값
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 캐러셀 전환 함수
  const goToNext = () => handleSwipe(1);
  const goToPrev = () => handleSwipe(-1);


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        scrollX.setValue(-gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          goToPrev();
        } else if (gestureState.dx < -50) {
          goToNext();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  // 스와이프 처리
  const handleSwipe = (direction) => {
    const newIndex = (currentIndex + direction + themeData.length) % themeData.length;
    Animated.spring(scrollX, {
      toValue: direction * ITEM_WIDTH,
      useNativeDriver: true,
    }).start(() => {
      scrollX.setValue(0);
      setCurrentIndex(newIndex);
    });
  };

  // 위치 리셋
  const resetPosition = () => {
    Animated.spring(scrollX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  // 아이템 위치 계산
  const getItemStyle = (index) => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [ITEM_WIDTH * 0.3, 0, -ITEM_WIDTH * 0.3],
      extrapolate: "clamp",
    });

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8], // 더 부드러운 스케일 조정
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6], // 더 부드러운 투명도 전환
      extrapolate: "clamp",
    });

    return {
      transform: [{ translateX }, { scale }],
      opacity,
      zIndex: index === currentIndex ? 3 : index < currentIndex ? 1 : 2,
    };
  };

  return (
    <View style={styles.container}>
      {/* 배너 섹션 */}
      <View style={styles.bannerContainer}>
        <Image
          source={bannerImages[currentIndex % bannerImages.length]}
          style={styles.bannerImage}
        />
      </View>

      {/* 캐러셀 섹션 */}
      <View 
        style={styles.carouselContainer} 
        {...panResponder.panHandlers}
      >
        {themeData.map((item, index) => {
          const isActive = index === currentIndex;
          const itemStyle = getItemStyle(index);

          return (
            <Animated.View
              key={item.id}
              style={[
                styles.themeItem,
                itemStyle,
                { marginHorizontal: SPACING },
              ]}
            >
              {isActive ? (
                <item.Component 
                  width={THEME_IMAGE_SIZE} 
                  height={THEME_IMAGE_SIZE} 
                />
              ) : (
                <BlurView intensity={60} style={styles.blurWrapper}>
                  <item.Component
                    width={THEME_IMAGE_SIZE * 0.9}
                    height={THEME_IMAGE_SIZE * 0.9}
                  />
                </BlurView>
              )}
            </Animated.View>
          );
        })}
      </View>

      {/* 인디케이터 및 네비게이션 버튼 */}
      <View style={styles.controlsContainer}>
        <View style={styles.navButton} onTouchStart={goToPrev}>
          <Text style={styles.navText}>〈</Text>
        </View>
        
        <View style={styles.indicatorContainer}>
          {themeData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentIndex && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
        
        <View style={styles.navButton} onTouchStart={goToNext}>
          <Text style={styles.navText}>〉</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bannerContainer: {
    height: BANNER_HEIGHT,
    width: "100%",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  carouselContainer: {
    flexDirection: "row",
    height: THEME_IMAGE_SIZE + 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: (width - ITEM_WIDTH) / 2,
    marginVertical: 20,
  },
  themeItem: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  blurWrapper: {
    borderRadius: THEME_IMAGE_SIZE / 2,
    overflow: "hidden",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#000",
    width: 16,
  },
  navButton: {
    padding: 10,
  },
  navText: {
    fontSize: 24,
    color: "#000",
  },
});