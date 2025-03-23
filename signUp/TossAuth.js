import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { requestTossAuth, verifyTossAuth } from "../utils/http/toss.API";
import SignupScreen from "./SignupScreen";

const BACKEND_URL = 'http://10.0.2.2:8080'; // 애뮬레이터용 주소 (로컬 서버버)


export default function TossAuth({navigation}) {
    const [authUrl, setAuthUrl] = useState(null);
    const [txId, setTxId] = useState(null);

    // Toss 인증 URL 요청
    useEffect(() => {
        const fetchAuthUrl = async () => {
            try {
                const res = await fetch('${BACKEND_URL}/toss/request', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                });
                const data= await res.json();
                setAuthUrl(data.authUrl);
                setTxId(data.txId);
            } catch (e) {
                console.error('인증 URL 요청 실패:', err);
                alert('오류', '인증을 시작할 수 없습니다.');
            }
        };
        fetchAuthUrl();
    }, []);

    // 인증결과 수신 후 회원가입 페이지로 이동 (정보 전달) 인증완료 + 사용자 정보 요청
    const handleAuthComplete = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/toss/result`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ txId }),
            });
            const user = await res.json();
            navigation.navigate('SignupScreen', { user }); // 사용자 정보 넘김
          } catch (err) {
            console.error('인증 결과 확인 실패:', err); 
            Alert.alert('오류', '인증 결과 확인에 실패했습니다.');
          }
        };
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
        {!authUrl ? (
            <ActivityIndicator size='large' />
        ) : (
            <WebView
            source={{
                uri: authUrl,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `txId=${txId}`,
            }}
            originWhitelist={['*']}
            javaScriptEnabled={true}
            onNavigationStateChange={(navState) => {
                const url = navState.url;
                if (url.includes('complete')) {
                handleAuthComplete(); // Toss 인증 성공
                } else if (url.includes('fail')) {
                alert('인증 실패');
                }
            }}
            />
        )}
        </SafeAreaView>
    );
}


// authUrl 토스가 준 인증 창 URL
// txId 인증 요청 고유 번호(이걸로 결과 조회)
// 딥링크 인증 완료 시 앱으로 돌아오게 해주는 앱스킴
// WebView authUrl 열어서 인증 수행
// axios.post('/check', { txId }) 인증 상태 조회
