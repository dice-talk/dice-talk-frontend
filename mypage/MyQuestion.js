import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import friendIcon from '../assets/icon/profile/friend_01.png'
import Footer from "../component/Footer";
function Button ({title, onPress}) {
    return (
        <Pressable onPress={onPress}> 
            <View style={styles.button}>
                <Text>{title}</Text>
            </View>
        </Pressable>
    )
}

function MyQuestion ({navigation}) {
    
    return (
        <>
        <View style={styles.container}>
            <View style={styles.backgroundShape}>
                <LinearGradient colors={["#D8B4FE", "#F9A8D4"]} />
                    <View style={styles.profileContainer}>
                        <Image source={friendIcon} style={styles.profileImage}/>
                        <Text style={styles.userName}>새침한 세찌</Text>
                        <View style={styles.separator} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title={"1:1 문의글 작성"} />    
                    </View>
                </View>
            </View>
            <Footer />
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 35,
        backgroundColor: '#F5E1FF',
        borderRadius: 15,
        borderColor: '#B28EF8',
        borderWidth: 2,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        bottom: 35
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
      separator: {
        marginVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#B28EF8',
        width: '80%',
        alignSelf: 'center',
    },
    backgroundShape: {
        flex:1,
        alignContent: 'center',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 340 ,  // 배경 높이 조정
        backgroundColor: '#D8B4FE',
        borderBottomLeftRadius: 200, // 둥근 효과
        borderBottomRightRadius: 200, // 둥근 효과
    },
})

export default MyQuestion;