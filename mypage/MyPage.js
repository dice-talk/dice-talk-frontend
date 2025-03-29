import React from 'react';
import { Pressable, StyleSheet, View, Text, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Friends_03 from "../assets/icon/profile/friends_03.svg";
import Footer from "../component/Footer";
import MyPageButton from '../component/MyPageButton'
import Vector from "../assets/icon/logo/Vector.svg"
import MyInfo from "../assets/public/myInfo.svg"
import MyQuestion from "../assets/public/myQuestion.svg"
import DicePayment from "../assets/public/dicePayment.svg"
import DiceHistory from "../assets/public/diceHistory.svg"
import Plus from "../assets/public/plus.svg"
import Logout from "../assets/public/logout.svg"
import MyDice from "./MyDice";
import ChargeDice from "./ChargeDice";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../utils/http/AuthContext';
import { logout } from '../utils/http/EmailAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPage = () => {
    const navigation = useNavigation();
    const { setAuth } = useAuth();

    return (
        <>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'white', zIndex: -1 }} />
        <View style={styles.container}>
            <LinearGradient colors={["#D7C0FA", "#F8B4F1"]} style={styles.backgroundShape}/>
                <View style={styles.profileContainer}>
                    <Friends_03 width={90} height={90} />
                    <Text style={styles.userName}>새침한 세찌</Text>
                    <Text style={styles.userStatus}>💬 채팅 참여중</Text>
                    <View style={styles.separator} />
                    <View style={styles.diceInfo}>
                        <View style={styles.diceLeft}>
                            <Text style={styles.dice}>My Dice</Text>
                            <Vector width={20} height={20} />
                            <Text style={styles.dice}>수</Text>
                        </View>
                        <View style={styles.diceRight}>
                            <Text style={styles.dice}>0</Text>
                            <Text style={styles.dice}>개</Text>
                            <Plus />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <MyPageButton title="나의 정보" onPress={() => navigation.navigate('MyInfo')} Icon={MyInfo}/>
                    <MyPageButton title="나의 문의 조회" onPress={() => navigation.navigate('MyQuestion')} Icon={MyQuestion}/>
                    <MyPageButton title="DICE 사용 내역" onPress={() => navigation.navigate('MyDice')} Icon={DiceHistory}/>
                    <MyPageButton title="DICE 충전하기" onPress={() => navigation.navigate('ChargeDice')} Icon={DicePayment}/>
                    
                    <Pressable 
                        style={styles.logout}
                        onPress={async () => {
                            try {
                                const token = await AsyncStorage.getItem("accessToken");
                                await logout(token);
                                setAuth(null);
                                navigation.reset({
                                    index: 0,
                                    routes: [
                                        {
                                            name: 'Auth',
                                            state: {
                                                routes: [
                                                    {
                                                        name: 'LendingPage'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                });
                            } catch (error) {
                                console.error('로그아웃 실패:', error);
                                Alert.alert('로그아웃 실패', '로그아웃 처리 중 오류가 발생했습니다.');
                            }
                        }}
                    >
                        <Logout />
                        <Text style={{color: '#715E7C', fontSize: 12}}>로그아웃</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.bottomLine} />
            <Footer />
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 140,
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: '#D8B4FE',
        borderWidth: 2,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
      },
      profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
      },
      profileContainer: {
        width: '100%',
        height: 230,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginTop: 45
      },
      diceInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between', // 좌우 양 끝 정렬
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
      },
    separator: {
        marginVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#B28EF8',
        width: '80%',
        alignSelf: 'center',
    },
    bottomLine: {
        position: 'absolute',
        bottom: '15%',
        borderBottomWidth: 1,
        borderBottomColor: '#B28EF8',
        width: '90%',
        alignSelf: 'center'
    },
    backgroundShape: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 340 ,  // 배경 높이 조정
        borderBottomLeftRadius: 160, // 둥근 효과
        borderBottomRightRadius: 160, // 둥근 효과
    },
    logout: {
        position: 'absolute',
        bottom: 90,
        alignItems: 'center',
        left: 20,
        flexDirection: 'row',
        gap: 7,
        padding: 10,  // 터치 영역 확장
    },
    userName: {
        fontSize: 20,
        color: '#715E7C'
    },
    userStatus: {
        color: '#715E7C'
    },
    dice: {
        fontSize: 15,
        color: '#715E7C'
    },
    diceLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    diceRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: 'auto', // 오른쪽 정렬
    },
})

export default MyPage;
