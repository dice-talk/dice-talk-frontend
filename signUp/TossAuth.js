import React, { useState, useEffect } from "react";
import { View, Button, Text, Alert, ActivityIndicator } from 'react-native';
import axios from "axios";
import * as Linking from 'expo-linking';
import { WebView } from 'react-native-webview';

export default function TossAuthScreen({navigation}) {
    const [authUrl, setAuthUrl] = useState(null);
    const [txId, setTxId] = useState(null);
    const [loadding, setLoading] = useState(false);
    
    const startTossAuth = async () => {
        try {
            setLoading(true);
            const res = await axios.post('https://yourserver.com/api/toss/start');
            const { authUrl, txId } = res.data.success;

            setAuthUrl(authUrl);
            setTxId(txId);
            setLoading(false);
        } catch (e) {
            Alert.alert('인증 시작 실패', '잠시 후 다시 시도해주세요');
            setLoading(false);
        }
    };

    // 딥링크 콜백 처리
    useEffect(() => {
        const handleDeepLink = (event) => {
            const url = event.url;

            if (url.includes('auth/complete')) {
                checkTossResult(); // 인증 결과 확인
            }
        };

        const subscription = Linking.addEventListener('url', handleDeepLink);

        return () => subscription.remove();
    },[txId]);

    //결과 확인 요청
    const checkTossResult = async () => {
        try {
            const res = await axios.post('https://yourserver.com/api/toss/check', {txId});
            const result = res.data.success;

            if (result.status === 'COMPPLETED') {
                Alert.alert('인증 성공!, 회원가입을 계속진행합니다.');
                navigation.navigate('SignupContnue'); // 다음 스크린
            } else {
                Alert.alert('인증실패', '다시 시도해주세요.');
            }
        } catch (err) {
            Alert.alert('결과 확인 실패', '서버와 통신에 문제가 있어요.');
        }
    };

    return (
        <View style={{flex: 1}}>
            {loadding && <ActivityIndicator size="large" />}
            {!authUrl && <Button title="토스 본인 인증 시작" onPress={startTossAuth} />}
            {authUrl && (
                <WebView 
                    source={{uri: authUrl}}
                    originWhitelist={['*']}
                    javaScriptEnabled
                    onNavigationStateChange={(navState) => {
                        if (navState.url.includes('auth/complete')) {
                            Linking.openURL(navState.url);
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
// axios.post('/check', { txId }) 인증 상태 조회회