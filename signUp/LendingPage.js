import { StyleSheet, View, Text} from 'react-native';
import React from 'react';
import LongButton from '../component/LongButton';
import { FontAwesome } from '@expo/vector-icons'; // 아이콘 라이브러리
import logo from '../assets/icon/logo/logo.png';
import { Image } from 'react-native';

export default function LendingPage({navigation}) {
    return (
        <>
        <View style={styles.container}>
            <Image source={logo} style={styles.logoImage}/>
        </View>
        <View style={styles.container}>
            <LongButton onPress={() => navigation.navigate()}>
            <FontAwesome name="envelope" size={20} color="white" style={styles.icon} /> 
            <Text style={styles.text}>이메일로 로그인</Text>
            </LongButton>

            <LongButton onPress={() => navigation.navigate()}>
            <FontAwesome name="user" size={20} color="white" style={styles.icon} />
            <Text style={styles.text}>회원가입</Text> 
            </LongButton>
                
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginRight: 8, // 아이콘과 텍스트 간격
      },
      text: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
      },
      logoImage: {
        width: 100,
        height: 100
      }
});