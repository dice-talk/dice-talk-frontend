import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import LongButton from '../component/LongButton';
import { FontAwesome } from '@expo/vector-icons';


export default function IdentityVerification({ navigation }) {
    return (
      <View style={styles.container}>
        {/* 상단 영역 */}
        <View style={styles.topSection}>
          <Text style={styles.title}>
            휴대폰 본인 인증을 통해{'\n'} 안전하게 이용하세요
          </Text>
            <LoginLogo width={300} height={300} />
        </View>
  
        {/* 설명 문구 */}
        <View style={styles.infoSection}>
          <View style={styles.row}>
            <FontAwesome name="check" size={14} color="#777" />
            <Text style={styles.infoText}>
              본인인증을 완료한 만 19세 이상만 가입할 수 있습니다.
            </Text>
          </View>
          <View style={styles.row}>
            <FontAwesome name="check" size={14} color="#777" />
            <Text style={styles.infoText}>
              회원의 나이와 성별을 정확하게 확인하여 악의적인 사용자를 사전에 차단합니다.
            </Text>
          </View>
        </View>
  
        {/* 버튼 */}
        <View style={styles.buttonWrapper}>
            <LongButton onPress={() => navigation.navigate('Agreement')}>
            <Text style={styles.buttonText}>본인인증하기</Text>
            </LongButton>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 24,
      paddingVertical: 40,
      justifyContent: 'space-between',
    },
    topSection: {
      alignItems: 'center',
      marginTop: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 40,
      color: '#000',
      width: '100%',
      lineHeight: 28,
    },
    imageBox: {
      width: 220,
      height: 220,
      borderRadius: 30,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 0,
      marginBottom: 20,
      marginTop: 10,
    },
    infoSection: {
      marginTop: 30,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    infoText: {
      fontSize: 13,
      color: '#777',
      marginLeft: 8,
      flex: 1,
      flexWrap: 'wrap',
    },
    buttonWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40,
    },
    buttonText: {
      textAlign: 'center',
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
      paddingVertical: 14,
    }
  });
  