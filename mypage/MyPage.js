import { Pressable, StyleSheet, View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Footer from "../component/Footer";
import MyPageButton from '../component/MyPageButton'

function MyPage ({navigation}) {
    return (
        <>
        <View style={styles.container}>
                <LinearGradient colors={["#D8B4FE", "#F9A8D4"]} style={styles.backgroundShape}/>
                    <View style={styles.profileContainer}>
                        <Image source={friendIcon} style={styles.profileImage}/>
                        <Text style={styles.userName}>새침한 세찌</Text>
                        <Text style={styles.userStatus}>💬 채팅 참여중</Text>
                        <View style={styles.separator} />
                        <View style={styles.diceInfo}>
                            <Text style={styles.diceLabel}>My Dice 🎲 수</Text>
                            <Text style={styles.diceCount}>0 개</Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <MyPageButton title="나의 정보" onPress={() => navigation.navigate('MyInfo')}/>
                        <MyPageButton title="나의 문의 조회" onPress={() => navigation.navigate('MyQuestion')} />
                        <MyPageButton title="DICE 사용 내역" onPress={() => navigation.navigate('ItemHistory')}/>
                        <MyPageButton title="DICE 충전하기" />
                    </View>
                </View>

            <View style={styles.bottomLine} />
            <View style={styles.logout}>
                <Text>로그아웃</Text>
            </View>
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
    },
    container: {
        flex: 1,
        //backgroundColor: '#fff',
        alignContent: 'center',
        justifyContent: 'center'
      },
      profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
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
        alignItems: 'center',
        justifyContent: 'center',
        gap: 180
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
        backgroundColor: '#D8B4FE',
        borderBottomLeftRadius: 200, // 둥근 효과
        borderBottomRightRadius: 200, // 둥근 효과
    },
    logout: {
        position: 'absolute',
        bottom: 90,
        alignItems: 'center',
        left: 20
    }
})

export default MyPage;


