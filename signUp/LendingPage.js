import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LongButton from '../component/LongButton';
import { FontAwesome } from '@expo/vector-icons'; // 아이콘 라이브러리
import logo from '../assets/icon/logo/logo.png';
import { Image } from 'react-native';
import EmailInput from './EmailInput';

export default function LendingPage({navigation}) {
    return (

        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logoImage}/>
            </View>

            <View style={styles.bottomContainer}>
                <LongButton onPress={() => navigation.navigate(EmailInput)}>
                <FontAwesome name="envelope" size={20} color="white" style={styles.icon} /> 
                <Text style={styles.text}>이메일로 로그인</Text>
                </LongButton>

                <LongButton onPress={() => navigation.navigate()}>
                <FontAwesome name="user" size={20} color="white" style={styles.icon} />
                <Text style={styles.text}>회원가입</Text> 
                </LongButton>

                <View style={styles.forgotContainer}>
                    <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.forgotText}>이메일/비밀번호를 잊으셨나요?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.policyContainer}>
                    <Text style={styles.polictyText}>이용약관</Text>
                    <Text style={styles.polictyText}>개인정보 처리방침</Text>
                    <Text style={styles.polictyText}>쿠키 정책</Text>
                </View>

                <View style={styles.policyContainer}>
                    <Text style={styles.polictyText}>문의하기</Text>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // 로고와 버튼 사이 간격 조정정
        alignItems: 'center',
        paddingVertical: 30,
    },
    logoContainer: {
        flex: 1, // 로고가 위쪽에 배치되도록 설정
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 'auto', // 자동으로 위로 밀려 올라감
        paddingBottom: 30, // 하단 여백 추가
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
        width: 200,
        height: 200
      },
      forgotContainer: {
        width: '70%', // 전체 너비 차지
        paddingLeft: 20, // 왼쪽 여백 추가
        marginBottom: 16
      }
      ,
      forgotText: {
        color: '#B19ADE', // 연보라
        fontSize: 12,
        textAlign: 'right', // 왼쪽 정렬
      },
      policyContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15, // 항목 간 간격 조정
        marginBottom: 15,
      },
      polictyText: {
        color: '#B3B3B3',
        fontSize: 12,
      }
});