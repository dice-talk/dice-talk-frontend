import React, { useState, useEffect } from "react";
import { View, Button, Text, Alert, ActivityIndicator } from 'react-native';
import axios from "axios";
import * as Linking from 'expo-linking';
import { WebView } from 'react-native-webview';

export default function TossAuth({navigation}) {
    const [authUrl, setAuthUrl] = useState(null);
    const [txId, setTxId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // 인증 시작작
    const startTossAuth = async () => {
        try {
            setIsLoading(true);
            // axios 요청을 넣자!
            // 우선 Postman Mock 서버에서 URL과 txId 받기
            const response = await axios.get('https://d9af1729-a9df-4b6f-b45e-546afba8096f.mock.pstmn.io/toss/auth-url');
            const { authUrl, txId } = response.data;

            if(!authUrl || !txId) {
                throw new Error('필수 데이터 누락');
            }

            setAuthUrl(authUrl);
            setTxId(txId) // txId 저장
        } catch (error) {
            console.error('인증 URL 가져오기 실패:', error);
            Alert.alert('오류 발생', '인증을 시작할 수 없습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // 딥링크 콜백 처리 딥링크 감지지
    useEffect(() => {
        const handleDeepLink = (event) => {
            const url = event.url;
            console.log('딥링크 수신', url);

            if (url.includes('auth/complete')) {
                setAuthUrl(null); // WebView 닫기기
                checkTossResult(); // 인증 결과 확인
            }
        };

        const subscription = Linking.addEventListener('url', handleDeepLink);

        return () => subscription.remove();
    },[]); // 딥링크는 최초 마운트 시에만 설정

    //인증 결과 확인
    const checkTossResult = async () => {
        try {
            const res = await axios.post('https://yourserver.com/api/toss/check', {txId}); //실제 서버 및 Postman 주소로 변경하자자
            const result = res.data;

            if (result.status === 'COMPPLETED') {
                Alert.alert('인증 성공!, 회원가입을 계속진행합니다.');
                navigation.navigate('SignupContnue'); // 다음 스크린
            } else {
                Alert.alert('인증실패', '다시 시도해주세요.');
            }
        } catch (err) {
            console.error('결과 확인 오류:', err);
            Alert.alert('결과 확인 실패', '서버와 통신에 문제가 있어요.');
        }
    };

    return (
        <View style={{flex: 1}}>
            {isLoading && <ActivityIndicator size="large" />}
            {!authUrl && (
                <Button 
                title="토스 본인 인증 시작" 
                onPress={startTossAuth} 
                disabled={isLoading}
                />
            )}
            {authUrl && (
                <WebView 
                    source={{uri: authUrl}}
                    originWhitelist={['*']}
                    javaScriptEnabled
                    onNavigationStateChange={(navState) => {
                        if (navState.url.includes('auth/complete')) {
                            console.log('WebView 내 인증 완료 감지');
                            Linking.openURL(navState.url); // 딥링크 실행
                        }
                    }}
                />
            )}
        </View>
    );
}

// authUrl 토스가 준 인증 창 URL
// txId 인증 요청 고유 번호(이걸로 결과 조회)
// 딥링크 인증 완료 시 앱으로 돌아오게 해주는 앱스킴
// WebView authUrl 열어서 인증 수행
// axios.post('/check', { txId }) 인증 상태 조회

// const startTossAuth = async () => {
//     try {
//         setLoading(true);
//         // axios 요청을 넣자!
//         // const res = await axios.post('https://yourserver.com/api/toss/start');
//         // const { authUrl, txId } = res.data.success;

//         setAuthUrl(authUrl);
//         setTxId(txId);
//         setLoading(false);
//     } catch (e) {
//         Alert.alert('인증 시작 실패', '잠시 후 다시 시도해주세요');
//         setLoading(false);
//     }
// };