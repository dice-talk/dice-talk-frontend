import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated, ScrollView, Text, Image, Pressable, Modal, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import DiceFriendsDs from "./DiceFriendsDs";
import HeartSignalDs from "./HeartSignalDs";
import ExFriendsDs from "./ExFriendsDs";
import { Button } from "react-native";
import { useChat } from "../context/ChatContext";

import { useNavigation, useRoute } from "@react-navigation/native";
import HeartSignalLogo from "../assets/icon/logo/hsDs.svg"
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  const route = useRoute();
  const [heartModalVisible, setHeartModalVisible] = useState(false);
  const [storedToken, setStoredToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const { setIsConnected } = useChat();

  useEffect(() => {
    const connectAfterLogin = async () => {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        connectSocket((type, payload) => {
          if (type === "CHAT") {
            const convertedMessage = {
              id: payload.chatId,
              content: payload.message,
              sender: payload.nickName,
              timestamp: payload.createdAt,
            };
            setCurrentRoomMessages(payload.chatRoomId, (prev) => [...prev, convertedMessage]);
          }
        });
        setIsConnected(true);
      }
    };

    connectAfterLogin();
  }, []);

  useEffect(() => {
    // 로그인 정보가 전달되었는지 확인
    if (route.params?.token) {
      console.log('로그인 토큰 확인:', route.params.token);
    }
    
    // AsyncStorage에서 토큰과 사용자 정보 확인
    const checkStoredData = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const userData = await AsyncStorage.getItem('user_info');
        
        if (token) {
          setStoredToken(token);
          console.log('AsyncStorage에 저장된 토큰 확인:', token);
        } else {
          console.log('AsyncStorage에 저장된 토큰이 없습니다.');
        }
        
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setUserInfo(parsedUserData);
          console.log('AsyncStorage에 저장된 사용자 정보:', parsedUserData);
        } else {
          console.log('AsyncStorage에 저장된 사용자 정보가 없습니다.');
        }
      } catch (error) {
        console.error('저장된 데이터 확인 중 오류 발생:', error);
      }
    };
    
    checkStoredData();
  }, [route.params]);

  // CHATMAIN 이동 핸들러
  const handleChatMainPress = () => {
    // 저장된 토큰이 있으면 함께 전달
    const params = { 
      token: storedToken,
      user: userInfo
    };
    
    // ChatTab 네비게이션으로 이동하고, 그 안에서 ChatMain 화면으로 바로 이동
    navigation.navigate('ChatTab', { 
      screen: 'ChatMain',
      params: params
    });
  };

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

      <Button title='LetterEventScreen' onPress={() => {navigation.navigate('LetterEventScreen')}} />
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
                      navigation.navigate("SelectRegion");
                    } else if (item.id === 1) {
                      setHeartModalVisible(true);
                    } else if (item.id === 2) {
                      navigation.navigate("SelectRegion");
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
  // CHATMAIN 버튼 스타일
  chatButtonContainer: {
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  chatMainButton: {
    backgroundColor: '#9c4fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  chatMainButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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







// import React, { useRef, useState } from "react";
// import { View, StyleSheet, Dimensions, Animated, ScrollView, Text, Image, Pressable } from "react-native";
// import { BlurView } from "expo-blur";
// import { useNavigation } from "@react-navigation/native";
// import DiceFriendsDs from "./DiceFriendsDs";
// import HeartSignalDs from "./HeartSignalDs";
// import ExFriendsDs from "./ExFriendsDs";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // SVG 테마 컴포넌트
// import ExFriendsTheme from "../assets/theme/exFriendsTheme.svg";
// import FriendsTheme from "../assets/theme/friendsTheme.svg";
// import HeartSignalTheme from "../assets/theme/heartSignalTheme.svg";
// import Footer from "../component/Footer"

// const BANNER_HEIGHT = 180;
// const THEME_IMAGE_SIZE = 200;
// const ITEM_WIDTH = THEME_IMAGE_SIZE;
// const SPACING = 20;

// export default function Home() {
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [heartModalVisible, setHeartModalVisible] = useState(false);
//   const [diceFriendsVisible, setDiceFriendsVisible] = useState(false);
//   const [exModalVisible, setExModalVisible] = useState(false);

//   useEffect(() => {
//     // 로그인 정보가 전달되었는지 확인
//     if (route.params?.token) {
//       console.log('로그인 토큰 확인:', route.params.token);
//     }
    
//     // AsyncStorage에서 토큰과 사용자 정보 확인
//     const checkStoredData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('access_token');
//         const userData = await AsyncStorage.getItem('user_info');
        
//         if (token) {
//           setStoredToken(token);
//           console.log('AsyncStorage에 저장된 토큰 확인:', token);
//         } else {
//           console.log('AsyncStorage에 저장된 토큰이 없습니다.');
//         }
        
//         if (userData) {
//           const parsedUserData = JSON.parse(userData);
//           setUserInfo(parsedUserData);
//           console.log('AsyncStorage에 저장된 사용자 정보:', parsedUserData);
//         } else {
//           console.log('AsyncStorage에 저장된 사용자 정보가 없습니다.');
//         }
//       } catch (error) {
//         console.error('저장된 데이터 확인 중 오류 발생:', error);
//       }
//     };
    
//     checkStoredData();
//   }, [route.params]);
  
//   const handleDiceFriendsParticipate = () => {
//     setDiceFriendsVisible(false);
//     navigation.navigate("SelectRegion");
//   };

//   const handleHeartSignalParticipate = () => {
//     setHeartModalVisible(false);
//     navigation.navigate("SelectRegion");
//   };

//   const handleExFriendsParticipate = () => {
//     setExModalVisible(false);
//     navigation.navigate("SelectRegion");
//   };

//   // 배너 이미지들
//   const bannerImages = [
//     require("../assets/banner/banner_welcome.png"),
//     require("../assets/banner/banner_Ex_love.png"),
//   ];

//   // 테마 카드들
//   const themeData = [
//     { id: 0, label: "FRIENDS", Component: FriendsTheme },
//     { id: 1, label: "HEART SIGNAL", Component: HeartSignalTheme },
//     { id: 2, label: "EX LOVE", Component: ExFriendsTheme },
//   ];

//   return (
//     <View style={styles.container}>
//       {/* 🔹 배너 섹션 */}
//       <View style={styles.bannerContainer}>
//         <Image
//           source={bannerImages[0]}
//           style={styles.bannerImage}
//         />
//       </View>

//       {/* 🔸 캐러셀 섹션 */}
//       <View style={styles.carouselWrapper}>
//         <Animated.ScrollView
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           snapToInterval={ITEM_WIDTH + SPACING}
//           decelerationRate="fast"
//           contentContainerStyle={{
//             paddingHorizontal: (Dimensions.get("window").width - 200) / 2,
//           }}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//             { useNativeDriver: true }
//           )}
//           scrollEventThrottle={16}
//         >
//           {themeData.map((item, index) => {
//             const inputRange = [
//               (index - 1) * (ITEM_WIDTH + SPACING),
//               index * (ITEM_WIDTH + SPACING),
//               (index + 1) * (ITEM_WIDTH + SPACING),
//             ];

//             const scale = scrollX.interpolate({
//               inputRange,
//               outputRange: [0.8, 1, 0.8],
//               extrapolate: "clamp",
//             });

//             const rotateY = scrollX.interpolate({
//               inputRange,
//               outputRange: ["30deg", "0deg", "-30deg"],
//               extrapolate: "clamp",
//             });

//             const translateY = scrollX.interpolate({
//               inputRange,
//               outputRange: [30, 0, 30],
//               extrapolate: "clamp",
//             });

//             const opacity = scrollX.interpolate({
//               inputRange,
//               outputRange: [0.3, 1, 0.3],
//               extrapolate: "clamp",
//             });

//             return (
//               <Animated.View
//                 key={item.id}
//                 style={[
//                   styles.card,
//                   {
//                     transform: [{ perspective: 800 }, { scale }, { rotateY }, { translateY }],
//                     opacity,
//                   },
//                 ]}>
//                 <Pressable
//                   onPress={() => {
//                     if (item.id === 0) {
//                       setDiceFriendsVisible(true);
//                     } else if (item.id === 1) {
//                       setHeartModalVisible(true);
//                     } else if (item.id === 2) {
//                       setExModalVisible(true);
//                     }
//                   }}>
//                   <BlurView intensity={opacity.__getValue() < 1 ? 60 : 0} style={styles.blurWrapper}>
//                     <item.Component width={THEME_IMAGE_SIZE} height={THEME_IMAGE_SIZE} />
//                   </BlurView>
//                 </Pressable>
//                 <Text style={styles.label}>{item.label}</Text>
//               </Animated.View>
//             );
//           })}
//         </Animated.ScrollView>
//       </View>

//       {/* DiceFriends Modal */}
//       <DiceFriendsDs
//         visible={diceFriendsVisible}
//         onClose={() => setDiceFriendsVisible(false)}
//         onParticipate={handleDiceFriendsParticipate}
//       />

//       {/* HeartSignal Modal */}
//       <HeartSignalDs
//         visible={heartModalVisible}
//         onClose={() => setHeartModalVisible(false)}
//         onParticipate={handleHeartSignalParticipate}
//       />

//       <ExFriendsDs
//         visible={exModalVisible}
//         onClose={() => setExModalVisible(false)}
//         onParticipate={handleExFriendsParticipate}
//       />

//       <Footer />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   // 배너 스타일
//   bannerContainer: {
//     height: BANNER_HEIGHT,
//     width: "100%",
//     position: "relative",
//   },
//   bannerImage: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   // 캐러셀
//   carouselWrapper: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   card: {
//     width: 200,
//     marginHorizontal: SPACING / 2,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   blurWrapper: {
//     borderRadius: 100,
//     overflow: "hidden",
//   },
//   label: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#555",
//     textAlign: "center",
//   },
// });
