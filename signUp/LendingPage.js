import { StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native';
import React, { useState } from 'react';
import LongButton from '../component/LongButton';
import { FontAwesome } from '@expo/vector-icons'; // 아이콘 라이브러리
//import EmailInput from './EmailInput';
import LogoIcon from '../assets/icon/logo/logo_icon.svg'; // SVG를 React 컴포넌트처럼 사용
import LogoText from '../assets/icon/logo/logo_diceTalk.svg';
import AlerModal from '../component/AlertModal';



export default function LendingPage({navigation}) {
  const [showModal, setShowModal] = useState(false);

    return (

        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <LogoIcon width={200} height={200} />
                <LogoText width={300} height={300}/>
            </View>

            <Button title='DropOutMember' onPress={() => {navigation.navigate('DropOutMember')}} />

            <Button title='ChatMain' onPress={() => {navigation.navigate('ChatMain')}} />

            <Button title='HeartChat' onPress={() => {navigation.navigate('HeartChat')}}/>

            <Button title='LetterEventScreen' onPress={() => {navigation.navigate('LetterEventScreen')}} />

            <View style={styles.bottomContainer}>
                  <LongButton onPress={() => navigation.navigate('LoginEmail')}>
                  <FontAwesome name="envelope" size={20} color="white" style={styles.icon} /> 
                  <Text style={styles.text}>이메일로 로그인</Text>
                  </LongButton>

                <LongButton onPress={() => navigation.navigate('EmailInput')}>
                <FontAwesome name="user" size={20} color="white" style={styles.icon} />
                <Text style={styles.text}>회원가입</Text> 
                </LongButton>

                <View style={styles.forgotContainer}>
                    <TouchableOpacity onPress={() => {setShowModal(true);}}>
                    <Text style={styles.forgotText}>이메일/비밀번호를 잊으셨나요?</Text>
                    </TouchableOpacity>
                </View>

                {/* 모달 컴포넌트 */}
                <AlerModal
                  visible={showModal}
                  message={`본인 인증이 필요한 서비스입니다.\n계속하시겠습니까?`}
                  onCancel={() => setShowModal(false)}/>

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
        flex: 0.8, // 로고가 위쪽에 배치되도록 설정
        justifyContent: 'flex-end', // 로고와 텍스트를아래로 정렬
        alignItems: 'center',
        marginTop: 40, // 여백을 추가하여 더 아래로 내린다.
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
      // logoImage: {
      //   width: 200,
      //   height: 200
      // },
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