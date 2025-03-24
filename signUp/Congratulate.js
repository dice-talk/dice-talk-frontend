import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LongButton from '../component/LongButton';

// SVG 불러오기
import BlueYellow from '../assets/fire/BlueYellow.svg';
import OrangeYellow from '../assets/fire/OrangeYellow.svg';
import PuppleBlue from '../assets/fire/PuppleBlue.svg';
import WhitePink from '../assets/fire/WhitePink.svg';
import BlackPink from '../assets/fire/BlackPink.svg';

export default function Coongratulate({ navigation }) {

  // const handleLoginPress = () => {
  //   navigation.navigate('LoginEmail');
  // };

  return (
    <View style={styles.container}>
      {/* 폭죽 SVG 배치 */}
      <BlueYellow width={250} height={250} style={[styles.svg, { top: 0, left: 0 }]} />
      <WhitePink width={100} height={100} style={[styles.svg, { top: 100, right: 20 }]} />
      <PuppleBlue width={120} height={120} style={[styles.svg, { top: 400, left: -30 }]} />
      <OrangeYellow width={250} height={250} style={[styles.svg, { bottom: 200, right: -50 }]} />
      <BlackPink width={100} height={100} style={[styles.svg, { bottom: -20, left: '15%' }]} />

      {/* 메인 텍스트 */}
      <Text style={styles.title}>회원가입에 성공했습니다!</Text>

      {/* 버튼 */}
      <View style={styles.buttonWrapper}>
        <LongButton onPress={() => {navigation.navigate('LoginEmail')}}> 
            <Text style={styles.buttonText}>로그인하러 가기</Text>
        </LongButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  topLeft: {
    top: 10,
    left: 10,
  },
  topRight: {
    top: 40,
    right: 40,
  },
  bottomLeft: {
    bottom: 100,
    left: 10,
  },
  bottomRight: {
    bottom: 70,
    right: 10,
  },
  bottomCenter: {
    bottom: 10,
    left: '40%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 50,
    zIndex: 1,
  },
  buttonWrapper: {
    width: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
